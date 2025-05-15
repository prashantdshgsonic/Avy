import { createSlice } from "@reduxjs/toolkit";
import {
  getUserCompletedCourses,
  getUserProgressingCourses,
  getUserRecommededCourses,
} from "./courseActions";

const initialState = {
  loading: false,
  currentCourse: null,
  courseList: null,
  error: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    getSelectedCourse(state, {payload}) {
      state.currentCourse = state.courseList.find(({id}) => id === payload)
    }
  },
  extraReducers: {
    // Courses in Progress
    [getUserProgressingCourses.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserProgressingCourses.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.courseList = [...payload];
      state.success = true;
    },
    [getUserProgressingCourses.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    // Courses completed
    [getUserCompletedCourses.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserCompletedCourses.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.courseList = [...payload];
      state.success = true;
    },
    [getUserCompletedCourses.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    // Courses recommended
    [getUserRecommededCourses.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserRecommededCourses.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.courseList = [...payload];
      state.success = true;
    },
    [getUserRecommededCourses.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
  },
});

export const { getSelectedCourse } = courseSlice.actions
export default courseSlice.reducer;
