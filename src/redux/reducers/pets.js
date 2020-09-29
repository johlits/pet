import { ADD_PET, DELETE_PET, UPDATE_PET } from "../actionTypes";

const initialState = {
  //pets: [{ id: 1, name: 'Squirtle', hunger: 80, hygiene: 90, energy: 100, asleep: false }]
  pets: [],
};

export default function (state = initialState, action) {

  switch (action.type) {
    case ADD_PET: {
      const { id, name } = action.payload;
      return {
        ...state,
        pets: [
          ...state.pets,
          {
            id: id,
            name: name,
            hunger: 100,
            hygiene: 100,
            energy: 100,
            asleep: false,
            age: 1,
            seconds: 0,
          },
        ],
      };
    }
    case DELETE_PET: {
      const { id } = action.payload;
      let newPets = state.pets.filter((pet) => {
        return pet.id !== id;
      });
      return {
        ...state,
        pets: newPets,
      };
    }
    case UPDATE_PET: {
      const {
        id,
        name,
        hunger,
        hygiene,
        energy,
        asleep,
        age,
        seconds,
      } = action.payload;
      let newPets = state.pets;
      for (let i = 0; i < newPets.length; i++) {
        if (newPets[i].id === id) {
          newPets[i].name = name;
          newPets[i].hunger = hunger;
          newPets[i].hygiene = hygiene;
          newPets[i].energy = energy;
          newPets[i].asleep = asleep;
          newPets[i].age = age;
          newPets[i].seconds = seconds;
        }
      }

      return {
        ...state,
        pets: newPets,
      };
    }
    default:
      return state;
  }
}
