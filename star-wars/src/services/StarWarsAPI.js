/**
 * Star wars api
 */
 import axios from 'axios'

 const BASE_URL = 'https://swapi.dev/api/';
 
 /**
  * Get all films
  */
 const getFilms = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/films`)
		return response.data.results
	} catch (err) {
		return {
			message: err.message,
		}
	}
}

 /**
  * Get all films
  */
  const getCharacters = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/people`)
      return response.data.results
    } catch (err) {
      return {
        message: err.message,
      }
    }
  }
 /**
  * Get one film by id
  */

  const getFilm = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/films/${id}`)
      return response.data
    } catch (err) {
      return {
        message: err.message,
      }
    }
  }

 /**
  * Get one character by id
  */

  const getCharacter = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/people/${id}`)
        return response.data
    } catch (err) {
      return {
        message: err.message,
      }
    }
  }


 /**
  * Create a new todo
  *
  * @param data Object with properties and values for the new todo
  */
//  const createTodo = async (data) => {
//      const res = await axios.post(`${BASE_URL}/todos`, data)
//      return res.data
//  }
 
 /**
  * Update a todo
  *
  * @param todo_id Todo to update
  * @param data Data to update todo with
  */
//  const updateTodo = async (todo_id, data) => {
//      const res = await axios.patch(`${BASE_URL}/todos/${todo_id}`, data)
//      return res.data
//  }
 
 /**
  * Delete a todo
  *
  * @param todo_id Todo to delete
  */
//  const deleteTodo = async (todo_id) => {
//      const res = await axios.delete(`${BASE_URL}/todos/${todo_id}`)
//      return res.data
//  }
 
 // eslint-disable-next-line import/no-anonymous-default-export
 export default {
        getFilms,
        getFilm,
        getCharacter,
        getCharacters
        // getPeople
    //  getTodos,
    //  createTodo,
    //  updateTodo,
    //  deleteTodo,
 }
 