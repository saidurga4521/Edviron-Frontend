import { useState } from "react";
import {
  Search,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Copy,
} from "lucide-react";
import { paymentStatus } from "../services/payment";

const CheckStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [collectId, setCollectId] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState({});

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "FAILED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = async () => {
    try {
      if (!collectId.trim()) {
        setError("Please enter a valid Order ID");
        return;
      }
      setError("");
      setisLoading(true);
      const response = await paymentStatus(collectId);
      const paymentStatusDetials = response?.data?.data;
      setTransaction(paymentStatusDetials);
      setOrderId(collectId);
      setisLoading(false);
    } catch (error) {
      console.log({ message: error.message });
      setisLoading(false);
      setError("Failed to fetch transaction details");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Check Transaction Status
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter an order ID to check the current status of a transaction
          </p>
        </div>

        {/* Search Bar (compact) */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Enter Collect ID"
              value={collectId}
              onChange={(e) => setCollectId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>

          <button
            onClick={() => {
              setCollectId("");
              setTransaction({});
              setError("");
            }}
            className="ml-auto text-sm text-gray-600 hover:text-gray-800"
          >
            Clear
          </button>
        </div>

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        {/* Transaction Details (constrained width) */}
        {Object.keys(transaction).length !== 0 && (
          <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 mt-4">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {getStatusIcon(transaction.status)}
                  <span>Transaction Details</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Order ID:{" "}
                  <span className="font-mono text-gray-700">{orderId}</span>
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  transaction.status
                )}`}
              >
                {transaction.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left column - Payment info */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">
                  Payment Information
                </h3>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Order Amount</span>
                  <span className="font-medium text-gray-800">
                    ₹{transaction.amount || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">
                    Transaction Amount
                  </span>
                  <span className="font-medium text-gray-800">
                    ₹{transaction.transaction_amount || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Payment Mode</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {transaction?.details?.payment_mode ||
                      transaction.payment_mode ||
                      "UPI"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bank Reference</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-800">
                      {transaction?.details?.bank_ref ||
                        transaction.details?.bank_reference ||
                        "000000000"}
                    </span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        copyToClipboard(
                          transaction.details?.bank_reference,
                          "Bank reference"
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100 mt-4">
              <button
                className="border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md"
                onClick={() => {
                  setCollectId("");
                  setTransaction({});
                }}
              >
                Search Another
              </button>

              <button
                className="border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-md flex items-center"
                onClick={() =>
                  copyToClipboard(
                    JSON.stringify(transaction, null, 2),
                    "Transaction data"
                  )
                }
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
