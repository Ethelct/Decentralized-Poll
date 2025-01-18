import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PollCard from './components/PollCard';
import './App.css';

// You can load the contract ABI here
import PollContractABI from './contracts/PollContract.json';

function App() {
  const [polls, setPolls] = useState([]);
  const [account, setAccount] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState('');
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function init() {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Please install MetaMask');
        return;
      }

      const provider = new ethers.providers.Web3Provider(ethereum);
      setProvider(provider);

      const network = await provider.getNetwork();
      const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; // replace with your contract address
      const contract = new ethers.Contract(contractAddress, PollContractABI, provider);
      setContract(contract);

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      const pollCount = await contract.getPollsCount();
      const pollsData = [];
      for (let i = 0; i < pollCount; i++) {
        const poll = await contract.getPollDetails(i);
        pollsData.push(poll);
      }
      setPolls(pollsData);
    }
    init();
  }, []);

  const handleCreatePoll = async () => {
    const optionsArray = pollOptions.split(',');
    await contract.createPoll(pollQuestion, optionsArray);
  };

  return (
    <div className="App">
      <h1>Decentralized Polls</h1>
      <div>
        <input
          type="text"
          placeholder="Poll Question"
          value={pollQuestion}
          onChange={(e) => setPollQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Poll Options (comma separated)"
          value={pollOptions}
          onChange={(e) => setPollOptions(e.target.value)}
        />
        <button onClick={handleCreatePoll}>Create Poll</button>
      </div>
      <div>
        {polls.map((poll, index) => (
          <PollCard key={index} poll={poll} />
        ))}
      </div>
    </div>
  );
}

export default App;
