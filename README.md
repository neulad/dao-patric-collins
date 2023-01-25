<!-- ABOUT THE PROJECT -->
## About The Project
*This project was created for fun for learning purposes, never use it on production, it's raw and not tested at all!*

This is an implementation from the Patric Collins' (video)[https://www.youtube.com/watch?v=AhJtmUqhAqg&t=4160s] on DAOs. I used OpenZeppelin as
a template for creating TimeLocker, Erc20Votes and Governor.

<!-- GETTING STARTED -->
## Getting Started

Just grab everything to the console!

### Prerequisites

I hope you've installed node.js already)
* npm
  ```sh
  npm install npm@latest -g
  ```
* hardhat-shorthand
  ```sh
  npm i -g hardhat-shorthand
  ```

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:neulad/dao-patric-collins.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
3. Add .env file with the following variables
   ```sh
   GOERLI_RPC_URL=CHANGE_ME
   PRIVATE_KEY=CHANGE_ME
   COINMARKETCAP_URL=CHANGE_ME
   ETHERSCAN_KEY=CHANGE_ME
   ```
4. Set up the node
   ```sh
   hh node
   ```
5. Run deployment
   ```
   hh deploy --network localhost
   ```
6. Run scripts
   ```
   hh run ./scripts/propose.ts --network localhost
   hh run ./scripts/vote.ts --network localhost
   hh run ./scripts/queue-and-execute.ts --network localhost
   ```

<!-- USAGE EXAMPLES -->
## Usage
Congrats!!!!
Ypu just voted to increase the value of the contract to 100! What a major improvement!
