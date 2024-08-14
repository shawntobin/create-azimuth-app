import { ROUTE_MAP } from "../routes/routeMap";

export const getBreadcrumbName = (path, params) => {
  const breadcrumbMap = {
    [ROUTE_MAP.LOGIN]: "Log in",
    [ROUTE_MAP.ACTIVATION]: "Activation",
    [ROUTE_MAP.SIGIL_DESIGNER]: "Sigil Designer",
    [ROUTE_MAP.IDS]: "IDs",
    [ROUTE_MAP.MANAGE]: `${params?.patp}`,
    [ROUTE_MAP.ONBOARDING]: "Onboarding",
    [ROUTE_MAP.SET_UP]: "Set Up",
    [ROUTE_MAP.SPAWN_PROXY]: "Spawn Proxy",
    [ROUTE_MAP.SETTINGS]: "Settings",
    [ROUTE_MAP.SPONSOR]: "Change Sponsor",
    [ROUTE_MAP.OWNERSHIP]: "Transfer",
    [ROUTE_MAP.MASTER_TICKET]: "Master Ticket",
    [ROUTE_MAP.NETWORK_KEYS]: "Network Keys",
    [ROUTE_MAP.HISTORY]: "Transaction History",
    [ROUTE_MAP.SPAWN]: "Spawn Planets",
    [ROUTE_MAP.MANAGEMENT_KEY]: "Management Proxy",
  };

  // const breadcrumbMap = {
  //   "/": "Urbit ID",
  //   "/login": "Log in",
  //   "/seed-login": "Seed Login",
  //   "/activation": "Activation",
  //   "/sigil-designer": "Sigil Designer",
  //   "/ids": "IDs",
  //   "/ids/manage": `${params?.patp}`,
  //   "/ids/onboarding": "Onboarding",
  //   "/ids/manage/set-up": "Set Up",
  //   "/ids/manage/settings/spawn-proxy": "Spawn Proxy",
  //   "/ids/manage/settings": "Settings",
  //   "/ids/manage/settings/sponsor": "Change Sponsor",
  //   "/ids/manage/settings/ownership": "Transfer Ownership",
  //   "/ids/manage/settings/master-ticket": "Master Ticket",
  //   "/ids/manage/settings/network-keys": "Network Keys",
  //   "/ids/manage/history": "Transaction History",
  //   "/ids/manage/settings/spawn": "Spawn Planets",
  //   "/ids/manage/settings/management-key": "Management Proxy",
  // };

  return breadcrumbMap[path] || path;
};
