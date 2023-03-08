import * as Yup from 'yup';
import { SCHEMA_MESSAGES } from '../../../../config/constants';

export const changeSchema = Yup.object().shape({
  password1: Yup.string().required(SCHEMA_MESSAGES.required),
  password2: Yup.string().required(SCHEMA_MESSAGES.required),
  oldPassword: Yup.string().required(SCHEMA_MESSAGES.required),
});
