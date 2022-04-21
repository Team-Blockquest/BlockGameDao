import { React, useState } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';
import { Table, Modal, Button, Dropdown, DropdownButton, Form, Container } from 'react-bootstrap';

const Teacher = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // page content
    const pageTitle = 'Teacher'
    const pageDescription = 'Vote in an election and set up an election'


    const handleVote = () => {
        console.log("Vote has been cast");
    }

    return (
        <div>
            {/* Voting Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cast your vote!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton id="dropdown-item-button" title="Dropdown button">
                        <Dropdown.ItemText>Select a candidate</Dropdown.ItemText>
                        <Dropdown.Item as="button">Candidate 1</Dropdown.Item>
                        <Dropdown.Item as="button">Candidate 2</Dropdown.Item>
                        <Dropdown.Item as="button">Candidate 3</Dropdown.Item>
                    </DropdownButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleVote}>
                        Vote
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Meta component[with helmet] and header to display page*/}
            <Meta title={pageTitle} />
            <Header head={pageTitle} description={pageDescription} />

            {/* Voting table */}

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th># of Candidates</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Senior Prefect (Boy)</td>
                        <td>4</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Senior Prefect (Girl)</td>
                        <td>5</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>

                        </td>
                    </tr>
                    <tr>
                        <td>Assembly Prefect</td>
                        <td>6</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>

                        </td>
                    </tr>
                </tbody>
            </Table>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* Set up an election */}
            <p className='lead text-capitalize text-center'>Set Up an Election</p>
            <Container style={{ width: '30rem'}}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Election Name [Post to be contested]</Form.Label>
                        <Form.Control type="text" placeholder="Senior Prefect" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate addresses [Excel]</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Button className="float-sm-end" variant="primary" align="right" size="sm" active>
                        Create Election
                    </Button>
                </Form>
            </Container>

        </div>
    )
}

export default Teacher;