import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import UrbitIdSmall from "../components/UrbitIdSmall";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
import * as txn from "../utils/transaction";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { formatAddress } from "../utils/address";
import ShipTypeMenuSelection from "../components/ShipTypeMenuSelection";
import * as ob from "urbit-ob";
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { set } from "lodash";

const Wallet = () => {
  const { urbitIds, setSelectedShip, walletAddress } = useWalletStore();
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedShipType, setSelectedShipType] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [inputValue, setInputValue] = useState("");

  const itemsPerPage = 12;

  useEffect(() => {
    const filterItems = () => {
      if (selectedShipType === "all") {
        setFilteredItems(urbitIds);
      } else {
        setFilteredItems(
          urbitIds.filter((id) => ob.clan(ob.patp(id)) === selectedShipType)
        );
      }
    };

    filterItems();
  }, [urbitIds, selectedShipType]);

  useEffect(() => {
    toast.dismiss();
    const customOffset = filteredItems.length < itemsPerPage ? 0 : itemOffset;
    const endOffset = customOffset + itemsPerPage;
    setCurrentItems(filteredItems.slice(customOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [filteredItems, itemOffset]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (inputValue === "") {
      return;
    }

    setSearchText(inputValue);
    setInputValue("");

    const filtered = urbitIds.filter((id) => ob.patp(id).includes(inputValue));
    setFilteredItems(filtered);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setInputValue("");
    setFilteredItems(urbitIds);
  };

  const handleSelectUrbitId = async (patp: string) => {
    const loadingToastId = toast.loading("Loading");

    try {
      const ship = await txn.getShip(patp);
      setSelectedShip(ship);
      const keysSet = ship.keyRevisionNumber > 0;

      toast.dismiss(loadingToastId);
      navigate(`/manage`); // change to 'onboarding' once implemented
    } catch (error) {
      toast.error("Failed to load ship", {
        id: loadingToastId,
      });
    }
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

  const renderUrbitIds = currentItems.map((id) => (
    <UrbitIdSmall
      urbitId={id}
      key={id}
      handleClick={(patp: string) => handleSelectUrbitId(patp)}
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
          <div className="flex justify-between mt-10">
            {searchText ? (
              <div className="text-left">
                <div
                  className="border inline-block px-2 py-0 rounded-full bg-white text-black cursor-pointer hover:bg-opacity-90"
                  onClick={handleClearSearch}
                >
                  {searchText}
                  <XMarkIcon className="h-4 w-4 inline-block ml-1" />
                </div>
              </div>
            ) : (
              <ShipTypeMenuSelection
                selectShipType={handleSelectShipType}
                selectedShipType={selectedShipType}
              />
            )}
            <div className="relative flex items-center mb-3">
              <form onSubmit={handleSearch} className="input">
                <input
                  type="text"
                  spellCheck="false"
                  placeholder="Search"
                  className="font-[600] pl-2 pr-8 py-2 rounded-full border border-primary-color text-light-gray w-[142px] text-[16px] h-[25px] bg-transparent placeholder-secondary-color"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
                <button
                  className="text-base-color border-primary-color absolute inset-y-0 right-0 flex items-center justify-center bg-primary-color rounded-full h-[24px] w-[24px] text-[30px] p-1 pt-0 font-[400] focus:outline-none focus:ring-2 focus:ring-primary-color"
                  onClick={handleSearch}
                >
                  &gt;
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-start justify-start w-[500px] h-full mb-[50px]">
            {renderUrbitIds.length > 0 ? renderUrbitIds : renderNoIds()}
          </div>
        </div>
        {renderPagination()}
      </div>
    );
  };
  return (
    <Container headerText={`Your IDs / ${formatAddress(walletAddress)}`}>
      {renderWallet()}
    </Container>
  );
};

export default Wallet;
