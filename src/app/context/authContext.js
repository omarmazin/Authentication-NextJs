
"use client";
import React from "react";
import { useContext, createContext,useState, useEffect } from "react";
import {getAuth, 
  updateProfile,signInWithPopup,
   signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Swal from "sweetalert2";

const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
  const [isLoading, setIsLoading] = useState(true);
  
    const [user,setUser]= useState(null)
    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }
    
    const signUp = async (email, password,username) => {

        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const newUser = userCredential.user;

          // Set the user's display name (username)
          await updateProfile(newUser, {
            displayName: username,
          });
      
          setUser(newUser);
          Swal.fire({
            icon: 'success',
            title: 'Your account has been created',
            showConfirmButton: false,
            timer: 1500
          })

          
      
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            alert("Email is already in use. Please use a different email.");
          } else {
            alert(error.message);
          }
        }

      };
      const signIn = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          setUser(userCredential.user);
          Swal.fire({
            icon: 'success',
            title: 'Logged In',
            showConfirmButton: false,
            timer: 1500
          })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:"Email or Password is incorrect"
          })          
          }

      };
    const logOut= () =>{
        signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setTimeout(() => {
              setIsLoading(false); // After 1 second, set isLoading to false
            }, 1000); // 1000 milliseconds (1 second)

        })
        return () => unsubscribe();
    },[user])
    if (isLoading) {
      
      return (
        <div className="bg-white w-screen h-screen flex items-center justify-center">
          <p
          className="text-center text-lg "
          >Loading ...</p>
      </div>
      );
      
    }

  
    return(
        <AuthContext.Provider value={{user,googleSignIn,logOut, signUp,signIn}}>{children}</AuthContext.Provider>
    )
}
export const userAuth = () =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(AuthContext)
}