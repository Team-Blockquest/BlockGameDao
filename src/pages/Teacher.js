import React, { useState, useEffect, useRef } from "react";
import {ethers } from "ethers";
import Header from '../components/Header';
import Meta from '../components/Meta';
import ZuriVotingABI from '../util/ZuriVoting.json';
import { Table, Modal, Button, Dropdown, DropdownButton, Form, Container } from 'react-bootstrap';

const Teacher = () => {

    const zuriVotingContractAddress = "0x7589bC30346Ff76e44584aC27C4EfA5166D613F1";
    const zuriVotingABI = ZuriVotingABI.abi;

    useEffect(() => {
        showCategories();
    }, []);

    const [data, setData] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // page content
    const pageTitle = 'Teacher'
    const pageDescription = 'Vote in an election and set up an election'


    const handleVote = () => {
        console.log("Vote has been cast");
    }

    const showCategories = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

        
            const showCategory = await zuriVotingContract.showCategories();
            setData(showCategory);

            console.log(data);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data[0]}</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
                        </td>
                    </tr>
                    <tr>
                        <td>{data[1]}</td>
                        <td>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>

                        </td>
                    </tr>
                    <tr>
                        <td>{data[2]}</td>
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
            <tr>
            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Compile Result</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Make Result Public</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Add Students</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>View Winner Name</button>
            </tr>

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

                <br></br>
                <br></br>
            </Container>

        </div>
    )
}

export default Teacher;