import { useAuth } from '../../../../hooks/use-auth';
import { Form, Input, type FormProps } from 'antd';
import type { ILoginForm } from '../login.interfaces';

export default function LoginForm() {
  const { login } = useAuth();

  const onFinish: FormProps<ILoginForm>['onFinish'] = values => {
    console.log('Success:', values);
    if (login) {
      login(values);
    }
  };
  const inputClassNames =
    'border-zinc-500! border-[1px]! rounded-[4px]! text-[14px]! w-[296px]! h-8! pl-6! focus:outline-none! focus:ring-2! focus:ring-blue-200! focus:ring-opacity-50!';

  return (
    <Form name="login-form" onFinish={onFinish} className="mt-[31px]!">
      <Form.Item<ILoginForm>
        label=""
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="Email" className={inputClassNames} />
      </Form.Item>

      <Form.Item<ILoginForm>
        label=""
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" className={inputClassNames} />
      </Form.Item>
      <p className="text-center mt-3 text-[12px] font-bold text-slate-800 font-lato">
        Forgot your password?
      </p>
      <div className="mt-[25px]">
        <button
          type="submit"
          className="bg-[#A275CA] w-[296px] h-[52px] rounded-[10px] text-white text-[14px] cursor-pointer transition-shadow duration-300 hover:shadow-[0_10px_20px_#CBD6FF]"
        >
          Log in
        </button>
      </div>
    </Form>
  );
}

{
  /* <form onSubmit={onSubmit} className="mt-[31px]">
      <input
        type="email"
        placeholder="Email"
        className="border-zinc-500 border-[1px] rounded-[4px] text-[14px] w-[296px] h-8 pl-6 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
        {...register('email', {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Invalid email address',
          },
        })}
      />
      {errors.email && (
        <p className="text-red-500 text-xs mt-1">
          {errors.email.type === 'required' && 'Email is required'}
          {errors.email.type === 'pattern' &&
            typeof errors.email?.message === 'string' &&
            errors.email.message}
        </p>
      )}
      <div className="mt-[10px]">
        <input
          type="password"
          placeholder="Password"
          className="border-zinc-500 border-[1px] rounded-[4px] text-[14px] w-[296px] h-8 pl-6 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
          {...register('password', {
            required: true,
            minLength: 6,
            validate: value => {
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[a-z]/.test(value)) {
                return 'Password must contain at least one lowercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
              return true;
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.type === 'required' && 'Password is required.'}
            {errors.password.type === 'minLength' && 'Password must be at least 6 characters'}
            {errors.password.type === 'validate' &&
              typeof errors.password?.message === 'string' &&
              errors.password.message}
          </p>
        )}
      </div>
      <p className="text-center mt-3 text-[12px] font-bold text-slate-800 font-lato">
        Forgot your password?
      </p>
      <div className="mt-[25px]">
        <button
          type="submit"
          className="bg-[#A275CA] w-[296px] h-[52px] rounded-[10px] text-white text-[14px] cursor-pointer transition-shadow duration-300 hover:shadow-[0_10px_20px_#CBD6FF]"
        >
          Log in
        </button>
      </div>
    </form> */
}
