import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarWarsAPI from '../services/StarWarsAPI'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import CardText from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const Films = () => {
	const [films, setFilms] = useState([])

	const getFilms = async () => {

		const data = await StarWarsAPI.getFilms()
      
        setFilms(data);
	}


	useEffect(() => {
		getFilms()
	}, [])

	return (
		<>
			<h1>Films</h1>

			{films.length > 0 && (
				<CardGroup className="filmslist">
					{films.map(film =>
						<Card className="film" key={film.episode_id}>
                            <Card.Img variant="top" src=""/>
                            <CardBody>
                            <Card.Title>{film.title}</Card.Title>
                            <CardText className="film-info">
                            <p>Episode {film.episode_id}</p>
                            <p>Released {film.release_date}</p>
                            <p>{film.characters.length} characters</p>
                            </CardText>
                            <Button variant="primary" as={Link} to={`/films/${film.episode_id}`}>Read more</Button>
                            </CardBody>
							
						</Card>
					)}
				</CardGroup>
			)} 

			{films.length === 0 && (
				<p className="status">No films!</p>
			)}
		</>
	)
}

export default Films;
