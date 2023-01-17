import validator from "validator";

export const initialSignupData = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
};

export const signupFormRules = {
  first_name: {
    emptyMessage: "Please provide your first name",
    validators: [],
    messages: [],
  },
  last_name: {
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
