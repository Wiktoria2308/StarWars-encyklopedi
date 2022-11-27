import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarWarsAPI from "../services/StarWarsAPI";
import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { getIdFromUrl } from '../helpers/IdfromURL'

const Character = () => {
  const [character, setCharacter] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const getCharacter = async (id) => {
    const data = await StarWarsAPI.getCharacter(id);
    setCharacter(data);
  };

  useEffect(() => {
    getCharacter(id);
  }, [id]);

  if (!character) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {!character.message && (
        <Card className="character">
          <CardBody className="character-body">
            <Card.Title className="character-title">
              {character.name}
            </Card.Title>
            <Card.Subtitle className="character-subtitle">
              Attributes
            </Card.Subtitle>
            <Table>
              <tbody>
                <tr>
                  <td className="attribute">Gender</td>
                  <td>{character.gender}</td>
                </tr>
                <tr>
                  <td className="attribute">Birth Year</td>
                  <td>{character.birth_year}</td>
                </tr>
                <tr>
                  <td className="attribute">Height</td>
                  <td>{character.height}</td>
                </tr>
                <tr>
                  <td className="attribute">Mass</td>
                  <td>{character.mass}</td>
                </tr>
                <tr>
                  <td className="attribute">Hair color</td>
                  <td>{character.hair_color}</td>
                </tr>
                <tr>
                  <td className="attribute">Skin color</td>
                  <td>{character.skin_color}</td>
                </tr>
                <tr>
                  <td className="attribute">Eye color</td>
                  <td>{character.eye_color}</td>
                </tr>
                <tr>
                  <td className="character-links">Links</td>
                </tr>
                <tr>
                  <td>Films</td>
                  {character.films && (
                    <td>
                      <ListGroup>
                        {character.films.map((film, index) => (
                          <ListGroup.Item key={++index}>
                            <Link
                              to={`/films/${getIdFromUrl(film)}`}
                              className="character-link"
                            >
                              Film {++index} {`>>`}
                            </Link>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </td>
                  )}
                  {!character.films && <td>No characters!</td>}
                </tr>
              </tbody>
            </Table>
            <Button
              variant="primary"
              onClick={() => navigate(-1)}
              className="film-goback"
            >
              {`<<`} Go back
            </Button>
          </CardBody>
        </Card>
      )}

      {character.message && <p className="status">No character!</p>}
    </>
  );
};

export default Character;
