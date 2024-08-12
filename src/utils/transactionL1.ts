import { ecliptic, azimuth, initContractsPartial } from "azimuth-js";
import Web3, { Bytes } from "web3";
import { LOGIN_METHODS, PROVIDER_URL } from "../constants";
import { CONTRACT } from "../constants/contracts";
import * as ob from "urbit-ob";
import { isGalaxy, hexify } from "./helper";
import {
  FeeMarketEIP1559Transaction as EIP1559Transaction,
  TxOptions,
  FeeMarketEIP1559TxData,
  LegacyTransaction,
} from "@ethereumjs/tx";
import { bytesToHex } from "@ethereumjs/util";
import { Common, Chain, Hardfork } from "@ethereumjs/common";
import { WALLET_TYPES } from "../constants";
import { TransactionConfig, TransactionReceipt } from "web3-core";
import { toHex, toWei } from "web3-utils";

// Using patp instead of point number for parameters since that's what L2 uses, then convert using ob.patp2dec

const azimuthConnection = async () => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const contracts = await initContractsPartial(web3, CONTRACT.azimuth);
  return contracts;
};

// Read txns
export const getPoints = async (walletAddress: string) => {
  const contracts = await azimuthConnection();
  const points = await azimuth.getOwnedPoints(contracts, walletAddress);
  return points;
};

export const getSpawned = async (patp: string) => {
  const id = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const children = await azimuth.getSpawned(contracts, id);
  return children;
};

export const getSpawnCount = async (patp: string) => {
  const id = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const children = await azimuth.getSpawnCount(contracts, id);
  return children;
};

export const getPoint = async (patp: string) => {
  const id = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const point = await azimuth.getPoint(contracts, id);
  return point;
};

export const getShip = async (patp: string) => {
  const _ship = await getPoint(patp);
  const point = ob.patp2dec(patp);

  const ship = {
    patp: patp,
    point: point,
    layer: "l1",
    owner: _ship.owner,
    keyRevisionNumber: Number(_ship.keyRevisionNumber),
    hasSponsor: !isGalaxy(patp),
    sponsor: !isGalaxy(patp) ? Number(_ship.sponsor) : null,
    spawnProxy: _ship.spawnProxy,
    managementProxy: _ship.managementProxy,
    transferProxy: _ship.transferProxy,
    votingProxy: _ship.votingProxy,
    escapeRequested: _ship?.escapeRequested,
    escapeRequestedTo: _ship?.escapeRequestedTo.toString(),
  };

  return ship;
};

// Write txns

const waitForTransactionReceipt = (txHash: string, web3: Web3) => {
  console.log("txHash", txHash);
  return new Promise((resolve, reject) => {
    const checkReceipt = async () => {
      try {
        let receipt = null;

        // Attempt to get the receipt via MetaMask
        try {
          receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [txHash],
          });
        } catch (metaMaskError) {
          // console.error("MetaMask request failed:", metaMaskError);
        }

        // If MetaMask fails or receipt is not found, fall back to web3.js
        if (!receipt) {
          try {
            receipt = await web3.eth.getTransactionReceipt(txHash);
          } catch (web3Error) {
            // console.error("web3 request failed:", web3Error);
          }
        }

        if (receipt) {
          console.log("receipt", receipt);
          resolve(receipt);
        } else {
          setTimeout(checkReceipt, 1000);
        }
      } catch (error) {
        reject(error);
      }
    };
    checkReceipt();
  });
};

const sendWalletTransaction = async (
  txn,
  txParams,
  walletType,
  wallet,
  web3,
  onTransactionComplete
) => {
  // METAMASK
  if (walletType === LOGIN_METHODS.BLOCKNATIVE) {
    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txn],
      });

      waitForTransactionReceipt(txHash, web3)
        .then(onTransactionComplete)
        .catch((error) => {
          console.error("Transaction receipt error:", error);
        });

      return txHash;
    } catch (error) {
      if (error.code === 4001) {
        throw new Error("You cancelled the transaction.");
      } else {
        throw new Error(error.message || "Transaction failed");
      }
    }
  } else {
    // MASTER TICKET

    const common = new Common({
      chain: Chain.Sepolia,
      // hardfork: Hardfork.
    });

    const txConfig: TxOptions = {
      freeze: false, // needed?
      common: common,
    };

    const signedTx = EIP1559Transaction.fromTxData(txParams, txConfig);
    // wallet.ownership.keys.private!

    try {
      const stx = signedTx.sign(
        Buffer.from(wallet?.ownership.keys.private, "hex")
      );

      const rawTx: string = hexify(Buffer.from(stx.serialize())); // Convert Uint8Array to Buffer

      // Send the signed transaction
      const txHash = await web3.eth.sendSignedTransaction(rawTx);

      console.log("txHash", txHash);

      // Trigger the receipt check in the background and call the callback
      waitForTransactionReceipt(txHash.transactionHash.toString(), web3)
        .then(onTransactionComplete)
        .catch((error) => {
          console.error("Transaction receipt error:", error);
        });

      return txHash;
    } catch (error) {
      if (error.code === 4001) {
        throw new Error("You cancelled the transaction.");
      } else {
        throw new Error(error.message || "Transaction failed");
      }
    }
  }
};

export const changeManagementProxy = async (
  walletType: symbol,
  patp: string,
  from: string,
  managerAddress: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const point = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const txn = ecliptic.setManagementProxy(contracts, point, managerAddress);
  const { suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas } = gasSelection;
  const nonce = await web3.eth.getTransactionCount(from); //"pending"?
  const maxFeePerGas = "50000";
  const maxPriorityFeePerGas = 1;
  const gasLimit = 150000;
  txn.from = from;

  // is FeeMarketEIP1559TxData also used in metamask txns?
  const txParams: FeeMarketEIP1559TxData = {
    data: txn.data,
    gasLimit: toHex(gasLimit),
    maxFeePerGas: toHex(maxFeePerGas),
    maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
    nonce: toHex(nonce),
    to: toHex(txn.to), // required?
    // value: 0,
    chainId: "0xaa36a7",
    // accessList: [], // required?
    type: "0x02",
  };

  return sendWalletTransaction(
    txn,
    txParams,
    walletType,
    wallet,
    web3,
    onTransactionComplete
  );
};

export const requestNewSponsor = async (
  walletType: symbol,
  patp: string,
  from: string,
  newSponsorPatp: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const point = ob.patp2dec(patp);
  const newSponsorPoint = ob.patp2dec(newSponsorPatp);

  const contracts = await azimuthConnection();
  const txn = ecliptic.escape(contracts, point, newSponsorPoint);
  const { suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas } = gasSelection;
  const nonce = await web3.eth.getTransactionCount(from); //"pending"?
  const maxFeePerGas = "50000";
  const maxPriorityFeePerGas = 1;
  const gasLimit = 150000;
  txn.from = from;

  // is FeeMarketEIP1559TxData also used in metamask txns?
  const txParams: FeeMarketEIP1559TxData = {
    data: txn.data,
    gasLimit: toHex(gasLimit),
    maxFeePerGas: toHex(maxFeePerGas),
    maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
    nonce: toHex(nonce),
    to: toHex(txn.to), // required?
    // value: 0,
    chainId: "0xaa36a7",
    // accessList: [], // required?
    type: "0x02",
  };

  return sendWalletTransaction(
    txn,
    txParams,
    walletType,
    wallet,
    web3,
    onTransactionComplete
  );
};

export const transferPoint = async (
  walletType: symbol,
  patp: string,
  from: string,
  to: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const point = ob.patp2dec(patp);

  const contracts = await azimuthConnection();
  const txn = ecliptic.transferPoint(contracts, point, to, true);

  console.log("txn", txn);
  const { suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas } = gasSelection;
  const nonce = await web3.eth.getTransactionCount(from); //"pending"?
  const maxFeePerGas = "50000";
  const maxPriorityFeePerGas = 1;
  const gasLimit = 350000;
  txn.from = from;

  // is FeeMarketEIP1559TxData also used in metamask txns?
  const txParams: FeeMarketEIP1559TxData = {
    data: txn.data,
    gasLimit: toHex(gasLimit),
    maxFeePerGas: toHex(maxFeePerGas),
    maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
    nonce: toHex(nonce),
    to: toHex(txn.to), // required?
    // value: 0,
    chainId: "0xaa36a7",
    // accessList: [], // required?
    type: "0x02",
  };

  return sendWalletTransaction(
    txn,
    txParams,
    walletType,
    wallet,
    web3,
    onTransactionComplete
  );
};

export const spawnPoint = async (
  walletType: symbol,
  patp: string,
  from: string,
  targetAddress: string,
  wallet: UrbitWallet,
  // gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const point = ob.patp2dec(patp);

  const contracts = await azimuthConnection();
  const txn = ecliptic.spawn(contracts, point, from);

  console.log("txn", txn);
  // const { suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas } = gasSelection;
  const nonce = await web3.eth.getTransactionCount(from); //"pending"?
  const maxFeePerGas = "50000";
  const maxPriorityFeePerGas = 1;
  const gasLimit = 350000;
  txn.from = from;

  // is FeeMarketEIP1559TxData also used in metamask txns?
  const txParams: FeeMarketEIP1559TxData = {
    data: txn.data,
    gasLimit: toHex(gasLimit),
    maxFeePerGas: toHex(maxFeePerGas),
    maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
    nonce: toHex(nonce),
    to: toHex(txn.to), // required?
    // value: 0,
    chainId: "0xaa36a7",
    // accessList: [], // required?
    type: "0x02",
  };

  return sendWalletTransaction(
    txn,
    txParams,
    walletType,
    wallet,
    web3,
    onTransactionComplete
  );
};

export const changeSpawnProxy = async (
  walletType: symbol,
  patp: string,
  from: string,
  spawnProxyAddress: string,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const point = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const txn = ecliptic.setSpawnProxy(contracts, point, spawnProxyAddress);
  const { suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas } = gasSelection;
  const nonce = await web3.eth.getTransactionCount(from); //"pending"?
  const maxFeePerGas = "50000";
  const maxPriorityFeePerGas = 1;
  const gasLimit = 150000;
  txn.from = from;

  // is FeeMarketEIP1559TxData also used in metamask txns?
  const txParams: FeeMarketEIP1559TxData = {
    data: txn.data,
    gasLimit: toHex(gasLimit),
    maxFeePerGas: toHex(maxFeePerGas),
    maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
    nonce: toHex(nonce),
    to: toHex(txn.to), // required?
    // value: 0,
    chainId: "0xaa36a7",
    // accessList: [], // required?
    type: "0x02",
  };

  return sendWalletTransaction(
    txn,
    txParams,
    walletType,
    wallet,
    web3,
    onTransactionComplete
  );
};

export const configureNetworkKeys = async (
  walletType: symbol,
  patp: string,
  from: string,
  encryptionKey: string,
  authenticationKey: string,
  cryptoSuiteVersion: number,
  discontinuous: boolean,
  wallet: UrbitWallet,
  gasSelection: any,
  onTransactionComplete: (receipt: any) => void
) => {
  const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
  const web3 = new Web3(provider);
  const point = ob.patp2dec(patp);
  const contracts = await azimuthConnection();
  const txn = ecliptic.configureKeys(
    contracts,
    point,
    encryptionKey,
    authenticationKey,
    cryptoSuiteVersion,
    discontinuous
  );
  const { suggestedMaxPriorityFeePerGas, suggestedMaxFeePerGas } = gasSelection;
  const nonce = await web3.eth.getTransactionCount(from); //"pending"?
  const maxFeePerGas = "50000";
  const maxPriorityFeePerGas = 1;
  const gasLimit = 150000;
  txn.from = from;

  // is FeeMarketEIP1559TxData also used in metamask txns?
  const txParams: FeeMarketEIP1559TxData = {
    data: txn.data,
    gasLimit: toHex(gasLimit),
    maxFeePerGas: toHex(maxFeePerGas),
    maxPriorityFeePerGas: toHex(maxPriorityFeePerGas),
    nonce: toHex(nonce),
    to: toHex(txn.to), // required?
    // value: 0,
    chainId: "0xaa36a7",
    // accessList: [], // required?
    type: "0x02",
  };

  return sendWalletTransaction(
    txn,
    txParams,
    walletType,
    wallet,
    web3,
    onTransactionComplete
  );
};
