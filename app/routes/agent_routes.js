// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for agents
const Agent = require('../models/agent')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { agent: { title: '', text: 'foo' } } -> { agent: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /agents
router.get('/agents', (req, res, next) => {
	Agent.find()
		.populate('owner')
		.then((agents) => {
			// `agents` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return agents.map((agent) => agent.toObject())
		})
		// respond with status 200 and JSON of the agents
		.then((agents) => res.status(200).json({ agents: agents }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /agents/5a7db6c74d55bc51bdf39793
router.get('/agents/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Agent.findById(req.params.id)
		.populate('owner')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "agent" JSON
		.then((agent) => res.status(200).json({ agent: agent.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /agents
router.post('/agents', requireToken, (req, res, next) => {
	// set owner of new agent to be current user
	req.body.agent.owner = req.user.id

	Agent.create(req.body.agent)
		// respond to succesful `create` with status 201 and JSON of new "agent"
		.then((agent) => {
			res.status(201).json({ agent: agent.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /agents/5a7db6c74d55bc51bdf39793
router.patch('/agents/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.agent.owner

	Agent.findById(req.params.id)
		.then(handle404)
		.then((agent) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, agent)

			// pass the result of Mongoose's `.update` to the next `.then`
			return agent.updateOne(req.body.agent)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /agents/5a7db6c74d55bc51bdf39793
router.delete('/agents/:id', requireToken, (req, res, next) => {
	Agent.findById(req.params.id)
		.then(handle404)
		.then((agent) => {
			// throw an error if current user doesn't own `agent`
			requireOwnership(req, agent)
			// delete the agent ONLY IF the above didn't throw
			agent.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
