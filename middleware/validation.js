import Joi from 'joi';

export const createUserValidation = (req, res, next) => {
  const userSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    shopName: Joi.string().required(),
    password: Joi.string().min(8).required(),
    // passwordConfirm: Joi.string().min(8).required(),
  });
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({
      message: 'Something went wrong',
      data: result.error.details[0].message,
    });
  }
  next();
};

export const addProductsValidation = (req, res, next) => {
  const productSchema = Joi.object({
    // productId: Joi.number(),
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    unitPrice: Joi.number().required(),
    productStatus: Joi.string().required(),
    category: Joi.string().required(),
  });
  const result = productSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({
      message: 'Something went wrong',
      data: result.error.details[0].message,
    });
  }
  next();
};

export const updateUserValidation = (req, res, next) => {
  const updateSchema = Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email(),
    shopName: Joi.string(),
    password: Joi.string().min(8),
    // passwordConfirm: Joi.string().min(8).required(),
  });
  const result = updateSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({
      message: 'Something went wrong',
      data: result.error.details[0].message,
    });
  }
  next();
};
