import { createSlice } from "@reduxjs/toolkit";
import { userLogin, 
        registerUser, 
        userLoginWithVoice, 
        registerUserWithVoice, 
        navigateByVoice 
} from "./authActions";

// initialize userToken from local storage. and if localStorage is - putted in initialState
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken') 
  : null

const initialState = {
    loading: false,
    userToken: userToken, // for storing the JWT-token
    error: null,
    response: null, // for server response
    success: false, // for monitoring the registration process
  }

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userToken'); // deletes token from storage
            sessionStorage.clear(); // clear sessionStorage
            state.loading = false;
            state.userToken = null;
            state.error = null;
            state.response = null;
          },
        resetResponse: (state) => {
            state.response = null;
        },
    },

    extraReducers: {
      
      // login user
    [userLogin.pending]: (state) => {
        state.loading = true
        state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.userInfo = null 
        state.success = true
        state.userToken = payload.accessToken  // payload.accessToken returns from server  
        localStorage.setItem('userToken', payload.accessToken); // save token in localStorage
    },
    [userLogin.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
    },

    // login With Voice
    [userLoginWithVoice.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLoginWithVoice.fulfilled]: (state, action) => {
        state.loading = false
        state.userToken = action.payload.accessToken //accessToken is JWT, wich send by server. 
        localStorage.setItem('userToken', action.payload.accessToken)  // save token in localStorage
      },
    [userLoginWithVoice.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload;
    },

      // register user
      [registerUser.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [registerUser.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.success = true // registration successful
        state.userInfo = payload // to renew userInfo
      },
      [registerUser.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },

      // register user with Voice
      [registerUserWithVoice.pending]: (state) => {
        state.loading = true
        state.error = null
      },
      [registerUserWithVoice.fulfilled]: (state) => {
        state.loading = false
        state.success = true // registration successful
      },
      [registerUserWithVoice.rejected]: (state, { payload }) => {
        state.loading = false
        state.error = payload
      },

      // navigate By Voice
      [navigateByVoice.pending]: (state) => {
        state.loading = true;
        state.error = null;
        state.response = null;
      },
      [navigateByVoice.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.response = payload; // to save server response(exp.'dashboard')
      },
      [navigateByVoice.rejected]: (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      },
    }
})

export const { logout, resetResponse } = authSlice.actions
export default authSlice.reducer;