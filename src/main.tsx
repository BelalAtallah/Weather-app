import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { store } from "./store/store";
import App from "./App";
import { createRoot } from "react-dom/client";
import { FiveDayForecast } from "./features/weather/components/five-day-forecast/five-day-forecast";

let rootElement: Element | null = null;

document.addEventListener("DOMContentLoaded", () => {
  rootElement = document.getElementById("root") as HTMLElement;
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="" element={<App />} />
          <Route path="yesy" element={<FiveDayForecast />} />
        </Routes>
      </Router>
    </Provider>
  );
});
