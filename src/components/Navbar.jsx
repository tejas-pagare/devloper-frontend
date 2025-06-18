import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../utils/constant";
import { removeUser } from "../store/slices/user";
import toast from "react-hot-toast";
import ThemeToggle from "./ToogleTheme";

function Navbar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="navbar bg-base-200 shadow-lg px-6">
        <div className="flex-1">
          <Link to={"/feed"} className="font-bold text-purple-700 text-xl">
            🧑‍🤝‍🧑DevMatch
          </Link>
        </div>
        {user && (
          <div className="flex gap-2 ">
            <h1 className="flex items-center justify-center text-center text-purple-600 font-bold">
              <div>Welcome,{user.firstname}</div>
            </h1>
            <ThemeToggle />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User image" src={user.photourl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"}>Connections</Link>
                </li>
                <li>
                  <Link to={"/requests"}>Requests</Link>
                  <Link to={"/membership"}>
                    Membership
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
