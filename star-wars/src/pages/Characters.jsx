import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import StarWarsAPI from '../services/StarWarsAPI'
import Card from 'react-bootstrap/Card'
import CardText from 'react-bootstrap/Card'
import CardBody from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useSearchParams } from 'react-router-dom'


const Characters = () => {
	const [characters, setCharacters] = useState([])
	const [page, setPage] = useState(1)
	const [allData, setAllData] = useState([])
	const [pages, setPages] = useState(1);
	const [searchResult, setSearchResult] = useState(null)
	const [searchInput, setSearchInput] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()
	const searchInputRef = useRef()
	const query = searchParams.get('query')

	const searchPeople = async (searchQuery, page) => {

		setCharacters([])
		setAllData([]);
		setSearchResult(null)
		setSearchParams({ query: searchInput, page: page })
		const data = await StarWarsAPI.searchPeople(searchQuery, page)

		setCharacters(data.results)
		setAllData(data);
		setSearchResult(data)
		if(data.count < 10) {
			setPages(1)
		}
		else {
			setPages(Math.ceil(data.count/10));
		}
	}
	const handleSubmit = async e => {
		e.preventDefault()
		if (!searchInput.length) {
			return
		}
		
		setPage(1)
		setPages(1)
		// set input value as query in URLSearchParams
		setSearchParams({ query: searchInput, page: page })
	}

	const getCharacters = async (pagee) => {

		const data = await StarWarsAPI.getCharacters(pagee)
		if(query){
			setSearchParams({ query: searchInput, page: page })
		}
		else {
			setSearchParams({ page: page })
		}
		
        setCharacters(data.results);
		setAllData(data)
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
			const ifSearch = url.includes("search");
			if(url && ifSearch) {
				const id = url.replace(`https://swapi.dev/api/people/?search=${query}&page=`, '')
				return id
			}
			else {
				const id = url.replace('https://swapi.dev/api/people/?page=', '')
				return id
			}
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
		
		if (!query) {
			setSearchInput('')
			getCharacters(page)
			setSearchResult(null)
			return
		}
		
		setSearchInput(query)
		searchPeople(query, page)
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, page])

	return (
		<>
			<h1 className="films-heading">People</h1>
		
				<Form onSubmit={handleSubmit}>
				
					<Form.Group className="mb-3" controlId="newTitle">
						<Form.Label>🔎  Search People</Form.Label>
						<Form.Control
							onChange={e => setSearchInput(e.target.value)}
							placeholder="Search"
							ref={searchInputRef}
							required
							type="text"
							value={searchInput}
						/>
					</Form.Group>
						<div>
							<Button className="mb-3" variant="success" type="submit" disabled={!searchInput.length}>Search</Button>
						</div>
				</Form>

		
			{characters.length > 0 &&  (
				<>
				{searchResult && (
				<div className="mt-1 mb-3">
					<p>Showing search results for {query}...</p>
					</div>
					)}

				 <Row xs={1} md={2} lg={3} className="filmslist mb-4">
					{characters.map((character, index) =>
					<Col key={++index}>
						<Card className="film" style={{ width: '22rem' }}>
                            <CardBody>
                            <Card.Title className="film-title">{character.name}</Card.Title>
                            <CardText className="film-info">
                            <p className="film-id"><span className="attribute">Gender</span> {character.gender}</p>
                            <p className="film-release"><span className="attribute">Born</span> {character.birth_year}</p>
                            <p><span className="attribute">In</span> {character.films.length} films</p>
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
				<p className="status">No people!</p>
			)}

		</>
	)
}

export default Characters;