export const INFO_MODAL_TEXT = {
  CHANGE_SPONSOR: {
    title: "Change Sponsor",
    body: "Your sponsor is crucial for providing software updates and making you discoverable to others on the network. For these services to work, your sponsor must be reliably online. If your sponsor is frequently offline or not meeting your needs, you should consider escaping to a new sponsor. Before doing so, negotiate the transfer with your desired new sponsor, as they must accept the request on their end for the switch to be successful. The Urbit Foundation provides reliable sponsors, ~lapdeg for planets and ~deg for stars, who typically accept requests within 24 hours.",
  },
  SET_NETWORK_KEYS: {
    title: "Set Network Keys",
    body: "Your Urbit requires network keys to communicate with other Urbits. When you set or reset your network keys, a new keyfile is generated, which you'll need to inject into your Urbit. A factory reset is the most drastic action you can take, as it will erase all your data and connections, effectively informing the entire network that your current version of your identity no longer exists. This should only be used in cases where your ship is clearly corrupted. You can find more information in our <a href='https://docs.urbit.org/manual/id/guide-to-resets' target='_blank' rel='noopener noreferrer'>reset guide.</a>",
  },
  TRANSFER_OWNERSHIP: {
    title: "Transfer Ownership",
    body: "When transferring an Urbit ID, ownership of the ID permanently shifts to the new Ethereum address. The new address will have full control over the ID. If the new address doesn't belong to you, it's advisable to clear all keys, ensuring the new owner can start their Urbit from scratch without access to any previous information.",
  },
  SET_MANAGEMENT_PROXY: {
    title: "Set Management Proxy",
    body: "Setting a management proxy allows you to grant another address control over your network keys and sponsorship settings without transferring full ownership of your identity. The management proxy can configure network keys and sponsorship changes on behalf of the owner.",
  },

  SET_SPAWN_PROXY: {
    title: "Set Spawn Proxy",
    body: "Setting a spawn proxy allows you to grant another address control to create, or 'spawn', new Urbit identities on behalf of the owner. It allows the owner to delegate the spawning process to another entity while retaining overall control and ownership",
  },
  TRANSACTION_HISTORY: {
    title: "Transaction History",
    body: "This screen shows you the transaction history of your Urbit ID. It gets this data from Ethereum.",
  },
  SIGIL_DESIGNER: {
    title: "Sigil Designer",
    body: "This page allows you to modify the color scheme of Urbit sigils.",
  },

  CONVERT_MASTER_TICKET: {
    title: "Master Ticket",
    body: "Converting to a master ticket creates an Ethereum wallet using Urbit's HD Wallet system. This wallet manages all your Urbit ID keys with a single passphrase, making key management easier. Find out more about Urbit's HD Wallet <a href='https://docs.urbit.org/manual/id/hd-wallet' target='_blank' rel='noopener noreferrer'>here.</a>",
  },
  MANAGE_ID: {
    title: "Manage ID",
    body: "This page shows you your Urbit ID. You can see its place in the spawning hierarchy, its Azimuth point and whether your Urbit is currently online. It also is a gateway to your Settings.",
  },
  SPAWNING: {
    title: "Spawning",
    body: "Here, you can spawn planets from your star. Browse through all the possible planets your star can spawn, and use various filters to find the perfect planet. Additionally, you can check the rarity score of each planet in the top right corner which goes from 0-100. (NOT YET IMPLEMENTED)",
  },
};

export const ALERT_MODAL_TEXT = {
  SETTINGS: {
    title: "Caution",
    body: "Changes made within Setttings are irreversible. They can affect the ownership of your Urbit ID and can interfere with your Urbit's performance and networking capabilities if not done correctly.",
  },
  STAR_OFFLINE: {
    title: "Currently Offline",
    body: "The selected star seems to be offline. <br/> </br> This can affect the performance of your Urbit. You might not be able to find peers, receive updates or join groups. Do you want to continue anyway?",
  },
  FACTORY_RESET: {
    title: "Caution",
    body: "Factory Resetting your Urbit will cause it to lose all connections on the network and reset its networking keys. Only proceed if you are sure this is the only option.",
  },
};
