// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 import "@openzeppelin/contracts/access/Ownable.sol";

contract ZuriVoting is Ownable{

	struct Voter {
		uint weight;
		bool voted;
		address delegate;
		uint vote;
	}

	struct Candidate {
		uint id;
		string name;
		address candidateAddr;
		uint voteCount;
	}

	mapping(address => Voter) public voters;
	mapping(uint => Candidate) public candidates;

    mapping(address => bool) public studentAddresses;
    mapping(address => bool) public teacherAddresses;

	address public boardOfDirectorsAddresses;

	uint public candidatesCount;
	uint public votersCount;

	string public proposal;
	string public ballotOfficialName;

	string public countResult;

    enum STATUS{INACTIVE,ACTIVE,ENDED}
    STATUS status=STATUS.INACTIVE;
    

	event Voting(uint _start, uint _end);
	event CandidateCreated(uint _id, string _name, address _address);
	event givePermission(address _address);
	event voteFor(address _address, uint _candidateId);
    event AddStakeHolder(address recipient);
    event RemoveStakeHolder(address recipient);

     modifier onlyTeachers(){
        require(teacherAddresses[msg.sender] == true, "Not a Teacher");
        _;
    }

	modifier inStatus(STATUS _status){
		require(status == _status);
		_;
	}

	constructor(string memory _ballotOfficialName, string memory _proposal) {
		boardOfDirectorsAddresses = msg.sender;
		voters[boardOfDirectorsAddresses].weight = 1;
		votersCount++;
        teacherAddresses[msg.sender] = true;
		proposal = _proposal;
		ballotOfficialName = _ballotOfficialName;

		status = STATUS.INACTIVE;	
	}

     function addTeacher(address addr)
	 public
	 onlyOwner
	 returns (bool) {
        teacherAddresses[addr] = true;
        emit AddStakeHolder(addr);
        return true;
    }

     function removeTeacher(address addr)
	 public
	 onlyOwner
	 returns (bool) {
        teacherAddresses[addr] = false;
        emit RemoveStakeHolder(addr);
        return true;
    }

     function electionStatus()
	 public
	 view
	 returns(STATUS){
        return status;
    }

   function startVote() 
   public 
   onlyOwner
   inStatus(STATUS.INACTIVE)
   {
       status=STATUS.ACTIVE;  
    }

   
   function endVote() 
   public 
   onlyOwner
   inStatus(STATUS.ACTIVE)
   {
       status= STATUS.ENDED;
   }

	function addCandidate (address _candidateAddress, string memory _name) 
	public 
	onlyOwner 
	inStatus(STATUS.INACTIVE) 
	returns(bool success) {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, _candidateAddress, 0);

		emit CandidateCreated(candidatesCount, _name, _candidateAddress);

		return true;
	}

	function delegate(address to) 
	public
	inStatus(STATUS.INACTIVE) 
	{
		Voter storage sender = voters[msg.sender];
		require(!sender.voted, "You already voted.");

		require(to != msg.sender, "Self-delegation is disallowed.");

		while (voters[to].delegate != address(0)) {
			to = voters[to].delegate;

			require(to != msg.sender, "Found loop in delegation.");
		}

		sender.voted = true;
		sender.delegate = to;
		Voter storage delegate_ = voters[to];
		if (delegate_.voted) {
			candidates[delegate_.vote].voteCount += sender.weight;
		} else {
			delegate_.weight += sender.weight;
		}
	}

	function vote(uint _candidateId)
	public
	inStatus(STATUS.ACTIVE)
	returns(bool success) {
		require(voters[msg.sender].weight != 0, 'Has no right to vote');
		require(!voters[msg.sender].voted, 'Already voted.');
		require(_candidateId > 0 && _candidateId <= candidatesCount, 'does not exist candidate by given id');

		voters[msg.sender].voted = true;
		voters[msg.sender].vote = _candidateId;
		candidates[_candidateId].voteCount += voters[msg.sender].weight; 

		votersCount++;
		emit voteFor(msg.sender, _candidateId);

		return true;
	}

	function winningCandidate() 
	public
	view 
	onlyTeachers
	inStatus(STATUS.ENDED) 
	returns (uint winningCandidate_) {
		uint winningVoteCount = 0;
		for (uint i = 1; i <= candidatesCount; i++) {
			if (candidates[i].voteCount > winningVoteCount) {
				winningVoteCount = candidates[i].voteCount;
				winningCandidate_ = i;
			}
		}
	}

	function winnerName() 
	public 
	view 
	onlyTeachers
	inStatus(STATUS.ENDED)
	returns (string memory winnerName_) {
		winnerName_ = candidates[winningCandidate()].name;
	}

	//This function gets the list of candidates and their vote counts
	function getAllCandidates() external view onlyTeachers returns (string[] memory candidateName, uint[] memory votecount) {
    string[] memory names = new string[](candidatesCount);
    uint[] memory voteCounts = new uint[](candidatesCount);
	//loop function that checks gets all availiable candidates info.
    for (uint i = 0; i < candidatesCount; i++) {
        names[i] = candidates[i].name;
        voteCounts[i] = candidates[i].voteCount;
    }
    return (names, voteCounts);
    }

	// This function allow both teachers and the chairperson add students as StackHolder
    function EnrollStudent(address student) 
	public 
	onlyTeachers
	inStatus(STATUS.INACTIVE) 
	returns(bool success){
        require(studentAddresses[student] == false, "already a stakeHolder");
        require(!voters[student].voted,	"The voter already voted.");
		require(voters[student].weight == 0);

		voters[student].weight = 1;

        studentAddresses[student] = true;

		emit givePermission(student);

		return true;
    }

	function getVoteCount(uint index)
    public 
	view
	onlyTeachers
	returns(uint)
	{
    return candidates[index].voteCount;
	}

}