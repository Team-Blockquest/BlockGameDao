import Header from '../components/Header'
import Meta from '../components/Meta'
import { Table } from 'react-bootstrap';

const Home = () => {
    // page content
    const pageTitle = 'Home'
    const pageDescription = 'Elections'

    //Action functions
    const vote = () => {
        console.log("Your vote has been cast");
    }

    return (
        <div>
            <Meta title={pageTitle} />
            <Header head={pageTitle} description={pageDescription} />
            {/* Voting table */}

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Candidate ID</th>
                        <th>Position</th>
                        <th>Candidate Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Senior Prefect (Girl)</td>
                        <td>Mark Cuban</td>
                        <td><button onClick={vote}>Vote</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Senior Prefect (Boy)</td>
                        <td>Elon Musk</td>
                        <td><button onClick={vote}>Vote</button></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Assembly Prefect</td>
                        <td>Jeff Bezos</td>
                        <td><button onClick={vote}>Vote</button></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Home;