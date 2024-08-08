import { Fragment } from "react";
import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";

const Dropdown = (props) => {
  const {
    items,
    focusedItem,
    onSelect,
    loading,
    loadingMessage,
    height = 33,
    fontSize = 20,
  } = props;

  const isDisabled = false; //items.length === 1;

  return (
    <Menu as="div" className="relative inline-block text-left m-0">
      {({ open }) => (
        <>
          <MenuButton
            style={{ height, fontSize }}
            className="inline-flex items-center bg-base-color text-primary rounded-[10px] border ml-0 border-primary-color p-0"
            disabled={isDisabled}
          >
            <span className="px-3 py-0">
              {!loading ? focusedItem : loadingMessage}
            </span>
            {!isDisabled && (
              <div className="bg-primary-color text-black rounded-r-[8px] flex items-center px-2 h-full justify-center pr-2">
                {open ? <span>↑</span> : <span>↓</span>}
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
            <MenuItems className="absolute right-0 z-10 mt-2 w-[160px] origin-top-right bg-black border-primary-color border ring-1 ring-black ring-opacity-5 focus:outline-none rounded-[10px] max-h-60 overflow-y-auto custom-scrollbar">
              <div className="py-1 text-left px-2 overflow-y-auto">
                {items.map((item) => (
                  <MenuItem key={item.label}>
                    {({ active }) => (
                      <a
                        style={{ fontSize }}
                        onClick={() => onSelect(item)}
                        className={`block cursor-pointer
                          ${
                            active ? "text-medium-gray-2" : "text-primary-color"
                          }`}
                      >
                        {item.label}
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
