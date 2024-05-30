import {
  DocumentDuplicateIcon,
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  KeyIcon,
} from "@heroicons/react/20/solid";

const HistoryItem = ({ transaction }) => {
  const { dominion, target_node, fTime, event_type } = transaction;

  return (
    <div className="font-bold text-left w-full border-b h-10 p-3 h-[75px] flex-row flex">
      <ArrowPathIcon className="h-8 w-8 mr-3" />
      <div className="flex-col flex w-full">
        <div className="justify-between flex items-center">
          <div className="flex-1 flex text-[20px]">{event_type}</div>
          <div className="bg-bright-yellow p-2 h-[16px] text-[12px] rounded-[5.53px] w-[25px] flex items-center justify-center text-black">
            {dominion.toUpperCase()}
          </div>
        </div>

        <div className="justify-between flex items-center text-[16px] text-secondary-color">
          <div className="flex-1 flex">{target_node}</div>
          <div>{fTime}</div>
        </div>
      </div>
    </div>
  );
};

export default HistoryItem;
