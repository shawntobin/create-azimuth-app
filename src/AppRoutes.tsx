import { Routes, Route, Navigate } from "react-router-dom";
import SeedLogin from "./routes/SeedLogin";
import Wallet from "./routes/Wallet";
import ProtectedRoute from "./routes/ProtectedRoute";
import Manage from "./routes/Manage";
import MasterTicketLogin from "./routes/MasterTicketLogin";
import Advanced from "./routes/Advanced";
import Sponsor from "./routes/Sponsor";
import ManagementAddress from "./routes/ManagementAddress";
import Ownership from "./routes/Ownership";
import MasterTicket from "./routes/MasterTicket";
import NetworkKeys from "./routes/NetworkKeys";
import SigilGenerator from "./routes/SigilGenerator";
import Onboarding from "./routes/Onboarding";
import TransactionHistory from "./routes/TransactionHistory";
import Activation from "./routes/Activation";
import Hosting from "./routes/Hosting";
import StarAnalyzer from "./routes/StarAnalyzer";
import LandingPage from "./routes/LandingPage";
import LandingPage2 from "./routes/LandingPage2";
import SpawnProxy from "./routes/SpawnProxy";

const routeConfigs = [
  { path: "/", element: <LandingPage2 />, protected: false },
  { path: "/login", element: <LandingPage2 />, protected: false },
  { path: "/seed-login", element: <SeedLogin />, protected: false },
  { path: "/ticket-login", element: <MasterTicketLogin />, protected: false },
  { path: "/star-scanner", element: <StarAnalyzer />, protected: false },
  { path: "/activation", element: <Activation />, protected: false },
  { path: "/wallet", element: <Wallet />, protected: true },
  { path: "/onboarding", element: <Onboarding />, protected: true },
  { path: "/hosting", element: <Hosting />, protected: true },
  { path: "/manage", element: <Manage />, protected: true },
  { path: "/manage/spawn-proxy", element: <SpawnProxy />, protected: true },
  { path: "/manage/advanced", element: <Advanced />, protected: true },
  { path: "/manage/sponsor", element: <Sponsor />, protected: true },
  { path: "/manage/ownership", element: <Ownership />, protected: true },
  { path: "manage/master-ticket", element: <MasterTicket />, protected: true },
  { path: "/manage/network-keys", element: <NetworkKeys />, protected: true },
  {
    path: "/history",
    element: <TransactionHistory />,
    protected: true,
  },
  {
    path: "/sigil-designer",
    element: <SigilGenerator />,
    protected: false,
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
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
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
