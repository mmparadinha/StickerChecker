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
  const authorization = JSON.parse(localStorage.getItem('shortly'));
  const config = {
    headers: {
      authorization: `Bearer ${authorization.token}`,
    }
  };
  return config;
};

function postUrl(url) {
    const config = Header();
    const promise = axios.post(`${URL_BASE}/urls/shorten`, url, config);
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

function getAllStickers() {
  const promise = axios.get(`${URL_BASE}/`);
  return promise;
}

export { postSignUp, postLogin, getAllStickers };