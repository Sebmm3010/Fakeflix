import { createSlice } from '@reduxjs/toolkit';

const init = localStorage.getItem('invitado') !==null
    ? { status: 'authenticated', user: JSON.parse(localStorage.getItem('invitado')), errorMessage: null }
    : { status: 'not-authenticated', user: { uid: '', displayName: '', email: '' }, errorMessage: null, }

export const authSlice = createSlice({
    name: 'auth',
    initialState: init,
    // {
    //     status: 'not-authenticated',
    //     user: {
    //         uid: '',
    //         displayName: '',
    //         email: ''
    //     },
    //     errorMessage: null,
    // },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {
                uid: '',
                displayName: '',
                email: ''
            };
            state.errorMessage = null;
        },
        onLogin: (state, { payload }) => {

            if (payload.uid === '001guess') {
                localStorage.setItem('invitado', JSON.stringify(payload));
            }


            state.status = 'authenticated';
            state.user = {
                uid: payload.uid,
                displayName: payload.displayName,
                email: payload.email
            };
            state.errorMessage = null
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {
                uid: '',
                displayName: '',
                email: ''
            };
            state.errorMessage = payload?.errorMsg;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogout, onLogin } = authSlice.actions;