import React, { useEffect } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../query/server/LoginSignupSlice";
import useAppSelector from "../Hooks/useAppSelector";
import { useForm } from "react-hook-form";
import useAppDispatch from "../Hooks/useAppDispatch";
import { updateName } from "../store/authSlice";
type FormData = {
  name: string;
  email: string;
};
const UserProfile: React.FC = () => {
  const { email, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: getUserApi, isLoading: userLoading } = useGetUserQuery(
    `${email}`
  );
  const dispatch = useAppDispatch();
  const [updateUserApi] = useUpdateUserMutation();
  console.log("daata is", getUserApi);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
    },
  });
  // // Handle profile picture upload
  // const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setProfilePic(URL.createObjectURL(file));
  //   }
  // };
  useEffect(() => {
    if (getUserApi && isAuthenticated) {
      setValue("name", getUserApi.name || "Saroj Shrestha");
      setValue("email", getUserApi.email || "saroj@example.com");
    }
  }, [getUserApi, isAuthenticated, setValue]);
  // Handle form submit (save changes)
  const onSubmit = async (data: FormData) => {
    try {
      const response = await updateUserApi({
        email: email!,
        data: {
          name: data.name,
          email: data.email,
        },
      }).unwrap();
      dispatch(updateName(data.name));
      console.log("res", response);
    } catch (error) {}
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Your Profile</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="profilePic"
            className="cursor-pointer rounded-full overflow-hidden w-28 h-28 border-4 border-orange-400 flex items-center justify-center"
            title="Click to change profile picture"
          >
            <div className="text-orange-400 text-5xl font-bold select-none capitalize">
              {getUserApi?.name
                ?.split(" ")
                .map((n: any) => n[0])
                .join("") || ""}
            </div>
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-orange-700 font-semibold mb-1"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
            })}
            className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 capitalize"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-orange-700 font-semibold mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
            className="w-full border border-orange-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || userLoading}
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
