import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import UrbitIdSmall from "../components/UrbitIdSmall";
import useWalletStore from "../store/useWalletStore";
import { useNavigate } from "react-router-dom";
// import { getShip } from "../utils/transactionL2";
import * as txn from "../utils/transaction";
import ReactPaginate from "react-paginate";

const Wallet = () => {
  const { urbitIds, setSelectedShip } = useWalletStore();
  const navigate = useNavigate();
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 12;

  useEffect(() => {
    const customOffset = urbitIds.length < itemsPerPage ? 0 : itemOffset;
    const endOffset = customOffset + itemsPerPage;
    urbitIds && setCurrentItems(urbitIds.slice(customOffset, endOffset));
    setPageCount(Math.ceil(urbitIds.length / itemsPerPage));
  }, [urbitIds, itemOffset]);

  const handleSelectUrbitId = async (patp: string) => {
    const ship = await txn.getShip(patp);
    setSelectedShip(ship);
    const keysSet = ship.keyRevisionNumber > 0;

    if (!keysSet) {
      navigate(`/manage`); // change to 'onboarding' once implemented
      return;
    } else {
      navigate(`/manage`);
      return;
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % urbitIds.length;

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
        previousLinkClassName="text-white"
        nextClassName="text-white"
        nextLinkClassName="text-white"
        breakClassName=""
        breakLinkClassName=""
        containerClassName="flex justify-between h-full w-full font-bold text-lg mt-6 px-6"
        activeClassName=""
        renderOnZeroPageCount={null}
      />
    );
  };

  const renderWallet = () => {
    return (
      <div>
        <div className="flex flex-row flex-wrap items-start justify-start w-[500px] h-[500px] mb-[50px] mt-[75px]">
          {currentItems.map((id) => (
            <UrbitIdSmall
              urbitId={id}
              key={id}
              handleClick={(patp: string) => handleSelectUrbitId(patp)}
            />
          ))}
        </div>

        {pageCount > 1 && renderPagination()}
      </div>
    );
  };
  return (
    <Container headerText={`Urbit ID / Your IDs`}>{renderWallet()}</Container>
  );
};
export default Wallet;
