export const getBreadcrumbName = (path, params) => {
  const breadcrumbMap = {
    "/": "Urbit ID",
    "/login": "Log in",
    "/seed-login": "Seed Login",
    "/activation": "Activation",
    "/star-scanner": "Star Scanner",
    "/wallet": `Your IDs / ${params?.address}`,
    "/onboarding": "Onboarding",
    "/hosting": "Hosting",
    "/manage": "Home",
    "/manage/spawn-proxy": "Spawn Proxy",
    "/manage/advanced": "Advanced",
    "/manage/sponsor": "Sponsor",
    "/manage/ownership": "Ownership",
    "/manage/master-ticket": "Master Ticket",
    "/manage/network-keys": "Network Keys",
    "/history": "Transaction History",
    "/sigil-designer": "Sigil Designer",
    "/manage/management-key": "Management Proxy",
  };

  return breadcrumbMap[path] || path;
};
