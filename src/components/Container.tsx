import React from "react";
import UrbitSymbols from "./UrbitSymbols";
import { PowerIcon, ClockIcon } from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";
import * as ob from "urbit-ob";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";
import toast from "react-hot-toast";
import Breadcrumbs from "./Breadcrumbs.tsx";
import { formatAddress } from "../utils/address.ts";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  symbols?: boolean;
  dropdown?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  symbols = true,
  dropdown = false,
  ...rest
}) => {
  const navigate = useNavigate();
  const { urbitIds, setSelectedShip, selectedShip, walletAddress, clearState } =
    useWalletStore();

  const handleLogOut = () => {
    navigate("/");
    clearState();
  };

  const handleSelect = async (patp) => {
    const loadingToastId = toast.loading("Loading");

    try {
      const ship = await txn.getShip(patp.value);
      setSelectedShip(ship);
      toast.dismiss(loadingToastId);
    } catch (error) {
      toast.error("Failed to load ship", {
        id: loadingToastId,
      });
    }
  };

  const renderLoggedInItems = () => {
    return (
      <div className="flex">
        <div
          className="px-4 text-[20px] font-[400] flex justify-center items-center border border-primary-color hover:bg-primary-color hover:text-base-color px-2 py-0 rounded-full cursor-pointer"
          onClick={handleLogOut}
        >
          <PowerIcon className="h-5 w-5" />
          <span className="ml-2 text-dark-gray">
            {formatAddress(walletAddress)}
          </span>
        </div>
        <button
          onClick={() => navigate("/history")}
          className="bg-transparent p-0 ml-3 rounded-full flex items-center justify-center hover:bg-primary-color hover:text-base-color"
        >
          <ClockIcon className="h-7 w-7" />
        </button>
      </div>
    );
  };

  return (
    <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center m-8 font-bold">
        {/* <div className="hover:bg-primary-color hover:text-base-color rounded-full">
          <QuestionMarkCircleIcon className="h-7 w-7 hover:bg-primary-color hover:text-base-color rounded-full" />
        </div> */}
        User Beta Version
        <div className="text-center justify-center items-center flex text-[20px]">
          <Breadcrumbs walletAddress={walletAddress} />
          {dropdown && (
            <>
              <div className="mr-2">{"/"}</div>
              <Dropdown
                onSelect={handleSelect}
                items={urbitIds.map((id) => ({
                  label: ob.patp(id),
                  value: ob.patp(id),
                }))} // to be changed
                focusedItem={selectedShip.patp}
              />
            </>
          )}
        </div>
        {walletAddress ? renderLoggedInItems() : <div> </div>}
      </div>

      <div className={`flex flex-col h-full ${className}`} {...rest}>
        <div className="flex-grow flex flex-col items-center justify-center">
          {children}
        </div>
        {symbols && (
          <div className="p-8">
            <UrbitSymbols />
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
