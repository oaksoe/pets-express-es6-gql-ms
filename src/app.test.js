const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./bin/www').default;
const should = chai.should();

chai.use(chaiHttp);

describe('GraphQL', () => {
    it('Returns pet with id', (done) => {
        chai.request(server).post('/graphql')
        .send({ query: `{ getPet(id: "29c80bd4-e953-4884-9529-38d5ece1e250") { id name colour age breed } }`})
        .end((err,res) => {
            if (err) return done(err);
            
            const pet = res.body.data.getPet;
            pet.should.have.property('id')
            pet.should.have.property('name')
            pet.should.have.property('colour')
            pet.should.have.property('age')
            pet.should.have.property('breed')
            done();
        })
    })
});