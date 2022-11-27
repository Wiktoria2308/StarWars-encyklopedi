import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Search = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>

            <Form.Group className="mb-3" controlId="newTitle" >
                <Form.Label className="text-white">🔎  Search {props.whoSearch}</Form.Label>
                <Form.Control
                    onChange={e => props.setSearchInput(e.target.value)}
                    placeholder="Search"
                    ref={props.searchInputRef}
                    required
                    type="text"
                    value={props.searchInput}
                />
            </Form.Group>
            <div>
                <Button className="mb-3" variant="success" type="submit" disabled={!props.searchInput.length}>Search</Button>
            </div>
        </Form>

    )
}

export default Search
