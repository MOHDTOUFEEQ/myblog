// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
    message: '', // New property for handling messages
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
            state.message = action.payload.message || 'Login successful!';
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.message = 'You have been logged out.';
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = '';
        },
    },
});

export const { login, logout, setMessage, clearMessage } = authSlice.actions;
export default authSlice;
