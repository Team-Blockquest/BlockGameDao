// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ZuriVoting{

	struct Voter {
		uint weight;
		bool voted;
		address delegate;
		uint vote;
	}

	struct Candidate {
		uint id;
		string name;
		uint256 category;
		address candidateAddress;
		uint voteCount;
	}

	  struct Election {
        string category;
        uint256[] candidatesID;
		bool VotesCounted;
        bool makePublic;
    }

	mapping(address => Voter) public voters;
	mapping(uint => Candidate) public candidates;
	mapping(string=> Candidate) public categoryWinner;
    mapping(string=> Election) public activeElections;

    mapping(address => bool) public studentAddresses;
    mapping(address => bool) public teacherAddresses;
	mapping(address => bool) public boardOfDirectorsAddresses;

    mapping(uint256=>mapping(address=>bool)) public votedForCategory;
	mapping(uint256=>mapping(uint256=>uint256)) public votesForCategory;

	address public chairperson;

    uint private winningCandidateId;
	uint public candidatesCount;
	uint public votersCount;

	Election[] public election;
	Candidate[] public candidateArray;
    string[] public categories;

    uint256 count = 1;

    mapping(uint256=>bool) public activeCandidate;
    
    mapping(string => uint256) public Category;
    
    mapping(uint256=>bool) public categoryRegistrationStatus;
    

    
     modifier onlyTeachers(){
        require(teacherAddresses[msg.sender] == true, "Not a Teacher");
        _;
    }

	modifier onlyDirectors(){
		require(boardOfDirectorsAddresses[msg.sender] == true, "Not a Director");
		_;
	}

	modifier onlyAccess(){
		require(boardOfDirectorsAddresses[msg.sender] == true || teacherAddresses[msg.sender] == true, "Not a Director");
		_;
	}

	modifier onlyStudent(){
		require(studentAddresses[msg.sender] == true, "Not a Student");
		_;
	}

	modifier inStatus(STATUS _status){
		require(status == _status);
		_;
	}

    enum STATUS{INACTIVE,ACTIVE,ENDED}
    STATUS status=STATUS.INACTIVE;
    
	event Voting(uint _start, uint _end);
	event CandidateCreated(uint candidatesCount);
	event givePermission(address _address);
	event voteFor(address _address, uint _candidateId);
    event AddTeachers(address recipient);
	event AddBoardOfDirectors(address _address);
    event RemoveTeachers(address recipient);
	event RemoveStudents(address recipient);
	event RemoveBoardOfDirectors(address _address);


	constructor() {
		chairperson = msg.sender;
		voters[chairperson].weight = 1;
		votersCount++;

        teacherAddresses[chairperson] = true;
		boardOfDirectorsAddresses[chairperson] = true;
		studentAddresses[chairperson] = true;
	
		status = STATUS.INACTIVE;	
	}

	function addBoardOfDirectors(address _address)
	public
	onlyDirectors
	returns (bool) {
		boardOfDirectorsAddresses[_address] = true;
		emit AddBoardOfDirectors(_address);
		return true;
	}

      function addTeacher(address _address)
	  public
	  onlyDirectors
	  returns (bool) {
        teacherAddresses[_address] = true;
        emit AddTeachers(_address);
        return true;
    }


     function removeTeacher(address addr)
	 public
	 onlyDirectors
	 returns (bool) {
        teacherAddresses[addr] = false;
        emit RemoveTeachers(addr);
        return true;
    }

	function removeBoardOfDirectors(address _address)
	public
	onlyDirectors
	returns (bool) {
		boardOfDirectorsAddresses[_address] = false;
		emit RemoveBoardOfDirectors(_address);
		return true;
	}

	function removeStudents(address _address)
	public
	onlyDirectors
	returns (bool) {
		studentAddresses[_address] = false;
		emit RemoveStudents(_address);
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
   onlyDirectors
   inStatus(STATUS.INACTIVE)
   {
       status=STATUS.ACTIVE;  
   }

   
   function endVote() 
   public 
   onlyDirectors
   inStatus(STATUS.ACTIVE)
   {
       status= STATUS.ENDED;
   }

	function addCandidate (string memory _category, string memory candidateName, address candidateAddress) 
	public 
	onlyDirectors 
	inStatus(STATUS.INACTIVE) 
	returns(bool success) {
		require(studentAddresses[candidateAddress] == true, "Candidate must be student");
		require(teacherAddresses[candidateAddress] == false || 
		boardOfDirectorsAddresses[candidateAddress] == false, 
		"Teacher/Directors cannot be Candidate");
	
        require(activeCandidate[candidatesCount]==false,"Candidate is enrolled for an election");
    
        require(Category[_category] != 0,"Category does not exist...");

		 if(candidatesCount == 0){
            candidatesCount++;
        }
        
        candidates[candidatesCount] = Candidate(candidatesCount, candidateName, Category[_category], candidateAddress, 0);
        
        activeCandidate[candidatesCount] = true;
        candidatesCount ++;
        
        emit CandidateCreated(candidatesCount);
		return true;
	}

	 function addCategories(string memory _category) public returns(string memory ){
        
        /// @notice add to the categories array
        categories.push(_category);
        
        /// @notice add to the Category map
        Category[_category] = count;
        count++;
        return _category;
    }


	  ///@notice show all categories of offices available for election
    function showCategories() 
	public 
	view
	onlyAccess 
	returns(string[] memory){
        return categories;
    }

	function showCandidatesInfo()
	public
	view
	onlyAccess
	returns(Candidate[] memory){
		return candidateArray;
	}

    /// @notice setup election 
    function setUpElection (string memory _category,uint256[] memory _candidateID) 
	public
	onlyDirectors 
	returns(bool){
    
    /// @notice create a new election and add to election queue
    election.push(Election(
        _category,
        _candidateID,
        false,
		false
    ));
    return true;
    }

    ///clear election
    function clearElection() public onlyDirectors{
        delete election;
    }

	function resetStatus()
	public
	onlyDirectors
	inStatus(STATUS.ENDED)
	{
		status = STATUS.ACTIVE;
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

	function vote(uint _candidateId, string memory _category)
	public
	inStatus(STATUS.ACTIVE)
	onlyTeachers
	onlyDirectors
	onlyStudent
	returns(string memory, uint256) {
		require(voters[msg.sender].weight != 0, 'Has no right to vote');
		require(!voters[msg.sender].voted, 'Already voted.');
		require(_candidateId > 0 && _candidateId <= candidatesCount, 'does not exist candidate by given id');

		require(activeCandidate[_candidateId]==true,"Candidate is not registered for this position.");
    
        /// @notice check that a candidate is valid for a vote in a category
        require(candidates[_candidateId].category == Category[_category],"Candidate is not Registered for this Office!");

		/// @notice check that votes are not duplicated
        require(votedForCategory[Category[_category]][msg.sender]== false,"Cannot vote twice for a category..");

		voters[msg.sender].voted = true;
		voters[msg.sender].vote = _candidateId;
		candidates[_candidateId].voteCount += voters[msg.sender].weight; 


		/// @notice ensuring there are no duplicate votes recorded for a candidates category.
        uint256 votes = votesForCategory[_candidateId][Category[_category]]+=1;
        candidates[_candidateId].voteCount = votes;
        votedForCategory[Category[_category]][msg.sender]= true;

		votersCount++;
        emit voteFor(msg.sender, _candidateId);
    
        return (_category, _candidateId);
	} 


	// This function allow both teachers and the chairperson add students as StackHolder
    function EnrollStudent(address student) 
	public 
	onlyTeachers
	onlyDirectors
	inStatus(STATUS.INACTIVE) 
	returns(bool success){
        require(studentAddresses[student] == false, "already a student");
        require(!voters[student].voted,	"The voter already voted.");
		require(voters[student].weight == 0);

		voters[student].weight = 1;

        studentAddresses[student] = true;

		emit givePermission(student);

		return true;
    }

   function getWinningCandidateId(string memory _category) 
   inStatus(STATUS.ENDED)
   onlyDirectors
   public
   view
       returns (uint) {
       return categoryWinner[_category].id;
    }
    
    function getWinningCandidateName(string memory _category) 
       inStatus(STATUS.ENDED)
   	   onlyDirectors
	   public 
	   view
       returns (string memory,Candidate memory) {
       return (categoryWinner[_category].name,categoryWinner[_category]);
    }  
    
    function getWinningCandidateVoteCounts(string memory _category) 
	inStatus(STATUS.ENDED)
    onlyDirectors
	public 
	view
       returns (uint) {
       return categoryWinner[_category].voteCount;
    }   

    function fetchElection()
	public
	view
	onlyAccess
	inStatus(STATUS.ENDED) 
	returns (Election[] memory) {
        return election;
    }

      /// @notice compile votes for an election
    function compileVotes(string memory _position) 
	public
	onlyAccess
	inStatus(STATUS.ENDED) 
	returns (uint total, uint winnigVotes, Candidate[] memory){
        uint winningVoteCount = 0;
        uint totalVotes=0;
        uint256 winnerId;
        uint winningCandidateIndex = 0;
        Candidate[] memory items = new Candidate[](candidatesCount);
        
       
        for (uint i = 0; i < candidatesCount; i++) {
            if (candidates[i + 1].category == Category[_position]) {
                totalVotes += candidates[i + 1].voteCount;        
                if ( candidates[i + 1].voteCount > winningVoteCount) {
                    
                    winningVoteCount = candidates[i + 1].voteCount;
                    uint currentId = candidates[i + 1].id;
                    winnerId= currentId;
                    // winningCandidateIndex = i;
                    Candidate storage currentItem = candidates[currentId];
                    items[winningCandidateIndex] = currentItem;
                    winningCandidateIndex += 1;
                }
            }

        } 
        //update Election status
        activeElections[_position].VotesCounted=true;
        //update winner for the category
        categoryWinner[_position]=candidates[winnerId];
        return (totalVotes, winningVoteCount, items); 
    }

    //
    function viewResults() 
	public 
	onlyAccess
	inStatus(STATUS.ENDED) 
	view 
	returns(Candidate[] memory,string[] memory) {
        //require that  
        uint256 length = categories.length;
        uint256 countA = 0;
        //create a memory array
        Candidate[] memory results = new Candidate[](length);
        string[] memory _category = new string[](length);
        for(uint256 i =0;i<length;i++){
            //call getWinningCategory by Id
            results[countA] = categoryWinner[categories[i]];
            _category[countA] = categories[i];
            countA++;
        }
        return (results,_category);
    } 
        
	  function makeResultPublic(string memory _category)
	  public
	  onlyAccess
	  inStatus(STATUS.ENDED)
	  returns(Candidate memory,string memory) {
        activeElections[_category].makePublic=true;
        return (categoryWinner[_category],_category);
    } 

	function showInfo()
	public
	view
	onlyAccess
	returns(Candidate[] memory){
		return candidateArray;
	}
    
}