import { Fragment } from "react";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const GasDropdown = (props) => {
  const handleClick = async (point) => {};

  const items = ["39 gwei (1 min)", "39 gwei (2 min)", "39 gwei (3 min)"];

  // px-3 py-2
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 bg-base-color px-1 py-0 text-primary text-[18px]">
          {items[0]}
          <span>&or;</span>
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
            {items.map((item) => {
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
                      {item}
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

export default GasDropdown;
