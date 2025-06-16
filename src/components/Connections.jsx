import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BACKEND_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/slices/connection";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const getConnections = async () => {
    try {
      const response = await axios.get(BACKEND_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data?.connections));
    } catch (error) {
      toast.error("Failed to load connections");
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      {connections.length === 0 ? (
        <div className="text-center pt-10 text-2xl font-semibold text-primary">
          No Connections Found
        </div>
      ) : (
        <div>
          <h1 className="text-center text-3xl font-bold text-primary mb-8">
            My Connections
          </h1>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => (
              <div
                key={connection?._id}
                className="card bg-base-100 shadow-xl transition hover:shadow-2xl"
              >
                <div className="card-body flex-row items-start gap-4">
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={connection.photourl} alt="User Avatar" />
                    </div>
                  </div>
                  <div>
                    <h2 className="card-title text-primary">
                      {connection.firstname}{" "}
                      {connection.lastname && <span>{connection.lastname}</span>}
                    </h2>
                    {connection.age && connection.gender && (
                      <p className="text-sm opacity-60">
                        {connection.age} years old, {connection.gender}
                      </p>
                    )}
                    {connection.bio && (
                      <p className="mt-2 text-sm">{connection.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Connections;
