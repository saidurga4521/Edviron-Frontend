import React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";

const SuccessfulPayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const status = queryParams.get("status"); // SUCCESS or others
  const transactionId = queryParams.get("EdvironCollectRequestId");

  const isSuccess = status === "SUCCESS";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        {isSuccess ? (
          <>
            <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-4">
              Thank you for your payment. Your transaction was completed
              successfully.
            </p>
            <p className="text-sm text-gray-500">
              Transaction ID:{" "}
              <span className="font-medium">{transactionId}</span>
            </p>
          </>
        ) : (
          <>
            <XCircle className="mx-auto text-red-500 w-16 h-16 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Payment Failed!
            </h1>
            <p className="text-gray-600 mb-4">
              Oops! Something went wrong. Please try again.
            </p>
            {transactionId && (
              <p className="text-sm text-gray-500">
                Transaction ID:{" "}
                <span className="font-medium">{transactionId}</span>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessfulPayment;
