import React, { useState } from "react";
import s from "./AddCourseForm.module.css";
import { Field, Formik } from "formik";
import { number, object, string } from "yup";
import CustomInput from "../../ui/customInput/CustomInput";
import OutlinedButton from "../../ui/outlinedButton/OutlinedButton";
import CustomButton from "../../ui/customButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import ModalWindow from "../modalWindow/ModalWindow";
import AddModuleForm from "../addModuleForm/AddModuleForm";
import FileLoader from "../fileLoader/FileLoader";
import { createCourse } from "../../store/slice/adminCourseActions";
import LabelText from "../../ui/labelText/LabelText";
import ErrorMessage from "../../ui/errorMessage/ErrorMessage";


const schema = object().shape({
  moduleTitle: string().required("Module title is required"),
  description: string().required("Description is required"),
  courseCode: string().required("Course code is required"),
  lessonsCount: number()
    .typeError("Lessons count must be a number")
    .required("Lessons count is required")
    .integer("Lessons count must be an integer")
    .positive("Lessons count must be a positive number"),
});


const mockData = {
  id: 1,
  title: "React - The Complete Guide 2023",
  description:
    "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
  courseImage: "/images/5e900541-9f9a-4c7e-b456-71059232cc18.png",
  category: "Development",
  level: "Advanced",
  status: null,
  creationDate: "2023-12-17",
  lastUpdateDate: null,
  modules: [
    {
      id: 1,
      title: "React Fundamentals",
      description:
        "In this first module, we introduce React, and build a common understanding we'll use throughout the course.",
      moduleOrder: 0,
      courseId: 1,
      items: [
        {
          id: 1,
          title: "We'll learn all about JSX, components, and props.",
          itemType: "video",
          itemOrder: 0,
          moduleId: 1,
          fileName: "Recording 2023-04-28 214950.mp4",
          fileType: "video/mp4",
          linkToVideo: "/video/425a4d2b-13a0-4eca-a692-75669dfec8a7.mp4",
        },
      ],
    },
  ],
  participants: [],
};
const categories = [
  { sport: "Sport" },
  { language: "Language" },
  { business: "Business" },
  { it: "IT" },
  { design: "Design" },
  { marketing: "Marketing" },
  { technology: "Technology" },
  { programming: "Programming" },
  { blockchain_and_crypto: "Blockchain and Crypto" },
  { trading: "Trading" },
  { video_production: "Video Production" },
  { graphic_design: "Graphic Design" },
  { photography: "Photography" },
  { arts_and_crafts: "Arts and Crafts" },
  { health_and_fitness: "Health and Fitness" },
  { personal_development: "Personal Development" },
  { work_from_home_business: "Work from Home Business" },
  { entrepreneurship: "Entrepreneurship" },
  { freelancing: "Freelancing" },
  { consulting: "Consulting" },
  { business_management: "Business Management" },
  { social_media_marketing: "Social Media Marketing" },
  { content_marketing: "Content Marketing" },
  { digital_marketing: "Digital Marketing" },
  { machine_learning: "Machine Learning" },
  { artificial_intelligence: "Artificial Intelligence" },
  { data_science: "Data Science" },
  { cybersecurity: "Cybersecurity" },
  { computer_science: "Computer Science" },
  { python: "Python" },
  { javascript: "JavaScript" },
  { php: "PHP" },
  { css: "CSS" },
  { react: "React" },
  { cryptocurrency_investing: "Cryptocurrency Investing" },
  { cryptocurrency_application: "Cryptocurrency Application" },
  { nfts: "NFTs" },
  { web_3: "Web 3" },
  { forex: "Forex" },
  { day_trading: "Day Trading" },
  { mobile_photography: "Mobile Photography" },
  { wedding_photography: "Wedding Photography" },
  { editing: "Editing" },
  { lighting: "Lighting" },
  { digital_photography: "Digital Photography" },
  { drawing_painting: "Drawing and Painting" },
  { carpentry: "Carpentry" },
  { pottery: "Pottery" },
  { building: "Building" },
  { nutrition: "Nutrition" },
  { weight_loss: "Weight Loss" },
  { mental_health: "Mental Health" },
  { fitness: "Fitness" },
  { dieting: "Dieting" },
  { bio_hacking: "Bio Hacking" },
  { productivity: "Productivity" },
  { habits: "Habits" },
  { relationships: "Relationships" },
  { confidence_happiness: "Confidence and Happiness" },
];
const levels = ["Fundamental", "Intermediate", "Advanced"];
export default function AddCourseForm() {
  const [modal, setModal] = useState(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState();

  const dispatch = useDispatch();

  const { courseInfo } = useSelector((state) => state.adminCourse);
  const { userToken } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("courseCode", values.courseCode);
    formData.append("category", values.category);
    formData.append("level", values.level);
    formData.append("courseImage", values.courseImage);

     // Ensure `courseImage` is a File, not a string
  if (values.courseImage instanceof File) {
    formData.append("courseImage", values.courseImage);
  } else {
    console.error("Invalid file type for courseImage", typeof(values.courseImage));
  }

    dispatch(createCourse({ formData: formData, userToken: userToken }))
  
  };

  return (
    <Formik
      //validationSchema={schema}
      initialValues={{
        title: "",
        description: "",
        courseCode: "", 
        courseImage: null,
        category: courseInfo?.category ?? "machine_learning",
        level: courseInfo?.level ?? "Intermediate",
      }}
      onSubmit={(values, { resetForm }) => {
        // console.log("  data prepared:", values)
        handleSubmit(values);
        resetForm();
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
        <div className={s.courseFormWrapper}>
          <h2 className={s.courseTitle}>
            {courseInfo && courseInfo.title ? courseInfo.title : "Create New Course"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className={s.formWrapper}
            encType="multipart/form-data"
          >
            <div className={s.courseInfo}>
              <div className={s.inputWrapper}>
                <LabelText text={"Title"} />
                <CustomInput
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={courseInfo?.title ? courseInfo.title : values.title}
                  placeholder="Title"
                  id="title"
                />

                <ErrorMessage
                  text={errors.title && touched.title && errors.title}
                />
              </div>

              <div className={s.inputWrapper}>
                <LabelText text={"Description"} />
                <textarea
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={
                    courseInfo?.description
                      ? courseInfo.description
                      : values.description
                  }
                  placeholder="Describe your course"
                  id="description"
                />
                <ErrorMessage
                  text={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                />
              </div>

              <div className={s.inputWrapper}>
                <LabelText text={"Course Code"} />
                <CustomInput
                  type="text"
                  name="courseCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.courseCode}
                  placeholder="Enter course code"
                  id="courseCode"
                />
                <ErrorMessage text={errors.courseCode && touched.courseCode && errors.courseCode} />
              </div>

              <div className={s.btns}>
                <OutlinedButton
                  type="button"
                  label={"Add Module"}
                  isDisabled={courseInfo?.id ? false : true}
                  onClick={() => setModal(true)}
                />
                <CustomButton text={"Save Changes"} type={"submit"} />
              </div>
            </div>
          
            <div className={s.courseImage}>
              <div className={s.inputWrapper}>
                <LabelText text={"Image"} />
                {courseInfo?.courseImage ? (
                  <img
                    className={s.courseImg}
                    src={
                      process.env.REACT_APP_MEDIA_SERVER_URL +
                      courseInfo.courseImage
                    }
                    alt="course-thumbnail"
                  />
                  ) : (
                  <FileLoader
                    value={values.courseImage}
                    name={"courseImage"}Create Lesson
                    setFieldValue={setFieldValue}
                    reset={isSubmitting}
                    handleReset={handleReset}
                  />

                  //  <input
                  //   type="file"
                  //   name="courseImage"
                  //   accept="image/*"
                  //   onChange={(event) => {
                  //     setFieldValue("courseImage", event.currentTarget.files[0]);
                  //   }}
                  //   />
                )}
              </div>
              <div className={s.dropDownWrapper}>
                <div className={s.inputWrapper}>
                  <LabelText text={"Level"} />
                  <Field as="select" name="level" className={s.selectField}>
                    {
                      levels.map(level => (<option value={level} key={level}>{level}</option>))
                    }
                  </Field>
                  <ErrorMessage
                    text={errors.level && touched.level && errors.level}
                  />
                </div>
                <div className={s.inputWrapper}>
                  <LabelText text={"Category"} />
                  <Field as="select" name="category" className={s.selectField}>
                    {categories.map((category, index) => {
                      const key = Object.keys(category)[0];
                      const value = Object.values(category)[0];

                      return (
                        <option key={index} value={key}>
                          {value}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    text={errors.level && touched.level && errors.level}
                  />
                </div>
              </div>
            </div>
          </form>
         
          <ModalWindow
            title={"Create Module"}
            isOpen={modal}
            onClose={() => setModal(false)}
          >
            <AddModuleForm setModal={setModal} />
          </ModalWindow>
        
        </div>
      )}
    </Formik>
  );
}
