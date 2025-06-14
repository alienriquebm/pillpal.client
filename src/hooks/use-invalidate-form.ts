import type { HttpError } from '@/api/config';
import { type FormInstance } from 'antd';

export const useInvalidateForm = (form: FormInstance) => {
  if (!form) {
    return [() => {}];
  }

  const invalidate = (error: HttpError) => {
    if (!error?.response?.data?.errors) {
      return;
    }

    const { errors } = error.response.data;

    form.setFields(errors);
  };

  return [invalidate];
};
