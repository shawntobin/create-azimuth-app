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
import Navbar from "./Navbar.tsx";
import { ROUTE_MAP } from "../routes/routeMap.ts";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  symbols?: boolean;
  dropdown?: boolean;
  hideHistory?: boolean;
  dropdownForSpawning?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  symbols = true,
  dropdown = true,
  hideHistory = false,
  dropdownForSpawning = false,
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

  const getDropdownItems = () => {
    return urbitIds
      .filter((id) => !dropdownForSpawning || id < 65536)
      .map((id) => ({
        label: ob.patp(id),
        value: ob.patp(id),
      }));
  };

  const renderHistory = () => {
    return (
      <div className="flex">
        <button
          onClick={() => navigate(ROUTE_MAP.HISTORY)}
          className="w-[100px] border border-white rounded-[10px] text-[20px] bg-transparent h-[33px] flex items-center justify-center hover:bg-primary-color hover:text-base-color"
        >
          <div className="text-[16px] mr-2 ml-1"></div>
          History
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="fixed bg-base-color text-primary-color top-0 left-0 h-screen w-screen">
        <div className="absolute left-0 right-0">
          <Navbar />

          <div className="w-full flex justify-between mt-6 px-6">
            <div className="w-[400px]">
              {walletAddress && (
                <Breadcrumbs
                  walletAddress={walletAddress}
                  patp={selectedShip?.patp}
                />
              )}
            </div>
            <div className="text-center justify-center items-center flex text-[20px] ml-[-300px]">
              {dropdown && (
                <Dropdown
                  onSelect={handleSelect}
                  items={getDropdownItems()}
                  focusedItem={selectedShip.patp}
                />
              )}
            </div>
            {!hideHistory ? renderHistory() : <div className="w-[100px]" />}
          </div>
        </div>
        <div className={`flex flex-col h-full ${className}`} {...rest}>
          <div className="flex-grow flex flex-col items-center justify-center h-full pt-[0px]">
            {children}
          </div>
          {symbols && (
            <div className="mb-8">
              <UrbitSymbols />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Container;
