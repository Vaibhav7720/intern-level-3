import React, { useContext, useEffect, useState } from "react";
import FormContext, { FormProvider } from "./FormContext";
import fetchAdditionalQuestions from "./fetchAdditionalQuestions";

const App = () => {
  return (
    <FormProvider>
      <SurveyForm />
    </FormProvider>
  );
};

const SurveyForm = () => {
  const { values, errors, handleChange, handleSubmit } =
    useContext(FormContext);
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (values.surveyTopic) {
      fetchAdditionalQuestions(values.surveyTopic)
        .then((questions) => setAdditionalQuestions(questions))
        .catch((error) => console.error(error));
    }
  }, [values.surveyTopic]);

  return (
    <div>
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Survey Topic:</label>
          <select
            name="surveyTopic"
            value={values.surveyTopic}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p>{errors.surveyTopic}</p>}
        </div>
        {values.surveyTopic === "Technology" && (
          <div>
            <label>Favorite Programming Language:</label>
            <select
              name="favoriteLanguage"
              value={values.favoriteLanguage}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            {errors.favoriteLanguage && <p>{errors.favoriteLanguage}</p>}
            <label>Years of Experience:</label>
            <input
              type="number"
              name="experience"
              value={values.experience}
              onChange={handleChange}
            />
            {errors.experience && <p>{errors.experience}</p>}
          </div>
        )}
        {values.surveyTopic === "Health" && (
          <div>
            <label>Exercise Frequency:</label>
            <select
              name="exerciseFrequency"
              value={values.exerciseFrequency}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            {errors.exerciseFrequency && <p>{errors.exerciseFrequency}</p>}
            <label>Diet Preference:</label>
            <select
              name="dietPreference"
              value={values.dietPreference}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.dietPreference && <p>{errors.dietPreference}</p>}
          </div>
        )}
        {values.surveyTopic === "Education" && (
          <div>
            <label>Highest Qualification:</label>
            <select
              name="qualification"
              value={values.qualification}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.qualification && <p>{errors.qualification}</p>}
            <label>Field of Study:</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={values.fieldOfStudy}
              onChange={handleChange}
            />
            {errors.fieldOfStudy && <p>{errors.fieldOfStudy}</p>}
          </div>
        )}
        <div>
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
          />
          {errors.feedback && <p>{errors.feedback}</p>}
        </div>
        {additionalQuestions.length > 0 && (
          <div>
            <h3>Additional Questions</h3>
            {additionalQuestions.map((question, index) => (
              <div key={index}>
                <label>{question.text}</label>
                <input
                  type="text"
                  name={`additional_${index}`}
                  value={values[`additional_${index}`] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
