import * as c from "../constants/config";

const callRoller = async (method: string, params: any) => {
  const requestId = Date.now().toString();

  try {
    const rawResponse = await fetch("https://roller.urbit.org:443/v1/roller", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: requestId,
        method: method,
        params: params,
      }),
    });

    const res = await rawResponse.json();
    return res;
  } catch (error) {
    console.error("Error calling the roller:", error);
    throw error;
  }
};

export const getPoints = async (addr: string) => {
  // Note - may need to also check L1

  const res = await callRoller("getOwnedPoints", { address: addr });

  const allPoints = res.result;

  return allPoints;
};
