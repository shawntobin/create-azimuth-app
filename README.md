# React + TypeScript + Vite

This is a template for creating web apps using Azimuth login.

It can be launched using mainnet, sepolia, or a local testnet.

Make sure to switch your Metamask to whichever network you launch the app with.

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

(Note that the testnet should be running in your terminal when you go to add this to metamask, otherwise Metamask might show an error saying that your RPC URL isn't correct)

Network Name: Local Testnet
RPC URL: http://127.0.0.1:8545
Chain ID: 1337
Currency Symbol: ETH

# Sepolia

use "yarn dev:sepolia"

The Ethereum address listed above in "Local Testnet" also contains some Sepolia Azimuth points. Contact ~rolryx for more.
