
import React, { useState, useEffect, useRef } from "react";
import {ethers } from "ethers";
import Header from '../components/Header'
import Meta from '../components/Meta'
import { Table, Modal, Form, Button } from 'react-bootstrap';
import ZuriVotingABI from '../util/ZuriVoting.json';


const Home = () => {
    const zuriVotingContractAddress = "0x950DFfDBA979E4e4bB8EaaE0d3eA02283dEe0d4A";
    const zuriVotingABI = ZuriVotingABI.abi;

    useEffect(() => {
        showCandidateInfo()
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

    const showCandidateInfo = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

        
            const candidateInfo = await zuriVotingContract.showCandidatesInfo();
            setCandidateInfo(candidateInfo);
            
            console.log(candidateInfo);
            console.log(showCandidate);

        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
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