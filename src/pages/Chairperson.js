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
    const zuriVotingContractAddress = "0x5fDA4c31d6535d65254Ccd752d7e21CbCEeE6097";
    const zuriVotingABI = ZuriVotingABI.abi;

    const tokenRef1 = useRef();
    const tokenRef2 = useRef();

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
        
            const startVote = await zuriVotingContract.startVote();
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
        
            const endVote = await zuriVotingContract.endVote();
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
        
            const Vote = await zuriVotingContract.vote(
                1
            );
            window.alert(Vote);
        
            console.log("Vote has been cast");
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

            const candidateAddress = tokenRef1.current.value;
            const candidateName = tokenRef2.current.value;
        
            const addCan = await zuriVotingContract.addCandidate(
                candidateAddress, candidateName, {
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

            // const address = teacherAddr.current.value;
        
            const addCan = await zuriVotingContract.addTeacher(
                // address, {
                //     gasLimit: 300000,
                //   }
            );
            window.alert(addCan);
        
            console.log("Teacher Added Successfully");
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

            // const studentAddress = studentAddr.current.value;
        
            const addStud = await zuriVotingContract.EnrollStudent(
                // studentAddress, {
                //     gasLimit: 300000,
                //   }
            );
            window.alert(addStud);
        
            console.log("Student Added Successfully");
        }else{
            window.alert("An error occured, unable to start vote");
            console.log("Ethereum object doesn't exist!");
        }
    }

    const checkAdmin = async () => {
        try {
          const { ethereum } = window;
          if(ethereum){
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const zuriVotingContract = new ethers.Contract(
                  zuriVotingContractAddress,
                  zuriVotingABI,
                  signer
              );
    
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
    
            const check = await zuriVotingContract.adminAddresses(accounts[0]);
    
            if (check === false) {
              window.alert("You are not an admin");
              window.location.href = "/";
            }
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
        }
      };

    // Excel file upload
    // const uploadExcel = async (evt) => {
    //     evt.preventDefault();
    //     let addrList = [];
    //     readXlsxFile(excelRef.current.files[0])
    //     .then(async (rows) => {
    //         console.log(rows);
    //         rows.map((item, index) => {
    //             if (index > 0) {
    //                 addrList.push(item[1]);
    //             } else{
    //                 console.log("Upload failed");
    //             }
    //         });
    //     )};


        //     try {
        //         const { ethereum } = window;

        //         if (ethereum) {
        //             //setLoading3(true);
        //             const provider = new ethers.providers.Web3Provider(ethereum);
        //             const signer = provider.getSigner();
        //             const paymentContract = new ethers.Contract(
        //                 paymentContractAddress,
        //                 paymentcontractABI,
        //                 signer
        //             );

        //             const tokenAmount = tokenRef2.current.value;

        //             const BuyTxn = await paymentContract.sendToMultiple(
        //                 addrList,
        //                 ethers.utils.parseEther(tokenAmount),
        //                 {
        //                     gasLimit: 300000,
        //                 }
        //             );

        //             console.log("Mining...", BuyTxn.hash);
        //             setMessage2("Transaction in progress", BuyTxn.hash);
        //         } else {
        //             console.log("Ethereum object doesn't exist!");
        //         }
        //     } catch (error) {
        //         //setLoading3(false);
        //         setShow2(false);
        //         tokenRef2.current.value = "";
        //         window.alert("An error occurred, unable to send token");
        //         console.log(error);
        //     }
        //     // `rows` is an array of rows
        //     // each row being an array of cells.
        // });
    // };
    return (
        <div>
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
                            <button type="button" className="btn btn-outline-primary me-2" onClick={startElection}>Start Election</button>
                            <button type="button" className="btn btn-outline-primary me-2" onClick={stopElection}>Stop Election</button>
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

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* Set up an election */}
            <p className='lead text-capitalize text-center'>Set Up an Election</p>
            <Container style={{ width: '30rem' }}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidates Info</Form.Label>
                        <Form.Control ref={tokenRef1} type="text" placeholder="CandidateAddress" />
                        <Form.Control ref={tokenRef2} type="text" placeholder="CandidateName" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate addresses [Excel]</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
<<<<<<< HEAD
                    <Button className="float-sm-end" onClick={addacandidate} variant="primary" align="right" size="sm" active>
                        Add Candidate
=======
                    <Button className="float-sm-end" variant="primary" size="sm" active>
                        Create Election
>>>>>>> b862acb2d0a7e5cd57b2c9082c0d491dade003e4
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Chairperson;