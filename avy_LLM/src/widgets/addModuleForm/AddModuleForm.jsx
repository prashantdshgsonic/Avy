import React from "react";
import s from "./AddModuleForm.module.css";
import { Formik } from "formik";
import { object, string } from "yup";
import CustomInput from "../../ui/customInput/CustomInput";
import arrowRight from "../../assets/icons/arrowRight.svg";
import OutlinedButton from "../../ui/outlinedButton/OutlinedButton";
import { useDispatch, useSelector } from "react-redux";
import { createModule } from "../../store/slice/adminCourseActions";

const schema = object().shape({
  title: string().required("Module title is required"),
  description: string().required("Description is required"),
});

export default function AddModuleForm({ setModal }) {
  const dispatch = useDispatch();
  const currentCourse = useSelector((state) => state.adminCourse.courseInfo);
  const {userToken} = useSelector((state) => state.auth);

  const submitForm = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("items", []);
    formData.append("courseId", currentCourse.id);
    dispatch(createModule({ courseId: currentCourse.id, newModule: formData, userToken: userToken }));
    setModal(false);
  };

  const cancelButton = () => {
    // Later handle onClick to close modal window
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ title: "", description: "" }}
      onSubmit={(values, { resetForm }) => {
        submitForm(values);
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
        resetForm,
      }) => (
        <div className={s.moduleFormContainer}>
         
          <div>
            <form onSubmit={handleSubmit} className={s.form}>
              <p className={s.inputHeader}>Title</p>
              <CustomInput
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Add title"
                id="title"
              />
              {/* If validation is not passed show errors */}
              <p className={s.error}>
                {errors.title && touched.title && errors.title}
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
                {errors.description &&
                  touched.description &&
                  errors.description}
              </p>
              <div className={s.buttons}>
                <OutlinedButton
                  onClick={() => setModal(false)}
                  label={"Cancel"}
                />
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
