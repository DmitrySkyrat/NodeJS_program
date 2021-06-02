import { createValidator, ExpressJoiInstance } from 'express-joi-validation';

const validator: ExpressJoiInstance = createValidator({
  passError: true
});

export default validator;
