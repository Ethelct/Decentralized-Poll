import React, { useState } from 'react';

const PollCard = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = async () => {
    // Logic to vote on a poll
    if (selectedOption !== null) {
      const contract = window.contract;
      await contract.vote(poll.id, selectedOption);
    }
  };

  return (
    <div className="poll-card">
      <h3>{poll.question}</h3>
      {poll.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name={`poll-${poll.id}`}
            value={index}
            onChange={() => setSelectedOption(index)}
          />
          <label>{option}</label>
        </div>
      ))}
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default PollCard;
