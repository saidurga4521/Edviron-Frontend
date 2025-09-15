import React, { useState, useEffect } from "react";
import { School as SchoolIcon, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/helpers";
import { fetchSchools } from "../toolkit/schoolSlice";

const Schools = () => {
  const { schools } = useSelector((state) => state.schools);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSchools()).unwrap();
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading schools, please wait...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          School Directory
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
          Browse all registered schools and track their payment records
        </p>
      </div>

      {/* Schools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schools.map((school) => {
          return (
            <Card
              key={school._id}
              className="hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 rounded-xl"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                    <SchoolIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {school.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {school.email}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="flex justify-end">
                  <Link
                    to={`/transactionsBySchool?school=${school._id}`}
                    className="w-full"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full font-medium text-indigo-600 border-indigo-200 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-900/30"
                    >
                      View Transactions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {schools.length === 0 && (
        <Card className="text-center py-12 border border-gray-200 dark:border-gray-800">
          <CardContent>
            <SchoolIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              No Schools Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              It looks like there are no schools registered in the system yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Schools;
