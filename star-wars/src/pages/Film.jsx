import { useState, useEffect } from 'react'
// import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import StarWarsAPI from '../services/StarWarsAPI'

const Film = () => {
	const [film, setFilm] = useState()
	const { id } = useParams()

	const getFilm = async (id) => {
		console.log("id", id)
		const data = await StarWarsAPI.getFilm(id)
		setFilm(data)
	}

    useEffect(() => {
		getFilm(id)
	}, [id])

	if (!film) {
		return <p>Loading...</p>
	}

    return (
		<div>
			{film.title}
		</div>
	)
}

export default Film