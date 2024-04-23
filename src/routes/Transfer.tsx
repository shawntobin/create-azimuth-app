import { useState } from "react";
import useWalletStore from "../store/useWalletStore";
import Container from "../components/Container";
import { ecliptic, azimuth, initContractsPartial } from "azimuth-js";
import Web3 from "web3";
import toast from "react-hot-toast";
import { useSyncProviders } from "../hooks/useSyncProviders";
import { PROVIDER_URL } from "../constants";
// import { submitL2Transaction } from "../lib/roller";
import { transferPoint } from "../utils/azimuth";

const Transfer = () => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const { selectedShip, walletAddress } = useWalletStore();
  // const providers = useSyncProviders();

  const { patp, point, layer } = selectedShip;

  console.log("selectedShip", selectedShip);

  const handleTransfer = async () => {
    if (layer === "l1") {
      handleTransferL1();
    } else {
      handleTransferL2();
    }
  };

  const handleTransferL1 = async () => {
    // Layer 1

    const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
    const web3 = new Web3(provider);
    const contracts = await initContractsPartial(web3, azimuth.mainnet);

    const txParams = ecliptic.transferPoint(
      contracts,
      point,
      destinationAddress,
      true
    );

    txParams.from = walletAddress;
    txParams.gasLimit = web3.utils.toHex(150000);
    // txParams.maxPriorityFeePerGas = "0x3b9aca00";
    // txParams.maxFeePerGas = "0x2540be400";

    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [txParams],
      })
      .then((txHash) => {
        // Show transaction hash to user

        toast.success("Transaction sent", {
          icon: "🚀",
        });
      })
      .catch((error) => {
        toast.error("Transaction failed", error);
        console.error("Transaction failed", error);
      });
  };

  const handleTransferL2 = async () => {
    const fromAddress = {
      ship: patp,
      proxy: "own",
    };

    try {
      const res = await transferPoint(
        walletAddress,
        patp,
        fromAddress,
        destinationAddress
      );

      console.log("l2 res", res);

      toast.success("Transfer successful", {
        icon: "🚀",
      });
    } catch (error) {
      toast.error("Transfer failed", error);
      console.error("Transfer failed", error);
    }
  };

  return (
    <Container>
      {/* <div className="text-[40px] mb-7 text-white">Transfer Urbit ID</div> */}
      <div className="relative flex items-center mb-3 w-[500px]">
        <input
          type="text"
          placeholder="0x223c067f8cf28ae173ee5cafea60ca44c335fecb"
          className="pl-4 pr-20 py-2 rounded-full border-2 border-white w-full text-black text-[20px] h-[61px]"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />

        <button
          className="text-black absolute inset-y-0 right-0 flex items-center justify-center bg-light-green rounded-full h-[61px] w-[61px] text-[50px] p-2 pt-0 font-[300]"
          onClick={handleTransfer}
        >
          &gt;
        </button>
      </div>
    </Container>
  );
};

export default Transfer;
