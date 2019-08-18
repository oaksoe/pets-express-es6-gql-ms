import * as fsJson from '../utils/fsJson';
import * as uuid from '../utils/uuid';
import { Pet } from '../models/petModel';

const filePath = 'src/data/pets_owners.json';

function createPetObject(id, pet) {
    return new Pet(
        id,
        pet.ownerId,
        pet.name,
        pet.colour,
        pet.age,
        pet.breed
    );
}

export async function createPet({pet}) {
    const petsOwners = await fsJson.readFileAsync(filePath);
    const newPet = createPetObject(uuid.create(), pet); 

    if (!petsOwners.pets || !Array.isArray(petsOwners.pets)) {
        petsOwners.pets = [];
    }

    petsOwners.pets.push(newPet);
    await fsJson.writeFileAsync(filePath, petsOwners);

    return newPet;
};

export async function updatePet({id, pet}) {
    const petsOwners = await fsJson.readFileAsync(filePath);
    const newPet = createPetObject(id, pet);
    let petIndex = petsOwners.pets.findIndex(p => p.id === newPet.id);
    petsOwners.pets[petIndex] = newPet; 
    await fsJson.writeFileAsync(filePath, petsOwners);
    return newPet;
};

export async function getOwners() {
    const petsOwners = await fsJson.readFileAsync(filePath);
    return petsOwners.owners;
};

export async function getPets() {
    const petsOwners = await fsJson.readFileAsync(filePath);
    return petsOwners.pets;
};

export async function getPet({id}) {
    const petsOwners = await fsJson.readFileAsync(filePath);
    return petsOwners.pets.find(pet => pet.id === id);
};

export async function getPetsByOwner({ownerId}) {
    const petsOwners = await fsJson.readFileAsync(filePath);
    return petsOwners.pets.filter(pet => pet.ownerId === ownerId);
};
