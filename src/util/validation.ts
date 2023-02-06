import Joi from "joi";

export const schema = Joi.object({
  id: Joi.string().min(8).required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp(/[`~!@#$%^&*|\\\'\";:\/?]/i))
    .required(),
});
