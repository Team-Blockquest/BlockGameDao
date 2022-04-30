import React, { useState, useEffect, useRef } from "react";
import {ethers } from "ethers";
import Header from '../components/Header';
import Meta from '../components/Meta';
import { Table, Modal, Button, Dropdown, DropdownButton, Form, Container } from 'react-bootstrap';

const Teacher = ({contract, post, candidates}) => {

    useEffect(() => {
        showCandidateInfo();
    }, []);

    const [data, setData] = useState([]);
    const [showCandidate, setCandidateInfo] = useState([])
    const [showWiningCandidate, setWiningCandidate] = useState("");


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const collectAddress = useRef();
    const publicCategory = useRef();
    const positionInput = useRef();

    // page content
    const pageTitle = 'Teacher'
    const pageDescription = 'Vote in an election and set up an election'


    const handleVote = () => {
        console.log("Vote has been cast");
    }

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

    const getWinningCandidateName = async() => {
        const category = publicCategory.current.value;
        
        const reset_status = await contract.getWinningCandidateId(
            category, {
                gasLimit: 300000
            }
        );

        setWiningCandidate(reset_status)
        console.log(reset_status)
    }

    const compileVote = async() => {
        const position = positionInput.current.value;
        
            const Position = await contract.compileVotes(
                position, {
                    gasLimit: 300000
                }
            );

            // window.alert(addCategory.text);
        
            console.log("Category included Successfully", Position);
    }


    const makeResultPublic = async() => {

        const result = await contract.publicResults();

       

        console.log(result)
    }

    const EnrollStudent = async() => {
        const studentAddress = collectAddress.current.value;
        
        const addStud = await contract.EnrollStudent(
            studentAddress, {
                gasLimit: 300000,
              }
        );
    
        console.log("Student Added Successfully", addStud);
    }


    return (
        <div>
            {/* Voting Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cast your vote!</Modal.Title>
                </Modal.Header>
            </Modal>

            {/* Meta component[with helmet] and header to display page*/}
            <Meta title={pageTitle} />
            <Header head={pageTitle} description={pageDescription} />

            {/* Voting table */}

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Category Name</th>
                        <th>Vote</th>
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
                                })
                                }
                </tbody>
            </Table>

            <br></br>
            <br></br>

            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Address of a StakeHolder</Form.Label>
                        <Form.Control ref={collectAddress} type="text" placeholder="Address" />
                    </Form.Group>
                </Form>
            </Container>

            <br></br>
            <br></br>
            <tr>
        
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => EnrollStudent()}>Add Students</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => makeResultPublic()}>Make Result Public</button>
            </tr>

            <br></br>
            <br></br>

            <p className='lead text-capitalize text-center'>Get Wininning Candidate Per Category</p>
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Of Vote</Form.Label>
                        <Form.Control ref={publicCategory} type="text" placeholder="_category" />
                    </Form.Group>

                    <p>{showWiningCandidate}</p>

                    <Button className="float-sm-end" onClick={() => getWinningCandidateName()} variant="primary" align="right" size="sm" active>
                     Get getWinningCandidateName
                    </Button>
                </Form>

                <br></br>
                <br></br>
            </Container>

            <p className='lead text-capitalize text-center'>Compile Vote</p>
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Of Vote</Form.Label>
                        <Form.Control ref={positionInput} type="text" placeholder="_category" />
                    </Form.Group>

                    <Button className="float-sm-end" onClick={compileVote} variant="primary" align="right" size="sm" active>
                      Compile Vote
                    </Button>
                </Form>

                <br></br>
                <br></br>
            </Container>

        </div>
    )
}

export default Teacher;