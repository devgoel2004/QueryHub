import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter } from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2000,
  offset: "30px",
  transition: transitions.SCALE,
};
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
