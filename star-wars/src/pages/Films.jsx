import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarWarsAPI from '../services/StarWarsAPI'
import Card from 'react-bootstrap/Card'
import CardText from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
			<h1 className="films-heading">Films</h1>

			{films.length > 0 && (
				
				 <Row xs={1} md={2} lg={3} className="filmslist">
					{films.map((film, index) =>
					<Col key={++index}>
						<Card className="film" style={{ width: '22rem' }}>
                            <CardBody>
                            <Card.Title className="film-title">{film.title}</Card.Title>
							
                            <CardText className="film-info">
                            <p className="film-id">Episode {film.episode_id}</p>
                            <p className="film-release">Released {film.release_date}</p>
                            <p>{film.characters.length} characters</p>
                            </CardText>
							<Button variant="primary" as={Link} to={`/films/${++index}`} className="film-readmore">Read more</Button>
							</CardBody>
						</Card>
						</Col>
					)}
				</Row>
				
			)} 

			{films.length === 0 && (
				<p className="status">No films!</p>
			)}
		</>
	)
}

export default Films;
