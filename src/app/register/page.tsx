import RegisterForm from '@/components/sections/section.register/registerForm';

export default function Register() {
  return (
    <>
      <span className="absolute text-2xl text-blue-50 pt-7 pl-14">
        CHAT WEB APP
      </span>
      <div className="flex justify-center items-center w-full min-h-screen bg-[url(/web-app-login-bg.png)]">
        <RegisterForm />
      </div>
    </>
  );
}
