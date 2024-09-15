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
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "font-[700] text-[20px]",
            duration: 5000,
            style: {
              background: "black", //"#363636",
              color: "#fff",
              fontWeight: "500",
              height: "33px",
              borderColor: "white",
              border: "1px solid",
            },

            success: {
              iconTheme: {
                primary: "#AAE68C",
                secondary: "black",
              },
              style: {
                background: "#AAE68C",
                color: "black",
                borderRadius: "10px",
              },
            },
            error: {
              style: {
                background: "#E72E2E",
                color: "black",
                borderRadius: "10px",
              },
            },
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
