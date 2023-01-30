import axios from 'axios';

const URL_BASE = 'http://localhost:4000';

function postSignUp(registration) {
  const promise = axios.post(`${URL_BASE}/signup`, registration);
  return promise;
};

function postLogin(login) {
  const promise = axios.post(`${URL_BASE}/signin`, login);
  return promise;
};

function Header() {
  const authorization = JSON.parse(localStorage.getItem('stickerchecker'));
  const config = {
    headers: {
      authorization: `Bearer ${authorization.token}`,
    }
  };
  return config;
};

function unmarkSticker(userStickerId) {
    const config = Header();
    const promise = axios.delete(`${URL_BASE}/${userStickerId}`, config);
    return promise;
}

function getUserUrls() {
    const config = Header();
    const promise = axios.get(`${URL_BASE}/users/me`, config);
    return promise;
}

function deleteUrl(id) {
    const config = Header();
    const promise = axios.delete(`${URL_BASE}/urls/${id}`, config);
    return promise;
}

function getOwnedStickers() {
  const promise = axios.get(`${URL_BASE}/owned`);
  return promise;
}

function getDoubledStickers() {
  const promise = axios.get(`${URL_BASE}/doubled`);
  return promise;
}

function getMissingStickers() {
  const promise = axios.get(`${URL_BASE}/missing`);
  return promise;
}

export { postSignUp, postLogin, unmarkSticker, getOwnedStickers, getDoubledStickers, getMissingStickers };