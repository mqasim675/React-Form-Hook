import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  const password = watch("password");

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: true,
              minLength: 2,
              maxLength: 50,
            })}
            className={`mt-1 p-2 border rounded-md w-full ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name?.type === "required" && (
            <p className="mt-2 text-sm text-red-500">Name is required.</p>
          )}
          {errors.name?.type === "minLength" && (
            <p className="mt-2 text-sm text-red-500">
              Name must be at least 2 characters.
            </p>
          )}
          {errors.name?.type === "maxLength" && (
            <p className="mt-2 text-sm text-red-500">
              Name cannot exceed 50 characters.
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
          <input
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            className={`mt-1 p-2 border rounded-md w-full ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email?.type === "required" && (
            <p className="mt-2 text-sm text-red-500">Email is required.</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="mt-2 text-sm text-red-500">Invalid email format.</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true, minLength: 6 })}
            className={`mt-1 p-2 border rounded-md w-full ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password?.type === "required" && (
            <p className="mt-2 text-sm text-red-500">Password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="mt-2 text-sm text-red-500">
              Password must be at least 6 characters.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className={`mt-1 p-2 border rounded-md w-full ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword?.type === "required" && (
            <p className="mt-2 text-sm text-red-500">
              Confirm Password is required.
            </p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p className="mt-2 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
