import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const FilterButton = ({
  filterName,
  selectedFilter,
  handleFilterClick,
  buttonName,
}) => {
  return (
    <button
      className={`h-[26px] px-2 m-0 flex justify-center items-center font-[600] rounded-full border border-primary-color text-[16px] ${
        selectedFilter === filterName
          ? "text-black bg-primary-color"
          : "text-primary-color bg-transparent"
      }`}
      onClick={() => handleFilterClick(filterName)}
    >
      {buttonName}
      {selectedFilter === filterName && <XMarkIcon className="h-3 w-3 ml-1" />}
    </button>
  );
};

export default FilterButton;
