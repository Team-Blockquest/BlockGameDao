const AddVoter = ({ newVoter, setNewVoter, addNewVoter, newVoterStatus }) => {
    const handleNewVoter = (e) => {
        setNewVoter(e.target.value);
    };
    return (
        <div>
            <h4>Bestow voting rights</h4>
            <p>Only the Chairperson and Teachers can bestow voting rights</p>
            <div
                style={{
                    width: '15em',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                <input value={newVoter} onChange={handleNewVoter} />
                <button onClick={addNewVoter}>Give right</button>
            </div>
            {newVoterStatus && <p>Status: {newVoterStatus}</p>}
        </div>
    );
};

export default AddVoter;