import React from "react";
import s from "./EditExperience.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { editExperience } from "../../../store/slice/userActions";

const validationSchema = Yup.object().shape({
  companyTitle: Yup.string()
    .required("Required field")
    .min(3, "Company Title must be at least 3 characters"),
  position: Yup.string()
    .required("Required field")
    .min(3, "Position must be at least 3 characters"),
  description: Yup.string()
    .required("Required field")
    .min(3, "Description must be at least 3 characters"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date()
    .required("Required")
    .min(Yup.ref("startDate"), "End date cannot be before start date"), // дата окончания не раньше даты начала
});

const EditExperience = ({ onClose, experienceId }) => {
  const dispatch = useDispatch();

  const workExperience = useSelector((state) => state.user.linkProfileExper || []);

  const experienceToEdit = workExperience.find((exp) => exp.id === experienceId);
  // console.log("experienceToEdit",experienceToEdit)

  if (!experienceToEdit) return null; // if not found - not render

  const handleSubmit = async (values) => {
    // console.log("Collected Data from EditExperience:", values);
    try {
      const response = await dispatch(
        editExperience({ id: experienceId, newData: values })
      );

      if (response.meta.requestStatus === "fulfilled") {
        onClose();
      } else {
        console.error("Failed to update experience:", response);
      }
    } catch (error) {
      console.error("Error while updating experience:", error);
    }
  };

  return (
    <Formik
      initialValues={experienceToEdit}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // console.log("Collected Data from EditExperience:", values);
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={s.formContainer}>
          <span className={s.close} onClick={onClose}>
            ✖
          </span>
          <div className={s.experienceBlock}>
            <Field
              className={s.formInput}
              name="companyTitle"
              placeholder="Company Title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.companyTitle}
            />
            {touched.companyTitle && errors.companyTitle && (
              <p className={s.error}>{errors.companyTitle}</p>
            )}

            <Field
              className={s.formInput}
              name="position"
              placeholder="Position"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.position}
            />
            {touched.position && errors.position && (
              <p className={s.error}>{errors.position}</p>
            )}

            <Field
              className={s.formInput}
              name="description"
              placeholder="Description / Skills"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {touched.description && errors.description && (
              <p className={s.error}>{errors.description}</p>
            )}

            <label className={s.formLabel} htmlFor="startDate">
              Start Date
            </label>
            <Field
              className={s.formInput}
              name="startDate"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.startDate}
            />
            {touched.startDate && errors.startDate && (
              <p className={s.error}>{errors.startDate}</p>
            )}

            <label className={s.formLabel} htmlFor="endDate">
              End Date
            </label>
            <Field
              className={s.formInput}
              name="endDate"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.endDate}
            />
            {touched.endDate && errors.endDate && (
              <p className={s.error}>{errors.endDate}</p>
            )}
          </div>

          <button
            className={s.btnSubmit}
            type="submit"
            onClick={() => handleSubmit(values)}
          > Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditExperience;
