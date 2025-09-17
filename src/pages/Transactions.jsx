import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "../components/helpers";

const Transactions = ({ transactions }) => {
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("payment_time");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [uniqueSchoolIds, setUniqueSchoolIds] = useState([]);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    school_id: "",
    date_from: "",
    date_to: "",
    search: "",
  });

  const limit = 3;

  const loadTransactions = () => {
    try {
      setIsLoading(true);

      let data = [...transactions];

      // Apply filters
      if (filters.status) {
        data = data.filter((t) => t.status === filters.status);
      }
      if (filters.school_id) {
        data = data.filter((t) => t.school_id === filters.school_id);
      }
      if (filters.search) {
        data = data.filter(
          (t) =>
            t.student_info?.name
              ?.toLowerCase()
              .includes(filters.search.toLowerCase()) ||
            t.custom_order_id
              ?.toLowerCase()
              .includes(filters.search.toLowerCase())
        );
      }
      if (filters.date_from) {
        data = data.filter(
          (t) => new Date(t.payment_time) >= new Date(filters.date_from)
        );
      }
      if (filters.date_to) {
        data = data.filter(
          (t) => new Date(t.payment_time) <= new Date(filters.date_to)
        );
      }

      // Sorting
      data.sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      // Pagination
      const start = (currentPage - 1) * limit;
      const paginated = data.slice(start, start + limit);

      setDisplayedTransactions(paginated);
      setTotalPages(Math.ceil(data.length / limit));
      setTotal(data.length);

      // Unique schools
      const schoolIds = [...new Set(data.map((t) => t.school_id))];
      setUniqueSchoolIds(schoolIds);
    } catch (error) {
      console.error("Error loading transactions:", error);
      toast.error("Failed to load transactions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [currentPage, sortBy, sortOrder, filters, transactions]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      school_id: "",
      date_from: "",
      date_to: "",
      search: "",
    });
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const hasActiveFilters =
    filters.status ||
    filters.school_id ||
    filters.date_from ||
    filters.date_to ||
    filters.search;

  return (
    <div className="space-y-6 p-6  dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and view all payment transactions
          </p>
        </div>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by student name or order ID..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10"
            />
          </div>

          {showFilters && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="">All statuses</option>
                  <option value="SUCCESS">Success</option>
                  <option value="PENDING">Pending</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>

              {/* School Filter */}
              <div className="space-y-2">
                <Label>School ID</Label>
                <select
                  value={filters.school_id}
                  onChange={(e) =>
                    handleFilterChange("school_id", e.target.value)
                  }
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="">All schools</option>
                  {uniqueSchoolIds.map((schoolId) => (
                    <option key={schoolId} value={schoolId}>
                      {schoolId}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-500">
                Showing {displayedTransactions.length} of {total} transactions
              </div>
              <Button onClick={clearFilters} variant="outline" size="sm">
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction List</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              Loading transactions...
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("custom_order_id")}
                      >
                        <div className="flex items-center gap-2">
                          Order ID <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>School ID</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Student Id</TableHead>

                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("order_amount")}
                      >
                        <div className="flex items-center gap-2">
                          Amount <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead>Gateway</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("payment_time")}
                      >
                        <div className="flex items-center gap-2">
                          Payment Time <ArrowUpDown className="h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          {hasActiveFilters
                            ? "No transactions match your filters"
                            : "No transactions found"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      displayedTransactions.map((transaction) => (
                        <TableRow key={transaction._id}>
                          <TableCell>{transaction.custom_order_id}</TableCell>
                          <TableCell>{transaction.school_id}</TableCell>

                          <TableCell>{transaction.student_info.name}</TableCell>
                          <TableCell>{transaction.student_info.id}</TableCell>
                          <TableCell>₹{transaction.order_amount}</TableCell>
                          <TableCell>{transaction.gateway}</TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusColor(transaction.status)}
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>
                                {format(
                                  new Date(transaction.payment_time),
                                  "MMM dd, yyyy"
                                )}
                              </div>
                              <div className="text-gray-500">
                                {format(
                                  new Date(transaction.payment_time),
                                  "HH:mm:ss"
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-gray-500">
                    Showing {(currentPage - 1) * limit + 1} to{" "}
                    {Math.min(currentPage * limit, total)} of {total}{" "}
                    transactions
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" /> Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
