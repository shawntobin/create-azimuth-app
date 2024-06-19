import {
  DocumentDuplicateIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";
import { formatAddress } from "../utils/address";

const TRANSACTION_TYPES = [
  {
    type: "change-voting-proxy",
    icon: <DocumentDuplicateIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "change-management-proxy",
    icon: <ArrowPathIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "escaped",
    icon: <ArrowsRightLeftIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "activate",
    icon: <KeyIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "escape-requested",
    icon: <DocumentDuplicateIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "escape-canceled",
    icon: <ArrowsRightLeftIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "lost-sponsor",
    icon: <ArrowPathIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "broke-continuity",
    icon: <KeyIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "change-ownership",
    icon: <KeyIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "change-spawn-proxy",
    icon: <ArrowsRightLeftIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "invite",
    icon: <ArrowPathIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "change-transfer-proxy",
    icon: <KeyIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "spawn",
    icon: <DocumentDuplicateIcon className="h-8 w-8 mr-3" />,
  },
  {
    type: "change-networking-keys",
    icon: <ArrowsRightLeftIcon className="h-8 w-8 mr-3" />,
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
      {TRANSACTION_TYPES.find((txn) => txn.type === type).icon}

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
