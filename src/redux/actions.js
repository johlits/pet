import { ADD_PET, DELETE_PET, UPDATE_PET } from "./actionTypes";

let nextPetId = 1;

export const addPet = content => ({
  type: ADD_PET,
  payload: {
    id: ++nextPetId,
    name: content
  }
});

export const deletePet = id => ({
    type: DELETE_PET,
    payload: {
      id
    }
  });
  export const updatePet = content => ({
    type: UPDATE_PET,
    payload: {
      id: content.id,
      name: content.name,
      hunger: content.hunger,
      hygiene: content.hygiene,
      energy: content.energy,
      asleep: content.asleep,
      age: content.age,
      seconds: content.seconds
    }
  });
