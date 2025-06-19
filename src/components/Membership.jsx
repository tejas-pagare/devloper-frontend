import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Normal",
    price: "Free",
    highlight: "Basic",
    features: {
      "Daily Request Limit": "50",
      "Chat with Connections": false,
      "Blue Tick (Verified Badge)": false,
      "Send Message without Match": false,
    },
    color: "border-gray-600",
  },
  {
    name: "Silver",
    price: "₹300 / 3 month",
    highlight: "Most Popular",
    features: {
      "Daily Request Limit": "100",
      "Chat with Connections": true,
      "Blue Tick (Verified Badge)": false,
      "Send Message without Match": false,
    },
    color: "border-blue-600",
  },
  {
    name: "Gold",
    price: "₹600 / 3 month",
    highlight: "Premium",
    features: {
      "Daily Request Limit": "Unlimited",
      "Chat with Connections": true,
      "Blue Tick (Verified Badge)": true,
      "Send Message without Match": true,
    },
    color: "border-yellow-500",
  },
];

export default function Membership() {
  const navigate = useNavigate();
  const renderFeature = (val) => {
    if (typeof val === "boolean") {
      return val ? (
        <CheckCircle className="text-green-500 w-5 h-5" />
      ) : (
        <XCircle className="text-gray-500 w-5 h-5 opacity-50" />
      );
    }
    return <span className="font-medium">{val}</span>;
  };
  const onSuccessHandler = async (response) => {
    try {
      const response = await axios.get(BACKEND_BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (response?.data?.isPremium) {
        navigate("/purchase/success");
      } else {
        navigate("/membership");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const onClickHandler = async (membershiptype) => {
    if (membershiptype === "normal") {
      toast.success("Already a user basic user");
      return;
    }
    try {
      const response = await axios.post(
        BACKEND_BASE_URL + "/payment/create",
        { MembershipType: membershiptype },
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      const { amount, currency, notes, orderId } = response?.data?.order;
      const { keyId } = response?.data;

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        order_id: orderId,
        prefill: notes,
        theme: {
          color: "#F37254",
        },
        handler: onSuccessHandler,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-4 cursor-pointer transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-12">
        Choose Your Membership
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border-2 ${plan.color} p-6 flex flex-col justify-between shadow-xl bg-base-200`}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-lg font-semibold opacity-70">
                {plan.highlight}
              </div>
              <div className="text-2xl font-bold my-2">{plan.name}</div>
              <div className="text-xl whitespace-pre-line text-primary font-semibold">
                {plan.price}
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-4 text-sm text-left mb-6">
              {Object.entries(plan.features).map(([feature, val], i) => (
                <li key={i} className="flex items-center gap-3 text-base">
                  {renderFeature(val)}
                  <span
                    className={`${
                      typeof val === "boolean" && !val
                        ? "line-through opacity-50"
                        : ""
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => onClickHandler(plan.name.toLowerCase())}
              className="btn btn-primary w-full mt-auto"
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
