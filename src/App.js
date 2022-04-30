import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./layout/Layout";

// pages
import Home from "./pages/Home";
import Chairperson from "./pages/Chairperson";
import Teacher from "./pages/Teacher";
import NotFound from "./pages/NotFound";
import React, { useState, useEffect, useRef } from "react";
import {ethers, BigNumber} from "ethers";
import zuriVotingABI from './zuriVoting.json';

const App = () => {

    const [posts, setPosts] = useState([]);
    const [contract, setContract] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [electionPhase, setElectionPhase] = useState(0);

    const zuriVotingContractAddress = "0x24101A43d371B8ad712E5e325aB03C1ebC1Af6ea"

    
    useEffect(() => {

      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const zuriVotingContract = new ethers.Contract(
          zuriVotingContractAddress,
          zuriVotingABI.abi,
          signer
      );

      setContract(zuriVotingContract);
      console.log(zuriVotingContract)

      getStatus(zuriVotingContract).then(status => {
           setElectionPhase(status)
        })

      handleGetCandidates(zuriVotingContract);

  }, [])

      const handleGetResults = async (contract) => {
        // let p = await contract.methods.getCandidates().call()
        // return p;
        let eventFilter = contract.filters.result()
        let k = await contract.queryFilter(eventFilter)
        let result_ = []
        k.map((ele, id) => {
          let p = {}
          p.ID = ele["args"].Candidate.ID
          p.name = ele["args"].Candidate.name
          p.ipfs = ele["args"].Candidate.ipfs
          p.category = ele["args"].Candidate.category
          p.votesCount = ele["args"].votes
    
          result_.push(p)
          
        })
    
        setCandidates(result_)
        console.log(result_)
    
      }


    const handleGetCandidates = async (contract) => {
        let eventFilter = contract.filters.CandidatesInfo();
        let k = await contract.queryFilter(eventFilter)
        console.log(k)
        let result_ = []
        let res = []
        k.map((ele) => {
          let p = {}
          p.id = ele["args"].ID
          p.name = ele["args"].name
          p.position = ele["args"].position
          p.address = ele["args"].candidateAddress
          p.ipfs = ele["args"].ipfs
    
          if (!res.includes(ele["args"].position)) {
            res.push(ele["args"].position)
          }
    
          result_.push(p)
          
        })
    
        setPosts(res);
    
        setCandidates(result_)
      }

      const getStatus = async() => {
        
        const status = await contract.electionStatus();
        return status;
        
    }

      const updateCandidates = (id, name_, post, ipfs) => {
        const data = {
          ID: id,
          name: name_,
          CID: ipfs,
          position: post
        }
    
        setCandidates([...candidates, data])
      }

      useEffect(() => {
        if(electionPhase === 2){
          handleGetResults(contract)
        }       
      }, [contract, electionPhase])

    return (
        <Layout>
            <Container>
                <Routes>
                    <Route path="/" element={<Home post= {posts} contract = {contract} candidates = {candidates}/>} exact />
                    <Route path="/chairperson" element={ <Chairperson post= {posts} contract = {contract} candidates = {candidates} isResultView = {true} sendCandidatesData= {updateCandidates}/>} />
                    <Route path="/teacher" element={<Teacher  post= {posts} contract = {contract} candidates = {candidates}/>} />
                    <Route element={<NotFound />} />
                </Routes>
            </Container>
        </Layout>
    );
};

export default App;