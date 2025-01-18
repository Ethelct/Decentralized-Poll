// Ensure Web3.js is available
if (typeof Web3 !== 'undefined') {
    var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");  // Web3 provider
} else {
    alert("Please install MetaMask to interact with the app.");
}

// Smart contract details (replace with your contract's details)
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractABI = [ /* Your ABI here */ ];

let contract;

// Set up contract interaction
async function initContract() {
    // Initialize contract using web3
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // Check if user is connected
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        alert("Please connect your wallet.");
    }
}

// Handle vote submission
async function vote(choice) {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
        alert("Please connect your wallet.");
        return;
    }

    try {
        // Send transaction to smart contract to record vote
        await contract.methods.vote(choice).send({ from: accounts[0] });

        // Feedback to user
        alert(`Your vote for "${choice}" has been submitted!`);
    } catch (error) {
        console.error("Error submitting vote:", error);
        alert("There was an error while submitting your vote.");
    }
}

// Initialize contract when page loads
window.onload = async () => {
    await initContract();
};

// Function to display results dynamically (example implementation)
async function displayPollResults() {
    const yesVotes = await contract.methods.getVotes('yes').call();
    const noVotes = await contract.methods.getVotes('no').call();

    // Update the results dynamically
    document.getElementById('yes-votes').innerText = `Yes: ${yesVotes}`;
    document.getElementById('no-votes').innerText = `No: ${noVotes}`;
}

// Set interval to refresh results every 5 seconds
setInterval(displayPollResults, 5000);
