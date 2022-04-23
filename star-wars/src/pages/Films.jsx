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
	const [page, setPage] = useState(1)
	const [allData, setAllData] = useState([])
	const [pages, setPages] = useState(1);

	const getFilms = async (page) => {

		const data = await StarWarsAPI.getFilms(page)
      
        setFilms(data);
	}
	const getFilmsAllData = async (page) => {

		const data = await StarWarsAPI.getFilmsAllData(page)
        setAllData(data);
		if(data.count < 10) {
			setPages(1)
		}
		else {
			setPages(Math.ceil(data.count/10));
		}
	}
	/**
    * Extract page number from SWAPI url
    */
	 const getPageFromUrl = (url) => {
		// eslint-disable-next-line no-unused-vars
	if(url) {
		const id = url.replace('https://swapi.dev/api/people/?page=', '')
		return id
	}
}

const handlePreviousPage = () => {
	const previousPage = getPageFromUrl(allData.previous);
	if(previousPage) {
		setPage(previousPage);
		setFilms(allData.results)
	}
}

const handleNextPage = () => {
	const nextPage = getPageFromUrl(allData.next);
	if(nextPage) {
		setPage(nextPage);
		setFilms(allData.results)
	}
}

	useEffect(() => {
		getFilms(page)
		getFilmsAllData(page)
	}, [page])

	return (
		<>
			<h1 className="films-heading">Films</h1>

			{films.length > 0 && (
				<>
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
					<div className="button-container">
				<Button variant="primary" onClick={handlePreviousPage}  className="next-page">Previous page</Button>
				<p>Page <span>{page}</span><span> / {pages}</span></p>
				<Button variant="primary" disabled={page === 0} onClick={handleNextPage}  className="next-page">Next page</Button>
				</div>
				</>
			)} 

			{films.length === 0 && (
				<p className="status">No films!</p>
			)}
		</>
	)
}

export default Films;
