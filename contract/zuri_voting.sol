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

	address public chairperson;
	uint public candidatesCount;
	uint public votersCount;
	string public name;

    enum STATUS{INACTIVE,ACTIVE,ENDED}
    STATUS status=STATUS.INACTIVE;
    

	event Voting(uint _start, uint _end);
	event CandidateCreated(uint _id, string _name, address _address);
	event givePermission(address _address);
	event voteFor(address _address, uint _candidateId, address _candidateAddress);
    event AddStakeHolder(address recipient);
    event RemoveStakeHolder(address recipient);

    constructor(address _chairperson, string memory _name) public {
		chairperson = _chairperson;
		voters[chairperson].weight = 1;
		votersCount++;
        teacherAddresses[_chairperson] = true;
		name = _name;
	}

     modifier onlyTeachers(){
        require(teacherAddresses[msg.sender] == true, "Not an admin");
        _;
    }

     function addTeacher(address addr) public onlyOwner returns (bool) {
        teacherAddresses[addr] = true;
        emit AddStakeHolder(addr);
        return true;
    }

     function removeTeacher(address addr) public onlyOwner returns (bool) {
        teacherAddresses[addr] = false;
        emit RemoveStakeHolder(addr);
        return true;
    }

     function electionStatus() public view returns(STATUS){
        return status;
    }

   function startVote() public onlyOwner{
       status=STATUS.ACTIVE;  
       }

   
   function endVote() public onlyOwner{
       require(status==STATUS.ACTIVE,"Election has not yet begun");
       status=STATUS.ENDED;
    }

	function addCandidate (address _candidateA, string memory _name) public onlyOwner returns(bool success) {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, _candidateA, 0);

		emit CandidateCreated(candidatesCount, _name, _candidateA);

		return true;
	}

	function giveRightToVote(address voter) public returns(bool success) {
		require(!voters[voter].voted,	"The voter already voted.");
		require(voters[voter].weight == 0);

		voters[voter].weight = 1;

        studentAddresses[voter] = true;

		emit givePermission(voter);

		return true;
	}

	function delegate(address to) public {
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

	function vote(address _candidateAddress, uint _candidateId) public returns(bool success) {
		require(voters[msg.sender].weight != 0, 'Has no right to vote');
		require(!voters[msg.sender].voted, 'Already voted.');
        require(status==STATUS.ACTIVE,"Election has not yet started/already ended.");
		require(_candidateId > 0 && _candidateId <= candidatesCount, 'does not exist candidate by given id');

		voters[msg.sender].voted = true;
		voters[msg.sender].vote = _candidateId;
		candidates[_candidateId].voteCount += voters[msg.sender].weight; 
		emit voteFor(msg.sender, _candidateId, _candidateAddress);

		return true;
	}

	function winningCandidate() public view onlyTeachers returns (uint winningCandidate_) {
		uint winningVoteCount = 0;
		for (uint i = 1; i <= candidatesCount; i++) {
			if (candidates[i].voteCount > winningVoteCount) {
				winningVoteCount = candidates[i].voteCount;
				winningCandidate_ = i;
			}
		}
	}

	function winnerName() public view onlyTeachers returns (string memory winnerName_) {
		winnerName_ = candidates[winningCandidate()].name;
	}

function getAllCandidates() external view onlyTeachers returns (string[] memory name, uint[] memory votecount) {
    string[] memory names = new string[](candidatesCount);
    uint[] memory voteCounts = new uint[](candidatesCount);
    for (uint i = 0; i < candidatesCount; i++) {
        names[i] = candidates[i].name;
        voteCounts[i] = candidates[i].voteCount;
    }
    return (names, voteCounts);
    }


    function EnrollAsStudent(address student) public onlyTeachers onlyOwner returns(bool success){
        require(studentAddresses[student] == false, "already a stakeHolder");
        require(!voters[student].voted,	"The voter already voted.");
		require(voters[student].weight == 0);

		voters[student].weight = 1;

        studentAddresses[student] = true;

		emit givePermission(student);

		return true;
    }

}