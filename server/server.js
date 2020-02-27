const path = require('path')
const fs = require('fs')
const express = require('express')
const { ApolloServer, UserInputError } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

let aboutMessage = 'This is an example of text'

const issues = [{
        id: 1, 
        status: 'Assigned',
        owner: 'Eddie',
        effort: 14,
        created: new Date('2018-08-16'),
        due: new Date('2018-08-30'),
        title: 'Missing bottom border on panel',
}]

const setAboutMessage = (_,  args) => {
  return aboutMessage = args.message
}

const issueValidate = (issue) => {
    const errors = []
    if (issue.title.length < 3) { errors.push(`Field "title" must be at least 3 characters long`)  }
    if (issue.status == 'Assigned' && !issue.owner) { errors.push(`Field "owner" is required when status is "Assigned"`) }
    if (errors.length > 0) { throw new UserInputError('Invalid input(s)', { errors }) }
}

const issueAdd = (_, { issue }) => {
    issueValidate(issue)
    issue.id = issues.length + 1 
    issue.created = new Date()
    issues.push(issue)
    return issue
}

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    'description': 'A Date() type in GraphQL as a scaler',
    serialize(value)  { 
        return value.toISOString() 
    },
    parseValue(value) { 
        const dateValue = new Date(value)
        return isNaN(dateValue) ? undefined : dateValue 
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value)
            return isNaN(value) ? undefined : value
        }
    },
})

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList: () => issues
    },
    Mutation: {
        setAboutMessage,
        issueAdd,
    },
    GraphQLDate
}

const app = express()

app.use(express.static('public'))

fs.readFile(path.join(__dirname, 'schema.graphql'),'UTF-8', (err, file) => {
    if (err) { throw err }
    const server = new ApolloServer({ 
        typeDefs: file, 
        resolvers,
        formatError: error => {
            return error
        },
    })
    server.applyMiddleware({ app, path: '/graphql' })
})

app.listen(3000, () => {
    console.log('App started on port 3000')
})
