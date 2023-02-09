import auth from '../services/auth';

const Logout = () => {
  auth.logoutUser();
  window.location = '/';
  return null;
};

export default Logout;
