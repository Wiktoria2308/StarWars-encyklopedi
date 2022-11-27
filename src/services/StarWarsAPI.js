/**
 * Star wars api
 */
import axios from "axios";

const BASE_URL = "https://swapi.dev/api/";

/**
 * Get all films
 */
const getFilms = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/films/?page=${page}`);
    return response.data;
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

/**
 * Get all characters
 */
const getCharacters = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/people/?page=${page}`);
    return response.data;
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

/**
 * Get one film by id
 */

const getFilm = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/films/${id}`);
    return response.data;
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

/**
 * Get one character by id
 */

const getCharacter = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/people/${id}`);
    return response.data;
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

/**
 *
 *Search people using query and page number
 */
export const searchPeople = async (query, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/people/?search=${query}&page=${page}`
    );
    return response.data;
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

/**
 *
 *Search films using query and page number
 */
export const searchFilms = async (query, page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/films/?search=${query}&page=${page}`
    );
    return response.data;
  } catch (err) {
    return {
      message: err.message,
    };
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFilms,
  getFilm,
  getCharacter,
  getCharacters,
  searchPeople,
  searchFilms,
};
