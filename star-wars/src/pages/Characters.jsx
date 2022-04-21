// import { useEffect, useState } from 'react'
// import ListGroup from 'react-bootstrap/ListGroup'
// import { Link } from 'react-router-dom'
// import StarWarsAPI from '../services/StarWarsAPI'

// const People = () => {
// 	const [characters, setCharacters] = useState([])

// 	const getPeople = async () => {
// 		// Get todos from api
// 		const data = await StarWarsAPI.getPeople()

// 		// sort alphabetically by title
// 		// data.sort((a,b) => a.title.localeCompare(b.title))

// 		// sort by completed status
// 		// data.sort((a,b) => a.completed - b.completed)

// 		// update todos state
// 		setCharacters(data)
// 	}

// 	// Get todos from api when component is first mounted
// 	useEffect(() => {
// 		getPeople()
// 	}, [])

// 	return (
// 		<>
// 			<h1>People</h1>

// 			{/* {people.length > 0 && ( */}
// 				<ListGroup className="peoplelist">
// 					{characters.map(character =>
// 						<ListGroup.Item
// 							action
// 							as={Link}
// 							// key={person.id}
// 							// to={`/films/${film.id}`}
// 						>
// 							{character.name}
// 						</ListGroup.Item>
// 					)}
// 				</ListGroup>
// 			{/* )} */}

// 			{/* {todos.length === 0 && (
// 				<p className="status">No todos 🥳!</p>
// 			)} */}
// 		</>
// 	)
// }

// export default People;
