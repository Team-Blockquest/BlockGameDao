import React, { useState, useEffect, useRef } from "react";
import {ethers } from "ethers";
import Header from '../components/Header';
import Meta from '../components/Meta';
import ZuriVotingABI from '../util/ZuriVoting.json';
// import readXlsxFile from 'read-excel-file';
import { 
    Table, 
    Modal, 
    Button, 
    Form, 
    Container
} from 'react-bootstrap';


const Chairperson = () => {
    const zuriVotingContractAddress = "0x7589bC30346Ff76e44584aC27C4EfA5166D613F1";
    const zuriVotingABI = ZuriVotingABI.abi;

    const [data, setData] = useState([])
    const [showFetchElectionData, setFetchElectionData] = useState([])

    const postName = useRef();
    const candidateIds = useRef();
    const candidateAddressInput = useRef();
    const candidateNameInput = useRef();
    const candidateCategoryInput = useRef();
    const voteIDInput = useRef();
    const categoryInput = useRef();
    const studentAddr = useRef();
    const categoriesInput = useRef();
    const collectAddress = useRef();
    const positionInput = useRef();
    const publicCategory = useRef();

    useEffect(() => {
        showCategories();
    }, []);
    

    const [show, setShow] = useState(false);
    // const excelRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // page content
    const pageTitle = 'Chairperson'
    const pageDescription = 'Vote start or stop any election and set up an election'

    const startElection = async () => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );
        
            const startVote = await zuriVotingContract.startVote(
                {
                    gasLimit: 300000
                }
            );
            window.alert(startVote);
        
            console.log("Election has been started");
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
       
    }

    const stopElection = async () => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );
        
            const endVote = await zuriVotingContract.endVote(
                {
                    gasLimit: 300000
                }
            );
            window.alert(endVote);
        
            console.log("Election has been stopped");
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
        
    }

    const handleVote = async() => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const voteID = voteIDInput.current.value;
            const category = categoryInput.current.value;
        
            const Vote = await zuriVotingContract.vote(
                voteID, category, {
                    gasLimit: 300000,
                }
            );
            window.alert(Vote);
        
            console.log("Vote has been cast");
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }
    

    const addDirector = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const addressCollection = collectAddress.current.value;
        
            const addDir = await zuriVotingContract.addBoardOfDirectors(
                addressCollection, {
                    gasLimit: 300000,
                  }
            );
        
            console.log("Director Added Successfully", addDir);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const removeDirector = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const addressCollection = collectAddress.current.value;
        
            const removeDir = await zuriVotingContract.removeBoardOfDirectors(
                addressCollection, {
                    gasLimit: 300000,
                  }
            );
        
            console.log("Director Added Successfully", removeDir);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }


    const addacandidate = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const candidateAddress = candidateAddressInput.current.value;
            const candidateName = candidateNameInput.current.value;
            const candidateCategory = candidateCategoryInput.current.value;
        
            const addCan = await zuriVotingContract.addCandidate(
                candidateCategory, candidateName, candidateAddress, {
                    gasLimit: 300000,
                  }
            );
            window.alert(addCan);
        
            console.log("Candidate Added Successfully");
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const removeTeacher = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const addressCollection = collectAddress.current.value;
        
            const removeTeach = await zuriVotingContract.removeTeacher(
                addressCollection, {
                    gasLimit: 300000,
                  }
            );
        
            console.log("Director Added Successfully", removeTeach);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const addTeacher = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const address = collectAddress.current.value;
        
            const AddTeacher = await zuriVotingContract.addTeacher(
                address, {
                    gasLimit: 300000,
                  }
            );

        
            console.log("Teacher Added Successfully", AddTeacher);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const EnrollStudent = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const studentAddress = studentAddr.current.value;
        
            const addStud = await zuriVotingContract.EnrollStudent(
                studentAddress, {
                    gasLimit: 300000,
                  }
            );
        
            console.log("Student Added Successfully", addStud);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const removeStudent = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const addressCollection = collectAddress.current.value;
        
            const removeStud = await zuriVotingContract.removeStudents(
                addressCollection, {
                    gasLimit: 300000,
                  }
            );
        
            console.log("Director Added Successfully", removeStud);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const SetUpElection = async() => {

        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            // e.preventDefault();

            const nameOfPost = postName.current.value;
            const candidateIDs = candidateIds.current.value;
            const addList = candidateIDs.split(",");
            console.log(addList);
        
            const setUpElection = await zuriVotingContract.setUpElection(
                nameOfPost, addList, {
                    gasLimit: 300000,
                  }
            );
            window.alert(setUpElection.hash);
            console.log("Election setup Successful");
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
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

    const addCategory = async() => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const category = categoriesInput.current.value;
        
            const addCategory = await zuriVotingContract.addCategories(
                category, {
                    gasLimit: 300000
                }
            );

            // window.alert(addCategory.text);
        
            console.log("Category included Successfully", addCategory);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const compileVote = async() => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const position = positionInput.current.value;
        
            const Position = await zuriVotingContract.compileVotes(
                position, {
                    gasLimit: 300000
                }
            );

            // window.alert(addCategory.text);
        
            console.log("Category included Successfully", Position);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const resetStatus = async() => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );
        
            const reset_status = await zuriVotingContract.resetStatus();

        
        
            console.log("Category included Successfully", reset_status);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const clearElection = async() => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );
        
            const reset_status = await zuriVotingContract.clearElection();

        
        
            console.log("Category included Successfully", reset_status);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const makeResultPublic = async() => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );

            const category = publicCategory.current.value;
        
            const reset_status = await zuriVotingContract.makeResultPublic(
                category, {
                    gasLimit: 300000
                }
            );

        
        
            console.log("Category included Successfully", reset_status);
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const FetchElection = async() => {
        const { ethereum } = window;
        if(ethereum){
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const zuriVotingContract = new ethers.Contract(
                zuriVotingContractAddress,
                zuriVotingABI,
                signer
            );
        
            const fetchElection = await zuriVotingContract.fetchElection(
                {
                    gasLimit: 300000
                }
            );

            // window.alert(fetchElection.hash);
            setFetchElectionData(fetchElection);
        
            console.log("Election Info Successful Retrieved", fetchElection);
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
                {data.map((item) =>{
                            return(
                            <Form.Select aria-label="Default select example">
                          <option> {item} </option>
                             </Form.Select>
                                
                            );

                        }
                        )}
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
                            <button type="button" className="btn btn-outline-primary me-2"onClick={handleShow}>Vote</button>
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
            
            
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Address of a StakeHolder</Form.Label>
                        <Form.Control ref={collectAddress} type="text" placeholder="Address" />
                    </Form.Group>
                </Form>
            </Container>
        
             <button type="button" className="btn btn-outline-primary me-2" onClick={startElection}>Start Election</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={stopElection}>Stop Election</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={addDirector}>Add Directors</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={addTeacher}>Add Teachers </button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={EnrollStudent}>Add Students</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={removeStudent}>Remove Students</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={removeTeacher}>Remove Teachers</button>
             

             <br></br>
            <br></br>

            
            <button type="button" className="btn btn-outline-primary me-2" onClick={removeDirector}>Remove Directors</button>
             <button type="button" className="btn btn-outline-primary me-2" onClick={resetStatus}>Reset Status</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={clearElection}>Clear Election</button>
            <button type="button" className="btn btn-outline-primary me-2" onClick={FetchElection}>Fetch Election</button>


            <br></br>
            <br></br>

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
    )
}

export default Chairperson;