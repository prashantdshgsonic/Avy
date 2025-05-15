import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

export const getUserData = createAsyncThunk(
  "/api/user/light-profile",
  async (userToken, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `${backendUrl}/api/user/light-profile`,
        config
      );
      // console.log("return getUserData", data);
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

export const updateUserInfo = createAsyncThunk(
  "/api/user/info/update",
  async ({ newData, userToken }, { rejectWithValue }) => {
    //console.log(userToken);
    try {
      // configure header's Content-Type as JSON
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const { data } = await axios.post(
        `${backendUrl}/api/user/info/update`,
        newData,
        config
      );
        console.log("USER UPDATED");
        console.log("NEW USER DATA", data);
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

export const updateUserImage = createAsyncThunk(
  "/api/user/info/updateImage",
  async ({ newImage, userToken }, { rejectWithValue }) => {
    //console.log("newImage", newImage);
    try {
      // configure header's Content-Type as JSON
      const config = { headers: { Authorization: `Bearer ${userToken}` } };
      const { data } = await axios.post(
        `${backendUrl}/api/user/info/updateImage`,
        newImage,
        config
      );
      // console.log("USER UPDATED");
      // console.log("NEW USER DATA", data);
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

// export const updateUserAvatar = createAsyncThunk('/api/user/info/update',
// async (newAvatarId, { rejectWithValue }) => {
//     try {
//         // configure header's Content-Type as JSON
//         const config = { headers: { Authorization: `Bearer ${userToken}`}};
//       const { data } = await axios.post(
//         `${backendUrl}/api/user/info/update`,
//         newAvatarId ,
//         config
//       )
//       console.log("USER UPDATED");
//       console.log("NEW USER DATA", data);
//       return data
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )

//

export const startNewCourse = createAsyncThunk(
  "/api/user/course/start/",
  async ({ courseId, userToken }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `${backendUrl}/api/user/course/start/${courseId}`,
        config
      );
      //console.log("Course progress data for game!!", data);
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

export const startLesson = createAsyncThunk(
  "/api/user/start-lesson/",
  async ({ lessonId, userToken }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `${backendUrl}/api/user/start-lesson/${lessonId}`,
        config
      );
      //console.log("Lesson data for game!", data);
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

export const completeLesson = createAsyncThunk(
  "/api/user/complete-lesson/",
  async ({ lessonId, userToken }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/api/user/complete-lesson/${lessonId}`,
        {},
        config
      );
      //console.log("Lesson completed!!", data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        //console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const purchaseBasic = createAsyncThunk(
  "/v1/checkout/sessions/basic",
  async (userToken, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/v1/checkout/sessions/basic`,
        {},
        config
      );
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        //console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const purchasePro = createAsyncThunk(
  "/v1/checkout/sessions/pro",
  async (userToken, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/v1/checkout/sessions/pro`,
        {},
        config
      );
      console.log(data);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        //console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const purchaseEnterprise = createAsyncThunk(
  "/v1/checkout/sessions/enterprise",
  async (userToken, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/v1/checkout/sessions/enterprise`,
        {},
        config
      );
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        //console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

//linkProfile - update experience
export const updateLinkProfileExper = createAsyncThunk(
  "/api/user/info/updateWorkExperience",
  async ({ newData }, { rejectWithValue }) => {
    console.log("action updateLinkProfile  experience", newData);
    try {
      // get Token from localStorage
      const userToken = localStorage.getItem("userToken") || null;
      console.log("userToken", userToken);
      if (!userToken) {
        return rejectWithValue("User is not authenticated");
      }

      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          // "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/info/updateWorkExperience`,
        newData, // Передаем один объект
        config
      );
      // console.log("link Profile Experience UPDATED");
      console.log("Return data.workExperience", data.workExperience);
      return data.workExperience; // data- all userdata.
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

//linkProfile - delete experience
export const deleteExperience = createAsyncThunk(
  "user/deleteExperience",
  async (id, { rejectWithValue }) => {
    console.log("deleting experience id", id);

    try {
      // get Token from localStorage
      const userToken = localStorage.getItem("userToken") || null;
      console.log("userToken", userToken);
      if (!userToken) {
        return rejectWithValue("User is not authenticated");
      }

      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.delete(
        `${backendUrl}/api/user/info/deleteWorkExperience/${id}`,
        config
      );

      console.log(
        "Deleted experience, updated workExperience",
        data.workExperience
      );
      return data.workExperience; // data- all userdata.
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

//linkProfile - edit experience
export const editExperience = createAsyncThunk(
  "/api/user/info/editWorkExperience",
  async ({ newData }, { rejectWithValue }) => {
    console.log("action edit experience", newData);

    try {
      // get Token from localStorage
      const userToken = localStorage.getItem("userToken") || null;
      console.log("userToken", userToken);
      if (!userToken) {
        return rejectWithValue("User is not authenticated");
      }

      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/info/editWorkExperience`,
        newData, // Передаем один объект
        config
      );

      console.log("Return data.workExperience", data.workExperience);
      return data.workExperience; // data- all userdata.
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

//linkProfile - update education
export const updateLinkProfileEdu = createAsyncThunk(
  "/api/user/info/updateEducationHistory",
  async ({ newData }, { rejectWithValue }) => {
    console.log("action updateLinkProfile education", newData);
    try {
      // get Token from localStorage
      const userToken = localStorage.getItem("userToken") || null;
      console.log("userToken", userToken);
      if (!userToken) {
        return rejectWithValue("User is not authenticated");
      }

      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/info/updateEducationHistory`,
        newData, // Передаем один объект
        config
      );
      // console.log("link Profile Experience UPDATED");
      console.log("Return educationHistory", data.educationHistory);
      return data.educationHistory; // data- all userdata.
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

//linkProfile - delete education
export const deleteEducation = createAsyncThunk(
  "user/deleteEducation",
  async (id, { rejectWithValue }) => {
    console.log("deleting Education id:", id);

    try {
      // get Token from localStorage
      const userToken = localStorage.getItem("userToken") || null;
      console.log("userToken", userToken);
      if (!userToken) {
        return rejectWithValue("User is not authenticated");
      }

      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.delete(
        `${backendUrl}/api/user/info/deleteEducationInfo/${id}`,
        config
      );

      console.log("Deleted Education", data.educationHistory);
      return data.educationHistory; // data - all userdata.
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

//linkProfile - edit education 
export const editEducation= createAsyncThunk(
  "/api/user/info/editEducationInfo",
  async ({ newData }, { rejectWithValue }) => {
    console.log("action edit education", newData);

    try {
      // get Token from localStorage
      const userToken = localStorage.getItem("userToken") || null;
      console.log("userToken", userToken);
      if (!userToken) {
        return rejectWithValue("User is not authenticated");
      }

      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        }
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/info/editEducationInfo`,
        newData, // Передаем один объект
        config
      );

      console.log("Return data.educationHistory", data.educationHistory);
      return data.educationHistory; // data- all userdata.
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

//linkProfile - CV upload
export const uploadCV = createAsyncThunk(
  "api/user/info/updateCV",
  async (file, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem("userToken");
      // console.log("token:", userToken); 
     
      const formData = new FormData();
      formData.append("userCV", file);

      // console.log("sending FormData:", formData);

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/api/user/info/updateCV`,
        formData,
        config
      );
      // console.log("return linkToCV from server: ", data.linkToCV)
      return data.linkToCV; // Бэкенд возвращает ссылку на загруженный файл
    } catch (error) {
      // console.log(error.response?.data?.message || error.message)
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//linkProfile - open CV
export const fetchCV = createAsyncThunk(
  "api/user/info/openCV",
  async (userId, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) return rejectWithValue("User is not authenticated");

      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
        responseType: "blob", // ВАЖНО: запрашиваем файл как объект blob  
      };

      const response = await axios.get(
        `${backendUrl}/api/user/info/openCV/${userId}`,
        config
      );

      // console.log("OPENCV - return file: ", response.data); // Здесь будет Blob
      return response.data; // Возвращаем Blob
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//linkProfile - delete CV
export const deleteCV = createAsyncThunk(
  "api/user/info/deleteCV",
  async (id, { rejectWithValue }) => {
    console.log("deleting CV id:", id);

    try {
      // get Token from localStorage
      const userToken = localStorage.getItem("userToken") || null;
      console.log("userToken", userToken);
      if (!userToken) {
        return rejectWithValue("User is not authenticated");
      }

      // configure header's Content-Type as JSON
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.delete(
        `${backendUrl}/api/user/info/deleteCV/${id}`,
        config
      );

      console.log("Deleted CV", data.linkToCV);
      return data.linkToCV; // data - all userdata.
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

// linkProfile - Avatar upload = updateUserImage

//linkProfile search
// export const fetchUsers = createAsyncThunk(
//   "/api/user/info/search",
//   async (params, { rejectWithValue }) => {
//     console.log("my searching:", params);

//     try {
//       // get Token from localStorage
//       const userToken = localStorage.getItem("userToken") || null;
//       console.log("userToken", userToken);
//       if (!userToken) {
//         return rejectWithValue("User is not authenticated");
//       }

//       // configure header's Content-Type as JSON
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       };

//       const response = await axios.post(`${backendUrl}/api/user/info/search`, params);
//       console.log("Users found:", response.data); 

//       return response.data; 
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );