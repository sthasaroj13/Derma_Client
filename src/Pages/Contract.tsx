import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import InputField from "../Component/InputField";
import Toast from "../Component/Toster";
import { useContactUserMutation } from "../query/server/ContactSlice";
import type { ContactForm } from "../Types/contact";

const Contact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const [toastState, setToastState] = useState<{
    isOpen: boolean;
    message: string;
    success: boolean;
  }>({
    isOpen: false,
    message: "",
    success: false,
  });
  const [contactApi, { isLoading }] = useContactUserMutation();

  const showToast = (message: string, success: boolean) => {
    setToastState({ isOpen: true, message, success });
  };
  const closeToast = () => {
    setToastState({ isOpen: false, message: "", success: false });
  };

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await contactApi(data).unwrap();
      if (response.success) {
        showToast(response.message, true);
        reset();
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      const errorMessage =
        err.data?.message || "Login failed. Please check your credentials.";
      showToast(errorMessage, false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      {/* Get In Touch Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-gray-700">
          We’d love to hear from you! Whether you have questions, feedback, or
          need assistance, reach out to us anytime. Our team is here to help you
          with all your Derma AI needs.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center gap-4">
          <Mail className="text-orange-500" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Email Us
            </h3>
            <p className="text-gray-600 text-sm">dermaai44@gmail.com</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center gap-4">
          <Phone className="text-orange-500" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Call Us
            </h3>
            <p className="text-gray-600 text-sm">+977-1-1234567</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center gap-4">
          <MapPin className="text-orange-500" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Visit Us
            </h3>
            <p className="text-gray-600 text-sm">Kathmandu, Nepal</p>
            <p className="text-gray-600 text-sm mt-1">
              <Clock className="inline mr-2" size={16} />
              Sunday to Friday, 10 AM - 5 PM
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-6">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <InputField
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              type="text"
              name="name"
              placeholder="Your Name"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
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
              placeholder="your.email@example.com"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
              })}
              name="message"
              id="message"
              rows={5}
              className={`mt-1 block w-full min-h-[5rem] max-h-[5rem] px-3 py-2 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
              placeholder="Your message here..."
            />
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">
                {errors.message.message}
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
              "Send Mesage"
            )}
          </button>
        </form>
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

export default Contact;
