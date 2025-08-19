import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../Component/InputField";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginUserMutation } from "../query/server/LoginSignupSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import useAppDispatch from "../Hooks/useAppDispatch";
import Toast from "../Component/Toster";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [passwordView, setPasswordView] = useState<boolean>(true);
  const [loginApi, { isLoading }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    message: string;
    success: boolean;
  }>({
    isOpen: false,
    message: "",
    success: false,
  });

  const showToast = (message: string, success: boolean) => {
    setToastState({ isOpen: true, message, success });
  };

  const closeToast = () => {
    setToastState({ isOpen: false, message: "", success: false });
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await loginApi(data).unwrap();
      if (res.token) {
        dispatch(login({ token: res.token, name: res.name, email: res.email }));
        showToast(res.message, true);
        setTimeout(() => navigate("/"), 1000); // Navigate after toast duration
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      const errorMessage =
        err.data?.message || "Login failed. Please check your credentials.";
      showToast(errorMessage, false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-400 mb-6">
          DermaAI Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className=" space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <InputField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              name="email"
              placeholder="Email"
              className={`w-full ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-600 text-[10px] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <InputField
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type={passwordView ? "password" : "text"}
              name="password"
              placeholder="Password"
              className={`w-full ${errors.password ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setPasswordView(!passwordView)}
              className="absolute top-10 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {passwordView ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-600 text-[10px] mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none disabled:opacity-50 flex items-center justify-center cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={20} />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-orange-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
      <Toast
        message={toastState.message}
        success={toastState.success}
        isOpen={toastState.isOpen}
        onClose={closeToast}
      />
    </div>
  );
};

export default Login;
