// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ZuriVoting is Pausable {
    // struct to keep record of candidates eligable to be voted for.
    struct Candidate {
        uint256 id;
        string name;
        uint256 category;
        address candidateAddress;
        uint256 voteCount;
        string candidateManifesto;
        string ipfs;
    }

    constructor(bytes32 merkleRoot) {
        chairman = msg.sender;
        Active = false;
        candidatesCount = 0;
        root = merkleRoot;
        publicState = false;
        Ended = false;
        Created = false;
    }

    // address of chairman
    address public chairman;

    // name of the position candidates are voting for
    string public position;

    // description of position voting for
    string public description;

    // root of the MerkleTree
    bytes32 public root;

    // count of candidates
    uint256 public candidatesCount;

    // mapping of address for teachers
    mapping(address => bool) public teachers;

    // list of stakeholders that have vote
    mapping(address => bool) public voted;

    // list of candidates
    mapping(uint256 => Candidate) public candidates;

    // variable to track winning candidate
    uint256[] public winnerIds;

    // count of vote of winning id
    uint256 public winnerVoteCount;

    // boolean to track status of election
    bool public Active;

    // boolean to track status of election
    bool public Ended;

    // boolean to track if election has been created
    bool public Created;

    // boolean to keep track of whether result should be public or not
    bool internal publicState;

    // modifier to specify that election has not ended
    modifier electionIsStillOn() {
        require(!Ended, "Sorry, the Election has ended!");
        _;
    }
    // modifier to check that election is active
    modifier electionIsActive() {
        require(Active, "Please check back, the election has not started!");
        _;
    }

    // modifier to specify only the chairman can call the function
    modifier onlyChairman() {
        require(msg.sender == chairman, "only chairman can call this function");
        _;
    }

    // modifier to ensure only specified candidate ID are voted for
    modifier onlyValidCandidate(uint256 _candidateId) {
        require(
            _candidateId < candidatesCount && _candidateId >= 0,
            "Invalid candidate to Vote!"
        );
        _;
    }

    // event to emit when the contract is unpaused
    event ElectionEnded(uint256[] _winnerIds, uint256 _winnerVoteCount);
    // event to emit when candidate has been created
    event CandidateCreated(uint256 _candidateId, string _candidateName);
    // event to emit when a candidate us voted for
    event VoteForCandidate(uint256 _candidateId, uint256 _candidateVoteCount);

    // error message to be caught when conditions aren't met
    error ElectionNotStarted();
    error ElectionHasEnded();

    // This function add candidate to election
    function addCandidate(
        string memory _name,
        string memory _candidateHash,
        string memory _candidateManifesto
    ) public whenNotPaused {
        require(!Active, "Election is Ongoing");
        require(
            chairman == msg.sender || teachers[msg.sender] == true,
            "only teachers/chairman can call this function"
        );
        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            candidateHash: _candidateHash,
            candidateManifesto: _candidateManifesto,
            voteCount: 0
        });
        emit CandidateCreated(candidatesCount, _name);
        candidatesCount++;
    }

    // verify stakeholders
    function isValid(bytes32[] memory proof, bytes32 leaf)
        public
        view
        returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }

    // This function start election
    function startElection() public whenNotPaused onlyChairman {
        Active = true;
    }

    //This function to end election
    function endElection() public whenNotPaused onlyChairman {
        Ended = true;
        _calcElectionWinner();
        emit ElectionEnded(winnerIds, winnerVoteCount);
    }

    // This function that allows users vote
    function _vote(uint256 _candidateId, address _voter)
        internal
        whenNotPaused
        onlyValidCandidate(_candidateId)
    {
        require(!voted[_voter], "Voter has already Voted!");
        voted[_voter] = true;
        candidates[_candidateId].voteCount++;

        emit VoteForCandidate(_candidateId, candidates[_candidateId].voteCount);
    }

    // This function that calculates the election winner
    function _calcElectionWinner()
        internal
        whenNotPaused
        returns (uint256, uint256[] memory)
    {
        for (uint256 i; i < candidatesCount; i++) {
            if (candidates[i].voteCount > winnerVoteCount) {
                winnerVoteCount = candidates[i].voteCount;
                delete winnerIds;
                winnerIds.push(candidates[i].id);
            } else if (candidates[i].voteCount == winnerVoteCount) {
                winnerIds.push(candidates[i].id);
            }
        }

        return (winnerVoteCount, winnerIds);
    }

    // This function to add teachers to mapping
    function addTeacher(address _newTeacher) public whenNotPaused {
        require(
            chairman == msg.sender || teachers[msg.sender] == true,
            "only teachers/chairman can call this function"
        );
        teachers[_newTeacher] = true;
    }

    // This function to add teachers to mapping
    function removeTeacher(address _teacher) public whenNotPaused {
        require(
            chairman == msg.sender || teachers[msg.sender] == true,
            "only teachers/chairman can call this function"
        );
        teachers[_teacher] = false;
    }

    // This function change chairman
    function changeChairman(address _newChairman)
        public
        whenNotPaused
        onlyChairman
    {
        chairman = _newChairman;
    }

    // This function close the election
    function closeElection() public onlyChairman {
        Created = false;
        chairman = msg.sender;
        Active = false;
        Ended = false;
        Created = false;
        candidatesCount = 0;
        publicState = false;
        delete winnerIds;
        winnerVoteCount = 0;
    }

    // This function makes result public
    function makeResultPublic() public {
        require(Ended, "Sorry, the Election has not ended");
        require(
            chairman == msg.sender || teachers[msg.sender] == true,
            "only teachers/chairman can make results public"
        );
        publicState = true;
    }

    // This function shows the winner of the election
    function getWinner() public view returns (uint256, uint256[] memory) {
        require(publicState, "The Results must be made public");
        return (winnerVoteCount, winnerIds);
    }

    //This function to check if addr is chairman
    function isChairman() public view returns (bool) {
        return chairman == msg.sender;
    }

    //This function to check if election has been started
    function isTeacher() public view returns (bool) {
        return teachers[msg.sender];
    }

    // Check If election has been created
    function isCreated() public view returns (bool) {
        return Created;
    }

    // This function to check if election has been started
    function isStarted() public view returns (bool) {
        return Active;
    }

    // This function to check if election has been ended
    function isEnded() public view returns (bool) {
        return Ended;
    }

    // This function get candidate ids
    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory id = new Candidate[](candidatesCount);
        for (uint256 i = 0; i < candidatesCount; i++) {
            Candidate storage candidate = candidates[i];
            id[i] = candidate;
        }
        return id;
    }

    // This function allows stakeholders vote in an election
    function vote(uint256 _candidateId, bytes32[] calldata hexProof)
        public
        electionIsStillOn
        electionIsActive
    {
        require(
            isValid(hexProof, keccak256(abi.encodePacked(msg.sender))),
            "sorry, only stakeholders are eligible to vote"
        );

        _vote(_candidateId, msg.sender);
    }

    // This function start an election
    function setUpElection(string[] memory _prop) public whenNotPaused {
        require(!Active, "Election is Ongoing");
        require(_prop.length > 0, "atleast one person should contest");
        require(
            chairman == msg.sender || teachers[msg.sender] == true,
            "only teachers/chairman can call this function"
        );

        position = _prop[0];
        description = _prop[1];
        Created = true;
    }
}
