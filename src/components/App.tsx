import "../App.css";
import AppRoutes from "../AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              fontWeight: "500",
            },

            success: {
              iconTheme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              style: {
                background: "#d9534f",
              },
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
