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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dropdown = (props) => {
  const { selectedShip, urbitIds, setSelectedShip } = useWalletStore();
  const [arrowDirection, setArrowDirection] = useState("down");
  const isDisabled = urbitIds.length === 1;

  const handleClick = async (point) => {
    setArrowDirection(arrowDirection === "down" ? "up" : "down");
    const ship = await txn.getShip(ob.patp(point));
    setSelectedShip(ship);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        className="inline-flex items-center bg-base-color text-primary text-[16px] rounded-full border ml-3 border-white h-[26px] p-0"
        disabled={isDisabled}
      >
        <span className="px-3 py-0">{selectedShip.patp}</span>
        {!isDisabled && (
          <div className="bg-white rounded-r-full flex items-center px-2 h-full justify-center pr-2">
            {/* <ArrowDownIcon className="w-5 h-5 text-primary text-black" /> */}
            {arrowDirection === "down" ? (
              <ArrowDownIcon className="w-5 h-5 text-primary text-black" />
            ) : (
              <ArrowUpIcon className="w-5 h-5 text-primary text-black" />
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
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-lg max-h-60 overflow-y-auto">
          <div className="py-1 text-center">
            {urbitIds.map((item) => (
              <MenuItem key={item}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => handleClick(item)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2"
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
    </Menu>
  );
};

export default Dropdown;
