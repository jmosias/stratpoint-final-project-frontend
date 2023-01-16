import validator from "validator";

export const initialSignupData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
};

export const signupFormRules = {
  firstName: {
    emptyMessage: "Please provide your first name",
    validators: [],
    messages: [],
  },
  lastName: {
    emptyMessage: "Please provide your last name",
    validators: [],
    messages: [],
  },
  email: {
    emptyMessage: "Please provide your email",
    validators: [validator.isEmail],
    messages: ["Please provide a valid email"],
  },
  username: {
    emptyMessage: "Please provide your username",
    validators: [],
    messages: [],
  },
  password: {
    emptyMessage: "Please provide your password",
    validators: [],
    messages: [],
  },
};
