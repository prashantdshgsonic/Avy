import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const courseApi = createApi ({
    reducerPath: 'courseApi',
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
        getCourseDetails: builder.query({
            query: (courseId) => `/api/admin/course/get-full-course/${courseId}`
        })
    })
})

export const { useGetCourseDetailsQuery } = courseApi