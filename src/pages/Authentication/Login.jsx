import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset">
        <h1 className="text-3xl py-3">Welcome Back!</h1>
        <label className="label">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="input"
          placeholder="Email"
        />
        {errors.email?.type === "required" && (
          <p className="text-red-500">Email field is required</p>
        )}

        <label className="label">Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="input"
          placeholder="Password"
        />

        {errors.password?.type === "required" && (
          <p className="text-red-500">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500">password must be 6 char long</p>
        )}
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>

        <button className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </form>
  );
}
