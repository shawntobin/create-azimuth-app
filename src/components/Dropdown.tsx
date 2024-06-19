import { Fragment, useState } from "react";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/20/solid";
import * as ob from "urbit-ob";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";
import { set } from "lodash";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = (props) => {
  const { selectedShip, urbitIds, setSelectedShip } = useWalletStore();
  const [arrowDirection, setArrowDirection] = useState("down");
  const isDisabled = urbitIds.length === 1;

  const handleClick = async (point) => {
    const loadingToastId = toast.loading("Loading");

    try {
      const ship = await txn.getShip(ob.patp(point));
      setSelectedShip(ship);
      toast.dismiss(loadingToastId);
      // toast.success("Ship loaded successfully!", {
      //   id: loadingToastId,
      // });
    } catch (error) {
      toast.error("Failed to load ship", {
        id: loadingToastId,
      });
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left m-0">
      {({ open }) => (
        <>
          <MenuButton
            className="inline-flex items-center bg-base-color text-primary text-[16px] rounded-full border ml-3 border-white h-[26px] p-0"
            disabled={isDisabled}
          >
            <span className="px-3 py-0">{selectedShip.patp}</span>
            {!isDisabled && (
              <div className="bg-white rounded-r-full flex items-center px-2 h-full justify-center pr-2">
                {open ? (
                  <ArrowUpIcon className="w-4 h-4 text-primary text-black" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-primary text-black" />
                )}
              </div>
            )}
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems
              className="absolute right-0 z-10 mt-2 w-[160px] origin-top-right bg-black border-white border ring-1 ring-black ring-opacity-5 focus:outline-none rounded-lg max-h-60 overflow-y-auto custom-scrollbar"
              style={{
                overflowClipPadding: "padding-box",
                overflow: "hidden",
              }}
            >
              <div className="py-1 text-left px-2 overflow-y-auto">
                {urbitIds.map((item) => (
                  <MenuItem key={item}>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={() => handleClick(item)}
                        className={classNames(
                          active ? "text-medium-gray-2" : "text-white",
                          "block"
                        )}
                      >
                        {ob.patp(item)}
                      </a>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default Dropdown;
