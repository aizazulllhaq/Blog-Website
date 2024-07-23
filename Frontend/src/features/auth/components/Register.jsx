import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <section className="w-full">
      <div className="max-w-[1250px] mx-auto bg-black">
        <div className="heading">
          <h1>Create a new Account</h1>
        </div>

        <div className="form">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="name">
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                type="text"
                id="password"
                className="border p-[5px]"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="email">
              <label htmlFor="email" className="block">
                Email
              </label>

              <input
                type="email"
                id="password"
                className="border p-[5px]"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="password">
              <label htmlFor="password" className="block">
                Password
              </label>

              <input
                type="password"
                id="password"
                className="border p-[5px]"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button className="bg-blue-500 text-white p-[5px]" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
