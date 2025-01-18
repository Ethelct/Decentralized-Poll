// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PollContract {
    struct Poll {
        string question;
        string[] options;
        uint[] votes;
        address creator;
    }

    Poll[] public polls;

    function createPoll(string memory question, string[] memory options) public {
        uint[] memory initialVotes = new uint[](options.length);
        Poll memory newPoll = Poll({
            question: question,
            options: options,
            votes: initialVotes,
            creator: msg.sender
        });
        polls.push(newPoll);
    }

    function vote(uint pollId, uint optionIndex) public {
        require(pollId < polls.length, "Poll does not exist.");
        require(optionIndex < polls[pollId].options.length, "Invalid option.");
        
        polls[pollId].votes[optionIndex]++;
    }

    function getPollsCount() public view returns (uint) {
        return polls.length;
    }

    function getPollDetails(uint pollId) public view returns (string memory, string[] memory, uint[] memory) {
        require(pollId < polls.length, "Poll does not exist.");
        Poll memory poll = polls[pollId];
        return (poll.question, poll.options, poll.votes);
    }
}
