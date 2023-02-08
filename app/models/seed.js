const mongoose = require('mongoose')
const Agent = require('./agent')
const db = require('../../config/db')

const startAgents = [
    { name: 'Brimstone', agentNumber: 1, role: 'Controller', country: 'U.S.A.' },
    { name: 'Viper', agentNumber: 2, role: 'Controller', country: 'U.S.A' },
    { name: 'Omen', agentNumber: 3, role: 'Controller', country: 'Unknown' },
    { name: 'Killjoy', agentNumber: 4, role: 'Sentinel', country: 'Germany' },
    { name: 'Cypher', agentNumber: 5, role: 'Sentinel', country: 'Morocco' },
    { name: 'Sova', agentNumber: 6, role: 'Initator', country: 'Russia' },
    { name: 'Sage', agentNumber: 7, role: 'Sentinel', country: 'China' },
    { name: 'Phoenix', agentNumber: 9, role: 'Duelist', country: 'U.K.' },
    { name: 'Jett', agentNumber: 10, role: 'Duelist', country: 'South Korea' }
]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Agent.deleteMany()
            .then(deletedAgents => {
                console.log('the deleted agents:', deletedAgents)
                // now we add our agents to the db
                Agent.create(startAgents)
                    .then(newAgents => {
                        console.log('the new agents', newAgents)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })
