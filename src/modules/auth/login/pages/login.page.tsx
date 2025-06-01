import LoginForm from '../components/login-form';
import LoginImage from '../components/login-image';

export function LoginPage() {
  return (
    <div className="flex h-screen">
      <LoginImage />
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6">
        [Logo here]
        <div className="text-center mt-[35px]">
          <h1 className="text-neutral-600 ;font-bold text-xl font-lexend">Demo app</h1>
          <p className="mt-[37px] text-sm text-slate-500 font-lato">Tagline demo app</p>
        </div>
        <LoginForm />
        <div className="mt-[93px]">
          <p className="text-slate-700 font-bold text-[12px] font-lato">
            Not registered yet? Create an account
          </p>
        </div>
      </div>
    </div>
  );
}
