import { Routes, Route } from "react-router-dom";
import SeedLogin from "./routes/SeedLogin";
import Wallet from "./routes/Wallet";
import ProtectedRoute from "./routes/ProtectedRoute";
import Manage from "./routes/Manage";
import MainLogin from "./routes/MainLogin";
import Advanced from "./routes/Advanced";
import Sponsor from "./routes/Sponsor";
import ManagementAddress from "./routes/ManagementAddress";
import Ownership from "./routes/Ownership";
import MasterTicket from "./routes/MasterTicket";
import NetworkKeys from "./routes/NetworkKeys";
import SigilGenerator from "./routes/SigilGenerator";
import Onboarding from "./routes/Onboarding";
import TransactionHistory from "./routes/TransactionHistory";

const routeConfigs = [
  { path: "/", element: <MainLogin />, protected: false },
  { path: "/seed-login", element: <SeedLogin />, protected: false },
  { path: "/wallet", element: <Wallet />, protected: true },
  { path: "/onboarding", element: <Onboarding />, protected: true },
  { path: "/manage", element: <Manage />, protected: true },
  { path: "/manage/advanced", element: <Advanced />, protected: true },
  { path: "/manage/sponsor", element: <Sponsor />, protected: true },
  { path: "/manage/ownership", element: <Ownership />, protected: true },
  { path: "manage/master-ticket", element: <MasterTicket />, protected: true },
  { path: "/manage/network-keys", element: <NetworkKeys />, protected: true },
  {
    path: "/manage/history",
    element: <TransactionHistory />,
    protected: true,
  },
  {
    path: "manage/sigil-generator",
    element: <SigilGenerator />,
    protected: true,
  },
  {
    path: "/manage/management-key",
    element: <ManagementAddress />,
    protected: true,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routeConfigs.map(({ path, element, protected: isProtected }) =>
        isProtected ? (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ) : (
          <Route key={path} path={path} element={element} />
        )
      )}
    </Routes>
  );
};

export default AppRoutes;
