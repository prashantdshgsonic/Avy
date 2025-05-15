import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// initialize userToken from local storage
// const userTokenFromLocalStorage = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null

export const getUserProgressingCourses = createAsyncThunk(
    '/api/user/course/progressing',
    async (userToken, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.get(
                `${backendUrl}/api/user/course/progressing`,
                config
            )
            //console.log("List of progressing", data);
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

export const getUserCompletedCourses = createAsyncThunk(
    '/api/user/course/completed',
    async (userToken, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.get(
                `${backendUrl}/api/user/course/completed`,
                config
            )
            //console.log("List of completed", data);
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

export const getUserRecommededCourses = createAsyncThunk(
    '/api/user/course/recommended',
    async (userToken, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            const { data } = await axios.get(
                `${backendUrl}/api/user/course/recommended`,
                config
            )
            //console.log("List of recommended", data);
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