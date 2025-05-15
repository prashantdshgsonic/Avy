import React from "react";
import s from "./EditEducation.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik } from "formik";
import { Form } from "react-router-dom";
import { editEducation } from "../../../store/slice/userActions";

const validationSchema = Yup.object().shape({
    institutionTitle: Yup.string()
      .required("Required")
      .min(3, "Must be at least 3 characters"),
    degree: Yup.string().required("Required"),
    specialization: Yup.string()
      .required("Required")
      .min(3, "Must be at least 3 characters"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date()
      .required("Required")
      .min(Yup.ref("startDate"), "End date cannot be before start date"), // дата окончания не раньше даты начала
});

const EditEducation = ({ onClose, educationId }) => {
  const dispatch = useDispatch();

  const educationHistory = useSelector(
      (state) => state.user.linkProfileEdu || []);

  const educationToEdit = educationHistory.find((edu) => edu.id === educationId);
  console.log("educationToEdit",educationToEdit)

  if (!educationToEdit) return null; // if not found - not render

  const handleSubmit = async (values) => {
    // console.log("Collected Data from EditEducation:", values);
    try {
      const response = await dispatch(
        editEducation({ id: educationId, newData: values })
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
      initialValues={educationToEdit}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // console.log("Collected Data from EditEducation:", values);
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
              name="institutionTitle"
              placeholder="School/University Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.institutionTitle}
            />
            {touched.institutionTitle &&
              errors.institutionTitle && (
                <p className={s.error}>
                  {errors.institutionTitle}
                </p>
              )}

            <Field
              as="select"
              className={s.formInput}
              name="degree"
            >
              <option value="">Select Degree</option>
              <option value="PHD">PHD</option>
              <option value="BACHELOR">BACHELOR</option>
              <option value="MASTER">MASTER</option>
              <option value="POSTGRADUATE">POSTGRADUATE</option>
              <option value="OTHER">OTHER</option>
              <option value="INCOMPLETE">INCOMPLETE</option>
            </Field>
            {touched.degree &&
              errors.degree && (
                <p className={s.error}>{errors.degree}</p>
              )}

            <Field
              className={s.formInput}
              name="specialization"
              placeholder="Specialization"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.specialization || ""}
            />
            {touched.specialization &&
              errors.specialization && (
                <p className={s.error}>
                  {errors.specialization}
                </p>
              )}
           
            <label className={s.formLabel} htmlFor="startDate">
              Start Date
            </label>
            <Field
              className={s.formInput}
              name="startDate"
              type="date"
              value={values.startDate || ""}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.startDate &&
              errors.startDate && (
                <p className={s.error}>{errors.startDate}</p>
              )}
           
            <label className={s.formLabel} htmlFor="endDate">
              End Date
            </label>
            <Field
              className={s.formInput}
              name="endDate"
              type="date"
              value={values.endDate || ""}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.endDate &&
              errors.endDate && (
                <p className={s.error}>{errors.endDate}</p>
              )}
          </div>
          
          <button
            className={s.btnSubmit}
            type="submit"
            onClick={() => handleSubmit(values)}
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditEducation;
