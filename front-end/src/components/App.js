import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles.js";
import PrivatePage from "./PrivatePage.js";

import Missing from "./missing/Missing.js";
import Owned from "./owned/Owned.js";
import Doubled from "./doubled/Doubled.js";

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/missing" element={<Missing />}/>
          <Route path="/" element={<Owned />}/>
          <Route path="/doubled" element={<Doubled />}/>
          <Route element={<PrivatePage />}>

          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
