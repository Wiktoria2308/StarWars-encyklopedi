import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import StarWarsAPI from '../services/StarWarsAPI'
import Card from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate } from "react-router-dom";


const Film = () => {
	const [film, setFilm] = useState()
	const { id } = useParams()
	const navigate = useNavigate();
	/**
 * Extract ID from SWAPI url
 */

    const getIdFromUrl = (url) => {
	// eslint-disable-next-line no-unused-vars
	const [_endpoint, id] = url
		.replace('https://swapi.dev/api/', '')
		.slice(0, -1)
		.split('/')
	return id
}

	const getFilm = async (id) => {
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
		<>
		{!film.message && (
				   <Card className="film">
					   {/* <Card.Img variant="top" src=""/> */}
					   <CardBody className="film-body">
					   <Card.Title className="film-title">{film.title}</Card.Title>
					   <Card.Subtitle className="film-subtitle">Attributes</Card.Subtitle>
					   <Table>
					   <tbody>
    						<tr>
      							<td className="attribute">Episode</td>
      							<td>{film.episode_id}</td>
    						</tr>
    						<tr>
      							<td className="attribute">Director</td>
      							<td>{film.director}</td>
    						</tr>
							<tr>
      							<td className="attribute">Producer</td>
      							<td>{film.producer}</td>
    						</tr>
							<tr>
      							<td className="attribute">Released</td>
      							<td>{film.release_date}</td>
    						</tr>
							<tr>
      							<td className="film-links">Links</td>
    						</tr>
							<tr>
      							<td>Characters</td>
								  {film.characters.length > 0 && (
								  <td>
								  <ListGroup>
								  {film.characters.map((character, index) =>
								<ListGroup.Item key={++index}><Link to={`/people/${getIdFromUrl(character)}`} className="character-link">Character {++index}  {`>>`}</Link></ListGroup.Item>
								  )}
								 </ListGroup>
								 </td>
								  )}
								  {film.characters.length === 0 && (
								  <td>No characters!</td>
								  )}
    						</tr>
						</tbody>
					   </Table>
					   <Button variant="primary" onClick={() => navigate(-1)} className="film-goback">{`<<`} Go back</Button>
					   </CardBody>
				   </Card>
				  
		   
	   )} 

	   {film.message && (
		   <p className="status">No film!</p>
	   )}
	   </>
	)
}

export default Film