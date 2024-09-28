import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  admin: false, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.admin = false
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
