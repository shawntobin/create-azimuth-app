import "../App.css";
import "../fonts.css";
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
            className: "font-[700] text-[20px]",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              fontWeight: "500",
            },

            success: {
              iconTheme: {
                primary: "#AAE68C",
                secondary: "black",
              },
              style: {
                background: "#AAE68C",
                color: "black",
                borderRadius: "99px",
              },
            },
            error: {
              style: {
                background: "#E72E2E", //"#d9534f",
                color: "black",
                borderRadius: "99px",
              },
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
