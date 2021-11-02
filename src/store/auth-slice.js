import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthReady: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    isAuthReady(state, action) {
      state.isAuthReady = true;
      state.user = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
