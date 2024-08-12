export const getBreadcrumbName = (path, params) => {
  const breadcrumbMap = {
    "/": "Urbit ID",
    "/login": "Log in",
    "/seed-login": "Seed Login",
    "/activation": "Activation",
    "/wallet": `Your IDs / ${params?.address}`,
    "/onboarding": "Onboarding",
    "/manage/set-up": "Set Up",
    "/manage": "Home",
    "/manage/settings/spawn-proxy": "Spawn Proxy",
    "/manage/settings": "Settings",
    "/manage/settings/sponsor": "Change Sponsor",
    "/manage/settings/ownership": "Transfer Ownership",
    "/manage/settings/master-ticket": "Master Ticket",
    "/manage/settings/network-keys": "Network Keys",
    "/manage/history": "Transaction History",
    "/manage/settings/spawn": "Spawn Planets",
    "/sigil-designer": "Sigil Designer",
    "/manage/settings/management-key": "Management Proxy",
  };

  return breadcrumbMap[path] || path;
};
