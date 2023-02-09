const tokenKey = 'token';
const userKey = 'user';

const saveUser = (user) => {
  localStorage.setItem(userKey, JSON.stringify(user));
};

const saveAuthToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

const getCurrentUser = () => JSON.parse(localStorage.getItem(userKey)) || null;

const getAuthToken = () => localStorage.getItem(tokenKey) || null;

const logoutUser = () => {
  localStorage.removeItem(userKey);
  localStorage.removeItem(tokenKey);
};

const auth = {
  saveUser,
  saveAuthToken,
  getCurrentUser,
  getAuthToken,
  logoutUser,
};

export default auth;
