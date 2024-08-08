import { useState, useEffect } from "react";
import { INFURA_BASE64_AUTH, INFURA_GAS_URL } from "../constants/config";
import { calculateMaxTransactionCost, convertToSeconds } from "../utils/helper";

const useGasEstimate = (gasLimit) => {
  const [gasOptions, setGasOptions] = useState([]);
  const [gasDetails, setGasDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [maxTransactionCost, setMaxTransactionCost] = useState("0");
  const [selectedGasItem, setSelectedGasItem] = useState({});

  const handleSelect = (option) => {
    setSelectedGasItem(option);
    const maxCost = calculateMaxTransactionCost(option.value, gasLimit);
    setMaxTransactionCost(maxCost);
  };

  useEffect(() => {
    const fetchGasFees = async () => {
      try {
        const response = await fetch(INFURA_GAS_URL, {
          headers: { Authorization: `Basic ${INFURA_BASE64_AUTH}` },
        });

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const gasFees = await response.json();

        const relevantKeys = ["high", "medium", "low"];
        const labels = ["Fast", "Normal", "Slow"];
        const options = relevantKeys.map((key, i) => {
          const fee = gasFees[key];
          return {
            label: `${Math.round(fee.suggestedMaxFeePerGas)} gwei (${
              labels[i]
            }) `,
            value: fee,
          };
        });

        setGasOptions(options);
        setGasDetails(gasFees);
        setSelectedGasItem(options[1]);

        const defaultTxnCost = calculateMaxTransactionCost(
          options[1]?.value,
          gasLimit
        );

        setMaxTransactionCost(defaultTxnCost);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGasFees();
  }, []);

  return {
    gasOptions,
    gasDetails,
    loading,
    error,
    maxTransactionCost,
    selectedGasItem,
    handleSelect,
  };
};

export default useGasEstimate;
