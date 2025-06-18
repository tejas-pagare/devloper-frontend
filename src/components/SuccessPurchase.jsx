import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PurchaseSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center px-4">
      <div className="bg-base-200 shadow-xl rounded-2xl p-8 max-w-lg w-full text-center space-y-6">
        <CheckCircle className="mx-auto text-success w-16 h-16" />
        <h1 className="text-3xl font-bold">Purchase Successful!</h1>
        <p className="text-base opacity-80">
          Thank you for upgrading your membership. Your premium features are now unlocked.
        </p>

        <div className="divider" />

        <button
          className="btn btn-primary w-full"
          onClick={() => navigate("/")} // change path as per your route
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
