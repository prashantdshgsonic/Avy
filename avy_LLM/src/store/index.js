import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import courseSlice from './slice/courseSlice'
import offerSlice from './slice/offerSlice'
import authSlice from './slice/authSlice'
import { authApi } from '../services/authService'
import adminCourseSlice from './slice/adminCourseSlice';
import { courseApi } from '../services/adminCourseService';
import userSlice from './slice/userSlice';
import distanceSlice from './slice/distanceSlice'


export const store = configureStore({
  reducer: {
    
    user: userSlice,
    course: courseSlice,
    offer: offerSlice,
    adminCourse: adminCourseSlice,
    distance: distanceSlice,
    [courseApi.reducerPath]: courseApi.reducer,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  
    
  // middleware: (getDefaultMiddleware) =>
    
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware).concat(courseApi.middleware)
  
});