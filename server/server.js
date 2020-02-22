const path = require('path')
const fs = require('fs')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
let aboutMessage = 'This is an example of text'
const issues = [
    {
        id: 1, 
        status: 'Assigned',
        owner: 'Eddie',
        effort: 14,
        created: new Date('2018-08-16'),
        due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel',
    }, {
        id: 2,
        status: 'New',
        owner: 'Ravan', 
        effort: 5,
        created: new Date('2018-08-15'),
        due: undefined,
        title: 'Error in console when clicking Add',
    }
]

const setAboutMessage = function (_,  args) {
  return aboutMessage = args.message
}

const resolvers = {
    Query: {
        about: function() {
            return aboutMessage
        },
        issueList: function() {
            return issues
        }
    },
    Mutation: {
        setAboutMessage,
    }
}

const app = express()

app.use(express.static('public'))

const readFile = (path) =>  {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'UTF-8', (err, fileContent) => {
            if (err) {
                reject(err)
            } else {
                resolve(fileContent)
            }
        }) 
    })
}

const initApp = async () => {
    try {
        const fileContent = await readFile(path.join(__dirname, 'schema.graphql'))
        const server = new ApolloServer({ 
            typeDefs: fileContent,
            resolvers, 
        })

        server.applyMiddleware({ app, path: '/graphql' })
    } catch(err) {
        console.log(err)
    }
}

initApp()

app.listen(3000, () => {
  console.log('App started on port 3000')
})
