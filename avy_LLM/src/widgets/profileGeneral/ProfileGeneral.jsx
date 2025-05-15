import React, { useEffect, useState } from "react";
import s from "./ProfileGeneral.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../store/slice/userActions";
import CustomInput from "../../ui/customInput/CustomInput";
import { Formik } from "formik";
import { number, object, string } from "yup";
import LabelText from "../../ui/labelText/LabelText";
import ErrorMessage from "../../ui/errorMessage/ErrorMessage";

const schema = object().shape({
  // firstName: string().required("Required field"),
  // lastName: string().required("Required field"),
  // userName: string().required("Required field"),
  // userJob: string().required("Required field"),
  // UserLinkedIn: string().required("Required field"),
});

function ProfileGeneral() {
  const { userInfo } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    //console.log("Submitted values:", values);
    let newData = {
      id: userInfo.id,
      firstName: values.firstName === "" ? userInfo.firstName : values.firstName,
      lastName: values.lastName === "" ? userInfo.lastName : values.lastName,
      userName: values.userName === "" ? userInfo.userName : values.userName,
      userJob: values.userJob === "" ? userInfo.userJob : values.userJob,
      state: values.state === "" ? userInfo.state : values.state,
      city: values.city === "" ? userInfo.city : values.city,
      country: values.country === "" ? userInfo.country : values.country,
      userLinkedIn:
        values.userLinkedIn === ""
          ? userInfo.userLinkedIn
          : values.userLinkedIn,
    };
   console.log("New data for update:", newData);
    dispatch(updateUserInfo({newData, userToken}));
  };
  const formFieldsInfo = [
    { label: "First Name", name: "firstName", placeholder: "First Name" },
    {
      label: "Last Name",
      name: "lastName",
      placeholder: "Add your last name",
    },
    {
      label: "Nickname",
      name: "userName",
      placeholder: "Add your public name",
    },
    { label: "Job", name: "userJob", placeholder: "Add your job title" },    
    { label: "State", name: "state", placeholder: "Add your state" },    
    { label: "City", name: "city", placeholder: "Add your City" },    
    { label: "Country", name: "country", placeholder: "Add your country" },    
  ];
  const formFieldsContacts = [
    { label: "Email", name: "email", placeholder: "userEmail@gmail.com" },
    {
      label: "LinkedIn",
      name: "userLinkedIn",
      placeholder: "Add your LinkedIn",
    },
  ];

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        userJob: userInfo.userJob || "",
        state: userInfo.state || "",
        city: userInfo.city || "",
        country: userInfo.country || "",
        userName: userInfo.userName || "",
        email: userInfo.email,
        userLinkedIn: userInfo.userLinkedIn || "",
        linkToImage: userInfo.linkToImage,
      }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        //resetForm();
      }}
      encType="multipart/form-data"
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className={s.generalForm}>
          <h3>General information</h3>
          {formFieldsInfo.map((field) => (
            <div key={field.name} className={s.inputDiv}>
              <LabelText text={field.label} />
              <CustomInput
                type="text"
                name={field.name}
                id={field.name}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values[field.name]}
                placeholder={
                  userInfo[field.name]
                    ? userInfo[field.name]
                    : field.placeholder
                }
              />
              <ErrorMessage
                message={
                  errors[field.name] &&
                  touched[field.name] &&
                  errors[field.name]
                }
              />
            </div>
          ))}
          <h3>Contacts</h3>
          {formFieldsContacts.map((field) => (
            <div key={field.name} className={s.inputDiv}>
              <LabelText text={field.label} />
              <CustomInput
                type="text"
                name={field.name}
                id={field.name}
                isDisabled={field.name === "email" ? true : false}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values[field.name]}
                placeholder={
                  userInfo[field.name]
                    ? userInfo[field.name]
                    : field.placeholder
                }
              />
              <ErrorMessage
                message={
                  errors[field.name] &&
                  touched[field.name] &&
                  errors[field.name]
                }
              />
            </div>
          ))}
          <button type="submit">Save</button>
        </form>
      )}
    </Formik>
  );
}

export default ProfileGeneral;
