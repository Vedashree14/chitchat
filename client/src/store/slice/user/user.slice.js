import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  selectedUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.selectedUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setSelectedUser, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
