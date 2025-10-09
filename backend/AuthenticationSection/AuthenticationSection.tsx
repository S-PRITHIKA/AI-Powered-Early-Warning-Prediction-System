import React, { useState } from "react";
import { loginUser, registerUser } from "../api";

import { Anchor, Shield, FileText, Mail, Lock } from "lucide-react";

type Role = "researcher" | "fisherman" | "authorities";

export default function AuthenticationSection() {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role>("researcher");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    licenseNo: "",
    department: "",
  });
  const [message, setMessage] = useState("");

  const roles = [
    { id: "researcher" as Role, name: "Researcher", icon: FileText },
    { id: "fisherman" as Role, name: "Fisherman", icon: Anchor },
    { id: "authorities" as Role, name: "Authorities", icon: Shield },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      let result;
      if (isLogin) {
        // login
        result = await loginUser(formData.email, formData.password);
      } else {
        // signup
        const data: any = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedRole,
        };

        if (selectedRole === "fisherman") data.age = formData.age;
        if (selectedRole === "researcher") data.licenseNo = formData.licenseNo;
        if (selectedRole === "authorities") data.department = formData.department;

        result = await registerUser(data);
      }

      if (result.success) {
        setMessage("✅ Success!");
        if (result.token) localStorage.setItem("token", result.token);
        console.log(result);
      } else {
        setMessage(result.message || "❌ Failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Try again later.");
    }
  };

  const renderSignupFields = () => {
    switch (selectedRole) {
      case "researcher":
        return (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="text"
              name="licenseNo"
              placeholder="License Number"
              value={formData.licenseNo}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
          </>
        );

      case "fisherman":
        return (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
          </>
        );

      case "authorities":
        return (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="text"
              name="department"
              placeholder="Department/ID"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
          </>
        );
    }
  };

  return (
    <section className="text-white py-10 px-6">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>

      {!isLogin && (
        <div className="flex space-x-4 mb-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex items-center space-x-1 px-4 py-2 rounded ${
                  selectedRole === role.id
                    ? "bg-blue-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{role.name}</span>
              </button>
            );
          })}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {isLogin ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 rounded text-black"
            />
          </>
        ) : (
          renderSignupFields()
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 underline text-sm"
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </section>
  );
}
