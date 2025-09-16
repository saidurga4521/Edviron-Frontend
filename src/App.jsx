import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SchoolTransactions from "./pages/SchoolTransactions";
import StatusCheck from "./pages/StatusCheck";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "../src/hoc/WithAuth";
import Login from "./pages/Login";
import CreatePayment from "./pages/CreatePayment";
import Transactions from "./pages/Transactions";
import TransactionsBySchool from "./pages/TransactionsBySchool";
import SuccessfulPayment from "./pages/SuccessfullPayment";

function App() {
  return (
    <Router basename="/">
      <div className="min-h-screen bg-gray-50">
        {/* Routes */}
        <main className="p-6">
          <Routes>
            <Route
              path="/signup"
              element={
                <ProtectedRoute isPublic={true}>{<SignUp />}</ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute isPublic={true}>{<Login />}</ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isPublic={false}>
                  {<Dashboard />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isPublic={false}>
                  {<Dashboard />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute isPublic={false}>
                  {<Transactions />}
                </ProtectedRoute>
              }
            />
            <Route path="/payment-success" element={<SuccessfulPayment />} />
            <Route
              path="/transactionsBySchool"
              element={
                <ProtectedRoute isPublic={false}>
                  {<TransactionsBySchool />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/schools"
              element={
                <ProtectedRoute isPublic={false}>
                  {<SchoolTransactions />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/check-status"
              element={
                <ProtectedRoute isPublic={false}>
                  {<StatusCheck />}
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-payment"
              element={
                <ProtectedRoute isPublic={false}>
                  {<CreatePayment />}
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
