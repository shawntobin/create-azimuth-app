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
    "/manage/advanced": "Advanced",
    "/manage/sponsor": "Sponsor",
    "/manage/ownership": "Ownership",
    "/manage/master-ticket": "Master Ticket",
    "/manage/network-keys": "Network Keys",
    "/history": "Transaction History",
    "/sigil-generator": "Sigil Generator",
    "/manage/management-key": "Management Address",
  };

  return breadcrumbMap[path] || path;
};
