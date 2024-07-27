import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminLogoutAsync } from "../admin/adminSlice";

const Navbar = ({ state = "normal" }) => {
  const [open, setOpen] = useState(false);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdminLogout = async () => {
    await dispatch(adminLogoutAsync());
    navigate("/admin-login");
  };



  return (
    <section className="w-full relative top-0 left-0 z-[50] py-7 md:px-[20px] bg-gray-950">
      <div className="max-w-[1200px] mx-auto flex justify-between text-white md:px-0 px-[20px]">
        <div className="left">
          <Link
            to={"/"}
            className="md:text-2xl sm:text-xl text-md cursor-pointer md:px-[15px] px-[10px] md:py-[10px] py-[5px] rounded-[5px] shadow-inner text-red-400 font-semibold shadow-red-400 hover:text-white hover:shadow-2xl hover:shadow-red-400"
          >
            LET'S LEARN CODE
          </Link>
        </div>

        <div className="right">
          <button
            onClick={() => setOpen(!open)}
            className="text-xl sm:text-white bg-yellow-500 md:px-0 px-1 absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer md:hidden md:mr-0 mr-[10px]"
          >
            {open ? "X" : "O"}
          </button>
          <ul
            className={`md:flex justify-center items-center md:space-x-[20px] md:space-y-0 space-y-[10px] md:static ${
              open ? "absolute top-[90%] left-[10%]" : "hidden"
            }`}
          >
            <li className="md:px-[15px] px-[10px] md:py-[10px] py-[5px] border border-red-400 rounded-[4px] hover:bg-red-400 hover:text-white ">
              <Link to={"/"}>Home</Link>
            </li>
            {isAdmin && (
              <li className="md:px-[15px] px-[10px] md:py-[10px] py-[5px] border border-red-400 rounded-[4px] hover:bg-red-400 hover:text-white ">
                <button onClick={() => handleAdminLogout()}>Logout</button>
              </li>
            )}
            {/* <li>
              <Link
                to={"/signin"}
                className="md:px-[15px] px-[10px] md:py-[10px] py-[5px] border border-red-400 rounded-[4px] hover:bg-red-400 hover:text-white "
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={"/signup"}
                className="md:px-[15px] px-[10px] md:py-[10px] py-[5px] border border-red-400 rounded-[4px] hover:bg-red-400 hover:text-white mr-[20px]"
              >
                Register
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
