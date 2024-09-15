import { Routes, Route } from "react-router-dom";
import Wallet from "./routes/Wallet";
import ProtectedRoute from "./routes/ProtectedRoute";
import MasterTicketLogin from "./routes/MasterTicketLogin";
import LandingPage from "./routes/LandingPage";
import MyApp from "./routes/MyApp";

const routeConfigs = [
  { path: "/", element: <LandingPage />, protected: false },
  { path: "/ticket-login", element: <MasterTicketLogin />, protected: false },
  { path: "/ids", element: <Wallet />, protected: true },
  { path: "/my-app", element: <MyApp />, protected: true },
];

const AppRoutes = () => {
  return (
    <Routes>
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
