import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import s from "./AddNft.module.css";
import CustomInput from "../../ui/customInput/CustomInput";
import OutlinedButton from "../../ui/outlinedButton/OutlinedButton";
import CustomButton from "../../ui/customButton/CustomButton";
import FileLoader from "../fileLoader/FileLoader";
import LabelText from "../../ui/labelText/LabelText";

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  level: Yup.string().required("Level is required"),
  category: Yup.string().required("Category is required"),
  collectionMintAddress: Yup.string().nullable(),
  NftImage: Yup.mixed().required("NFT Image is required"),
});

const AddNft = ({
  isOpen,
  onClose,
  courseData,
  userName,
  collectionId,
  userEmail,
  onSubmit,
  selectedUserId,
}) => {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <h2 className={s.modalTitle}>
          {courseData?.title ? `Creating NFT for  ${userName}` : "Create New NFT"}
        </h2>

        <Formik
          validationSchema={schema}
          initialValues={{
            title: userName || "",
            description: courseData?.description || "",
            category: courseData?.category || "",
            level: courseData?.level || "",
            collectionMintAddress: collectionId || "",
            NftImage: null,
            // NftImage: "",
          }}
          onSubmit={(values, { resetForm }) => {
            const formData = new FormData();
            formData.append("titleCourse", courseData.title);
            formData.append("description", values?.description);
            formData.append("courseCode", courseData.courseCode);
            formData.append("category", values.category);
            formData.append("level", values.level);
            formData.append("collectionMintAddress", collectionId || "");
            formData.append("NftImage", values.NftImage);
            formData.append("holderEmail", userEmail);
            formData.append("holder", userName);

            // console.log("Form data AddNft prepared!!:", formData);
            // for (let pair of formData.entries()) {
            //   console.log("FormData before submit:", pair[0], pair[1]);
            // }

            onSubmit(formData); //sends to handleSubmitNFT
            resetForm();
            onClose();

            // console.log("Form submitted and modal closed")
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
            setFieldValue,
            handleReset,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className={s.formWrapper}
              encType="multipart/form-data"
            >
              <div className={s.leftColumn}>
                {/* Field Name */}
                <div className={s.inputWrapper}>
                  <LabelText text="User's Name" />
                  <CustomInput
                    type="text"
                    name="User's Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={userName}
                    placeholder="User's Name"
                    id="User's Name"
                  />
                  {touched.title && errors.title && (
                    <p className={s.error}>{errors.title}</p>
                  )}
                </div>

                {/* Field Description */}
                <div className={s.inputWrapper}>
                  <LabelText text="Description" />
                  <textarea
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Describe"
                    id="description"
                    className={s.textarea}
                  />
                  {touched.description && errors.description && (
                    <p className={s.error}>{errors.description}</p>
                  )}
                </div>

                {/* Field collectionMintAddress */}
                <div className={s.inputWrapper}>
                  <LabelText text="NFT Collection Address" />
                  <CustomInput
                    type="text"
                    name="nftCollectionAddress"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={collectionId}
                    placeholder="NFT Collection Address"
                    id="collectionMintAddress"
                  />
                  {touched.collectionMintAddress &&
                    errors.collectionMintAddress && (
                      <p className={s.error}>{errors.collectionMintAddress}</p>
                    )}
                </div>

                {/* Field Level Category*/}
                <div className={s.inputWrapper}>
                  <LabelText text="Level" />
                  <div className={s.readOnlyField}>{values.level}</div>
                </div>

                <div className={s.inputWrapper}>
                  <LabelText text="Category" />
                  <div className={s.readOnlyField}>{values.category}</div>
                </div>
              </div>

              <div className={s.rightColumn}>
                {/* Field Img */}
                <div className={s.inputWrapper}>
                  <LabelText text="NFT Image" />
                  <FileLoader
                    value={values.NftImage}
                    name="NftImage"
                    setFieldValue={setFieldValue}
                    reset={isSubmitting}
                    handleReset={handleReset}
                    type="file"
                    accept="image/*"
                  />
                  {touched.NftImage && errors.NftImage && (
                    <p className={s.error}>{errors.NftImage}</p>
                  )}
                </div>

                {/* Btns */}
                <OutlinedButton
                  type="button"
                  label="Cancel"
                  onClick={onClose}
                />
                <CustomButton
                  text="Create"
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNft;
