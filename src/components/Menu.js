import { Link } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

const Menu = () => {
        const connectWallet = () => {
            // Check if MetaMask is installed on user's browser
            // if (window.ethereum) {
            //     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            //     const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            //     // Check if user is connected to Mainnet
            //     if (chainId != '0x1') {
            //         alert("Please connect to Mainnet");
            //     } else {
            //         let wallet = accounts[0];
            //         setWalletAddress(wallet);
            //     }
            // } else {
            //     alert("Please install Mask");
            // }
            console.log("Connect to MetaMask");
        }
    return (
        <Container>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <Link
                    to="/"
                    className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
                >
                    Zuri Schools
                </Link>
                <Nav>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link to="/chairperson" className="nav-link px-2 link-secondary">
                               Chairperson
                            </Link>
                        </li>
                    </ul>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <Link to="/teacher" className="nav-link px-2 link-secondary">
                                Teacher
                            </Link>
                        </li>
                    </ul>

                    <div className="col-md-3 text-end justify-content-center">
                        <button type="button" className="btn btn-outline-primary me-2" style={{ width: "10rem"}} onClick={connectWallet}>
                            Connect Wallet
                        </button>
                    </div>
                </Nav>
            </header>
        </Container>
    );
};

export default Menu;