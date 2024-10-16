"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Authentication = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, pass }),
    });
    if (res.status === 200) {
      const data = await res.json();
      const userId = data.userId;
      localStorage.setItem("userId", JSON.stringify(userId));
      router.push("/todo");
      return;
    }
    alert("Wrong email or pass");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors"
        >
          Login
        </button>

        <div className="text-center text-gray-600 mt-4">
          Don't have an account?
          <Link href="/register" className="text-blue-500 hover:underline ml-1">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Authentication;
