import * as Yup from 'yup';
import { SCHEMA_MESSAGES } from '../../../../config/constants';

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required(SCHEMA_MESSAGES.required),
  lastName: Yup.string().required(SCHEMA_MESSAGES.required),
  email: Yup.string().required(SCHEMA_MESSAGES.required),
  password: Yup.string().required(SCHEMA_MESSAGES.required),
});
