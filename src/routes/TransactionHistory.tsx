import { useEffect, useState } from "react";
import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";
import HistoryItem from "../components/HistoryItem";
import { getEvents } from "../lib/networkEvents";
import { formatDistance } from "date-fns";

const TransactionHistory = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedShip } = useWalletStore();
  const { patp } = selectedShip;

  useEffect(() => {
    const asyncFunction = async () => {
      setLoading(true);
      const txns = await getEvents(selectedShip.patp);
      // const txns = await getEvents("~dosdel-falrud");

      const formattedTxns = txns.map((txn) => {
        return {
          ...txn,
          fTime: formatDistance(new Date(txn.time), new Date(), {
            addSuffix: true,
          }),
        };
      });

      const sortedTxns = formattedTxns.sort(function (a, b) {
        return new Date(b.time) - new Date(a.time);
      });

      setEventData(sortedTxns);

      setLoading(false);
    };

    asyncFunction();
  }, [selectedShip]);

  return (
    <Container hideHistory>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between text-[20px]">
            <div className="items-center justify-center flex">
              <div className="font-bold">Transaction History</div>
            </div>
            {patp}
          </div>
        }
        className="h-[519px] w-[500px] overflow-hidden"
      >
        <div className="text-[20px] justify-start flex flex-col items-start h-full overflow-y-auto custom-scrollbar">
          {eventData.length === 0 && !loading && (
            <div className="text-[20px] font-bold w-full mt-6">
              No transactions found!
            </div>
          )}
          {eventData.map((event, index) => (
            <HistoryItem key={index} transaction={event} />
          ))}

          <div className="flex justify-between w-full pr-4 mr-0">
            <div className="text-[20px] text-left "></div>
          </div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default TransactionHistory;
