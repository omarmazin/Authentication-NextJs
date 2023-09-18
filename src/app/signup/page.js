"use client";
import React, { useState } from "react";
import { userAuth } from "../context/authContext"; // Import useAuth
import Link from "next/link";
const SignupForm = () => {
  const { signUp } = userAuth(); // Access emailSignUp from the context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(''); // Add username state
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Call the emailSignUp function to register the user
      await signUp(email, password, username);

      // Handle any post-sign-up logic (e.g., redirect to a success page)
    } catch (error) {
      setError(error.message); // Handle registration error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
                    {/* Email and password input fields */}
          {/* ... (Same as previous form) */}
          {error && (
            <p className="text-red-500 mb-4">
              {error}
            </p>
          )}
                  <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
            placeholder="John Doe"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            >
              Sign Up
            </button>
            <p className="ml-3"
            >Have an account already ? 
            <Link 
            className="text-blue-500"
            href="/"
            >
              Sign in
              </Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
