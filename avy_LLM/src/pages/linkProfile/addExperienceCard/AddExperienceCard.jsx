import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import s from "./AddExperienceCard.module.css";
import { useDispatch } from "react-redux";
import { updateLinkProfileExper } from "../../../store/slice/userActions";

const validationSchema = Yup.object().shape({
  workExperience: Yup.object().shape({
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
  }),
});

const AddExperienceCard = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    // console.log("Collected Data from AddExperience:", values.workExperience);
    try {
      const response = await dispatch(
        updateLinkProfileExper({ newData: values.workExperience })
      );

      if (response.meta.requestStatus === "fulfilled") {
        // В ReduxToolkit успешный ответ помечается так
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
      initialValues={{
        workExperience: {
          companyTitle: "",
          position: "",
          description: "",
          startDate: "",
          endDate: "",
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values) => {
        // console.log("Collected Data from AddExperience:", values.workExperience);
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={s.formContainer}>
          <span className={s.close} onClick={onClose}>
            {" "}
            ✖
          </span>
          <div className={s.experienceBlock}>
            <Field
              className={s.formInput}
              name="workExperience.companyTitle"
              placeholder="Company Title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.workExperience.companyTitle}
            />
            {touched.workExperience?.companyTitle &&
              errors.workExperience?.companyTitle && (
                <p className={s.error}>{errors.workExperience?.companyTitle}</p>
              )}

            <Field
              className={s.formInput}
              name="workExperience.position"
              placeholder="Position"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.workExperience.position}
            />
            {touched.workExperience?.position &&
              errors.workExperience?.position && (
                <p className={s.error}>{errors.workExperience?.position}</p>
              )}

            <Field
              className={s.formInput}
              name="workExperience.description"
              placeholder="Description / Skills"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.workExperience.description}
            />
            {touched.workExperience?.description &&
              errors.workExperience?.description && (
                <p className={s.error}>{errors.workExperience?.description}</p>
              )}

            <label className={s.formLabel} htmlFor="startDate">
              Start Date
            </label>
            <Field
              className={s.formInput}
              name="workExperience.startDate"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.workExperience.startDate}
            />
            {touched.workExperience?.startDate &&
              errors.workExperience?.startDate && (
                <p className={s.error}>{errors.workExperience?.startDate}</p>
              )}

            <label className={s.formLabel} htmlFor="endDate">
              End Date
            </label>
            <Field
              className={s.formInput}
              name="workExperience.endDate"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.workExperience.endDate}
            />
            {touched.workExperience?.endDate &&
              errors.workExperience?.endDate && (
                <p className={s.error}>{errors.workExperience?.endDate}</p>
              )}
          </div>

          <button
            className={s.btnSubmit}
            type="submit"
            // onClick={() => handleSubmit(values)} //ДУБЛИРУЕТСЯ ЗДЕСЬ
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddExperienceCard;
