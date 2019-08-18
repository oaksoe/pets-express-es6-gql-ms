# pets-express-es6-gql-ms
A microservice using node express + es6 + graphql

# Queries & Mutations
query getOwners {
  getOwners {
    id,
    name,
    address,
    phone,
    email
  }
}

query getPets {
  getPets {
    id,
    name,
    colour,
    age,
    breed
  }
}

query getPet {
  getPet(id:"29c80bd4-e953-4884-9529-38d5ece1e250") {
    id,
    name,
    colour,
    age,
    breed,
  }
}

query getPetsByOwner {
  getPetsByOwner(ownerId:"2") {
    id,
    name,
    colour,
    age,
    breed,
  }
}

mutation createPet($input: PetInput) {
  createPet(pet: $input) {
    id,
    ownerId,
    name,
    colour,
    age,
    breed
  }
} 

mutation updatePet($id: String!, $input: PetInput) {
  updatePet(id: $id, pet: $input) {
    id,
    ownerId,
    name,
    colour,
    age,
    breed
  }
} 