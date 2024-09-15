import * as kg from "urbit-key-generation";

export const urbitWalletFromTicket = async (
  ticket: string,
  point: number,
  passphrase?: string
) => {
  return await kg.generateWallet({
    ticket: ticket,
    ship: point,
    passphrase: passphrase,
  });
};
