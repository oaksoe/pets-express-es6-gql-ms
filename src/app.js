// app.js
import express from 'express';
import logger from 'morgan';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';
import * as petController from './controllers/petController';

// GraphQL schema
const schema = buildSchema(`
    input PetInput {
        ownerId: String
        name: String
        colour: String
        age: Int
        breed: String
    },
    type Pet {
        id: String
        ownerId: String
        name: String
        colour: String
        age: Int
        breed: String
    },
    type Owner {
        id: String
        name: String
        address: String
        phone: String
        email: String
    },    
    type Query {
        getOwners: [Owner]
        getPets: [Pet]
        getPet(id: String!): Pet
        getPetsByOwner(ownerId: String!): [Pet]
    },
    type Mutation {
        createPet(pet: PetInput): Pet
        updatePet(id: String!, pet: PetInput): Pet
    }
`);

const root = {
    createPet: petController.createPet,
    updatePet: petController.updatePet,
    getOwners: petController.getOwners,
    getPets: petController.getPets,
    getPet: petController.getPet,
    getPetsByOwner: petController.getPetsByOwner
};

const app = express();
app.use(logger('dev'));

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

export default app;
