const isDevelopment = import.meta.env.NODE_ENV === "development";

const CHECK_BLOCK_EVERY_MS = isDevelopment ? 1000 : 10000;

const MIN_GALAXY = 0;
const MAX_GALAXY = 255;
const MIN_STAR = 256;
const MAX_STAR = 65535;
const MIN_PLANET = 65536;
const MAX_PLANET = 4294967297;

const ZOD = MIN_GALAXY;

const PLANET_ENTROPY_BITS = 64;
const STAR_ENTROPY_BITS = 128;
const GALAXY_ENTROPY_BITS = 384;

const SEED_ENTROPY_BITS = 128;

const GAS_LIMITS = {
  SPAWN: 250000,
  TRANSFER: 560000,
  CONFIGURE_KEYS: 100000,
  SET_PROXY: 150000,
  ESCAPE: 115000,
  ADOPT: 100000,
  CANCEL_ESCAPE: 200000,
  REJECT: 200000,
  DETACH: 200000,
  GIFT_PLANET: 450000,
  TRANSFER_LOCKUP: 700000,
  SEND_ETH: 21000,
  DEFAULT: 550000,
};

const ETHEREUM_NETWORK = {
  MAINNET: "mainnet",
  SEPOLIA: "sepolia",
  LOCAL: "local",
} as const;

const WALLET_TYPES = {
  MNEMONIC: Symbol("MNEMONIC"),
  TICKET: Symbol("TICKET"),
  SHARDS: Symbol("SHARDS"),
  LEDGER: Symbol("LEDGER"),
  TREZOR: Symbol("TREZOR"),
  PRIVATE_KEY: Symbol("PRIVATE_KEY"),
  KEYSTORE: Symbol("KEYSTORE"),
  METAMASK: Symbol("METAMASK"),
  WALLET_CONNECT: Symbol("WALLET_CONNECT"),
};

const NONCUSTODIAL_WALLETS = new Set([
  WALLET_TYPES.METAMASK,
  WALLET_TYPES.TREZOR,
  WALLET_TYPES.LEDGER,
  WALLET_TYPES.WALLET_CONNECT,
]);

const DEFAULT_HD_PATH = "m/44'/60'/0'/0/0";
const ETH_ZERO_ADDR = "0x0000000000000000000000000000000000000000";
const ETH_ZERO_ADDR_SHORT = "0x0";

const INVITES_PER_PAGE = 7;
const DEFAULT_NUM_INVITES = 5;
const DEFAULT_CSV_NAME = "urbit_invites.csv";

const DUMMY_L2_ADDRESS = "0x1111111111111111111111111111111111111111";

const ONE_SECOND = 1000;
const TWO_SECONDS = 2 * ONE_SECOND;
const TEN_SECONDS = 10 * ONE_SECOND;
const ONE_MINUTE = 60 * ONE_SECOND;

// the initial network key revision is always 1
const INITIAL_NETWORK_KEY_REVISION = 1;

const EIP1559_TRANSACTION_TYPE = 2;

// Chain IDs
// https://chainlist.org/?testnets=true
const ETHEREUM_MAINNET_CHAIN_ID = "0x1";
const ETHEREUM_LOCAL_CHAIN_ID = "0x539";

export {
  CHECK_BLOCK_EVERY_MS,
  DEFAULT_HD_PATH,
  EIP1559_TRANSACTION_TYPE,
  ETH_ZERO_ADDR,
  ETH_ZERO_ADDR_SHORT,
  GAS_LIMITS,
  MIN_GALAXY,
  MAX_GALAXY,
  MIN_STAR,
  MAX_STAR,
  MIN_PLANET,
  MAX_PLANET,
  PLANET_ENTROPY_BITS,
  STAR_ENTROPY_BITS,
  GALAXY_ENTROPY_BITS,
  SEED_ENTROPY_BITS,
  ZOD,
  INVITES_PER_PAGE,
  DEFAULT_NUM_INVITES,
  DEFAULT_CSV_NAME,
  DUMMY_L2_ADDRESS,
  ONE_SECOND,
  TWO_SECONDS,
  TEN_SECONDS,
  ONE_MINUTE,
  INITIAL_NETWORK_KEY_REVISION,
  ETHEREUM_MAINNET_CHAIN_ID,
  ETHEREUM_LOCAL_CHAIN_ID,
  ETHEREUM_NETWORK,
  NONCUSTODIAL_WALLETS,
  WALLET_TYPES,
};
