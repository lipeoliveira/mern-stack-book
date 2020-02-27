const path = require('path')
const fs = require('fs')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

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

const setAboutMessage = (_,  args) => {
  return aboutMessage = args.message
}

const issueAdd = (_, { issue }) => {
    issue.id = issues.length + 1 
    issue.created = new Date()

    if (!issue.status) { issue.status = 'New' }
    issues.push(issue)
    return issue
}

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    'description': 'A Date() type in GraphQL as a scaler',
    serialize(value)  { return value.toISOString() },
    parseValue(value) { return new Date(value) },
    parseLiteral(ast) {
        return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined
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
    const server = new ApolloServer({ typeDefs: file, resolvers })
    server.applyMiddleware({ app, path: '/graphql' })
})

app.listen(3000, () => {
    console.log('App started on port 3000')
})
