"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _actionTypes = require("../actionTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const initialState = {
  //pets: [{ id: 1, name: 'Squirtle', hunger: 80, hygiene: 90, energy: 100, asleep: false }]
  pets: []
};

function _default() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  let action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.ADD_PET:
      {
        const {
          id,
          name,
          content
        } = action.payload;
        return _objectSpread(_objectSpread({}, state), {}, {
          pets: [...state.pets, {
            id: id,
            name: name,
            hunger: 100,
            hygiene: 100,
            energy: 100,
            asleep: false,
            age: 1,
            seconds: 0
          }]
        });
      }

    case _actionTypes.DELETE_PET:
      {
        const {
          id,
          content
        } = action.payload;
        let newPets = state.pets.filter(pet => {
          return pet.id !== id;
        });
        return _objectSpread(_objectSpread({}, state), {}, {
          pets: newPets
        });
      }

    case _actionTypes.UPDATE_PET:
      {
        const {
          id,
          name,
          hunger,
          hygiene,
          energy,
          asleep,
          age,
          seconds,
          content
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

        return _objectSpread(_objectSpread({}, state), {}, {
          pets: newPets
        });
      }

    default:
      return state;
  }
}