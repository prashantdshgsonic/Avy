import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const authApi = createApi ({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: backendUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.userToken
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
                return headers
            }
        }
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => '/api/user/light-profile'
        })
    })
})

export const { useGetUserDetailsQuery } = authApi