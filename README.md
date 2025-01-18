# Decentralized Polling DApp

A decentralized application that allows users to vote in polls using Ethereum blockchain. The votes are stored on-chain, ensuring transparency and security.

## Features
- Decentralized voting on the Ethereum blockchain
- Secure, immutable, and transparent results
- Simple and responsive front-end interface

## Tech Stack
- **Ethereum** for blockchain interactions
- **Solidity** for smart contract development
- **Web3.js** for interacting with Ethereum from the front-end
- **HTML/CSS/JavaScript** for the front-end

## File Structure
/decentralized-poll-app
│
├── /contracts/             # Smart contract files
│   └── pollcontract.sol    # Polling contract
├── /src/                   # App source code
│   ├── app.js              # Interacts with the smart contract
│   ├── index.html          # Main HTML file
│   ├── pollcard.js         # Renders individual poll cards
│   ├── styles.css          # App styling
│   └── index.js            # Initializes the app
└── package.json            # Dependencies

## Setup
1. Clone the repo: `git clone https://github.com/yourusername/decentralized-poll-app.git`
2. Install dependencies: `npm install` (optional for local dev)
3. Deploy the `pollcontract.sol` smart contract on Ethereum
4. Connect MetaMask to your Ethereum network
5. Open `index.html` in your browser

## How It Works
- Users can view and vote on polls
- All votes are stored securely on the Ethereum blockchain
- Results are displayed in real-time

## Why Decentralized Polling?
- Immutable and transparent
- Tamper-proof voting results
- Accessible to all users

## License
MIT License
