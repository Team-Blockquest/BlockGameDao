import { React, useState } from 'react';
import Header from '../components/Header'
import Meta from '../components/Meta'
import { Table, Modal, Form, Button } from 'react-bootstrap';

const Home = () => {
    // page content
    const pageTitle = 'Home'
    const pageDescription = 'Current Elections'

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Action functions

    const handleVote = () => {
        console.log("Vote has been cast");
    }

    return (
        <div>
            <Meta title={pageTitle} />
            <Header head={pageTitle} description={pageDescription} />

            {/* Voting Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cast your vote!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select aria-label="Default select example">
                        <option>Choose your candidate [Senior Prefect (Boy)]</option>
                        <option>Elon Musk</option>
                        <option>Mark Cuban</option>
                        <option>Jeff Bezos</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleVote}>
                        Vote
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Voting table */}

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Candidate ID</th>
                        <th>Position</th>
                        <th>Candidate Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Senior Prefect (Girl)</td>
                        <td>Mark Cuban</td>
                        <td>           
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Senior Prefect (Boy)</td>
                        <td>Elon Musk</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Assembly Prefect</td>
                        <td>Jeff Bezos</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Home;