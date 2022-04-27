
import React, { useState, useEffect, useRef } from "react";
import {ethers } from "ethers";
import Header from '../components/Header'
import Meta from '../components/Meta'
import { Table, Modal, Form, Button } from 'react-bootstrap';


const Home = (contract) => {

    useEffect(() => {
      
    }, []);

    // page content
    const pageTitle = 'Home'
    const pageDescription = 'Current Elections'

    const [showCandidate, setCandidateInfo] = useState([])

    const [show, setShow] = useState(false);
    const [data, setData] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Action functions
    const showCategories = async() => {

        
        const showCategory = await contract.showCategories();
        setData(showCategory);

        console.log(data);
    }

    const showCandidateInfo = async() => {
        const candidateInfo = await contract.showCandidatesInfo();
            setCandidateInfo(candidateInfo);
            
            console.log(candidateInfo);
            console.log(showCandidate);
    }

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
                    {showCandidate.map((item) =>{
                            return(   
                          <option> {item[1]}  </option>
                            ); }
                        )}
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
                     
        
                        <th>Candidate Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {showCandidate.map((item) => {
                        return(
                            <tr>
                            <td>{item[2]}</td>
                              <td>
                                  <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
                                  
                              </td>
                          </tr>
                        );
                    })}
                </tbody>
            </Table>
            
        </div>
    )
}

export default Home;