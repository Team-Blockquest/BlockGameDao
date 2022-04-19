import React, { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
// import TokenArtifact from '../ABI/zuri_voting.json';
// import contractAddress from '../ABI/contract-address.json';

function App() {
  
  // async function _initialize() {
  //   await _intializeEthers();
  // }
  
  // const _intializeEthers = async () => {
  //   // ethers connection for the smartcontract
  //   const _provider = new ethers.providers.Web3Provider(window.ethereum);

  //     const _token = new ethers.Contract(
  //       contractAddress.Token,
  //       TokenArtifact.abi,
  //       _provider.getSigner(0)
  //     );

  //     console.log(_token)
  //   };
    
  //   // Connects to the smart contract token id (check /contracts/contract-address.json)
  //   async function init() {
  //     const [selectedAddress] = await window.ethereum.enable();
  //     _initialize(selectedAddress);
  //   }

  //   useEffect(() => {
  //     // When the page loads it will initialize the init function
  //     // that we need to connect the frontend with the smartcontract
  //     init();
  //   }, []);
    
    return (
      <div style={{ padding: '3rem 5rem' }}>
        <h1>Voting System</h1>
        <div>
          <h4>Chairperson: </h4>
        </div>
        <div>
          <h4>Candidates</h4>
          {/* {proposals.map((proposal, index) => {
            const name = proposal.name;
            const voteCount = proposal.voteCount._hex;
            return (
              <div key={index} style={{ padding: '1rem 0' }}>
                🗳 {name} - {Number(voteCount)}
                <button
                  style={{ marginLeft: '2em' }}>
                  Vote
                </button>
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }  

export default App;
