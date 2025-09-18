import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Github, Chrome, User } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserLoginService from "../Services/UserLoginService";

const LoginPage = () => {
 const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Only need login from useAuth
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Let AuthContext handle the API call
      const result = await login(credentials.username, credentials.password);

      if (result.success) {
        // Navigate based on user role/type
        if (result.user.type === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 filter blur-sm">
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-50 animate-bounce"
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
        ></div>

        <div
          className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-yellow-200 to-orange-200 rotate-45 opacity-30 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-green-200 to-emerald-200 rotate-12 opacity-40 animate-pulse"></div>

        <svg
          className="absolute bottom-0 left-0 w-full h-64 opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#gradient)"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ddd6fe" />
              <stop offset="50%" stopColor="#c7d2fe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 space-y-8 relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>

            <div className="relative z-10">
              <div className="text-center space-y-4 mb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome Back!
                  </h1>
                  <p className="text-gray-600">
                    Please sign in to your account
                  </p>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100/80 border border-red-300 rounded-2xl text-red-700 text-sm backdrop-blur-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-300/30 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/60 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-blue-600 peer-[:not(:placeholder-shown)]:font-semibold bg-white/80 px-2 rounded-md"
                  >
                    Username
                  </label>
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-3 bg-white/50 backdrop-blur-sm border-2 border-gray-300/30 rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-white/60 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:font-semibold peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-blue-600 peer-[:not(:placeholder-shown)]:font-semibold bg-white/80 px-2 rounded-md"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 z-10"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-white/50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="font-medium">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-gray-300/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="flex items-center justify-center px-3 py-3 bg-white/60 backdrop-blur-sm border-2 border-white/40 rounded-xl text-gray-700 hover:bg-white/80 focus:outline-none focus:ring-4 focus:ring-gray-300/50 transition-all duration-300 group font-medium"
                  >
                    <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    Microsoft ID
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
