import LoginForm from '../components/login-form';

export function LoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-cyan-500 justify-center items-center text-white">
        [Image Here]
      </div>
      <div className="w-full flex flex-col items-center justify-center px-6 md:w-1/2">
        [Logo here]
        <div className="text-center mt-9">
          <h1 className="text-neutral-600 font-bold text-xl">Demo app</h1>
          <p className="my-6 text-sm text-slate-500">Tagline demo app</p>
        </div>
        <LoginForm />
        <div className="mt-20">
          <p className="text-slate-700 font-bold text-xs">Not registered yet? Create an account</p>
        </div>
      </div>
    </div>
  );
}
