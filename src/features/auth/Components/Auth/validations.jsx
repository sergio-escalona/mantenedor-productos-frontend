//@components
import * as Yup from 'yup';
import { SCHEMA_MESSAGES } from '../../../../config/constants';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(SCHEMA_MESSAGES.required),
  password: Yup.string().required(SCHEMA_MESSAGES.required),
});

export const forgotSchema = Yup.object().shape({
  email: Yup.string().email().required(SCHEMA_MESSAGES.required),
});

export const recoverSchema = Yup.object().shape({
  password1: Yup.string().required(SCHEMA_MESSAGES.required),
  password2: Yup.string().required(SCHEMA_MESSAGES.required),
});
