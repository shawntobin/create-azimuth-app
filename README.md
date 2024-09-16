# Quick Start

npx create-react-azimuth-app my-app  
cd my-app  
yarn install  
yarn dev:local  
<br>

if using npm instead of yarn, you may need to do "npm install --legacy-peer-deps".

# React + TypeScript + Vite

This is a template for creating web apps using Azimuth login.

It can be launched using mainnet, sepolia, or local testnet.

When using mainnet or sepolia, you'll need to enter your Infura ID in the .env file (VITE_REACT_APP_INFURA_API).

Make sure to switch your Metamask network to whichever one you launch the app with (mainnet, sepolia, local).

Works with L1 points only, no L2.

# Mainnet

use "yarn dev:mainnet"

# Local Testnet

use "yarn dev:local"

This will deploy the contracts and populate the following ethereum address with some azimuth points for you to use and 1000 ETH.

WALLET ADDRESS: 0x6DEfFb0caFDB11D175F123F6891AA64F01c24F7d  
PRIVATE KEY: a44de2416ee6beb2f323fab48b432925c9785808d33a6ca6d7ba00b45e9370c3  
(Obviously, only use this address for testing!!)

This address can then be imported into Metamask using "Add Account or Hardware Wallet" -> "Import Account".

To add the local testnet network to Metamask (if it's not already there) go to Settings -> Networks:

(Note that the testnet should be running in your terminal when you go to add this to Metamask, otherwise it might show an error saying that your RPC URL isn't correct)

Network Name: Local Testnet  
RPC URL: http://127.0.0.1:8545  
Chain ID: 1337  
Currency Symbol: ETH

# Sepolia

use "yarn dev:sepolia"

The Ethereum address listed above in "Local Testnet" also contains some Sepolia Azimuth points. Contact ~sarlev-sarsen or ~rolryx for more.

The contracts are deployed on Sepolia here:

Azimuth: 0x6EB93da65d19a3e4501210C1B289A0734487ed84
Ecliptic: 0xf81109BE13862261234c24659aF412Fe70a683e4
Claims: 0xA769ec2433A95DBaC11d36e1d015e9e982F0067a
Polls: 0x78eC6D601A88489bDe5AbDbFA748aBe9487703ce
