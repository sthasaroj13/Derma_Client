import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../Component/InputField";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import type { signupprops } from "../Types/loginsignupType";
import { useAddUserMutation } from "../query/server/LoginSignupSlice";
import { useNavigate } from "react-router-dom";
import Toast from "../Component/Toster";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupprops>();
  const navigate = useNavigate();
  const [passwordView, setPasswordView] = useState(true);
  const [signupApi, { isLoading }] = useAddUserMutation();
  // State for Toast
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    message: string;
    success: boolean;
  }>({ isOpen: false, message: "", success: false });

  const onSubmit = async (data: signupprops) => {
    console.log("Signup submitted:", data);
    try {
      const res = await signupApi(data).unwrap();
      console.log("Response:", res);

      // Handle both success and failure responses
      setToastState({
        isOpen: true,
        message:
          res.message ||
          (res.success ? "Signup successful!" : "An unexpected error occurred"),
        success: res.success,
      });

      if (res.success === true) {
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Navigate after toast duration
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      // Handle unexpected errors (e.g., network issues)
      setToastState({
        isOpen: true,
        message: err?.message || "An unexpected error occurred",
        success: false,
      });
    }
  };

  // Function to close the toast
  const handleCloseToast = () => {
    setToastState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-400 mb-6">
          DermaAI Signup
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <InputField
              {...register("name", { required: "Username is required" })}
              type="text"
              name="name"
              placeholder="name"
              className={`w-full ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-600 text-[10px] mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
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
              {...register("password", { required: "Password is required" })}
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
              "Signup"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-orange-400 hover:underline">
            Log in
          </a>
        </p>
      </div>

      {/* Render the Toast component */}
      <Toast
        message={toastState.message}
        success={toastState.success}
        isOpen={toastState.isOpen}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Signup;
