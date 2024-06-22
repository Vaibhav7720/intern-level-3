import React, { createContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    surveyTopic: "",
    favoriteLanguage: "",
    experience: "",
    exerciseFrequency: "",
    dietPreference: "",
    qualification: "",
    fieldOfStudy: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      alert(JSON.stringify(values, null, 2));
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.surveyTopic) {
      errors.surveyTopic = "Survey Topic is required";
    }

    if (values.surveyTopic === "Technology") {
      if (!values.favoriteLanguage) {
        errors.favoriteLanguage = "Favorite Programming Language is required";
      }
      if (!values.experience) {
        errors.experience = "Years of Experience is required";
      } else if (values.experience <= 0) {
        errors.experience = "Experience must be greater than 0";
      }
    }

    if (values.surveyTopic === "Health") {
      if (!values.exerciseFrequency) {
        errors.exerciseFrequency = "Exercise Frequency is required";
      }
      if (!values.dietPreference) {
        errors.dietPreference = "Diet Preference is required";
      }
    }

    if (values.surveyTopic === "Education") {
      if (!values.qualification) {
        errors.qualification = "Highest Qualification is required";
      }
      if (!values.fieldOfStudy) {
        errors.fieldOfStudy = "Field of Study is required";
      }
    }

    if (!values.feedback) {
      errors.feedback = "Feedback is required";
    } else if (values.feedback.length < 50) {
      errors.feedback = "Feedback must be at least 50 characters";
    }

    return errors;
  };

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
