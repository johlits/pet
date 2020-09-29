"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePet = exports.deletePet = exports.addPet = void 0;

var _actionTypes = require("./actionTypes");

let nextPetId = 1;

const addPet = content => ({
  type: _actionTypes.ADD_PET,
  payload: {
    id: ++nextPetId,
    name: content
  }
});

exports.addPet = addPet;

const deletePet = id => ({
  type: _actionTypes.DELETE_PET,
  payload: {
    id
  }
});

exports.deletePet = deletePet;

const updatePet = content => ({
  type: _actionTypes.UPDATE_PET,
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

exports.updatePet = updatePet;