import React from "react";
import s from "./AddTextModuleItem.module.css";
import { Formik } from "formik";
import { object, string, mixed } from "yup";
import CustomInput from "../../ui/customInput/CustomInput";
import arrowRight from "../../assets/icons/arrowRight.svg";
import FileLoader from "../fileLoader/FileLoader";
import { createLesson } from "../../store/slice/adminCourseActions";
import { useDispatch, useSelector } from "react-redux";

const schema = object().shape({
  lessonTitle: string().required("Title is required"),
  description: string().required("Description is required"),
  uploadPDF: mixed().required("PDF file is required"),
});


export default function AddTextModuleItem({ setModal, moduleId, courseId }) {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);

  const submitForm = (values) => {
    const formData = new FormData();

    formData.append("title", values.lessonTitle);
    formData.append("moduleId", moduleId);
    formData.append("itemType", "pdf");

    if (values.uploadPDF) {
      // console.log("Appending file type:", values.uploadPDF.type);
      formData.append("fileName", values.uploadPDF.name);
      formData.append("fileType", values.uploadPDF.type); //type pdf 
      formData.append("file", values.uploadPDF);
    } else {
      console.log("No file to append");
    }

    // console.log("Submitting newLesson formData:", Array.from(formData.entries()));

    dispatch(createLesson({ courseId, newLesson: formData, userToken }))
      .then((response) => {
        console.log("response in component:", response);
      })
      .catch((error) => {
        console.error("error creation:", error);
      })
      .finally(() => {
        setModal(false);
      });
  };

  const cancelButton = (handleReset) => {
    handleReset();
    setModal(false);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ lessonTitle: "", description: "", uploadPDF: "" }}
      onSubmit={(values, { resetForm }) => {
        submitForm(values);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
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
                {errors.lessonTitle &&
                  touched.lessonTitle &&
                  errors.lessonTitle}
              </p>

              <p className={s.inputHeader}>Description</p>
              <textarea
                className={s.descriptionInput}
                // type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                placeholder="Write something about your events"
                id="description"
              />

              <p className={s.error}>
                {errors.description &&
                  touched.description &&
                  errors.description}
              </p>

              <p className={s.inputHeader}>Attach PDF</p>
              <FileLoader
                value={values.uploadPDF}
                name="uploadPDF"
                setFieldValue={setFieldValue}
                // reset={isSubmitting}
                // handleReset={handleReset}
                accept="application/pdf" // pdf only - type
              />

              <p className={s.error}>
                {errors.uploadPDF && touched.uploadPDF && errors.uploadPDF}
              </p>

              <div className={s.buttons}>
                <button
                  type="button"
                  className={s.cancelButton}
                  onClick={() => cancelButton(handleReset)}
                  label="Cancel"
                >
                  Cancel
                </button>

                <button type="submit" className={s.submitButton}>
                  Create now
                  <span>
                    <img src={arrowRight} alt="icon" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
