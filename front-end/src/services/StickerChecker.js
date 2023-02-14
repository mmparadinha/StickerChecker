import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_BASE_URL;

function postSignUp(registration) {
  const promise = axios.post(`${URL_BASE}/signup`, registration);
  return promise;
}

function postLogin(login) {
  const promise = axios.post(`${URL_BASE}/signin`, login);
  return promise;
}

function Header() {
  const authorization = JSON.parse(localStorage.getItem('sticker-checker'));
  const config = {
    headers: {
      Authorization: `Bearer ${authorization.token}`,
    }
  };
  return config;
}

function removeSticker(stickerId) {
  const config = Header();
  const promise = axios.delete(`${URL_BASE}/${stickerId}`, config);
  return promise;
}

//axios.put() com problema, falha em definir o headers enquanto o restante funciona OK
function removeDoubled(stickerId) {
  const authorization = JSON.parse(localStorage.getItem('sticker-checker'));
  const promise = axios({
    method: 'put',
    url: `${URL_BASE}/decrease/${stickerId}`,
    headers: {
      Authorization: `Bearer ${authorization.token}`
    },
    data: {},
  });
  return promise;
}

function addNewSticker(stickerId) {
  const authorization = JSON.parse(localStorage.getItem('sticker-checker'));
  const promise = axios({
    method: 'put',
    url: `${URL_BASE}/increase/${stickerId}`,
    headers: {
      Authorization: `Bearer ${authorization.token}`
    },
    data: {},
  });
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

function getAlbumProgress() {
  const config = Header();
  const promise = axios.get(`${URL_BASE}/status`, config);
  return promise;
}

export { postSignUp, postLogin, removeSticker, removeDoubled, addNewSticker, getOwnedStickers, getDoubledStickers, getMissingStickers, getAlbumProgress };
