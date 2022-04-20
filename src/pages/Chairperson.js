import { React, useState} from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';
import { Table, Modal, Button } from 'react-bootstrap';


const Chairperson = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // page content
    const pageTitle = 'Chairman'
    const pageDescription = 'Chairman'

   
      
      
    
   

    const startElection = () => {
        console.log("Election has been started");
    }

    const stopElection = () => {
        console.log("Election has been stopped");
    }

    return (
        <div>
            {/* Voting Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cast your vote!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span></span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
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
                            {/* <button type="button" className="btn btn-outline-primary me-2" onClick={vote}>Start Election</button>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={vote}>Stop Election</button> */}
                        </td>
                    </tr>
                    <tr>
                        <td>Senior Prefect (Girl)</td>
                        <td>5</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2"onClick={handleShow}>Vote</button>
                            <button type="button" className="btn btn-outline-primary me-2"onClick={startElection}>Start Election</button>
                            <button type="button" className="btn btn-outline-primary me-2"onClick={stopElection}>Stop Election</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Assembly Prefect</td>
                        <td>6</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={startElection}>Start Election</button>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={stopElection}>Stop Election</button>
                        </td> 
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Chairperson;