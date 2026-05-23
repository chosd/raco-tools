// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HashRouter, Routes, Route, } from "react-router-dom";

import Home from "../pages/Home";
import JsonFormatterPage from "../pages/JsonFormatterPage";
import LogViewerPage from "../pages/LogViewerPage";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/json"
          element={<JsonFormatterPage />}
        />

        <Route
          path="/log"
          element={<LogViewerPage />}
        />
      </Routes>
    </HashRouter>
  );
}