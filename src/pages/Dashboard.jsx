import { useState, useEffect } from "react";
import {
  CreditCard,
  TrendingUp,
  Clock,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import { Button, Card, CardContent } from "../components/helpers";
import Transactions from "./Transactions";
import { getTransactions } from "../services/transactions";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const statsData = {
    totalTransactions: 0,
    successfulTransactions: 0,
    pendingTransactions: 0,
    totalAmount: 0,
  };

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response?.data?.data);
      console.log("the response", response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log({ error: error.message });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  transactions.forEach((transaction) => {
    if (transaction.status === "SUCCESS") {
      statsData.successfulTransactions += 1;
      statsData.totalAmount += transaction.transaction_amount;
    } else if (transaction.status === "PENDING") {
      statsData.pendingTransactions += 1;
    }
  });
  statsData.totalTransactions = transactions.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-lg">
          <RefreshCw className="h-6 w-6 animate-spin text-indigo-600" />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard Overview
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Real-time insights into school payment transactions
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-xl">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Transactions
                </span>
                <CreditCard className="h-5 w-5 text-indigo-500" />
              </div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {statsData.totalTransactions}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40 shadow-xl">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Successful
                </span>
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div className="text-3xl font-extrabold text-green-700 dark:text-green-300">
                {statsData.successfulTransactions}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/40 shadow-xl">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Pending
                </span>
                <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div className="text-3xl font-extrabold text-yellow-700 dark:text-yellow-300">
                {statsData.pendingTransactions}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/40 shadow-xl">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                  Total Amount
                </span>
                <DollarSign className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">
                ₹{statsData.totalAmount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <section>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Transactions
          </h3>
          <Transactions transactions={transactions} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
