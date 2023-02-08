// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for agents
const Agent = require('../models/agent')

// custom middleware
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// ROUTES

// POST -> create abilities and give it to an agent
// POST /abilities/:agentId
router.post('/abilities/:agentId', (req, res, next) => {
    // isolate ability from the request and save to variable
    const ability = req.body.ability
    // isolate the agent and save agent's id to variable for easy reference
    const agentId = req.params.agentId
    // find the agent and push the new ability into the agent's array
    Agent.findById(agentId)
        // use custom 404 middleware
        .then(handle404)
        // adding ability to an agent
        .then(agent => {
            console.log('the agent: ', agent)
            console.log('the ability: ', ability)
            // add ability to abilities array
            agent.abilities.push(ability)
            // save the agent 
            return agent.save()
        })
        // send info after updating the agent
        .then(agent => res.status(201).json({ agent: agent }))
        // pass errors along to the error handler
        .catch(next)
})


// PATCH -> update an ability 
// PATCH /abilities/:agentId/:abilityId

// DELETE -> destroy an ability
// DELETE /abilities/:agentId/:abilityId

// export router
module.exports = router