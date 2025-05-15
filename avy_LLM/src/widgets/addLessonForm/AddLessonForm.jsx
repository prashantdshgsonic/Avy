import React, { useState } from "react";
import s from './AddLessonForm.module.css';
import { Formik } from "formik";
import { mixed, object, string } from "yup";
import CustomInput from "../../ui/customInput/CustomInput";
import OutlinedButton from "../../ui/outlinedButton/OutlinedButton";
import arrowRight from '../../assets/icons/arrowRight.svg';
import FileLoader from "../fileLoader/FileLoader";
import { createLesson } from "../../store/slice/adminCourseActions";
import { useDispatch, useSelector } from "react-redux";
import { Blocks } from "react-loader-spinner";

const schema = object().shape({
    lessonTitle: string()
    .required('Lesson title is required'),
    description: string()
    .required('Description is required'),
    contentUpload: mixed()
    .required('Content upload is required')
    // video, audio, pictures, probably text-blocks (make validation)
});

export default function AddLessonForm ({courseId, moduleId, setModal}) {
    const dispatch = useDispatch();
    const { userToken } = useSelector((state) => state.auth);
    const [isLoadingVideo, setIsLoadingVideo] = useState(false);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        //console.log('Uploaded file:', uploadedFile.name);
        // Later handle the uploaded file
    };

    const submitForm = (values) => {
        setIsLoadingVideo(true);
        const formData = new FormData();
      
        formData.append("title", values.lessonTitle);
        formData.append("moduleId", moduleId);
        //formData.append("itemOrder", "");
        formData.append("itemType", "video");

        if (values.contentUpload) {
            // console.log("Appending file:", values.contentUpload);
        formData.append("fileName", values.contentUpload.name);
        formData.append("fileType", values.contentUpload.type); //video/mp4
        formData.append("file", values.contentUpload);
    } else {
        console.log("No file to append");
    }
    
        // console.log("Submitting newLesson formData:", Array.from(formData.entries()));
    dispatch(createLesson({ courseId, newLesson: formData, userToken }))
    .then((response) => {
      console.log("response:", response);
    })
    .catch((error) => {
      console.error("error creation:", error);
    })
    .finally(() => {
      setIsLoadingVideo(false);
      setModal(false);
    });
};

    const cancelButton = (handleReset) => {
        handleReset()
        setModal(false)
    }


    return (
        <>
        <div className={s.videoLoader}>
            {
                isLoadingVideo && (
            <>
            <Blocks className={s.videoLoader}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
            <p>Loading...</p>
            </>
            )}
        </div>

        <Formik 
        //validationSchema={schema}
        initialValues={{ lessonTitle: "", description: "", contentUpload: "" }}
        onSubmit={(values, {resetForm}) => {
            submitForm(values)
            resetForm();
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            handleReset,
            isSubmitting,
        }) => (
            <div className={s.lessonFormContainer}>
                <div>
                    <form onSubmit={handleSubmit} className={s.form}>
                        <p className={s.inputHeader}>Title</p>
                        <CustomInput 
                        type="text"
                        name="lessonTitle"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lessonTitle}
                        placeholder="Add title"
                        id="lessonTitle"
                        />
                       
                        <p className={s.error}>
                            {errors.lessonTitle && touched.lessonTitle && errors.lessonTitle}
                        </p>

                        <p className={s.inputHeader}>Description</p>
                        <textarea
                        className={s.descriptionInput} 
                        type="text"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        placeholder="Write something about your events"
                        id="description"
                        />
                        {/* If validation is not passed show errors */}
                        <p className={s.error}>
                            {errors.description && touched.description && errors.description}
                        </p>

                        <p className={s.inputHeader}>Add video</p>
                        <FileLoader 
                            value={values.contentUpload}
                            name={"contentUpload"}
                            setFieldValue={setFieldValue}
                            reset={isSubmitting}
                            handleReset={handleReset}
                        />
                        {/* If validation is not passed show errors */}
                        <p className={s.error}>
                            {errors.contentUpload && touched.contentUpload && errors.contentUpload}
                        </p>
                        <div className={s.buttons}>
                            <OutlinedButton onClick={() => cancelButton(handleReset)} label={"Cancel"} type={"button"}/>
                            <button type="submit" className={s.submitButton}>Create now <span><img src={arrowRight} alt="icon" /></span></button>
                        </div>
                    </form>
                </div>
            </div>
        )}
        </Formik>
    </>
    )
}