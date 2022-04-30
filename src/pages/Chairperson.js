import React, { useState, useEffect, useRef } from "react";
import {ethers, BigNumber } from "ethers";
import Header from '../components/Header';
import Meta from '../components/Meta';
import Home from './Home'
// import readXlsxFile from 'read-excel-file';
import { 
    Table, 
    Modal, 
    Button, 
    Form, 
    Container
} from 'react-bootstrap';


const Chairperson = ({post, contract, candidates, isResultView, sendCandidatesData}) => {


  

    const [show, setShow] = useState(false);
    const [noOfVotes, setNoOfVotes] = useState(0);
    const [lastCandidateID, setLastCandidateID] = useState(candidates.length);
    const [showWiningCandidate, setWiningCandidate] = useState("");
    const [showResultView, setResultView] = useState(false);


    const candidateAddressInput = useRef();
    const candidateNameInput = useRef();
    const candidateCategoryInput = useRef();
    const candidateIpfsInput = useRef();
    const categoriesInput = useRef();
    const collectAddress = useRef();
    const positionInput = useRef();
    const publicCategory = useRef();


    useEffect(() => {
        if (isResultView) {
            let sum_ = candidates.reduce((acc, curr) => acc + curr.votesCount, 0);
            setNoOfVotes(sum_/post.length);  
            console.log(sum_); 
        }
    }, [candidates, isResultView]);
    
    // const excelRef = useRef();

    const handleClose = () => setShow(false);

    // page content
    const pageTitle = 'Chairperson'
    const pageDescription = 'Vote start or stop any election and set up an election'

    const startElection = async () => {

        const startVote = await contract.startVote(
            {
                gasLimit: 300000
            }
        );
        window.alert(startVote);
    
        console.log("Election has been started");
       
    }

    const stopElection = async () => {
        const endVote = await contract.endVote(
            {
                gasLimit: 300000
            }
        );
        window.alert(endVote);
    
        console.log("Election has been stopped");
        
    }

    const handleVote = async(voteID, category) => {
       
        const Vote = await contract.vote(
            voteID, category, {
                gasLimit: 300000,
            }
        );
        window.alert(Vote);
    
        console.log("Vote has been cast");
    }
    

    const addDirector = async() => {

        const addressCollection = collectAddress.current.value;
        
        const addDir = await contract.addBoardOfDirectors(
            addressCollection, {
                gasLimit: 300000,
              }
        );
    
        console.log("Director Added Successfully", addDir);
    }

    const removeDirector = async() => {
        const { ethereum } = window;
        if(ethereum){
            
            const addressCollection = collectAddress.current.value;
        
            const removeDir = await contract.removeBoardOfDirectors(
                addressCollection, {
                    gasLimit: 300000,
                  }
            );
        
            console.log("Director Added Successfully", removeDir);
    }
}


    const addacandidate = async() => {
        const candidateAddress = candidateAddressInput.current.value;
        const candidateName = candidateNameInput.current.value;
        const candidateCategory = candidateCategoryInput.current.value;
        const candidateIpfs = candidateIpfsInput.current.value;

        let id_ = lastCandidateID + 1;
    
        const addCan = await contract.addCandidate(
            candidateCategory, candidateName, candidateAddress, candidateIpfs, {
                gasLimit: 300000,
              }
        );
        window.alert(addCan);
        sendCandidatesData(id_, candidateName, candidateCategory, candidateIpfs);

        setLastCandidateID(id_)
    
        console.log("Candidate Added Successfully");
    }

    const removeTeacher = async() => {

        const addressCollection = collectAddress.current.value;
        
        const removeTeach = await contract.removeTeacher(
            addressCollection, {
                gasLimit: 300000,
              }
        );
    
        console.log("Director Added Successfully", removeTeach);
    }

    const addTeacher = async() => {
        const address = collectAddress.current.value;
        
        const AddTeacher = await contract.addTeacher(
            address, {
                gasLimit: 300000,
              }
        );

    
        console.log("Teacher Added Successfully", AddTeacher);
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

    const removeStudent = async() => {
        const addressCollection = collectAddress.current.value;
        
        const removeStud = await contract.removeStudents(
            addressCollection, {
                gasLimit: 300000,
              }
        );
    
        console.log("Director Added Successfully", removeStud);
    }

    const showCategories = async() => {

        const showCategory = await contract.showCategories();

    }

    const candidateInfoFunction = async() => {

        const candidateInfo = await contract.showCandidatesInfo();


        
    }

    const addCategory = async() => {
        
        const category = categoriesInput.current.value;
        
        const addCategory = await contract.addCategories(
            category, {
                gasLimit: 300000
            }
        );

        // window.alert(addCategory.text);
    
        console.log("Category included Successfully", addCategory);
    }

    const viewResult = async() => {

        const result2 = await contract.viewResults();

        console.log(result2);
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

    const resetStatus = async() => {
        const reset_status = await contract.resetStatus();

        
        
            console.log("Category included Successfully", reset_status);
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

    const makeResultPublic = async() => {

        const result = await contract.publicResults();

        setResultView(true)

        console.log(result)
    }


  
    return (
      <>
      
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
        
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => startElection()}>Start Election</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => stopElection()}>Stop Election</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => addDirector()}>Add Directors</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => addTeacher()}>Add Teachers </button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => EnrollStudent()}>Add Students</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => removeStudent()}>Remove Students</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => removeTeacher()}>Remove Teachers</button>
             

             <br></br>
            <br></br>

            
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => removeDirector()}>Remove Directors</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => resetStatus()}>Reset Status</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => makeResultPublic()}>
                Make Result Public
                </button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => viewResult()}>View Result</button>


            <br></br>
           
            <br></br>

            <p className='lead text-capitalize text-center'>Create Categories</p>
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Input Category</Form.Label>
                        <Form.Control ref={categoriesInput} type="text" placeholder="_Category" />
                    </Form.Group>
                    <Button className="float-sm-end" onClick={addCategory} variant="primary" align="right" size="sm" active>
                      Create Category
                    </Button>
                </Form>

                <br></br>
            </Container>

                <br></br>
          

            <p className='lead text-capitalize text-center'>Enroll Candidate</p>
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate Address</Form.Label>
                        <Form.Control ref={candidateAddressInput} type="text" placeholder="_Address" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control  ref={candidateCategoryInput} type="text" placeholder="_Category"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate Name</Form.Label>
                        <Form.Control  ref={candidateNameInput} type="text" placeholder="_Name"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Ipfs Link</Form.Label>
                        <Form.Control  ref={candidateIpfsInput} type="text" placeholder="_Link"/>
                    </Form.Group>
                
                
                    <Button className="float-sm-end" onClick={() => addacandidate()} variant="primary" align="right" size="sm" active>
                      Add Candidate
                    </Button>
                </Form>

                <br></br>
                <br></br>
                <p>No Of Posts: {post.length}</p>
                <p>Amounts Of Votes: {noOfVotes}</p>
                <p>CandidatesByVotes: {Math.round(noOfVotes/post.length)}</p>
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
        </div> 
      </>
    
    )
}

export default Chairperson;