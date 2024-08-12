import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRefresh } from "./useRefresh";

const useTransaction = () => {
  const [txHash, setTxHash] = useState(null);
  const [txnLoading, setTxnLoading] = useState(false);
  const [txnComplete, setTxnComplete] = useState(false);
  const { refresh } = useRefresh();

  const executeTransaction = async (transactionFunction, ...args) => {
    setTxnLoading(true);
    try {
      const txHash = await transactionFunction(
        ...args,
        handleTransactionComplete
      );
      setTxHash(txHash);
      return { success: true };
    } catch (error) {
      toast.dismiss();
      toast.error(`${error.message}`);
    } finally {
      setTxnLoading(false);
    }
  };

  const handleTransactionComplete = () => {
    setTxnLoading(false);
    setTxHash(null);
    setTxnComplete(true);
    toast.success("Transaction complete!");
    refresh("all");
  };

  return {
    txHash,
    txnLoading,
    executeTransaction,
    txnComplete,
  };
};

export default useTransaction;
