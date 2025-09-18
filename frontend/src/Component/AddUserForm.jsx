
import React, { useState } from "react";
import { User, X, Eye, EyeOff, Mail, Lock, UserPlus, Sparkles } from "lucide-react";
import AddnewUserService from "../Services/AddnewUserService";

const AddUserForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    activeStaus: true,
    type: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { confirmPassword, ...submitData } = formData;
    setLoading(true);

    try {
      // Simulate API call
      AddnewUserService(formData).then((res)=>{
        handleClose();
      })

    } catch (err) {
      console.error(err);
      alert("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      activeStaus: true,
      type: "user",
    });
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden border border-white/20 animate-in slide-in-from-bottom-4 duration-500">
      

        <div className="relative z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-white/20 rounded-xl backdrop-blur-sm">
                  <UserPlus className="w-3 h-3" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Add New User</h2>
                  <p className="text-white/80 text-sm">Create a new user account</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-1 text-purple-500" />
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-black border-2 rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none ${errors.firstName ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'}`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm flex items-center animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-black border-2 border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none hover:border-gray-300"
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none hover:border-gray-300"
                placeholder="Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-1 text-blue-500" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 text-black rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none ${errors.email ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'}`}
                placeholder="john.doe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center animate-in slide-in-from-left-2 duration-200">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="block text-sm  font-semibold text-gray-700 flex items-center">
                  <Lock className="w-4 h-4 mr-1 text-green-500" />
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 text-black rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none pr-12 ${errors.password ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-gray-300'}`}
                    placeholder="Enter secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <Lock className="w-4 h-4 mr-1 text-green-500" />
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2  text-black rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none pr-12 ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword 
                        ? 'border-red-300 bg-red-50/30' 
                        : formData.confirmPassword && formData.password === formData.confirmPassword 
                        ? 'border-green-300 bg-green-50/30'
                        : errors.confirmPassword 
                        ? 'border-red-300 bg-red-50/30' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {formData.confirmPassword && formData.password && (
                  <div className="animate-in slide-in-from-left-2 duration-200">
                    {formData.password === formData.confirmPassword ? (
                      <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        <p className="text-green-700 text-sm font-medium">✓ Passwords match</p>
                      </div>
                    ) : (
                      <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                        <p className="text-red-700 text-sm font-medium">⚠ Passwords do not match</p>
                      </div>
                    )}
                  </div>
                )}
                
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm flex items-center animate-in slide-in-from-left-2 duration-200">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="activeStaus"
                    checked={formData.activeStaus}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div
                    onClick={() => handleInputChange({ target: { name: 'activeStaus', type: 'checkbox', checked: !formData.activeStaus } })}
                    className={`w-12 h-6 rounded-full cursor-pointer transition-all duration-200 ${formData.activeStaus ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 transform ${formData.activeStaus ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </div>
                <label className="text-sm font-medium text-gray-700 cursor-pointer">
                  Active User
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  User Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 text-black border-gray-200 rounded-xl bg-gray-50/50 transition-all duration-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none hover:border-gray-300"
                >
                  <option value="user"> User</option>
                  <option value="admin"> Admin</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <span>Add User</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddUserForm;