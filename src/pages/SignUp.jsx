import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { signUp } from "../services/auth";
import { useDispatch } from "react-redux";
import { fetchUserSignUp } from "../toolkit/userSlice";

const SignUp = () => {
  const initial = { name: "", email: "", password: "" };
  const [signUpUser, setSignUpUser] = useState(initial);
  const [error, setError] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Validation
  const validateField = (name, value) => {
    let message = "";
    if (!value) {
      message = "This field is required";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        message = "Please enter a valid email address";
      }
    } else if (name === "password" && value.length < 6) {
      message = "Password must be at least 6 characters";
    }
    setError((prev) => ({ ...prev, [name]: message }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSignUpUser((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Object.entries(signUpUser).forEach(([key, value]) =>
      validateField(key, value)
    );

    const hasErrors = Object.values(signUpUser).some((val) => !val);
    if (hasErrors) {
      toast.error("Please fill all required details");
      setIsSubmitting(false);
      return;
    }

    try {
      const resultAction = await dispatch(
        fetchUserSignUp({ signUp, signUpUser })
      );

      if (fetchUserSignUp.fulfilled.match(resultAction)) {
        if (resultAction.payload.success) {
          toast.success(resultAction.payload.message);
          navigate("/dashboard");
        } else {
          toast.error(resultAction.payload.message || "Signup failed");
        }
      } else {
        toast.error(resultAction.payload?.message || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={signUpUser.name}
              onChange={handleOnChange}
              placeholder="Enter your name"
              className={`w-full border ${
                error.name ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none`}
            />
            {error.name && (
              <p className="text-red-500 text-xs mt-1">{error.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signUpUser.email}
              onChange={handleOnChange}
              placeholder="you@example.com"
              className={`w-full border ${
                error.email ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none`}
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signUpUser.password}
                onChange={handleOnChange}
                placeholder="********"
                className={`w-full border ${
                  error.password ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-2 rounded-md text-sm font-medium hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-600 text-center mt-5">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-600 font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
