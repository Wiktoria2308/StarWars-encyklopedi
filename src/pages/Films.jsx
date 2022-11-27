import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import StarWarsAPI from "../services/StarWarsAPI";
import Card from "react-bootstrap/Card";
import CardText from "react-bootstrap/Card";
import CardBody from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "react-router-dom";
import Search from "../components/Search";
import { getIdFromUrl } from '../helpers/IdfromURL'

const Films = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [pages, setPages] = useState(1);
  const [searchResult, setSearchResult] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef();
  const query = searchParams.get("query");
  const searchPage = searchParams.get("page");

  const searchFilms = async (searchQuery, page) => {
    setFilms([]);
    setAllData([]);
    setSearchResult(null);
    const data = await StarWarsAPI.searchFilms(searchQuery, page);
    setPage(searchPage);
    setFilms(data.results);
    setAllData(data);
    setSearchResult(data);
    if (data.count < 10) {
      setPages(1);
    } else {
      setPages(Math.ceil(data.count / 10));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchInput.length) {
      return;
    }
    setPage(1);
    setPages(1);
    // set input value as query in URLSearchParams
    setSearchParams({ query: searchInput, page: 1 });
  };

  const getFilms = async (pagee) => {
    const data = await StarWarsAPI.getFilms(pagee);
    if (query) {
      setSearchParams({ query: searchInput, page: page });
    } else {
      setSearchParams({ page: page });
    }
    setFilms(data.results);
    setAllData(data);
    if (data.count < 10) {
      setPages(1);
    } else {
      setPages(Math.ceil(data.count / 10));
    }
  };

  /**
   * Extract page number from SWAPI url
   */
  const getPageFromUrl = (url) => {
    // eslint-disable-next-line no-unused-vars

    if (url) {
      const ifSearch = url.includes("search");
      if (url && ifSearch) {
        const id = url.replace(
          `https://swapi.dev/api/films/?search=${query}&page=`,
          ""
        );
        return id;
      } else {
        const id = url.replace("https://swapi.dev/api/films/?page=", "");
        return id;
      }
    }
  };

  const handlePreviousPage = () => {
    const previousPage = getPageFromUrl(allData.previous);
    if (previousPage) {
      setPage(previousPage);
      setFilms(allData.results);
    }
    if (query && previousPage) {
      setSearchParams({ query: searchInput, page: previousPage });
    }
  };

  const handleNextPage = () => {
    const nextPage = getPageFromUrl(allData.next);
    if (nextPage) {
      setPage(nextPage);
      setFilms(allData.results);
    }
    if (query && nextPage) {
      setSearchParams({ query: searchInput, page: nextPage });
    }
  };

  useEffect(() => {
    if (!query) {
      setSearchInput("");
      getFilms(page);
      setSearchResult(null);
      return;
    }

    setSearchInput(query);
    searchFilms(query, searchPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, searchPage]);

  let props = {
    searchInputRef: searchInputRef,
    handleSubmit: handleSubmit,
    searchInput: searchInput,
    setSearchInput: setSearchInput,
    whoSearch: "Films",
  };

  return (
    <>
      <h1 className="films-heading">Films</h1>

      <Search {...props} />

      {films.length > 0 && (
        <>
          {searchResult && (
            <div className="mt-1 mb-3">
              <p className="showResult">
                Showing search results for {query}...
              </p>
            </div>
          )}
          <Row xs={1} md={2} lg={3} className="filmslist mb-4">
            {films.map((film, index) => (
              <Col key={++index}>
                <Card className="film" style={{ width: "22rem" }}>
                  <CardBody>
                    <Card.Title className="film-title">{film.title}</Card.Title>

                    <CardText className="film-info">
                      <p className="film-id">
                        <span className="attribute">Episode</span>
                        {film.episode_id}
                      </p>
                      <p className="film-release">
                        <span className="attribute">Released</span>{" "}
                        {film.release_date}
                      </p>
                      <p>
                        <span className="attribute">
                          {film.characters.length}
                        </span>{" "}
                        characters
                      </p>
                    </CardText>
                    <Button
                      variant="primary"
                      as={Link}
                      to={`/films/${getIdFromUrl(film.url)}`}
                      className="film-readmore"
                    >
                      Read more
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="button-container">
            <Button
              variant="primary"
              onClick={handlePreviousPage}
              className="next-page"
            >
              Previous page
            </Button>
            <p className="pageStyle">
              Page <span>{page}</span>
              <span> / {pages}</span>
            </p>
            <Button
              variant="primary"
              disabled={page === 0}
              onClick={handleNextPage}
              className="next-page"
            >
              Next page
            </Button>
          </div>
        </>
      )}

      {films.length === 0 && <p className="status">No films!</p>}
    </>
  );
};

export default Films;
