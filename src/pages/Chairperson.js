import { React, useState } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';
// import readXlsxFile from 'read-excel-file';
import { 
    Table, 
    Modal, 
    Button, 
    Form, 
    Card
} from 'react-bootstrap';


const Chairperson = () => {
    const [show, setShow] = useState(false);
    // const excelRef = useRef();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // page content
    const pageTitle = 'Chairperson'
    const pageDescription = 'Vote start or stop any election and set up an election'

    const startElection = () => {
        console.log("Election has been started");
    }

    const stopElection = () => {
        console.log("Election has been stopped");
    }

    const handleVote = () => {
        console.log("Vote has been cast");
    }

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
            <p className='lead text-capitalize'>Set Up an Election</p>
            <Card>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Election Name [Post to be contested]</Form.Label>
                        <Form.Control type="text" placeholder="Senior Prefect" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Candidate addresses [Excel]</Form.Label>
                        <Form.Control type="file"/>
                    </Form.Group>
                    <Button className="float-sm-end" variant="primary" align="right" size="sm" active>
                        Create Election
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

export default Chairperson;