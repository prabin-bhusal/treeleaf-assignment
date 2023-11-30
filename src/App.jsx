import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Profiles from "./pages/Profiles";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route index path="/profiles" element={<Profiles />} />
          <Route index path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
