import React from "react";
import { BellIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import UrbitSymbols from "./UrbitSymbols";
import BackButton from "./BackButton";
import { ChevronDownIcon, PowerIcon } from "@heroicons/react/24/outline";
import Dropdown from "./Dropdown";
import * as ob from "urbit-ob";
import { useNavigate, useMatches } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";
import toast from "react-hot-toast";
import Breadcrumbs from "./Breadcrumbs.tsx";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  headerText?: string; // to be changed to automatically get the header text from the route?
  symbols?: boolean;
  dropdown?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  headerText = "",
  symbols = true,
  dropdown = false,
  ...rest
}) => {
  const navigate = useNavigate();
  const { urbitIds, setSelectedShip, selectedShip, walletAddress } =
    useWalletStore();

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

  return (
    <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center m-8 font-bold">
        <div className="hover:bg-primary-color hover:text-base-color p-2 rounded-full">
          <QuestionMarkCircleIcon className="h-6 w-6" />
        </div>
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
        <div className="flex">
          <div
            className="border border-primary-color hover:bg-primary-color hover:text-base-color px-2 py-0 rounded-full cursor-pointer"
            onClick={() => navigate("/history")}
          >
            History
          </div>
          {/* <button
            onClick={() => {}}
            className="bg-transparent p-0 ml-3 border border-primary-color rounded-full w-[26px] h-[26px] flex items-center justify-center hover:bg-primary-color hover:text-base-color"
          >
            <PowerIcon className="h-4 w-4" />
          </button> */}
        </div>
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
