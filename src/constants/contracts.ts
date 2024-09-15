import { NETWORK } from "./config";
import { ETHEREUM_NETWORK } from "./constants";

// For local deploy

import AzimuthArtifact from "../../build/contracts/Azimuth.json";
import EclipticArtifact from "../../build/contracts/Ecliptic.json";
import PollsArtifact from "../../build/contracts/Polls.json";
import ClaimsArtifact from "../../build/contracts/Claims.json";

import Web3 from "web3";

type ContractAddresses = {
  [key: string]: string;
};

const web3 = new Web3(window.ethereum);
const networkId = await web3.eth.net.getId();

let azimuthAddress = "";
let eclipticAddress = "";
let pollsAddress = "";
let claimsAddress = "";

if (Number(networkId) === 5) {
  azimuthAddress = AzimuthArtifact?.networks[Number(networkId)]?.address;
  eclipticAddress = EclipticArtifact?.networks[Number(networkId)]?.address;
  pollsAddress = PollsArtifact?.networks[Number(networkId)]?.address;
  claimsAddress = ClaimsArtifact?.networks[Number(networkId)]?.address;
}

let currentEnvironment;

switch (NETWORK) {
  case "mainnet":
    currentEnvironment = ETHEREUM_NETWORK.MAINNET;
    break;
  case "sepolia":
    currentEnvironment = ETHEREUM_NETWORK.SEPOLIA;
    break;
  case "local":
    currentEnvironment = ETHEREUM_NETWORK.LOCAL;
    break;
  default:
    currentEnvironment = ETHEREUM_NETWORK.SEPOLIA;
}

const CONTRACT_ADDRESSES: { [env: string]: ContractAddresses } = {
  [ETHEREUM_NETWORK.MAINNET]: {
    azimuth: "0x223c067f8cf28ae173ee5cafea60ca44c335fecb",
    ecliptic: "0x33EeCbf908478C10614626A9D304bfe18B78DD73",
    polls: "0x0",
    claims: "0x0",
    linearStarRelease: "0x86cd9cd0992f04231751e3761de45cecea5d1801",
    conditionalStarRelease: "0x8c241098c3d3498fe1261421633fd57986d74aea",
    urbit_L2: "0x1111111111111111111111111111111111111111",
  },
  [ETHEREUM_NETWORK.SEPOLIA]: {
    azimuth: "0x6EB93da65d19a3e4501210C1B289A0734487ed84",
    ecliptic: "0xf81109BE13862261234c24659aF412Fe70a683e4",
    polls: "0x78eC6D601A88489bDe5AbDbFA748aBe9487703ce",
    claims: "0xA769ec2433A95DBaC11d36e1d015e9e982F0067a",
    linearStarRelease: "0x0",
    conditionalStarRelease: "0x0",
    urbit_L2: "0x0",
  },
  [ETHEREUM_NETWORK.LOCAL]: {
    azimuth: azimuthAddress,
    ecliptic: eclipticAddress,
    polls: pollsAddress,
    claims: claimsAddress,
    linearStarRelease: "0x0",
    conditionalStarRelease: "0x0",
    urbit_L2: "0x0",
  },
};

const CONTRACT: ContractAddresses = new Proxy(
  {},
  {
    get: (target, name: string) => CONTRACT_ADDRESSES[currentEnvironment][name],
  }
);

export { CONTRACT };
