import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_BASE_URL;

function postSignUp(registration) {
  const promise = axios.post(`${URL_BASE}/signup`, registration);
  return promise;
};

function postLogin(login) {
  const promise = axios.post(`${URL_BASE}/signin`, login);
  return promise;
};

function Header() {
  const authorization = JSON.parse(localStorage.getItem('sticker-checker'));
  const config = {
    headers: {
      authorization: `Bearer ${authorization.token}`,
    }
  };
  return config;
};

function removeSticker(userStickerId) {
  const config = Header();
  const promise = axios.delete(`${URL_BASE}/${userStickerId}`, config);
  return promise;
}

function removeDoubled(userStickerId) {
  const config = Header();
  const promise = axios.update(`${URL_BASE}/decrease/${userStickerId}`, config);
  return promise;
}

function addNewSticker(userStickerId) {
  const config = Header();
  const promise = axios.update(`${URL_BASE}/increase/${userStickerId}`, config);
  return promise;
}

function getOwnedStickers() {
  const config = Header();
  const promise = axios.get(`${URL_BASE}/owned`, config);
  return promise;
}

function getDoubledStickers() {
  const config = Header();
  const promise = axios.get(`${URL_BASE}/doubled`, config);
  return promise;
}

function getMissingStickers() {
  const config = Header();
  const promise = axios.get(`${URL_BASE}/missing`, config);
  return promise;
}

export { postSignUp, postLogin, removeSticker, removeDoubled, addNewSticker, getOwnedStickers, getDoubledStickers, getMissingStickers };