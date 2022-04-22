const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


describe("ZuriVoting", () => {
  let voting;
  before(async () => {
    const ZuriVoting = await ethers.getContractFactory("ZuriVoting");
    voting = await ZuriVoting.deploy();
    
  })

  //ADD CANDIDATE
  describe("addCandidate", () => {
    it("Add candidate for election", async () => {
      await voting.deployed();
      //candidate  added
      await voting.addCandidate("Harry")
      assert(true);
    })

    it("can't add one candidate multiple times", async () => {
      await voting.deployed();
      
      
      try {
        await voting.addCandidate("");
        assert(false)
      } catch (error) {
        assert(error)
      }
    })
  })

  //CAST VOTE
  describe("vote", function () {
    it("cannot vote when voting is disabled", async function () {
      await voting.deployed();
      try {
      //disable voting
      //try voting
        await voting.disableVoting();
        await voting.vote(0)
        assert(false);
      } catch (error) {
        assert(error)
      }
    });
  
    it("increment candidates vote by 1", async function () {

      await voting.deployed();

      //enable voting
      await voting.enableVoting();
      await voting.vote(0);
      
      assert(true)
    });
  
    it("Voters can only vote once", async function () {
      await voting.deployed();
      try {

        await voting.vote(0);
        assert(false);
      } catch (error) {
        assert(error)
      }
  
    
    });
  
    it("Voters can vote for only one candidate", async function () {
      
      await voting.deployed();
      try {
        //adding another candidate
        //try voting for new candidate
        await voting.addCandidate("test")
        await voting.vote(1);
        assert(false);
      } catch (error) {
        assert(error)
      }
    });
  

  
  });


  //GET ALL CANDIDATES
  describe("EnrollStudent", function () {

    it("Should return names and ids of candidates", async function () {

      await voting.deployed();

      //get the candidates
      const candidate = await voting.EnrollStudent();
  
  
      expect(await candidate[0][0]).to.equal("atanda");
    });
  });


  //GETS ALL RESULT
  describe("compileVotes", function () {
    it("Should return names and votecounts", async function () {
      await voting.deployed();
  
      //add more candidates

      await voting.addCandidate("demo")

      const result = await voting.compileResult();
  
      //test for the values
      expect(await result[0][0]).to.equal("Harry");
      expect(await result[1][0].toNumber()).to.equal(1);
      expect(await result[0][1]).to.equal("test");
      expect(await result[1][1].toNumber()).to.equal(0);
      expect(await result[0][2]).to.equal("demo");
      expect(await result[1][2].toNumber()).to.equal(0);
    });
  });
})