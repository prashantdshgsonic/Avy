import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import OutlinedButton from "../../ui/outlinedButton/OutlinedButton";
import CustomInput from "../../ui/customInput/CustomInput";
import { createLesson } from "../../store/slice/adminCourseActions";
import s from "./AddChallengeForm.module.css";
import ErrorMessage from "../../ui/errorMessage/ErrorMessage";
import LabelText from "../../ui/labelText/LabelText";
import CustomButton from "../../ui/customButton/CustomButton";

// Constants
const FIRST_CONCEPT_LABEL = "First concept";
const SECOND_CONCEPT_LABEL = "Second concept";
const CANCEL_BUTTON_LABEL = "Cancel";
const CREATE_BUTTON_LABEL = "Create Now";

const schema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  rightAnswer: Yup.string().required("Answer is required"),
});

const submitForm = (values) => {};

export default function AddChallengeForm({
  moduleId,
  challengeType,
  setIsModalOpen,
}) {
  const dispatch = useDispatch();
  const { courseInfo } = useSelector((state) => state.adminCourse);
  const { userToken } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);
  const [choosedWords, setChoosedWords] = useState([]);
  const [isHidden, setHidden] = useState(false);
  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);

    const wordsArray = newText.split(/\s+/);
    setWords(wordsArray);
  };

  const handleButtonClick = (index) => {
    if (!choosedWords.includes(index)) {
      setChoosedWords((prevChoosedWords) => [...prevChoosedWords, index]);
    }
    setHidden(true);
  };

  const renderInputField = (
    label,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error
  ) => (
    <div className={s.inputWrapper}>
      <LabelText text={label} />
      <CustomInput
        type="text"
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        id={name}
      />
      <ErrorMessage text={error && error} />
    </div>
  );

  const submitFormQuiz1 = (values) => {
    const data = {
      question: values.question,
      rightAnswer: values.rightAnswer,
      options: [values.option1, values.option2, values.option3],
    };
    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("title", "Quiz");
    formData.append("itemType", "quiz");
    formData.append("quizType", "1");
    formData.append("quizData", JSON.stringify(data));
    formData.append("itemOrder", "");

    dispatch(createLesson({ courseId: courseInfo.id, newLesson: formData, userToken: userToken }));

    setIsModalOpen(false);
  };
  const submitFormQuiz2 = (values) => {
    let optionsA = [values.optionA1, values.optionA2, values.optionA3, values.optionA4, values.optionA5]
    let optionsB = [values.optionB1, values.optionB2, values.optionB3, values.optionB4, values.optionB5]
    const data = {
      conceptA: values.conceptA,
      conceptB: values.conceptB,
      optionA: optionsA,
      optionB: optionsB,
    };
    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("title", "OrderQuest");
    formData.append("itemType", "quiz");
    formData.append("quizType", "2");
    formData.append("quizData", JSON.stringify(data));
    formData.append("itemOrder", "");
    

    // console.log(
    //   "moduleId", moduleId,
    //   "quizData", data
    // );
    dispatch(createLesson({ courseId: courseInfo.id, newLesson: formData, userToken: userToken }));

    setIsModalOpen(false);
  };
  const submitFormQuiz3 = (values) => {
    const data = Object.values(values);
    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("title", "ConstructaWord Quest");
    formData.append("itemType", "quiz");
    formData.append("quizType", "3");
    formData.append("quizData", JSON.stringify(data));
    formData.append("itemOrder", "");
    
    // console.log(
    //   "moduleId", moduleId,
    //   "quizData", data
    // );
    dispatch(createLesson({ courseId: courseInfo.id, newLesson: formData, userToken: userToken }));

    setIsModalOpen(false);
  };
  const submitFormQuiz4 = (values) => {
    const data = {
      arrayFromText: text.split(/\s+/),
      text: text,
      choosedWords: choosedWords,
      options: [Object.values(values)],
    };

    const formData = new FormData();
    formData.append("moduleId", moduleId);
    formData.append("title", "FillMaster Puzzles");
    formData.append("itemType", "quiz");
    formData.append("quizType", "4");
    formData.append("quizData", JSON.stringify(data));
    formData.append("itemOrder", "");

    dispatch(createLesson({ courseId: courseInfo.id, newLesson: formData, userToken: userToken }));

    setIsModalOpen(false);
  };

  // quiz with options
  const renderQuiz1 = () => {
    return (
      <Formik
        initialValues={{
          question: "",
          rightAnswer: "",
          option1: "",
          option2: "",
          option3: "",
        }}
        onSubmit={(values, { resetForm }) => {
          submitFormQuiz1(values);
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
        }) => (
          <div className={s.challengeFormWrapper}>
            <h2 className={s.challengeTitle}>Quiz</h2>

            <form onSubmit={handleSubmit} className={s.formWrapper}>
              <div className={s.inputWrapper}>
                <LabelText text={"Write question"} />
                <textarea
                  type="text"
                  name="question"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.question}
                  placeholder="Describe main question"
                  id="question"
                />
                <ErrorMessage
                  text={errors.question && touched.question && errors.question}
                />
              </div>

              <div className={s.answersBlockQuiz1}>
                <div className={s.inputWrapper}>
                  <LabelText text={"Right answer"} />
                  <CustomInput
                    type="text"
                    name="rightAnswer"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rightAnswer}
                    placeholder="The correct answer"
                    id="rightAnswer"
                  />
                  <ErrorMessage
                    text={
                      errors.rightAnswer &&
                      touched.rightAnswer &&
                      errors.rightAnswer
                    }
                  />
                </div>

                <div className={s.optionsBlockQuiz1}>
                  <LabelText text={"Another options"} />

                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className={s.inputWrapper}>
                      <CustomInput
                        type="text"
                        name={`option${index + 1}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[`option${index + 1}`]}
                        placeholder=""
                        id={`option${index + 1}`}
                      />
                      <ErrorMessage
                        text={
                          errors[`option${index + 1}`] &&
                          touched[`option${index + 1}`] &&
                          errors[`option${index + 1}`]
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={s.btns}>
                <OutlinedButton
                  type="button"
                  label={"Cancel"}
                  onClick={() => setIsModalOpen(false)}
                />
                <CustomButton text={"Create Now"} type={"submit"} />
              </div>
            </form>
          </div>
        )}
      </Formik>
    );
  };

  // sorting game
  const renderQuiz2 = () => {
    return (
      <Formik
        initialValues={{
          conceptA: "",
          conceptB: "",
          optionA1: "",
          optionA2: "",
          optionA3: "",
          optionA4: "",
          optionA5: "",
          optionB1: "",
          optionB2: "",
          optionB3: "",
          optionB4: "",
          optionB5: "",
        }}
        onSubmit={(values, { resetForm }) => {
          submitFormQuiz2(values);
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
          <div className={s.challengeFormWrapper}>
            <h2 className={s.challengeTitle}>OrderQuest</h2>

            <form onSubmit={handleSubmit} className={s.formWrapper}>
              <div className={s.sectionWrapperQuiz2}>
                {/* First Concept */}
                <div className={s.sectionBlockQuiz2}>
                  {renderInputField(
                    FIRST_CONCEPT_LABEL,
                    "conceptA",
                    "Add title",
                    values.conceptA,
                    handleChange,
                    handleBlur,
                    errors.conceptA && touched.conceptA && errors.conceptA
                  )}
                  <LabelText text={"Options for concept A"} />
                  {Array.from({ length: 5 }).map((_, index) =>
                    renderInputField(
                      "",
                      `optionA${index + 1}`,
                      "Add title",
                      values[`optionA${index + 1}`],
                      handleChange,
                      handleBlur,
                      errors[`optionA${index + 1}`] &&
                        touched[`optionA${index + 1}`] &&
                        errors[`optionA${index + 1}`]
                    )
                  )}
                </div>

                {/* Second Concept */}
                <div className={s.sectionBlockQuiz2}>
                  {renderInputField(
                    SECOND_CONCEPT_LABEL,
                    "conceptB",
                    "Add title",
                    values.conceptB,
                    handleChange,
                    handleBlur,
                    errors.conceptB && touched.conceptB && errors.conceptB
                  )}
                  <LabelText text={"Options for concept B"} />

                  {Array.from({ length: 5 }).map((_, index) =>
                    renderInputField(
                      "",
                      `optionB${index + 1}`,
                      "Add title",
                      values[`optionB${index + 1}`],
                      handleChange,
                      handleBlur,
                      errors[`optionB${index + 1}`] &&
                        touched[`optionB${index + 1}`] &&
                        errors[`optionB${index + 1}`]
                    )
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className={s.btns}>
                <OutlinedButton
                  type="button"
                  label={CANCEL_BUTTON_LABEL}
                  onClick={() => setIsModalOpen(false)}
                />
                <CustomButton text={CREATE_BUTTON_LABEL} type="submit" />
              </div>
            </form>
          </div>
        )}
      </Formik>
    );
  };

  // build words
  const renderQuiz3 = () => {
    return (
      <Formik
        initialValues={{
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          option5: "",
        }}
        onSubmit={(values, { resetForm }) => {
          submitFormQuiz3(values);
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
          <div className={s.challengeFormWrapper}>
            <h2 className={s.challengeTitle}>ConstructaWord Quest</h2>

            <form onSubmit={handleSubmit} className={s.formWrapper}>
              <div className={s.optionsBlockQuiz3}>
                <LabelText text={"Add main terms from the lesson"} />

                {Array.from({ length: 5 }).map((_, index) =>
                  renderInputField(
                    "",
                    `option${index + 1}`,
                    "Add title",
                    values[`option${index + 1}`],
                    handleChange,
                    handleBlur,
                    errors[`option${index + 1}`] &&
                      touched[`option${index + 1}`] &&
                      errors[`option${index + 1}`]
                  )
                )}
              </div>
              {/* Buttons */}
              <div className={s.btns}>
                <OutlinedButton
                  type="button"
                  label={CANCEL_BUTTON_LABEL}
                  onClick={() => setIsModalOpen(false)}
                />
                <CustomButton text={CREATE_BUTTON_LABEL} type="submit" />
              </div>
            </form>
          </div>
        )}
      </Formik>
    );
  };

  // missed words
  const renderQuiz4 = () => {
    return (
      <Formik
        initialValues={{
          option1: "",
          option2: "",
          option3: "",
          option4: "",
        }}
        onSubmit={(values, { resetForm }) => {
          submitFormQuiz4(values);
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
        }) => (
          <div className={s.challengeFormWrapper}>
            <h2 className={s.challengeTitle}>FillMaster Puzzles</h2>
            <form onSubmit={handleSubmit} className={s.formWrapper}>
              <div>
                <textarea
                  placeholder="Enter text"
                  value={text}
                  onChange={handleTextChange}
                />
              </div>

              <div className={s.hideButtonsWrapper}>
                {words.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    type="button"
                    className={
                      isHidden && choosedWords.includes(index)
                        ? `${s.transparentText}`
                        : `${s.normalText}`
                    }
                  >
                    {word}
                  </button>
                ))}
              </div>
              <LabelText text={"Mix other options"} />
              <div className={s.optionsBlockQuiz4}>
                {Array.from({ length: 4 }).map((_, index) =>
                  renderInputField(
                    "",
                    `option${index + 1}`,
                    "Add title",
                    values[`option${index + 1}`],
                    handleChange,
                    handleBlur,
                    errors[`option${index + 1}`] &&
                      touched[`option${index + 1}`] &&
                      errors[`option${index + 1}`]
                  )
                )}
              </div>

              <div className={s.btns}>
                <OutlinedButton
                  type="button"
                  label={"Cancel"}
                  onClick={() => setIsModalOpen(false)}
                />
                <CustomButton text={"Create Now"} type={"submit"} />
              </div>
            </form>
          </div>
        )}
      </Formik>
    );
  };

  let renderQuiz = null;

  switch (challengeType) {
    case "quiz1":
      renderQuiz = renderQuiz1;
      break;
    case "quiz2":
      renderQuiz = renderQuiz2;
      break;
    case "quiz3":
      renderQuiz = renderQuiz3;
      break;
    case "quiz4":
    default:
      renderQuiz = renderQuiz4;
      break;
  }

  return renderQuiz();
}
