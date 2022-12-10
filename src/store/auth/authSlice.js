import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
       status: 'not-authenticated',
       user: {},
       errorMessage: null,
   },
   reducers: {
       onChecking: (state)=>{
            state.status='checking';
            state.user={};
            state.errorMessage=null;
       }
   }
});


// Action creators are generated for each case reducer function
export const { onChecking } = authSlice.actions;