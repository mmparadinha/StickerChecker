import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../GlobalStyles.js';
import PrivatePage from './PrivatePage.js';

import Missing from './stickers/missing/Missing.js';
import Owned from './stickers/owned/Owned.js';
import Doubled from './stickers/doubled/Doubled.js';
import SignUp from './login/SignUp.js';
import SignIn from './login/SignIn.js';

import { useState } from 'react';
import UserContext from '../context/UserContext.js';

function App() {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('sticker-checker')));

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<PrivatePage />}>
              <Route path='/missing' element={<Missing />} />
              <Route path='/owned' element={<Owned />} />
              <Route path='/doubled' element={<Doubled />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
