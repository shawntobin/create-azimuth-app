import { formatAddress } from "../utils/address";
import UrbitIcon from "./UrbitIcon";

const TRANSACTION_TYPES = [
  {
    type: "change-voting-proxy",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "change-management-proxy",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "escaped",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "activate",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "escape-requested",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "escape-canceled",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "lost-sponsor",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "broke-continuity",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "change-ownership",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "change-spawn-proxy",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "invite",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "change-transfer-proxy",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "spawn",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
  {
    type: "change-networking-keys",
    icon: <UrbitIcon name="galaxy" size={26} color="white" weight={"bold"} />,
  },
];

const renderAttribute = (txn) => {
  const urbit_id = txn["target-node"]?.["urbit-id"];
  const { address } = txn;

  if (urbit_id) {
    return <div className="flex-1 flex">{urbit_id}</div>;
  } else if (address) {
    return <div className="flex-1 flex">{formatAddress(address)}</div>;
  } else {
    return <div className="flex-1 flex"></div>;
  }
};

const HistoryItem = ({ transaction }) => {
  const { dominion, fTime, type } = transaction;

  return (
    <div className="font-bold text-left w-full border-b h-10 p-3 h-[75px] flex-row flex">
      <div className="mr-5">
        {TRANSACTION_TYPES.find((txn) => txn.type === type).icon}
      </div>

      <div className="flex-col flex w-full">
        <div className="justify-between flex items-center">
          <div className="flex-1 flex text-[20px]">{type}</div>
          <div className="bg-bright-yellow p-2 h-[16px] text-[12px] rounded-[5.53px] w-[25px] flex items-center justify-center text-black">
            {dominion.toUpperCase()}
          </div>
        </div>

        <div className="justify-between flex items-center text-[16px] text-secondary-color text-left">
          {renderAttribute(transaction)}

          <div>{fTime}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
