import * as Yup from 'yup';
import { SCHEMA_MESSAGES } from '../../../../config/constants';

export const productSchema = Yup.object().shape({
  name: Yup.string().required(SCHEMA_MESSAGES.required),
  shortName: Yup.string().required(SCHEMA_MESSAGES.required),
  description: Yup.string().required(SCHEMA_MESSAGES.required),
  price: Yup.number().required(SCHEMA_MESSAGES.required),
  stock: Yup.number().required(SCHEMA_MESSAGES.required),
  categoryId: Yup.number().required(SCHEMA_MESSAGES.required),
});
