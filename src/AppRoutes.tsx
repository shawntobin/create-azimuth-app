import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Wallet from "./routes/Wallet";
import Operations from "./routes/Operations";
import ProtectedRoute from "./routes/ProtectedRoute";

const routeConfigs = [
  { path: "/", element: <Login />, protected: false },
  { path: "/wallet", element: <Wallet />, protected: true },
  { path: "/operations", element: <Operations />, protected: true },
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
