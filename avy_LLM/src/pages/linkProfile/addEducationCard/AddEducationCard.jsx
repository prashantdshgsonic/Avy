import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import * as Yup from "yup";
import s from "./AddEducationCard.module.css";
import { ImBin } from "react-icons/im";
import { useDispatch } from "react-redux";
import { updateLinkProfileEdu } from "../../../store/slice/userActions";

const validationSchema = Yup.object().shape({
  educationHistory: Yup.object().shape({
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
      .min(Yup.ref("startDate"), "End date cannot be before start date"), // дата окончания не раньше даты начала,
  }),
});

const AddEducationCard = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    // console.log("Collected Data from AddEducation:", values.educationHistory);
    try {
      const response = await dispatch(
        updateLinkProfileEdu({ newData: values.educationHistory })
      );
      // console.log("✅ Ответ от Redux Thunk:", response);
      if (response.meta.requestStatus === "fulfilled") {
        // В ReduxToolkit успешный ответ помечается так
        onClose();
      } else {
        console.error("Failed to update educationHistory:", response);
      }
    } catch (error) {
      console.error("Error while updating educationHistory:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        educationHistory: {
          institutionTitle: "",
          degree: "",
          specialization: "",
          startDate: "",
          endDate: "",
        },
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(values) => {
        // console.log("Collected Data from AddEducation:", values.educationHistory);
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className={s.formContainer}>
          <span className={s.close} onClick={onClose}>
            {" "}
            ✖{" "}
          </span>
          <div className={s.experienceBlock}>
            {/* Institution Title */}
            <Field
              className={s.formInput}
              name="educationHistory.institutionTitle"
              placeholder="School/University Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.educationHistory.institutionTitle}
            />
            {touched.educationHistory?.institutionTitle &&
              errors.educationHistory?.institutionTitle && (
                <p className={s.error}>
                  {errors.educationHistory.institutionTitle}
                </p>
              )}

            {/* Degree */}
            <Field
              as="select"
              className={s.formInput}
              name="educationHistory.degree"
            >
              <option value="">Select Degree</option>
              <option value="PHD">PHD</option>
              <option value="BACHELOR">BACHELOR</option>
              <option value="MASTER">MASTER</option>
              <option value="POSTGRADUATE">POSTGRADUATE</option>
              <option value="OTHER">OTHER</option>
              <option value="INCOMPLETE">INCOMPLETE</option>
            </Field>
            {touched.educationHistory?.degree &&
              errors.educationHistory?.degree && (
                <p className={s.error}>{errors.educationHistory.degree}</p>
              )}

            {/* Specialization */}
            <Field
              className={s.formInput}
              name="educationHistory.specialization"
              placeholder="Specialization"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.educationHistory.specialization}
            />
            {touched.educationHistory?.specialization &&
              errors.educationHistory?.specialization && (
                <p className={s.error}>
                  {errors.educationHistory.specialization}
                </p>
              )}

            {/* Start Date */}
            <label className={s.formLabel} htmlFor="educationHistory.startDate">
              Start Date
            </label>
            <Field
              className={s.formInput}
              name="educationHistory.startDate"
              type="date"
              value={values.educationHistory.startDate || ""}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.educationHistory?.startDate &&
              errors.educationHistory?.startDate && (
                <p className={s.error}>{errors.educationHistory.startDate}</p>
              )}

            {/* End Date */}
            <label className={s.formLabel} htmlFor="educationHistory.endDate">
              End Date
            </label>
            <Field
              className={s.formInput}
              name="educationHistory.endDate"
              type="date"
              value={values.educationHistory.endDate || ""}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.educationHistory?.endDate &&
              errors.educationHistory?.endDate && (
                <p className={s.error}>{errors.educationHistory.endDate}</p>
              )}
          </div>

          {/* Submit Button */}
          <button
            className={s.btnSubmit}
            type="submit"
            // onClick={() => handleSubmit(values)} // вызов дублируется здесь
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddEducationCard;
