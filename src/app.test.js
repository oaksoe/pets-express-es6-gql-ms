const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./bin/www').default;
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('GraphQL', () => {
    it('Returns pet by id', (done) => {
        chai.request(server).post('/graphql')
        .send({ query: `{ getPet(id: "1") { name colour age breed } }`})
        .end((err,res) => {
            if (err) return done(err);
            
            const pet = res.body.data.getPet;
            pet.should.have.property('name');
            pet.should.have.property('colour');
            pet.should.have.property('age');
            pet.should.have.property('breed');

            expect(pet.name).to.equal('Kitty');
            expect(pet.colour).to.equal('Yellow');
            expect(pet.age).to.equal(1);
            expect(pet.breed).to.equal('Asian');
            done();
        })
    })

    it('Returns owner and his pets', (done) => {
        chai.request(server).post('/graphql')
        .send({ query: `{ getOwnerPets(ownerId: "1") { 
            name
            address 
            phone
            email
            pets {
                id
                ownerId
                name
                colour
                age
                breed
            }
        } }`})
        .end((err,res) => {
            if (err) return done(err);
            
            const owner = res.body.data.getOwnerPets;
            owner.should.have.property('name');
            owner.should.have.property('address');
            owner.should.have.property('phone');
            owner.should.have.property('email');

            expect(owner.name).to.equal('Oak');
            expect(owner.address).to.equal('Subang Jaya');
            expect(owner.phone).to.equal('0123456789');
            expect(owner.email).to.equal('oak@gmail.com');
            expect(owner.pets.length).to.equal(2);

            done();
        })
    })

    it('Returns all pets', (done) => {
        chai.request(server).post('/graphql')
        .send({ query: `{ getPets { id name colour age breed } }`})
        .end((err,res) => {
            if (err) return done(err);
            
            const pets = res.body.data.getPets;
            expect(pets.length).to.equal(2);            
            done();
        })
    })

    it('Returns all owners', (done) => {
        chai.request(server).post('/graphql')
        .send({ query: `{ getOwners { id name address phone email } }`})
        .end((err,res) => {
            if (err) return done(err);
            
            const owners = res.body.data.getOwners;
            expect(owners.length).to.equal(3);            
            done();
        })
    })

    it('create pet', (done) => {
        chai.request(server).post('/graphql')
        .send({ query: `mutation { createPet(pet: {
            ownerId: "3",
            name: "Meow Meow Meow",
            colour: "Black & White",
            age: 2,
            breed: "Asian"
        }) { id } }`})
        .end((err,res) => {
            if (err) return done(err);
            const pet = res.body.data.createPet;
            pet.should.have.property('id');
            done();
        })
    })

    it('update pet', (done) => {
        chai.request(server).post('/graphql')
        .send({ query: `mutation { updatePet(id: "2", pet: {
            ownerId: "2",
            name: "Blackie",
            colour: "Black",
            age: 3,
            breed: "Golden Retriever"
        }) { name colour age breed } }`})
        .end((err,res) => {
            if (err) return done(err);
            const pet = res.body.data.updatePet;
            pet.should.have.property('name');
            pet.should.have.property('colour');
            pet.should.have.property('age');
            pet.should.have.property('breed');

            expect(pet.name).to.equal('Blackie');
            expect(pet.colour).to.equal('Black');
            expect(pet.age).to.equal(3);
            expect(pet.breed).to.equal('Golden Retriever');
            done();
        })
    })
});
