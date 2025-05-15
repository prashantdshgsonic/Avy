import { createSlice } from "@reduxjs/toolkit";
import { createCourse, createLesson, createModule, getAllCourses, getCourseInfo, deleteCourse, deleteLesson, updateLesson, usersCompleted, usersInProgress, createNFT } from "./adminCourseActions";

// initialize userToken from local storage
// const userToken = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null

const initialState = {
  loading: false,
  allCourses: null, // for list of courses created by admin
  courseInfo: {}, // for course object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  courseLoaded: false,
  moduleUpdated: false,
  lessonUpdated: false,
  textLessonUpdated: false, // for text lesson
  completedUsers: [], // for users who completed the course
  progressUsers: [], // for usersInProgress
  successNFT: {}, // { userId: boolean }
  nftLoading: {}, // { userId: boolean }
  nftError: {},
  // nftCollectionAddress: {},
}

const adminCourseSlice = createSlice({
  name: "adminCourse",
  initialState,
  reducers: {
    setCourseData: (state, { payload }) => {
      state.courseInfo = { ...payload }
    },
    sortByModule(state, { payload }) {
      if (payload) {
        state.allCourses.sort((a, b) => a.modules.length - b.modules.length);
      } else if (!payload) {
        state.allCourses.sort((a, b) => b.modules.length - a.modules.length);
      }
    },
    sortByPrice(state, { payload }) {
      if (payload) {
        state.allCourses.sort((a, b) => a.price - b.price);
      } else if (!payload) {
        state.allCourses.sort((a, b) => b.price - a.price);
      }
    },
    sortById(state, { payload }) {
      if (payload) {
        state.allCourses.sort((a, b) => a.id - b.id);
      } else if (!payload) {
        state.allCourses.sort((a, b) => b.id - a.id);
      }
    },
    deleteCourseById (state, { payload }) {
      state.allCourses = state.allCourses.filter((elem) => elem.id !== payload);
    },
    searchByTitle(state, { payload }) {
      if (state.allCourses) {
        state.allCourses = state.allCourses.filter((course) =>
        course.title.toLowerCase().includes(payload.toLowerCase())
      );
      }
      
    },
  },
  extraReducers: {
    [getAllCourses.pending]: (state) => {
      state.loading = true

    },
    [getAllCourses.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.allCourses = [...payload]
    },
    [getAllCourses.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = {...payload}
    },

    [getCourseInfo.pending]: (state) => {
      state.loading = true

    },
    [getCourseInfo.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.courseInfo = {...payload}
  
    },
    [getCourseInfo.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [createCourse.pending]: (state) => {
      state.loading = true
    },
    [createCourse.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.courseInfo = payload
      state.courseLoaded = true
      state.success = true
    },
    [createCourse.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    [createModule.pending]: (state) => {
      state.loading = true

    },
    [createModule.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.moduleUpdated = true
    },
    [createModule.rejected]: (state, { payload }) => {
      state.error = payload
    },

    [createLesson.pending]: (state) => {
      state.loading = true
    },
    [createLesson.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.lessonUpdated = true
    },
    [createLesson.rejected]: (state, { payload }) => {
      state.error = payload
    },
    
    //  delete course
    [deleteCourse.pending]: (state) => {
      state.loading = true;
    },
    [deleteCourse.fulfilled]: (state, { meta }) => {
      state.loading = false;
      state.allCourses = state.allCourses.filter(
        (course) => course.id !== meta.arg.courseId
      );
    },
    [deleteCourse.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //delete lesson
    [deleteLesson.pending]: (state) => {
      state.loading = true;
    },
    [deleteLesson.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.lessonUpdated = true;
      state.courseInfo.items = state.courseInfo.items.filter((lesson) => lesson.id !== payload.lessonId);
    },
    [deleteLesson.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //update lesson
    [updateLesson.pending]: (state) => {
      state.loading = true;
    },
    [updateLesson.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.lessonUpdated = true;
      const index = state.courseInfo.items.findIndex((lesson) => lesson.id === payload.id);
      if (index !== -1) {
        state.courseInfo.items[index] = payload;
      }
    },
    [updateLesson.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // users Completed
    [usersCompleted.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [usersCompleted.fulfilled]: (state, action) => {
      console.log("API response:", action.payload);
      state.loading = false;
      state.completedUsers = action.payload;
    },
    [usersCompleted.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // users in Progress
    [usersInProgress.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [usersInProgress.fulfilled]: (state, action) => {
      console.log("API response:", action.payload);
      state.loading = false;
      state.progressUsers = action.payload;
    },
    [usersInProgress.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //createNFT
    [createNFT.pending]: (state, action) => {
      const userId = action.meta.arg.userId;
      state.nftLoading[userId] = true;
      state.successNFT[userId] = false;
      state.nftError[userId] = null;
    },    
    [createNFT.fulfilled]: (state, action) => {
      console.log("API response NFT:", action.payload);
      const userId = action.meta.arg.userId;
      if (!userId) {
        console.error("error: userId not found in action.meta.arg!");
        return;
      }
      state.nftLoading[userId] = false;
      state.successNFT[userId] = true;
      // state.nftCollectionAddress[userId] = nftCollectionAddress || null;
    },    
    [createNFT.rejected]: (state, action) => {
      console.error("Error NFT:", action.payload, action.meta.arg.userId);
      const userId = action.meta.arg.userId;
      state.nftLoading[userId] = false;
      state.successNFT[userId] = false;
      state.nftError[userId] = action.payload || "Error creating NFT";  
    },

  }
})

export const { setCourseData, searchByTitle, sortById, sortByModule, sortByPrice, deleteCourseById  } = adminCourseSlice.actions
export default adminCourseSlice.reducer