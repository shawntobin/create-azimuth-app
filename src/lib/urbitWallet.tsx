import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import { Just, Nothing } from "folktale/maybe";
import { includes, noop } from "lodash";
import { randomHex } from "web3-utils";

import { walletFromMnemonic } from "../lib/wallet";
import {
  DEFAULT_HD_PATH,
  NONCUSTODIAL_WALLETS,
  WALLET_TYPES,
} from "../constants";
import { getAuthToken } from "../lib/authToken";
// import { BRIDGE_ERROR } from "lib/error";

import Web3 from "web3";
import { PROVIDER_URL } from "../constants";
import { publicToAddress } from "../utils/address";

const initialContext = {
  //
  walletType: Nothing(),
  setWalletType: noop,
  //
  walletHdPath: "",
  setWalletHdPath: noop,
  //
  wallet: Nothing(),
  setWallet: noop,
  //
  urbitWallet: Nothing(),
  setUrbitWallet: noop,
  authMnemonic: Nothing(),
  setAuthMnemonic: noop,
  //
  networkSeed: Nothing(),
  setNetworkSeed: noop,
  networkRevision: Nothing(),
  setNetworkRevision: noop,
  //
  resetWallet: noop,
  //
  authToken: Nothing(),
  setAuthToken: noop,
  useLegacyTokenSigning: Nothing(),
  setUseLegacyTokenSigning: noop,
  skipLoginSigning: false,
  setSkipLoginSigning: noop,
  setFakeToken: noop,
};

export const WalletContext = createContext(initialContext);

const DEFAULT_WALLET_TYPE = WALLET_TYPES.TICKET;

function _useWallet(initialWallet = Nothing(), initialMnemonic = Nothing()) {
  const [walletType, _setWalletType] = useState(() =>
    initialMnemonic.matchWith({
      Nothing: () => DEFAULT_WALLET_TYPE,
      Just: () => WALLET_TYPES.MNEMONIC,
    })
  );
  const [walletHdPath, setWalletHdPath] = useState(DEFAULT_HD_PATH);
  const [wallet, _setWallet] = useState(initialWallet);
  const [urbitWallet, _setUrbitWallet] = useState(Nothing());
  const [authMnemonic, setAuthMnemonic] = useState(initialMnemonic);
  const [networkSeed, setNetworkSeed] = useState(Nothing());
  const [networkRevision, setNetworkRevision] = useState(Nothing());
  const [web3, setWeb3] = useState(Nothing());

  const [authToken, setAuthToken] = useState(Nothing());
  // Allow users to skip signing the auth token on login
  const [skipLoginSigning, setSkipLoginSigning] = useState(false);

  const setFakeToken = () => {
    setAuthToken(Just(randomHex(32)));
  };

  const [useLegacyTokenSigning, setUseLegacyTokenSigning] = useState(false);

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
    const web3 = new Web3(provider);
    setWeb3(Just(web3));
  }, []);

  useEffect(() => {
    (async () => {
      if (
        !Just.hasInstance(wallet) ||
        !Just.hasInstance(web3) ||
        NONCUSTODIAL_WALLETS.has(walletType)
      ) {
        return;
      }

      const _wallet = wallet.value;
      const _web3 = web3.value;
      if (skipLoginSigning) {
        setFakeToken();
        return;
      }

      const token = await getAuthToken({
        wallet: _wallet,
        walletType,
        walletHdPath,
        web3: _web3,
        useLegacyTokenSigning,
      });

      setAuthToken(Just(token));
    })();
  }, [
    wallet,
    walletType,
    walletHdPath,
    web3,
    useLegacyTokenSigning,
    setAuthToken,
    skipLoginSigning,
  ]);

  const setWalletType = useCallback(
    (walletType) => {
      if (!includes(WALLET_TYPES, walletType)) {
        // throw new Error(BRIDGE_ERROR.INVALID_WALLET_TYPE);
      }

      _setWalletType(walletType);
    },
    [_setWalletType]
  );

  const setWallet = useCallback(
    (wallet) => {
      // force that public addresses are derived for each wallet
      // NOTE wallet is Maybe<> and .map is Maybe#map
      wallet.map((wal) => {
        wal.address = wal.address || publicToAddress(wal.publicKey);
        return wal;
      });

      _setWallet(wallet);
    },
    [_setWallet]
  );

  const setUrbitWallet = useCallback(
    (urbitWallet) => {
      if (Just.hasInstance(urbitWallet)) {
        // when an urbit wallet is set, also derive
        // a normal bip32 wallet using the ownership address
        const wallet = walletFromMnemonic(
          urbitWallet.value.ownership.seed,
          DEFAULT_HD_PATH,
          urbitWallet.value.meta.passphrase
        );

        setWallet(wallet);
      } else {
        setWallet(Nothing());
      }

      _setUrbitWallet(urbitWallet);
    },
    [setWallet]
  );

  const resetWallet = useCallback(() => {
    _setWalletType(DEFAULT_WALLET_TYPE);
    setWalletHdPath(DEFAULT_HD_PATH);
    _setWallet(Nothing());
    _setUrbitWallet(Nothing());
    setAuthMnemonic(Nothing());
    setNetworkSeed(Nothing());
    setNetworkRevision(Nothing());
    setUseLegacyTokenSigning(false);
  }, [
    _setWalletType,
    setWalletHdPath,
    _setWallet,
    _setUrbitWallet,
    setAuthMnemonic,
    setNetworkSeed,
    setNetworkRevision,
  ]);

  return {
    //
    walletType,
    setWalletType,
    //
    walletHdPath,
    setWalletHdPath,
    //
    wallet,
    setWallet,
    //
    urbitWallet,
    setUrbitWallet,
    authMnemonic,
    setAuthMnemonic,
    //
    networkSeed,
    setNetworkSeed,
    networkRevision,
    setNetworkRevision,
    //
    resetWallet,
    //
    authToken,
    setAuthToken,
    useLegacyTokenSigning,
    setUseLegacyTokenSigning,
    skipLoginSigning,
    setSkipLoginSigning,
    setFakeToken,
  };
}

export function WalletProvider({ initialWallet, initialMnemonic, children }) {
  const wallet = _useWallet(initialWallet, initialMnemonic);

  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
}

// Hook version
export function useWallet() {
  return useContext(WalletContext);
}

// HOC version
export const withWallet = (Component) =>
  forwardRef((props, ref) => (
    <WalletContext.Consumer>
      {(wallet) => <Component ref={ref} {...wallet} {...props} />}
    </WalletContext.Consumer>
  ));
