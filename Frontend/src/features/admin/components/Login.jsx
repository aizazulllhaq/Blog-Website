import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginAsync } from "../adminSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { error, isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await dispatch(adminLoginAsync(data));
    navigate("/admin-dashboard");
  };

  return (
    <>
      {isAdmin && <Navigate to={"/admin-dashboard"} replace={true}></Navigate>}
      <section className="w-full min-h-[100vh] bg-gray-950 flex justify-center pt-[100px]">
        <div className="max-w-[1050px] mx-auto md:px-[20px] px-[30px]">
          <h1 className="text-center md:text-3xl text-xl text-white font-semibold">
            Admin Login Panel
          </h1>
          {error && (
            <p className="text-center text-red-400 py-[10px]">
              {error.message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Your Email..."
              className="py-[5px] px-[10px] w-full bg-transparent border-[1px] border-gray-900 mt-[20px] text-white rounded-[5px] "
            />
            {errors.email && (
              <span className="text-md text-red-400 px-[5px]">
                {errors.email.message}
              </span>
            )}
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter Your Password..."
              className="py-[5px] px-[10px] w-full bg-transparent border-[1px] border-gray-900 mt-[20px] text-white rounded-[5px]"
            />
            {errors.password && (
              <span className="text-md text-red-400 px-[5px]">
                {errors.password.message}
              </span>
            )}
            <div className="flex justify-center items-center">
              <button className="block px-[35px] py-[10px] my-[10px] bg-red-400 hover:bg-transparent hover:border hover:border-red-400 text-white rounded-[5px]">
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
