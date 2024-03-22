const ENVIRONMENTS = {
  MAINNET: "MAINNET",
  GOERLI: "GOERLI",
  LOCAL: "LOCAL",
} as const;

type ContractAddresses = {
  [key: string]: string;
};

type Environment = keyof typeof ENVIRONMENTS;

let currentEnvironment: Environment;

switch (process.env.REACT_APP_NETWORK) {
  case "mainnet":
    currentEnvironment = ENVIRONMENTS.MAINNET;
    break;
  case "goerli":
    currentEnvironment = ENVIRONMENTS.GOERLI;
    break;
  case "local":
    currentEnvironment = ENVIRONMENTS.LOCAL;
    break;
  default:
    currentEnvironment = ENVIRONMENTS.GOERLI;
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
  [ENVIRONMENTS.GOERLI]: {
    azimuth: "0x75ac673682d6A699a0a7F1E3616535E8865d29Fd",
    ecliptic: "0x78eC6D601A88489bDe5AbDbFA748aBe9487703ce",
    polls: "0x1Af17980878439013a39f9B6715519610B7a9D77",
    claims: "0x6EB93da65d19a3e4501210C1B289A0734487ed84",
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
