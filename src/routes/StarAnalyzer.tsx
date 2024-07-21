import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import UrbitIdSmall from "../components/UrbitIdSmall";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
import * as txn from "../utils/transaction";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import ShipTypeMenuSelection from "../components/ShipTypeMenuSelection";
import * as ob from "urbit-ob";
import { XMarkIcon } from "@heroicons/react/24/outline";
import * as utils from "../utils/analyzer-utils";
import UrbitIcon from "../components/UrbitIcon";

type Planet = {
  patp: string;
  point: number;
};

const Wallet = () => {
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedShipType, setSelectedShipType] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [planets, setPlanets] = useState<Planet[]>([]);

  const itemsPerPage = 15;

  useEffect(() => {
    startAnalyzing("~dosdel");
  }, []);

  useEffect(() => {
    const filterItems = () => {
      //   if (selectedShipType === "all") {
      //     setFilteredItems(planets);
      //   } else {
      setFilteredItems(planets);
    };

    filterItems();
  }, [planets]);

  useEffect(() => {
    toast.dismiss();
    const customOffset = filteredItems.length < itemsPerPage ? 0 : itemOffset;
    const endOffset = customOffset + itemsPerPage;
    setCurrentItems(filteredItems.slice(customOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [filteredItems, itemOffset]);

  const startAnalyzing = (_star: string) => {
    const ids = utils.getPlanets(_star);

    console.log("ids", ids.length);

    setPlanets(ids);
    // setLoading(false);
    // setShowTextInput(false);
  };

  const handleSearch = (event) => {
    // event.preventDefault();
    // if (inputValue === "") {
    //   return;
    // }

    setInputValue(event.target.value);

    const inputValue = event.target.value;

    setSearchText(inputValue);
    // setInputValue("");

    const filtered = planets.filter((pl) => pl.patp.includes(inputValue));
    console.log("filtered", filtered.length);
    setFilteredItems(filtered);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setInputValue("");
    setFilteredItems(planets);
  };

  const handleSelectShipType = (shipType: string) => {
    setItemOffset(0);
    setPageCount(0);
    setSelectedShipType(shipType);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  const renderPagination = () => {
    return (
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        pageCount={pageCount}
        previousLabel="< Previous"
        breakLabel="..."
        pageClassName="text-white"
        pageLinkClassName="text-dark-gray"
        previousClassName="text-white"
        previousLinkClassName="text-white hover:text-secondary-color focus:outline-none"
        nextClassName="text-white"
        nextLinkClassName="text-white hover:text-secondary-color border-0 shadow-none focus:outline-none"
        breakClassName=""
        breakLinkClassName=""
        containerClassName="flex justify-between h-full w-full font-bold text-lg px-6" //mt-6
        activeClassName=""
        renderOnZeroPageCount={null}
      />
    );
  };

  const renderUrbitIds = currentItems.map((pl) => (
    <UrbitIdSmall
      size={80}
      urbitId={pl.point}
      key={pl.point}
      handleClick={() => {}}
    />
  ));

  const renderNoIds = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <div className="text-center text-[20px] font-bold">
          No Urbit IDs found!
        </div>
      </div>
    );
  };

  const renderWallet = () => {
    return (
      <div className="mt-[75px] flex-col justify-start items-start h-full">
        <div>
          <div className="flex justify-between mt-10 pr-7 pl-3">
            <div className="relative flex items-center mb-3">
              <form onSubmit={() => {}} className="input">
                <input
                  type="text"
                  spellCheck="false"
                  placeholder="Search"
                  className="font-[600] pl-2 pr-8 py-2 rounded-full border border-primary-color text-light-gray w-[142px] text-[16px] h-[25px] bg-transparent placeholder-secondary-color"
                  onChange={(e) => handleSearch(e)}
                  value={inputValue}
                />
                {/* <button
                  className="text-base-color border-primary-color absolute inset-y-0 right-0 flex items-center justify-center bg-primary-color rounded-full h-[24px] w-[24px] text-[30px] p-1 pt-0 font-[400] focus:outline-none focus:ring-2 focus:ring-primary-color"
                  onClick={handleSearch}
                >
                  &gt;
                </button> */}
              </form>
            </div>
            {/* <button className="h-[26px] p-0 m-0 flex justify-center items-center font-[600] rounded-full border border-primary-color text-light-gray w-[97px] text-[16px] bg-transparent">
            
              <UrbitIcon
                name="doubles"
                size={26}
                color="white"
                className="mt-5"
              />
              Doubles
            </button>
            <button className="h-[26px] p-0 m-0 flex justify-center items-center font-[600] rounded-full border border-primary-color text-light-gray w-[97px] text-[16px] bg-transparent">
              
              Words
            </button> */}
          </div>

          <div className="flex flex-row flex-wrap items-start justify-start w-[500px] h-full mb-[50px]">
            {renderUrbitIds.length > 0 ? renderUrbitIds : renderNoIds()}
          </div>
        </div>
        {renderPagination()}
      </div>
    );
  };
  return <Container>{renderWallet()}</Container>;
};

export default Wallet;
