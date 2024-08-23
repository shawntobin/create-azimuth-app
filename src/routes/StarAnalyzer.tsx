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
import Sigil from "../components/Sigil";
import pluralize from "pluralize";
import { isStar } from "../utils/helper";
import useTransaction from "../hooks/useTransaction";
import BackButton from "../components/BackButton";
import InfoButton from "../components/InfoButton";
import { INFO_MODAL_TEXT } from "../constants/content";
import InfoModal from "../components/InfoModal";
import { ROUTE_MAP } from "./routeMap";
import FilterButton from "./FilterButton";

type Planet = {
  patp: string;
  point: number;
  tags: string[];
};

const Wallet = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [spawnedCount, setSpawnedCount] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const { txHash, txnLoading, executeTransaction, txnComplete } =
    useTransaction();
  const { walletAddress, selectedShip, walletType, urbitWallet } =
    useWalletStore();

  const star = isStar(selectedShip?.patp) ? selectedShip.patp : "~marzod";

  const itemsPerPage = 21;

  useEffect(() => {
    const asyncFunction = async () => {
      const ids = utils.getPlanets(star);

      const spawnedPlanets = await txn.getSpawned(star);

      setSpawnedCount(spawnedPlanets.length);

      const planetsWithSpawned = ids.map((item) => {
        const spawned = spawnedPlanets.includes(item.point);

        return { ...item, tags: [...item.tags, spawned && utils.SPAWNED] };
      });

      console.log(planetsWithSpawned.slice(0, 10));

      setPlanets(planetsWithSpawned);
    };

    asyncFunction();
  }, [star]);

  useEffect(() => {
    const filteredData = planets.filter(
      (item) =>
        (item.tags?.includes(selectedFilter) || !selectedFilter) &&
        (item.patp.toLowerCase().includes(inputValue.toLowerCase()) ||
          !inputValue)
    );

    setFilteredItems(filteredData);
  }, [planets, selectedFilter, inputValue]);

  const resetPagination = () => {
    setItemOffset(0);
    setCurrentPage(0);
  };

  const handleFilterClick = (filter: string) => {
    resetPagination();

    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
  };

  useEffect(() => {
    toast.dismiss();
    const customOffset = filteredItems.length < itemsPerPage ? 0 : itemOffset;
    const endOffset = customOffset + itemsPerPage;
    setCurrentItems(filteredItems.slice(customOffset, endOffset));
    setPageCount(Math.ceil(filteredItems.length / itemsPerPage));
  }, [filteredItems, itemOffset]);

  const handleSearch = (event) => {
    setInputValue(event.target.value);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  const handleItemClick = (pl: string) => {
    handleSpawn(pl);
  };

  const handleSpawn = async (patp) => {
    const result = await executeTransaction(
      txn.spawnPoint,
      walletType,
      patp,
      walletAddress,
      walletAddress, //newOwnerAddress
      urbitWallet
      // selectedGasItem.value
    );

    if (result) {
      toast.loading("Spawning Planet...");
    } else {
      // toast.error("Failed to spawn");
    }
  };

  const renderPagination = () => {
    return (
      <ReactPaginate
        forcePage={currentPage}
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
        containerClassName="flex justify-between w-full font-bold text-lg px-6" //mt-6
        activeClassName=""
        renderOnZeroPageCount={null}
      />
    );
  };

  const renderUrbitIds = currentItems.map((pl) => (
    <UrbitIdSmall
      size={80}
      textSize={12}
      urbitId={pl.point}
      key={pl.point}
      handleClick={handleItemClick}
      isSpawned={pl.tags.includes("spawned")}
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

  const renderContent = () => {
    return (
      <>
        <InfoModal
          text={INFO_MODAL_TEXT.SPAWNING}
          isOpen={showInfo}
          handleClose={() => setShowInfo(false)}
        />
        <div className="mt-[75px] flex-col justify-start items-start h-full">
          <div className="flex justify-between items-center pb-4 mt-[75px]">
            <BackButton route={ROUTE_MAP.SETTINGS} />

            <InfoButton onClick={() => setShowInfo(true)} />
          </div>

          <div className="border h-[86px] w-full rounded-[10px] flex justify-between items-center pr-8">
            <div className="flex flex justify-start items-center">
              <div className="ml-5 overflow-hidden h-[80px] w-[80px]">
                <Sigil id={star} colors={["black", "white"]} size={86} />
              </div>

              <div className="text-[36px] font-[400] text-primary color pl-4">
                {star}
              </div>
            </div>
            <div className="flex font-[700] text-[16px]">
              <div className="pr-4">
                <div>
                  Spawned Planets:{" "}
                  <span className="font-[400]">{spawnedCount}</span>
                </div>
                <div>
                  Key Revision:{" "}
                  <span className="font-[400]">
                    {selectedShip?.keyRevisionNumber}
                  </span>
                </div>
              </div>
              <div>
                <div>
                  Azimuth Point:{" "}
                  <span className="font-[400]">{ob.patp2dec(star)}</span>
                </div>
                <div>
                  Parent:{" "}
                  <span className="font-[400]">{star && ob.sein(star)}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-left mt-5 pl-3 space-x-3">
              <div className="relative flex items-center mb-3">
                <input
                  type="text"
                  spellCheck="false"
                  placeholder="Search"
                  className="font-[600] pl-2 pr-8 py-2 rounded-full border border-primary-color text-light-gray w-[142px] text-[16px] h-[25px] bg-transparent placeholder-secondary-color"
                  onChange={(e) => handleSearch(e)}
                  value={inputValue}
                />
              </div>

              <FilterButton
                filterName={utils.DOUBLES}
                selectedFilter={selectedFilter}
                handleFilterClick={handleFilterClick}
                buttonName="Doubles"
              />
              <FilterButton
                filterName={utils.ENGLISH_LIKE}
                selectedFilter={selectedFilter}
                handleFilterClick={handleFilterClick}
                buttonName="Words"
              />
              <FilterButton
                filterName={utils.SPAWNED}
                selectedFilter={selectedFilter}
                handleFilterClick={handleFilterClick}
                buttonName="Spawned"
              />
            </div>

            <div className="p-2 flex flex-row flex-wrap items-start justify-start w-[700px] h-full mb-[20px]">
              {renderUrbitIds.length > 0 ? renderUrbitIds : renderNoIds()}
            </div>
          </div>
          {renderPagination()}
          <div className="text-secondary-color">{`${filteredItems.length.toLocaleString(
            "en"
          )} ${pluralize("Result", filteredItems.length)}`}</div>
        </div>
      </>
    );
  };
  return (
    <Container dropdownForSpawning symbols={false}>
      {renderContent()}
    </Container>
  );
};

export default Wallet;
