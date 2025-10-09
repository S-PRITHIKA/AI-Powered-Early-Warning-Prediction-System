import React, { useState } from "react";
import { User, Anchor, Shield, Mail, Lock, FileText } from "lucide-react";
import { loginUser, registerUser } from "../api";

type Role = "researcher" | "fisherman" | "authorities";
type AuthTab = "login" | "signup";

const AuthenticationSection = () => {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [selectedRole, setSelectedRole] = useState<Role>("researcher");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    licenseNo: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const roles = [
    {
      id: "researcher" as Role,
      name: "Researcher",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      description: "Marine research and data analysis",
    },
   
    {
      id: "authorities" as Role,
      name: "Authorities",
      icon: Shield,
      color: "from-teal-500 to-emerald-500",
      description: "Maritime law and regulation enforcement",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let result;
    if (activeTab === "login") {
      result = await loginUser(formData.email, formData.password);
    } else {
      result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
      });
    }

    if (result.success) {
      setMessage("✅ Success!");
      if (result.token) localStorage.setItem("token", result.token);
    } else {
      setMessage(result.message || "❌ Failed");
    }
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="mx-auto max-w-4xl">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-full p-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("login")}
                className={`px-8 py-3 rounded-full transition-all font-medium ${
                  activeTab === "login"
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`px-8 py-3 rounded-full transition-all font-medium ${
                  activeTab === "signup"
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Role Selection */}
          {activeTab === "signup" && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 text-center lg:text-left">
                Choose Your Role
              </h3>
              <div className="space-y-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        selectedRole === role.id
                          ? "border-white bg-white/10 shadow-lg"
                          : "border-white/20 hover:border-white/40 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-full bg-gradient-to-r ${role.color}`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-lg">
                            {role.name}
                          </h4>
                          <p className="text-blue-200 text-sm">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === "signup" && (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded"
                    placeholder="Full Name"
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
                placeholder="Email"
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-3 border rounded"
                placeholder="Password"
              />

              {activeTab === "signup" && (
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded"
                  placeholder="Confirm Password"
                />
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
              >
                {activeTab === "login" ? "Login" : "Register"}
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-gray-700">{message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationSection;
