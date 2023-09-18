"use client";
import Link from "next/link";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import React from 'react';
import { useState,useContext } from 'react';
import { auth } from './firebase';
import { userAuth } from "./context/authContext";

const Login = () => {
  
  const {user, googleSignIn,logOut,signIn} = userAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleGoogle = async()=>{
    try{
      await googleSignIn()

    }catch(error){
      
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }


  const handleGoogleOut = async () =>{
    try{
      await logOut();

    }catch (error){
      console.log(error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
   

    try {
      await auth.signInWithEmailAndPassword(email, password);
    
      console.log("success")
    } catch (error) {
      console.log(setError(error.message));
    }
  };
  const handleSignIn = () => {
   
    signIn(email, password); 
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        
   
        {!user ?(<div>
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
          <div className="mb-4">
          <button
              type="button"
              // onClick={handleGoogleLogin}
              className=" flex  w-2/3 bg-white text-black font-semibold py-2 rounded-lg focus:outline-none  mt-2 mb-4 ml-3 mr-3"
            >
              <FcGoogle
              className={`ml-2 mt-1`}
              widths={30}
              />
              <p
              className={`ml-3`}
              onClick={handleGoogle}
              >Login with Google
              </p>
            </button>
            <label htmlFor="email" className="block text-gray-600">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
              placeholder="********"
              required
            />
            
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button
              type="submit"
              onClick={handleSignIn}
              className="w-[50%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            >
              Login
            </button>
            
            <p
            className={`mt-1`}
            >
               <Link 
              href='/signup'
              className={`text-blue-400`}
              >Sign up </Link>
              </p>
          </div>
        </form>
        
        </div>):(
          <>

        <p>Welcome {user.displayName}</p>
        <button onClick={handleGoogleOut}
           className="w-[100%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >Logout</button>

        </>
        )}
      </div>

    </div>
  );
};


export default Login;
