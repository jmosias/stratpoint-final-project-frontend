import validator from "validator";

export const initialLoginData = {
  email: "",
  password: "",
};

export const loginFormRules = {
  email: {
    emptyMessage: "Please provide your email",
    validators: [validator.isEmail],
    messages: ["Please provide a valid email"],
  },
  password: {
    emptyMessage: "Please provide your password",
    validators: [],
    messages: [],
  },
};
