const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

const app = express();
const port = 4000;
app.use(express.json())

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
      hello: () => {
        return 'Hello World!';
      },
    },
  };
const servStart =async ()=>{
      
      const server = new ApolloServer({ typeDefs, resolvers });
      await server.start();
      
      server.applyMiddleware({ app });
      
      app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
      );
}
servStart().catch(err=> console.log(err))