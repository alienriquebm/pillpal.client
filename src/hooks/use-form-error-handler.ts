import { Form, type FormInstance } from 'antd';
// import notifyError from '../helpers/notifyError';
import { useInvalidateForm } from './use-invalidate-form';
import type { HttpError } from '../api/config';

type handleError = (error: HttpError) => void;

type submitForm = () => void;

type UseFormErrorHandler = () => [handleError, FormInstance, submitForm];

export const useFormErrorHandler: UseFormErrorHandler = () => {
  const [form] = Form.useForm();
  const [invalidateForm] = useInvalidateForm(form);

  const submitForm: submitForm = () => form.submit();

  // const handleError: handleError = (error) => {
  //   invalidateForm(error);
  //   // notifyError(error);
  // };

  return [invalidateForm, form, submitForm];
};
