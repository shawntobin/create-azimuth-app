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
import { ROUTE_MAP } from "./routes/routeMap";

const routeConfigs = [
  { path: "/", element: <LandingPage2 />, protected: false },
  { path: ROUTE_MAP.LOGIN, element: <LandingPage2 />, protected: false },
  { path: ROUTE_MAP.SEED_LOGIN, element: <SeedLogin />, protected: false },
  { path: "/ticket-login", element: <MasterTicketLogin />, protected: false },
  { path: "/activation", element: <Activation />, protected: false },
  { path: "/onboarding", element: <Onboarding />, protected: true },
  { path: ROUTE_MAP.IDS, element: <Wallet />, protected: true },

  { path: ROUTE_MAP.SET_UP, element: <Hosting />, protected: true },
  { path: ROUTE_MAP.MANAGE, element: <Manage />, protected: true },
  {
    path: ROUTE_MAP.SPAWN_PROXY,
    element: <SpawnProxy />,
    protected: true,
  },
  {
    path: ROUTE_MAP.SPAWN,
    element: <StarAnalyzer />,
    protected: false,
  },
  { path: ROUTE_MAP.SETTINGS, element: <Advanced />, protected: true },
  { path: ROUTE_MAP.SPONSOR, element: <Sponsor />, protected: true },
  {
    path: ROUTE_MAP.OWNERSHIP,
    element: <Ownership />,
    protected: true,
  },
  {
    path: ROUTE_MAP.MASTER_TICKET,
    element: <MasterTicket />,
    protected: true,
  },
  {
    path: ROUTE_MAP.NETWORK_KEYS,
    element: <NetworkKeys />,
    protected: true,
  },
  {
    path: ROUTE_MAP.HISTORY,
    element: <TransactionHistory />,
    protected: true,
  },
  {
    path: ROUTE_MAP.SIGIL_DESIGNER,
    element: <SigilGenerator />,
    protected: false,
  },
  {
    path: ROUTE_MAP.MANAGEMENT_KEY,
    element: <ManagementAddress />,
    protected: true,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      {routeConfigs.map(({ path, element, protected: isProtected }, i) =>
        isProtected ? (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute>{element}</ProtectedRoute>}
          />
        ) : (
          <Route key={i} path={path} element={element} />
        )
      )}
    </Routes>
  );
};

export default AppRoutes;
