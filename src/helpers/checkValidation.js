import validator from "validator";

// Returns an array of error messages
const checkValidation = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach((key) => {
    // Check if field is empty
    if (validator.isEmpty(data[key])) {
      errors[key] = rules[key].emptyMessage;
    }
    // Check other validators
    if (rules[key].validators) {
      rules[key].validators.forEach((validator, index) => {
        const hasPassed = validator(data[key]);
        if (!hasPassed && !errors[key]) {
          errors[key] = rules[key].messages[index];
        }
      });
    }
  });

  return errors;
};

export default checkValidation;
