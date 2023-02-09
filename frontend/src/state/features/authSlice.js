import { createSlice, combineReducers } from '@reduxjs/toolkit';
import auth from '../../services/auth';

const loggedInUser = auth.getCurrentUser();

const initialAuthState = {
  isLoggedIn: !!loggedInUser,
  user: loggedInUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
});

export default combineReducers({
  userLogin: authSlice.reducer,
});

/* SELECTORS */
export const isUserLoggedIn = (state) => state.auth.userLogin.isLoggedIn;
export const selectUser = (state) => state.auth.userLogin.user;
export const getUserRole = (state) => {
  const role = state.auth.userLogin.user?.role.roleName;
  return !role ? '' : role.charAt(0).toUpperCase() + role.slice(1);
};
