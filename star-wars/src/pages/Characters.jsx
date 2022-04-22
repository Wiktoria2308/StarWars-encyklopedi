import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarWarsAPI from '../services/StarWarsAPI'
import Card from 'react-bootstrap/Card'
import CardText from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const Characters = () => {
	const [characters, setCharacters] = useState([])

	const getCharacters = async () => {

		const data = await StarWarsAPI.getCharacters()
      
        setCharacters(data);
	}

	useEffect(() => {
		getCharacters()
	}, [])

	return (
		<>
			<h1 className="films-heading">People</h1>

			{characters.length > 0 && (
				
				 <Row xs={1} md={2} lg={3} className="filmslist">
					{characters.map((character, index) =>
					<Col key={++index}>
						<Card className="film" style={{ width: '22rem' }}>
                            <CardBody>
                            <Card.Title className="film-title">{character.name}</Card.Title>
							
                            <CardText className="film-info">
                            <p className="film-id">Gender {character.gender}</p>
                            <p className="film-release">Born {character.birth_year}</p>
                            <p>In {character.films.length}</p>
                            </CardText>
							<Button variant="primary" as={Link} to={`/people/${++index}`} className="film-readmore">Read more</Button>
							</CardBody>
						</Card>
						</Col>
					)}
				</Row>
				
			)} 

			{characters.length === 0 && (
				<p className="status">No films!</p>
			)}
		</>
	)
}

export default Characters;