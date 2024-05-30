
import Joi from "joi";

export const schema = Joi.object().keys({
  userName: Joi.string()
    .trim()
    .min(3)
    .alphanum()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = "Value should not be empty!";
            break;
          case "string.min":
            err.message = `Value should have at least ${err.context.limit} characters!`;
            break;
          case "string.max":
            err.message = `Value should have at most ${err.context.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(25)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
      "password"
    )
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.code) {
          case "any.empty":
            err.message = "Value should not be empty!";
            break;
          case "string.min":
            err.message = `Value should have at least 8 characters!`;
            break;
          case "string.max":
            err.message = `Value should have at most 12 characters!`;
            break;
          case "string.pattern.name":
            err.message =
              "Password must be 8-12 characters long and include a-z, 0-9, and at least one (@$!%*?&).)";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});
