import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated',
        user: {
            displayName: '',
            email: ''
        },
        errorMessage: null,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {
                displayName: '',
                email: ''
            };
            state.errorMessage = null;
        },
        onLogin: (state, { payload })=>{
            state.status = 'authenticated';
            state.user = {
                displayName: payload.displayName,
                email: payload.email
            };
            state.errorMessage = null
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {
                displayName: '',
                email: ''
            };
            state.errorMessage = payload?.errorMsg;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogout, onLogin } = authSlice.actions;