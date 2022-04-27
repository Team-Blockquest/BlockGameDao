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
import zuriVotingContractAddress from './contractAddress';

const App = () => {

    const [posts, setPosts] = useState([]);
    const [contract, setContract] = useState({});
    const [candidates, setCandidates] = useState([]);

    const zuriVotingContractAddress = "0xFdEa669f3d25ff14ee7dC1F39954B9F3E12FB0d6"

      const handleGetResults = async (contract) => {
        // let p = await contract.methods.getCandidates().call()
        // return p;
        let eventFilter = contract.filters.CandidatesInfo()
        let k = await contract.queryFilter(eventFilter)
        let result_ = []
        k.map((ele, id) => {
          let p = {}
          p.ID = ele.returnValues.Candid.ID
          p.name = ele.returnValues.Candid.name
          p.ipfs = ele.returnValues.Candid.ipfs
          p.position = ele.returnValues.Candid.position
          p.votesCount = ele.reurnValues.votes
    
          result_.push(p)
          
        })
    
        setCandidates(result_)
        console.log(result_)
    
      }

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

        handleGetCandidates(zuriVotingContract);

    }, [])

    const handleGetCandidates = async (contract) => {
        let eventFilter = contract.filters.CandidatesInfo()
        let k = await contract.queryFilter(eventFilter, 10)
        let result_ = []
        let res = []
        k.map((ele) => {
          let p = {}
          p.id = ele["args"].ID
          p.name = ele["args"].name
          p.ipfs = ele["args"].ipfs
          p.position = ele["args"].position
          p.address = ele["args"].candidateAddress
    
          if (!res.includes(ele["args"].position)) {
            res.push(ele["args"].position)
          }
    
          result_.push(p)
          
        })
    
        setPosts(res);
    
        setCandidates(result_)
      }

    return (
        <Layout>
            <Container>
                <Routes>
                    <Route path="/" element={<Home post= {posts} contract = {contract} candidates = {candidates}/>} exact />
                    <Route path="/chairperson" element={ <Chairperson post= {posts} contract = {contract} candidates = {candidates}/>} />
                    <Route path="/teacher" element={<Teacher  post= {posts} contract = {contract} candidates = {candidates}/>} />
                    <Route element={<NotFound />} />
                </Routes>
            </Container>
        </Layout>
    );
};

export default App;