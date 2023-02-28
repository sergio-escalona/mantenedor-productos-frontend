import * as Yup from 'yup';
import { SCHEMA_MESSAGES } from '../../../../config/constants';

export const categorySchema = Yup.object().shape({
  name: Yup.string().required(SCHEMA_MESSAGES.required),
});
