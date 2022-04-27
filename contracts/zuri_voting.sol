// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ZuriVoting{

	// struct to keep record of voters
	struct StakeHolders {
		uint weight;
		bool voted;
		uint vote;
	}

	// struct to keep record of candidates eligable to be voted for.
	struct Candidate {
		uint id;
		string name;
		uint256 category;
		address candidateAddress;
		uint voteCount;
		string ipfs;
	}

	// struct ro keep record of the different position 
	  struct Election {
        string category;
        uint256[] candidatesID;
		bool VotesCounted;
        bool makePublic;
    }

	 /// @notice The addresses with access to voting
  	 mapping(address => bool) private Access;


	// mapping for list of voters addresses
	mapping(address => StakeHolders) public stakeHolders;
	
	//mapping  for array list of candidates
	mapping(uint => Candidate) public candidates;

	//mapping  to track the winner in a category
	mapping(string=> Candidate) public categoryWinner;

	//mapping  to track active elections in election
    mapping(string=> Election) public activeElections;

	// mappping to track category voted 
    mapping(uint256=>mapping(address=>bool)) public votedInCategory;

	// mapping to track vote for a particaular category
	mapping(uint256=>mapping(uint256=>uint256)) public categoryVotes;

	// mapping to track active candidates
	mapping(uint256=>bool) public activeCandidate;
    
	// mapping to covert category from string to uint
    mapping(string => uint256) public Category;

	// mapping for list of directors
    mapping(address => bool) public directorAddress;

    // mapping for list of teachers
    mapping(address => bool) public teacherAddress;
    
    // mapping for list of student
    mapping(address => bool) public studentAddress;

	// tracks the address of the owner
	address public chairperson;

	// tracks the id of winner
    uint private winningCandidateId;

	// track the number of candidates
	uint public candidatesCount;

	// tracks the number of voters
	uint public votersCount;

	// election
	Election[] public election;

	// election array
	Election[] public activeElectionArrays;

	// candidate array
	Candidate[] public candidateArray;

	//array for categories
    string[] public categories;

	//  Tracking Category
    uint256 count = 1;

	  modifier onlyAccess {
         require(Access[msg.sender] == true, "You are not a director");
         _;
    }

	 // modifier to give access to only Teachers
     modifier onlyTeachers(){
        require(teacherAddress[msg.sender] == true, "Not a Teacher");
        _;
    }

	 // modifier to give access to only Teachers
     modifier onlyStudents(){
        require(studentAddress[msg.sender] == true, "Not a Student");
        _;
    }

	// modifier to track the status of each state
	modifier inStatus(STATUS _status){
		require(status == _status);
		_;
	}

	//enum to state the required status
    enum STATUS{INACTIVE,ACTIVE,ENDED}
    STATUS status=STATUS.INACTIVE;
    
	// emit only when a candidate is created 
	event CandidateCreated(uint candidatesCount);
	// emit only after a successful enrollment of student
	event StudentEnrolled(address _address);
	// emit only after vote have been recorded
	event voted(address _address, uint _candidateId);
	// emit only when a teacher has been added
    event AddTeachers(address recipient);
	// emit only when a director has been added
	event AddBoardOfDirectors(address _address);
	// emit only when a teacher has been removed
    event RemoveTeachers(address recipient);
	// emit only when a student has been removed
	event RemoveStudents(address recipient);
	// emit only when a director has been removed
	event RemoveBoardOfDirectors(address _address);



	constructor() {
		Access[msg.sender] = true;
		chairperson = msg.sender;
		stakeHolders[chairperson].weight = 1;
		votersCount++;
	
		status = STATUS.INACTIVE;	
	}

	// function to add a Director
	function addBoardOfDirectors(address _address)
	public
	onlyAccess
	returns (bool) {
		directorAddress[_address] = true;
		emit AddBoardOfDirectors(_address);
		return true;
	}

	  // function to add a Teacher
      function addTeacher(address _address)
	  public
	  onlyAccess
	  returns (bool) {
        teacherAddress[_address] = true;
        emit AddTeachers(_address);
        return true;
    }

	// function to remove a Teacher
     function removeTeacher(address addr)
	 public
	 onlyAccess
	 returns (bool) {
        teacherAddress[addr] = false;
        emit RemoveTeachers(addr);
        return true;
    }

	// function to remove a Director
	function removeBoardOfDirectors(address _address)
	public
	onlyAccess
	returns (bool) {
		directorAddress[_address] = false;
		emit RemoveBoardOfDirectors(_address);
		return true;
	}

	// This function allow both teachers and the directors add students 
    function EnrollStudent(address _student) 
	public 
	onlyAccess
	onlyTeachers
	inStatus(STATUS.INACTIVE) 
	returns(bool success){
        require(studentAddress[_student] == false, "already a student");
        require(!stakeHolders[_student].voted,	"The voter already voted.");
		require(stakeHolders[_student].weight == 0);

		stakeHolders[_student].weight = 1;

        studentAddress[_student] = true;

		emit StudentEnrolled(_student);

		return true;
    }

	// function to remove a Student(only directors)
	function removeStudents(address _address)
	public
	onlyAccess
	onlyTeachers
	returns (bool) {
		studentAddress[_address] = false;
		emit RemoveStudents(_address);
		return true;
	}

	// function to check the status of the election 
     function electionStatus()
	 public
	 view
	 returns(STATUS){
        return status;
    }

   // function to trigger the vote to start(only directors can access)
   function startVote() 
   public 
   onlyAccess
   inStatus(STATUS.INACTIVE)
   {
       status=STATUS.ACTIVE;  
   }

   // function to trigger the vote to end(only directors can access)
   function endVote() 
   public 
   onlyAccess
   inStatus(STATUS.ACTIVE)
   {
       status= STATUS.ENDED;
   }

    // function to add candidate eligible to vote(only directors can access)
    function addCandidate (string memory _category, string memory candidateName, address candidateAddress, string memory link) 
    public 
	onlyAccess 
	onlyTeachers
	inStatus(STATUS.INACTIVE) 
	returns(bool success) {
		require(studentAddress[candidateAddress] == true, "Candidate must be student");
		require(teacherAddress[candidateAddress] == false || 
		directorAddress[candidateAddress] == false, 
		"Teacher/Directors cannot be Candidate");
	
        require(activeCandidate[candidatesCount]==false,"Candidate is enrolled for an election");
    
        require(Category[_category] != 0,"Category does not exist...");

		 if(candidatesCount == 0){
            candidatesCount++;
        }
        
        candidates[candidatesCount] = Candidate(candidatesCount, candidateName, Category[_category], candidateAddress, 0, link);
        
        activeCandidate[candidatesCount] = true;
        candidatesCount ++;
        
        emit CandidateCreated(candidatesCount);
		return true;
	}
	
	// function to add cateogry to be contested for(only directors can access)
	 function addCategories(string memory _category)
	 public
	 onlyAccess
	 returns(string memory ){
        
        /// @notice add to the categories array
        categories.push(_category);
        
        /// @notice add to the Category map
        Category[_category] = count;
        count++;	
        return _category;
    }


	  // function to show all categories of positions available for election
    function showCategories() 
	public 
	view
	onlyAccess 
	returns(string[] memory){
        return categories;
    }

	 // function to display all candidate info
	function showCandidatesInfo()
	public
	view
	onlyAccess
	returns(Candidate[] memory){
		return candidateArray;
	}

    // function to setup election 
    function setUpElection (string memory _category,uint256[] memory _candidateID) 
	public
	onlyAccess 
	returns(bool){
    // create a new election and add to election queue
    election.push(Election(
        _category,
        _candidateID,
        false,
		false
    ));

    return true;
    }

	// function to reset the status of election
	function resetStatus()
	public
	onlyAccess
	inStatus(STATUS.ENDED)
	{
		status = STATUS.INACTIVE;
	}

	// function to vote for a candidate in each category
	function vote(uint _candidateId, string memory _category)
	public
	inStatus(STATUS.ACTIVE)
	returns(string memory, uint256) {
		require(stakeHolders[msg.sender].weight != 0, 'Has no right to vote');
		require(!stakeHolders[msg.sender].voted, 'Already voted.');
		require(_candidateId > 0 && _candidateId <= candidatesCount, 'does not exist candidate by given id');

		require(activeCandidate[_candidateId]==true,"Candidate is not registered for this position.");
    
        // check that a candidate is valid for a vote in a category
        require(candidates[_candidateId].category == Category[_category],"Candidate is not Registered for this Office!");

		// check that votes are not duplicated
        require(votedInCategory[Category[_category]][msg.sender]== false,"Cannot vote twice for a category..");

		stakeHolders[msg.sender].voted = true;
		stakeHolders[msg.sender].vote = _candidateId;
		candidates[_candidateId].voteCount += stakeHolders[msg.sender].weight; 


		// avoid duplicate vote in a category.
        uint256 votes = categoryVotes[_candidateId][Category[_category]]+=1;
        candidates[_candidateId].voteCount = votes;
        votedInCategory[Category[_category]][msg.sender]= true;

		votersCount++;
        emit voted(msg.sender, _candidateId);
    
        return (_category, _candidateId);
	} 

	//function to get the wininng candidateId in each category
   function getWinningCandidateId(string memory _category) 
   inStatus(STATUS.ENDED)
   onlyAccess
   public
   view
       returns (uint) {
       return categoryWinner[_category].id;
    }
    

	//function to compile the result of vote per category
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

    // function to view the result of election
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
      
	  // function to make result public
	  function makeResultPublic(string memory _category)
	  public
	  onlyAccess
	  inStatus(STATUS.ENDED)
	  returns(Candidate memory,string memory) {
        activeElections[_category].makePublic=true;
        return (categoryWinner[_category],_category);
    } 

	// function to fetch election 
    function fetchElection()
	public
	view
	onlyAccess
	returns (Election[] memory) {
        return election;
    }

	// function to show candidate info
	function showInfo()
	public
	view
	onlyAccess
	returns(Candidate[] memory){
		return candidateArray;
	}
    
}