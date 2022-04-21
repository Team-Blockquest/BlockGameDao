import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Nav, Container } from "react-bootstrap";
import Web3Modal from "web3modal";
import Web3 from "web3";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

   
const Menu = () => {


  const [show, setShow] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("");

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "c42bd204d32641289769eb8a9a4c1607", // required
      },
    },
  };

  const web3ModalRef = useRef();
  let provider;
  let web3Modal;

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object

    web3Modal = new Web3Modal({
      network: "rinkeby", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });

    provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);
    // Get list of accounts of the connected wallet
    const web3 = new Web3(provider);
    // Get list of accounts of the connected wallet
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);

    // If user is not connected to the Mainnet network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      console.log(signer);
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Get the provider from web3Modal, which in our case is MetaMask
        // When used for the first time, it prompts the user to connect their wallet
        await getProviderOrSigner();
        setWalletConnected(true);

        // Subscribe to accounts change
        provider.on("accountsChanged", async (accounts) => {
          console.log("acc", accounts);
          await getProviderOrSigner();
        });

        // Subscribe to chainId change
        provider.on("chainChanged", async (chainId) => {
          console.log("chain", chainId);
          await getProviderOrSigner();
        });

        // Subscribe to provider connection
        provider.on("connect", (info) => {
          console.log("inf", info);
        });

        // Subscribe to provider disconnection
        provider.on("disconnect", (error) => {
          console.log("dis", error);
          setAddress("");
          setWalletConnected(false);
        });
      } else {
        alert("Please install Metamask");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = async () => {
    setAddress("");
  };

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      if (!walletConnected) {
        // Assign the Web3Modal class to the reference object by setting it's `current` value
        // The `current` value is persisted throughout as long as this page is open
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {},
          disableInjectedProvider: false,
        });
        connectWallet();
      }
    }
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  }, [walletConnected]);

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
                    {walletConnected && address.length > 0 ? (
            <button
              onClick={disconnectWallet}
              className="button-2 w-button bg-success"
            >
              {address.slice(0, 5) + "....." + address.slice(-5, -1)}
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="button-2 w-button bg-success"
            >
              Connect Wallet
            </button>
          )}
                    </div>
                </Nav>
            </header>
        </Container>
    );
};

export default Menu;