import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'


const backendUrl = process.env.REACT_APP_BACKEND_URL;


export const userLogin = createAsyncThunk(
    '/api/auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          { login: email, password: password },
          config
        )

        // store user's token in local storage
        localStorage.setItem('userToken', data.accessToken)
        return data
        
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  //login With voice
export const userLoginWithVoice = createAsyncThunk(
    '/api/auth/voice-pass-login',
    async (_, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await axios.post(
          `${backendUrl}/api/auth/voice-pass-login`,
          {}, // body  - empty
          config
        );
        const responseData = response.data; //contain token
        console.log("responseData LoginVoice", responseData);

         // store user's token in local storage
        localStorage.setItem('userToken', responseData.accessToken);

        return responseData;
        
      } catch (error) {     
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

export const registerUser = createAsyncThunk(
    '/api/auth/register',
    async ({ firstName, email, password, roleName }, { rejectWithValue }) => {
      try {
        console.log("Data from action", { firstName, email, password, roleName });
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response = await axios.post(
          `${backendUrl}/api/auth/register`,
          { firstName, email, password, roleName },
          config
        )
        console.log("Ответ сервера response.data:", response.data);
        return response.data; 
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  //regisrt With voice
export const registerUserWithVoice = createAsyncThunk(
  '/api/auth/register-voice',
  async ( userId , { rejectWithValue }) => { // userId - string
    try {
      console.log("voice from action", userId );
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(
        `${backendUrl}/api/auth/register-voice/${userId}`,
        {}, // empty body
        config
      )
      console.log("Ответ сервера Voice:", response.data);
      return response.data; // return
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

  //navigation Assistant 
export const navigateByVoice = createAsyncThunk(
    '/api/user/request-navigation/',
    async ( _, { getState, rejectWithValue }) => { // getState - to get state from Redux
      try {
        //get token from state!
        const userToken = getState().auth.userToken; 
        console.log("Token from action from state", userToken );

        // вариант 2 
        // const userToken = localStorage.getItem('userToken') 
        // console.log("Token from action localStorage", userToken );

        const config = {
          headers: { Authorization: `Bearer ${userToken}` },
        }
        const response = await axios.post(
          `${backendUrl}/api/user/request-navigation/`,
          {}, // empty body
          config
        )
          console.log("Server responce in navigateByVoice:", response.data);
        return response.data; 
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
)