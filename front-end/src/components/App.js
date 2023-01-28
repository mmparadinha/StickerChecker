import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles.js";
import PrivatePage from "./PrivatePage.js";

import Left from "./main/Left.js";
import Owned from "./main/Owned.js";
import Doubled from "./main/Doubled.js";

function App() {
  return (
    <>
      <GlobalStyle/>
      <BrowserRouter>
        <Routes>
          <Route path="/left" element={<Left />}/>
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
