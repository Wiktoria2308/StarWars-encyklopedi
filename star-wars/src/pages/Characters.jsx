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
	const [page, setPage] = useState(1)
	const [allData, setAllData] = useState([])
	const [pages, setPages] = useState(1);
	


	const getCharacters = async (page) => {

		const data = await StarWarsAPI.getCharacters(page)

        setCharacters(data);
		
	}

	const getCharactersAllData = async (page) => {

		const data = await StarWarsAPI.getCharactersAllData(page)
        setAllData(data);
		setPages(Math.ceil(data.count/10));
	}

	/**
    * Extract page number from SWAPI url
    */
	const getPageFromUrl = (url) => {
            // eslint-disable-next-line no-unused-vars
		if(url) {
			const id = url.replace('https://swapi.dev/api/films/?page=', '')
			return id
		}
    }

	const handlePreviousPage = () => {
		const previousPage = getPageFromUrl(allData.previous);
		if(previousPage) {
			setPage(previousPage);
			setCharacters(allData.results)
		}
	}

	const handleNextPage = () => {
		const nextPage = getPageFromUrl(allData.next);
		if(nextPage) {
			setPage(nextPage);
			setCharacters(allData.results)
		}
	}

	useEffect(() => {
		getCharacters(page)
		getCharactersAllData(page)
	}, [page])

	return (
		<>
			<h1 className="films-heading">People</h1>

			{characters.length > 0 && (
				<>
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
				<div className="button-container">
				<Button variant="primary" onClick={handlePreviousPage}  className="next-page">Previous page</Button>
				<p>Page <span>{page}</span><span> / {pages}</span></p>
				<Button variant="primary" disabled={page === 0} onClick={handleNextPage}  className="next-page">Next page</Button>
				</div>
				</>
			)} 
			

			{characters.length === 0 && (
				<p className="status">No films!</p>
			)}

		</>
	)
}

export default Characters;