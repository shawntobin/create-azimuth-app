import Container from "../components/Container";
import ControlBox from "../components/ControlBox";
import useWalletStore from "../store/useWalletStore";

const TransactionHistory = () => {
  const { walletAddress, selectedShip } = useWalletStore();

  return (
    <Container headerText={`Urbit ID / Transaction History`}>
      <ControlBox
        headerContent={
          <div className="text-left w-full flex justify-between">
            <div className="items-center justify-center flex text-[20px] ">
              <div className="font-bold">Transaction History</div>
            </div>
          </div>
        }
        className="h-[319px]"
      >
        <div className="text-[20px] justify-start flex flex-col items-start pl-2 border-b border-primary-color h-full">
          <div className="font-bold text-left pb-4 ">{``}</div>

          <div className="flex justify-between w-full pr-4 mr-0">
            <div className="text-[20px] text-left "></div>
          </div>
        </div>
      </ControlBox>
    </Container>
  );
};

export default TransactionHistory;
