import React, { useState, useEffect, useRef } from "react";
import {ethers, BigNumber } from "ethers";
import Header from '../components/Header';
import Meta from '../components/Meta';
// import readXlsxFile from 'read-excel-file';
import { 
    Table, 
    Modal, 
    Button, 
    Form, 
    Container
} from 'react-bootstrap';


const Chairperson = ({post, contract, candidates}) => {


  

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [data, setData] = useState([])
    const [can, setCan] = useState([])
    const [showCandidate, setCandidateInfoR] = useState([])
    const [showFetchElectionData, setFetchElectionData] = useState([])
    const [loading, setLoading] = useState(false);
    const [showFiltered, setFiltered] = useState([{}]);

    const postName = useRef();
    const candidateIds = useRef();
    const candidateAddressInput = useRef();
    const candidateNameInput = useRef();
    const candidateCategoryInput = useRef();
    const voteIDInput = useRef();
    const categoryInput = useRef();
    const categoriesInput = useRef();
    const collectAddress = useRef();
    const positionInput = useRef();
    const publicCategory = useRef();


    useEffect(() => {
        post.map((posts) => {
            return (
             setFiltered(posts)
            );
          });
    }, [show]);
    
    // const excelRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // page content
    const pageTitle = 'Chairperson'
    const pageDescription = 'Vote start or stop any election and set up an election'

    

     const candidates2 = candidates.filter(t => t.position === showFiltered);
     console.log(showFiltered);

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

    const handleVote = async() => {
        const voteID = voteIDInput.current.value;
        const category = categoryInput.current.value;
    
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
    
        const addCan = await contract.addCandidate(
            candidateCategory, candidateName, candidateAddress, {
                gasLimit: 300000,
              }
        );
        window.alert(addCan);
    
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

    const SetUpElection = async() => {

         // e.preventDefault();

         const nameOfPost = postName.current.value;
         const candidateIDs = candidateIds.current.value;
         const addList = candidateIDs.split(",");
         console.log(addList);
     
         const setUpElection = await contract.setUpElection(
             nameOfPost, addList, {
                 gasLimit: 300000,
               }
         );
         window.alert(setUpElection.hash);
         console.log("Election setup Successful");
    }

    const showCategories = async() => {

        const showCategory = await contract.showCategories();
            setShow(true);

            console.log(data);
    }

    const candidateInfoFunction = async() => {

        const candidateInfo = await contract.showCandidatesInfo();
        setCandidateInfoR(candidateInfo);

        let candidates = candidates.filter(t => t.post === post).sort((a, b) => {
            return 0;
        });
        
        console.log(candidateInfo);
        console.log(showCandidate);

          console.log(show2);
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

    const clearElection = async() => {
        const reset_status = await contract.clearElection();

        
        
        console.log("Category included Successfully", reset_status);
    }

    const makeResultPublic = async() => {

        const category = publicCategory.current.value;
        
        const reset_status = await contract.makeResultPublic(
            category, {
                gasLimit: 300000
            }
        );

    
    
        console.log("Category included Successfully", reset_status);
    }

    const FetchElection = async() => {
        const fetchElection = await contract.fetchElection( );

        // window.alert(fetchElection.hash);
        setFetchElectionData(fetchElection);
        console.log(showFetchElectionData);

        setCan(candidates);
        
        console.log("Election Info Successful Retrieved", fetchElection);
    }

  
    return (
      <>
      
      <div>
            {/* Voting Modal */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cast your vote!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Select aria-label="Default select example" key="uniqueId1">
                {
                    post.map((posts) => {
                        const candidates2 = candidates.filter(t => t.position === posts);
                        console.log(candidates2)
                        return(
                          
                                {
                                candidates2.map((candidate, index) =>{
                                    
                                   console.log(candidate);
                                    return(   
                                             <option> {candidate.name} </option>   
                                               ); }
                                           )}
                           
                        )
                    })
                }
                         </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleVote}>
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
                          {post.map((posts, index) => {   
                              const candidates2 = candidates.filter(t => t.position === posts);
                              console.log(candidates2)             
                                    return(      
                                        <tr>
                                 <td>{posts}</td>
                                   <td>
                                  <button type="button" className="btn btn-outline-primary me-2" onClick={handleShow}>Vote</button>
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
        
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => startElection}>Start Election</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => stopElection}>Stop Election</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => addDirector}>Add Directors</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => addTeacher}>Add Teachers </button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => EnrollStudent}>Add Students</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => removeStudent}>Remove Students</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => removeTeacher}>Remove Teachers</button>
             

             <br></br>
            <br></br>

            
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => removeDirector}>Remove Directors</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={() => resetStatus}>Reset Status</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => clearElection}>Clear Election</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={() => FetchElection}>Fetch Election</button>


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

            {/* Set up an election */}
            <p className='lead text-capitalize text-center'>Set Up an Election</p>
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Election Name [Post to be contested]</Form.Label>
                        <Form.Control ref={postName} type="text" placeholder="Senior Prefect" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate Id[In Commas]</Form.Label>
                        <Form.Control  ref={candidateIds} type="text" placeholder="1,2,3"/>
                    </Form.Group>
                
                    <Button className="float-sm-end" onClick={SetUpElection} variant="primary" align="right" size="sm" active>
                      Create Election
                    </Button>
                </Form>

                <br></br>
            </Container>

            <p className='lead text-capitalize text-center'>Enroll Candidate</p>
            <div>{loading === true ? "loading....." : ""}</div>
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
                
                
                    <Button className="float-sm-end" onClick={addacandidate} variant="primary" align="right" size="sm" active>
                      Add Candidate
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

            <p className='lead text-capitalize text-center'>Make Vote Public</p>
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Of Vote</Form.Label>
                        <Form.Control ref={publicCategory} type="text" placeholder="_category" />
                    </Form.Group>

                    <Button className="float-sm-end" onClick={makeResultPublic} variant="primary" align="right" size="sm" active>
                      Publish Result
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