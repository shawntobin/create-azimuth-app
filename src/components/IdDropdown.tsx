import { Fragment } from "react";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as ob from "urbit-ob";
import { useNavigate } from "react-router-dom";
import useWalletStore from "../store/useWalletStore";
import * as txn from "../utils/transaction";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const IdDropdown = (props) => {
  const { selectedShip, urbitIds, setSelectedShip } = useWalletStore();
  const isDisabled = urbitIds.length === 1;
  const handleClick = async (point) => {
    const ship = await txn.getShip(ob.patp(point));
    setSelectedShip(ship);
  };

  // px-3 py-2
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          className="inline-flex w-full justify-center gap-x-1.5 bg-base-color px-1 py-0 text-primary text-[18px]"
          disabled={isDisabled}
        >
          {selectedShip.patp}
          {!isDisabled && <span>&or;</span>}
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 text-center">
            {urbitIds.map((item) => {
              return (
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
              );
            })}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default IdDropdown;
