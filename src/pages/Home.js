
import React, { useState, useEffect, useRef } from "react";
import {ethers } from "ethers";
import Header from '../components/Header'
import Meta from '../components/Meta'
import { Table, Modal, Form, Button, Container } from 'react-bootstrap';


const Home = ({post, contract, candidates, isResultView}) => {

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


    const handleVote = async(voteID, category) => {
       
        const Vote = await contract.vote(
            voteID, category, {
                gasLimit: 300000,
            }
        );
        window.alert(Vote);
    
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
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleVote}>
                        Vote
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Voting table */}

   {!isResultView && <> <Table striped bordered hover variant="dark">
                     <thead>
                                <tr>
                                <th>Category Name</th>
                              <th>Vote</th>
                                </tr>
                            </thead>
                            <tbody>
                            {post.map((posts) => {   
                              const candidates2 = candidates.filter(t => t.position === posts);         
                                    return(      
                                        <tr>
                                 <td>{posts}</td>
                                 <td>
                                   <Modal.Body>
                <Form.Select aria-label="Default select example" key="uniqueId1">
                                 {candidates2.map((candidate1) => {   
                              return(
   
                             <option> {candidate1.name} </option>
                            
                               );
                            })}
                  </Form.Select>
                </Modal.Body>
                    <button type="button" className="btn btn-outline-primary me-2" onClick={() => handleVote(1, posts)}>Vote</button>                         
                              </td>
                              </tr>
                                    );
                                })}
                            </tbody>
                    </Table>
                    </>
                    }
    
           
                    { isResultView && <>
           <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                     
        
                        <th>Category Name</th>
                        <th>Winners Per Category</th>
                    </tr>
                </thead>
                <tbody>
                {
                post.map((posts) => {   
                              const candidates2 = candidates.filter(t => t.position === posts);         
                                    return(      
                                        <tr>
                                 <td>{posts}</td>
                                 <td>
                                   <Modal.Body>
               
                                 {candidates2.map((candidate1) => {   
                              return(
   
                             <p> {candidate1.name} </p>
                            
                               );
                            })}
                 
                </Modal.Body>
        
                              </td>
                              </tr>
                                    );
                                })
                        }
                </tbody>
            </Table>
            </>
}
        </div>
    )
}

export default Home;