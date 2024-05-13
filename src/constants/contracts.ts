import { NETWORK } from "./config";

const ENVIRONMENTS = {
  MAINNET: "MAINNET",
  SEPOLIA: "SEPOLIA",
  LOCAL: "LOCAL",
} as const;

type ContractAddresses = {
  [key: string]: string;
};

type Environment = keyof typeof ENVIRONMENTS;

let currentEnvironment: Environment;

switch (NETWORK) {
  case "mainnet":
    currentEnvironment = ENVIRONMENTS.MAINNET;
    break;
  case "sepolia":
    currentEnvironment = ENVIRONMENTS.SEPOLIA;
    break;
  case "local":
    currentEnvironment = ENVIRONMENTS.LOCAL;
    break;
  default:
    currentEnvironment = ENVIRONMENTS.SEPOLIA;
}

const CONTRACT_ADDRESSES: { [env: string]: ContractAddresses } = {
  [ENVIRONMENTS.MAINNET]: {
    azimuth: "0x223c067f8cf28ae173ee5cafea60ca44c335fecb",
    ecliptic: "0x33EeCbf908478C10614626A9D304bfe18B78DD73",
    polls: "0x0",
    claims: "0x0",
    linearStarRelease: "0x86cd9cd0992f04231751e3761de45cecea5d1801",
    conditionalStarRelease: "0x8c241098c3d3498fe1261421633fd57986d74aea",
    urbit_L2: "0x1111111111111111111111111111111111111111",
  },
  [ENVIRONMENTS.SEPOLIA]: {
    azimuth: "0x6EB93da65d19a3e4501210C1B289A0734487ed84",
    ecliptic: "0xf81109BE13862261234c24659aF412Fe70a683e4",
    polls: "0x78eC6D601A88489bDe5AbDbFA748aBe9487703ce",
    claims: "0xA769ec2433A95DBaC11d36e1d015e9e982F0067a",
    linearStarRelease: "0x0",
    conditionalStarRelease: "0x0",
    urbit_L2: "0x0",
  },
  [ENVIRONMENTS.LOCAL]: {
    azimuth: "0x0",
    ecliptic: "0x0",
    polls: "0x0",
    claims: "0x0",
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
