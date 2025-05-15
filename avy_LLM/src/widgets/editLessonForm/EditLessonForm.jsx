import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLesson } from "../../store/slice/adminCourseActions";
import styles from "./EditLessonForm.module.css";
import { mixed, object, string } from "yup";


const schema = object().shape({
  lessonTitle: string().required("Lesson title is required"),
//   description: string()
//   .required('Description is required'),
  contentUpload: mixed().required("Content upload is required"),
  // video, audio, pictures, probably text-blocks (make validation)
});


export default function EditLessonForm({ courseId,  initialData = {},  onSave = () => {},  onCancel }) {

  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState(() => ({
    lessonTitle: initialData.title || "",
    itemType: initialData.itemType || "",
    fileName: initialData.fileName || "",
    fileType: initialData.fileType || "",
    file: null, // for storing the uploaded file
  }));

  //when change Lesson Title:
  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  //when apload file:
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
        fileName: file.name,
        fileType: file.type,
      }));
    }
  };

  const submitForm = async () => {
    try {
      const formDataObject = new FormData();

      formDataObject.append("id", initialData.id);
      formDataObject.append("title", formData.lessonTitle);
      formDataObject.append("itemType", formData.itemType);

      if (formData.file) {
        formDataObject.append("file", formData.file);
        formDataObject.append("fileName", formData.fileName);
        formDataObject.append("fileType", formData.fileType);
      }

      console.log("Submitting updated lesson (from Component):",
        Array.from(formDataObject.entries())
      );

      dispatch(updateLesson({
          courseId,
          lessonId: initialData.id,
          updatedLesson: formDataObject,
          userToken,
        })
      );

      onSave({
        id: initialData.id,
        title: formData.lessonTitle,
        fileName: formData.fileName,
        fileType: formData.fileType,
        itemType: formData.itemType,
      }); // Close the form
    } catch (error) {
      console.error("Error updating lesson:", error);
    }
  };

  return (
    <form
      className={styles.editLessonFormContainer}
      onSubmit={(e) => e.preventDefault()}
    >
      <p>Editing</p>
      <label className={styles.editInputHeader}>Title:</label>
      <input
        type="text"
        name="lessonTitle"
        value={formData.lessonTitle}
        onChange={handleChange}
        required
      />

      {"video" === formData.itemType && (
        <>
          <label>Link to Video:</label>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          {/* {formData.fileName} */}
        </>
      )}

      {"pdf" === formData.itemType && (
        <>
          <label>Attach PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          {/* {formData.fileName} */}
        </>
      )}

      {"quiz" === formData.itemType && (
        <>
          <label>Quiz Type:</label>
          <input
            type="text"
            name="quizType"
            value={formData.quizType}
            onChange={handleChange}
          />
          <label>Quiz Data:</label>
          <textarea
            name="quizData"
            value={JSON.stringify(formData.quizData, null, 2)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quizData: JSON.parse(e.target.value || "{}"),
              }))
            }
          />
        </>
      )}

      <div className={styles.editButtons}>
        <button
          className={styles.editCloseButton}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className={styles.editSubmitButton}
          type="button"
          onClick={submitForm}
        >
          {initialData.id ? "Save Changes" : ""}
        </button>
      </div>
    </form>
  );
}


//2

// export default function EditLessonForm({ courseId, initialData = {}, onSave = () => {}, onCancel }) {
//     const dispatch = useDispatch();
//     const { userToken } = useSelector((state) => state.auth);

//     const [formData, setFormData] = useState(() => ({
//         lessonTitle: initialData.title || "",
//         itemType: initialData.itemType || "",
//         // link: initialData.link || "",
//         fileName: initialData.fileName || "",
//         fileType: initialData.fileType || "",
//         // linkToVideo: initialData.linkToVideo || "",
//         file: null, // for storing the uploaded file
//     }));

//      //when change Lesson Title:
//     const handleChange = ({ target: { name, value } }) =>
//         setFormData((prev) => ({ ...prev, [name]: value }));

//     //when apload file:
//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prev) => ({
//                 ...prev,
//                 file,
//                 fileName: file.name,
//                 fileType: file.type,
//                 // link: "", // Очищаем ссылку при загрузке файла
//             }));
//         }
//     };

//     const submitForm = async () => {
//         try {
//             const payload = {
//                 id: initialData.id,
//                 title: formData.lessonTitle,
//                 itemType: formData.itemType,
//                 // moduleId: moduleId,
//                 fileName: formData.fileName,
//                 fileType: formData.fileType,
//                 // link: formData.link, // Универсальное поле для ссылки
//             };
//             console.log("payload", payload)

//             if (formData.file) {
//                 const formDataObject = new FormData();
//                 formDataObject.append('file', formData.file);
//                 formDataObject.append('id', initialData.id);
//                 formDataObject.append('title', formData.lessonTitle);
//                 formDataObject.append('itemType', formData.itemType);
//                 formDataObject.append('fileName', formData.fileName);
//                 formDataObject.append('fileType', formData.fileType);

//                 // Replace this with your actual API request to upload the file
//                 console.log("Uploading file with payload:", formDataObject);

//             } else if (initialData.id) {
//                 await dispatch(
//                     updateLesson({
//                         courseId,
//                         lessonId: initialData.id,
//                         updatedLesson: payload,
//                         userToken,
//                         // moduleId,
//                     })
//                 );
//             }

//             onSave(payload); // Закрываем форму
//         } catch (error) {
//             console.error("Error saving lesson:", error);
//         }
//     };

//     return (
//         <form className={styles.editLessonFormContainer} onSubmit={(e) => e.preventDefault()}>
//             <p>Editing</p>
//             <label className={styles.editInputHeader}>Title:</label>
//             <input
//                 type="text"
//                 name="lessonTitle"
//                 value={formData.lessonTitle}
//                 onChange={handleChange}
//                 required
//             />

//             {"video" === formData.itemType && (
//                 <>
//                     <label>Link to Video:</label>
//                     <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleFileChange}
//                     />
//                     {formData.fileName}
//                 </>
//             )}

//             {"pdf" === formData.itemType && (
//                 <>
//                 <label>Attach PDF:</label>
//                 <input
//                   type="file"
//                   accept="application/pdf"
//                   onChange={handleFileChange}
//                 />
//                 {formData.fileName}
//               </>
//             )}

//             {"quiz" === formData.itemType && (
//                 <>
//                     <label>Quiz Type:</label>
//                     <input type="text" name="quizType" value={formData.quizType} onChange={handleChange} />
//                     <label>Quiz Data:</label>
//                     <textarea
//                         name="quizData"
//                         value={JSON.stringify(formData.quizData, null, 2)}
//                         onChange={(e) =>
//                             setFormData((prev) => ({
//                                 ...prev,
//                                 quizData: JSON.parse(e.target.value || "{}"),
//                             }))
//                         }
//                     />
//                 </>
//             )}

//             <div className={styles.editButtons}>
//                 <button className={styles.editCloseButton} type="button" onClick={onCancel}>
//                     Cancel
//                 </button>

//                 <button className={styles.editSubmitButton} type="button" onClick={submitForm}>
//                     {initialData.id ? "Save Changes" : ""}
//                 </button>
//             </div>
//         </form>
//     );
// }
