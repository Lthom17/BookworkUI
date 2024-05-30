
import Joi from "joi";

export const schema = Joi.object().keys({
  userName: Joi.string()
    .trim()
    .min(3)
    .alphanum()
    .required()
    .error((errors) => {
        errors.forEach((err) => {
        console.log('error', err.code)
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
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
      "password"
    )
    .min(8)
    .max(25)
    .required()
    .messages({
      "string.base": `"" should be a type of string`,
      "string.empty": `"" must contain value`,
      "string.pattern.base": `"" must be 10 digit number`,
      "any.required":
        "Password must be 8-12 characters long and include a-z, 0-9, and at least one (@$!%*?&).) ",
    }),
});
