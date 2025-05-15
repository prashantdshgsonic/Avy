import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const userToken = localStorage.getItem('userToken');

// configure header's Content-Type as JSON
//const config = { headers: { Authorization: `Bearer ${userToken}`}};

export const getAllCourses = createAsyncThunk('/api/admin/course/get-all-courses ',
async ( userToken,{ rejectWithValue }) => {
  //console.log("Token ", userToken);
  const configa = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/course/get-all-courses`,
        configa
      )
      // console.log("All courses list from backend", data);
      return data
      
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        //console.log(error);
        return rejectWithValue(error.response.data.message)
      } else {
        //console.log(error);
        return rejectWithValue(error.message)
      }
    }
  }
)

export const getCourseInfo = createAsyncThunk('/api/admin/course/get-full-course',
async ({courseId, userToken}, { rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/course/get-full-course/${courseId}`,
        config
      )
      // console.log("GOT COURSE INFO FROM BACKEND!! TYPE OF DATA =", typeof(data));      
      console.log("getCourseInfo - updated course");
      console.log("getCourseInfo", data);
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

export const createCourse = createAsyncThunk('/api/admin/course/create-course',
async ({formData, userToken}, { rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`, "Content-Type": "multipart/form-data"}};
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/course/create-course`,
        formData , 
        config
      )
      console.log("COURSE CREATED");

      // const name = formData.get("title");
      // const description = formData.get("description");
      // const category = formData.get("category");
      // const level = formData.get("level");
      // const courseCode = formData.get("courseCode");
      // const imageFile = formData.get("courseImage");
      // const configaa = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // };

      // const formData2 = new FormData();
      // formData2.append('name', name);
      // formData2.append('symbol', courseCode); // courseCode is mapped to symbol
      // formData2.append('description', description);
      // formData2.append('imageFile', imageFile); // imageFile should be a File object
      // formData2.append('externalUrl', ""); // Add if needed

      // const response = await axios.post(
      //   "http://localhost:5000/api/create-collection",
      //   formData2,
      //   configaa
      // );
      // // console.log("TYPE OF data from BACKEND after request", typeof(data));
      // // console.log("COURSE", data);
      // return data
    } catch (error) {
      //  custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const createModule = createAsyncThunk('/api/admin/module/create-module',
async ({courseId, newModule, userToken}, { dispatch, rejectWithValue }) => {
  const config = { headers: { Authorization: `Bearer ${userToken}`}};
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/module/create-module`,
        newModule , 
        config
      )
      // console.log("MODULE CREATED", data);
      // console.log("MODULE!! TYPE OF DATA =", typeof(data));
      dispatch(getCourseInfo({courseId, userToken}))
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

export const createLesson = createAsyncThunk('/api/admin/lesson/create-lesson',
  async ({courseId, newLesson, userToken}, { dispatch, rejectWithValue }) => {
    console.log("Sending request from action:", newLesson);
  const config = { 
    headers: { Authorization: `Bearer ${userToken}`, 
    "Content-Type": "multipart/form-data"
    }
  };
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/lesson/create-lesson`,
        newLesson, 
        config
      )
        console.log("newLesson (from action):", Array.from(newLesson.entries()));

      console.log("LESSON CREATED!");
      // console.log("TYPE OF data from BACKEND after request", typeof(data));
      // console.log("updating course...");
      console.log("Response received:", data);
      

      dispatch(getCourseInfo({courseId, userToken}))
     
      return data
      
    } catch (error) {
        if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const updateCourse = createAsyncThunk('/api/admin/update-course',
async ({ courseId, courseInfo }, { rejectWithValue }) => {
  const config = { 
    headers: { Authorization: `Bearer ${userToken}` }
  };
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/update-course`,
        { courseId, courseInfo },
        config
      )
    
      //console.log(data);
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

//updateLesson
export const updateLesson = createAsyncThunk('/api/admin/lesson/update-lesson',
  async ({ courseId, lessonId, updatedLesson, userToken }, { dispatch, rejectWithValue }) => {
    const config = { 
      headers: { Authorization: `Bearer ${userToken}`, 
      "Content-Type": "multipart/form-data"
      }
    };
    
    // console.log("courseId from action", courseId)
    // console.log("lessonId from action", lessonId)
    console.log("updatedLesson", updatedLesson);
    console.log("updatedLesson (from action):", Array.from(updatedLesson.entries()));
    // console.log("userToken from action", userToken)
    // console.log("moduleId from action", moduleId)

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/lesson/update-lesson/${lessonId}`,
        updatedLesson,
        config
      );      

      dispatch(getCourseInfo({ courseId, userToken }));
      return data;
    } catch (error) {
      
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//deleteLesson
export const deleteLesson = createAsyncThunk('/api/admin/lesson/delete-lesson',
  async ({ lessonId, courseId, userToken }, { dispatch, rejectWithValue }) => {
    const config = { headers: { Authorization: `Bearer ${userToken}` } };
    console.log('Deleting lesson with data:', { lessonId, courseId, userToken });

    try {
      const response = await axios.delete(`${backendUrl}/api/admin/lesson/delete-lesson/${lessonId}`, config);
      console.log('Delete lesson response:', response.data);

      dispatch(getCourseInfo({ courseId, userToken }));
      return { lessonId };
    } catch (error) {
      console.error('Error deleting lesson:', error);

      if (error.response && error.response.data.message) {
        console.error('Error details:', error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.error('Error message:', error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

//deleteCourse
export const deleteCourse = createAsyncThunk('/api/admin/course/delete-course',
  async ({ courseId }, { rejectWithValue }) => {
    const config = { 
      headers: { 
        Authorization: `Bearer ${localStorage.getItem('userToken')}` 
      }
    };
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/course/delete-course/${courseId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Server Error deleting course');
      }
      return rejectWithValue('Network error');
    }
  }
);

// text questions in Chat-Bot
export const processUserQuestion = createAsyncThunk(
  '/api/user/ask-question',
  async ({ question: input, lessonId, userToken }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    try {
      // console.log("Payload sent to backend:", { question: input, lessonId, userToken });
    
      const response = await axios.post(
        `${backendUrl}/api/user/ask-question`,
        { question: input, lessonId }, // body
        config // headers
      );

      const responseData = response.data;
            // console.log("responseData", responseData);
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

//voice question in ChatBot
export const processVoiceQuestion = createAsyncThunk(
  '/api/user/ask-voice-question',
  async ({ lessonId, userToken }, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    try {
        // console.log("ready link:", response);
      const response = await axios.post(
        `${backendUrl}/api/user/ask-voice-question/${lessonId}`,
        {}, // body  - empty. lessonId in URL
        config
      );
      const responseData = response.data;
            // console.log("responseData Voice", responseData);
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

//display users completed Course
export const usersCompleted = createAsyncThunk(
  'api/admin/course/users-completed',
  async ({ courseId }, { rejectWithValue }) => { 
    
    const userToken = localStorage.getItem('userToken'); 
    // console.log("userToken", userToken)

    const config = { 
      headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
      // console.log("Запрос:", `${backendUrl}/api/admin/course/users-completed/${courseId}`);
      // console.log("Заголовки:", config);

      const { data } = await axios.get(
        `${backendUrl}/api/admin/course/users-completed/${courseId}`,        
        config
      );

      console.log("returned data", data); //return  [] users
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//display users inProgressCourse
export const usersInProgress = createAsyncThunk(
  'api/admin/course/users-in-progress',
  async ({ courseId }, { rejectWithValue }) => { 
    const userToken = localStorage.getItem('userToken'); 
    // console.log("userToken", userToken)

    const config = { 
      headers: { Authorization: `Bearer ${userToken}` }
    };

    try {
      // console.log("Запрос:", `${backendUrl}/api/admin/course/users-in-progress/${courseId}`);
      // console.log("Заголовки:", config);
      
      const { data } = await axios.get(
        `${backendUrl}/api/admin/course/users-in-progress/${courseId}`, 
         config
      );

      console.log("returned data", data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//NFT button 
export const createNFT = createAsyncThunk(
  'nft/createNFT',
  async ({ userId, courseId, nftFormData }, { rejectWithValue }) => { 
    const userToken = localStorage.getItem('userToken'); 
    // console.log("userToken", userToken)
    console.log('userId in action:', userId);
    console.log('courseId in action:', courseId);
    console.log('nftFormData in action:', nftFormData);

    const config = { 
      headers: { Authorization: `Bearer ${userToken}`,
      "Content-Type": "multipart/form-data" 
      }
    };
    
    try {
      console.log("sending from action:", nftFormData);
      console.log("Final API URL:", `${backendUrl}/api/admins/issue-nft/${userId}/${courseId}`);

      const { data } = await axios.post(
        `${backendUrl}/api/admins/issue-nft/${userId}/${courseId}`, 
        nftFormData,
        config
      );

      console.log("nft responce", data);
     
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
