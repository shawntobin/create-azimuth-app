import { formatAddress } from "../utils/address";
import { formatEventString } from "../utils/helper";
import UrbitIcon from "./UrbitIcon";

const TRANSACTION_TYPES = [
  {
    type: "change-voting-proxy",
    icon: <UrbitIcon name="spawnProxy" size={26} color="white" />,
  },
  {
    type: "change-management-proxy",
    icon: <UrbitIcon name="spawnProxy" size={26} color="white" />,
  },
  {
    type: "escaped",
    icon: <UrbitIcon name="spawnProxy" size={26} color="white" />,
  },
  {
    type: "activate",
    icon: <UrbitIcon name="spawnProxy" size={26} color="white" />,
  },
  {
    type: "escape-requested",
    icon: <UrbitIcon name="arrowsRightLeft" size={26} color="white" />,
  },
  {
    type: "escape-canceled",
    icon: <UrbitIcon name="brokeContinuity" size={26} color="white" />,
  },
  {
    type: "lost-sponsor",
    icon: <UrbitIcon name="spawn" size={26} color="white" />,
  },
  {
    type: "broke-continuity",
    icon: <UrbitIcon name="brokeContinuity" size={26} color="white" />,
  },
  {
    type: "change-ownership",
    icon: <UrbitIcon name="arrowsRightLeft" size={26} color="white" />,
  },
  {
    type: "change-spawn-proxy",
    icon: <UrbitIcon name="spawnProxy" size={26} color="white" />,
  },
  {
    type: "invite",
    icon: <UrbitIcon name="invite" size={26} color="black" />,
  },
  {
    type: "change-transfer-proxy",
    icon: <UrbitIcon name="spawnProxy" size={26} color="white" />,
  },
  {
    type: "spawn",
    icon: <UrbitIcon name="spawn" size={26} color="black" />,
  },
  {
    type: "change-networking-keys",
    icon: <UrbitIcon name="spawnProxy" size={26} color="white" />,
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
      <div className="w-[40px] flex items-center justify-start mb-2">
        {TRANSACTION_TYPES.find((txn) => txn.type === type).icon}
      </div>

      <div className="flex-col flex w-full">
        <div className="justify-between flex items-center">
          <div className="flex-1 flex text-[20px]">
            {formatEventString(type)}
          </div>
          <div className="bg-[white] p-2 h-[16px] text-[12px] rounded-[5.53px] w-[25px] flex items-center justify-center text-black">
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
