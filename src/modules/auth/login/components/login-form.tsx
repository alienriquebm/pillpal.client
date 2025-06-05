import { useAuth } from '../../../../hooks/use-auth';
import { Button, Form, Input, type FormProps } from 'antd';
import type { ILoginForm } from '../login.interfaces';

export default function LoginForm() {
  const { login } = useAuth();

  const onFinish: FormProps<ILoginForm>['onFinish'] = values => {
    console.log('Success:', values);
    if (login) {
      login(values);
    }
  };
  return (
    <Form name="login-form" onFinish={onFinish} className="mt-8 w-full lg:max-w-2/4">
      <Form.Item<ILoginForm>
        label=""
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item<ILoginForm>
        label=""
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <p className="text-center mt-3 text-xs font-bold text-slate-800">Forgot your password?</p>
      <div className="mt-6">
        <Button type="primary" htmlType="submit" className="w-full">
          Log in
        </Button>
      </div>
    </Form>
  );
}
