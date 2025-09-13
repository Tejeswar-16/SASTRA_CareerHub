"use client"

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [signUpClick,setSignUpClick] = useState(false);
  const [signInEmail,setSignInEmail] = useState("");
  const [signInPassword,setSignInPassword] = useState("");
  const [signUpName,setSignUpName] = useState("");
  const [signUpEmail,setSignUpEmail] = useState("");
  const [signUpPassword,setSignUpPassword] = useState("");
  const [signUpConfirmPassword,setSignUpConfirmPassword] = useState("");
  const [pwdError,setPwdError] = useState("");
  const [emailError,setEmailError] = useState("");

  //Sign In to Sign Up
  function handleSignUpClick(){
    setSignUpClick(true);
    setSignInEmail("");
    setSignInPassword("");
    setEmailError("");
    setPwdError("");
  }

  //Sign Up to Sign In
  function handleSignInFromSignUp(){
    setSignUpClick(false);
    setSignUpName("");setSignUpEmail("");
    setSignUpPassword("");setSignUpConfirmPassword("");
    setEmailError("");
    setPwdError("");
  }

  //Password Validation
  function handlePasswordCheck(passwordValue,confirmPasswordValue){
    if (passwordValue !== confirmPasswordValue)
      setPwdError("Passwords do not match");
    else  
      setPwdError("");
  }

  function isDigit(str)
  {
      for (let i=0;i<str.length;i++)
      {
        if (str.charAt(i) < '0' || str.charAt(i) > '9')
          return false;
      }
      return true;
  }

  //Email Validation
    function checkEmail(email){
      if (email === "")
        setEmailError("");
      else
      {
        if (!email.endsWith("@sastra.ac.in"))
          setEmailError("Use only SASTRA Email ID");
        else
        {
          if (email.length === 22)
          {
            let substr = email.substring(0,9);
            if (isDigit(substr))
              setEmailError("");
            else
              setEmailError("Invalid Email ID");
          }
          else
          {
            setEmailError("Invalid Email ID");
          }
        }
      }
    }

  //Password Reset Alert Message
  function handleForgotPassword(){
    alert("A password reset link has been sent to your registered SASTRA email ID")
  }

  return (
    <div className="relative bg-gray-100 min-h-screen md:bg-gray-100">
      <div className="px-5 py-5 font-sans text-black font-bold text-2xl">
        <Image className="mx-auto md:mx-0" src="/logo.png" width={150} height={150} alt="App Logo"></Image>
      </div>
      {
        !signUpClick &&
        <div className="font-sans bg-white rounded-3xl shadow-2xl shadow-gray-400 m-auto w-80 md:m-auto md:w-120">
          <h1 className="select-none flex justify-center font-sans font-semibold text-2xl pt-2">Sign In</h1>
          <h1 className="select-none flex justify-center mx-2 md:mx-0 font-sans text-sm md:text-lg text-gray-600 pb-2 italic">Streamline Your Journey to Success</h1>
          <hr className="text-gray-400"></hr>
          <form>
            <div className="flex flex-col">
              <input onChange={(e) => {setSignInEmail(e.target.value);checkEmail(e.target.value)}} required className="font-sans p-2 rounded-lg mx-4 mt-4 mb-2 border border-gray-400 h-10" type="email" placeholder="Email"/>
              <label className="font-sans mx-4 mb-2 text-sm text-red-500">{emailError}</label>
              <input onChange={(e) => setSignInPassword(e.target.value)} required className="font-sans p-2 rounded-lg mx-4 border border-gray-400 h-10" type="password" placeholder="Password"/>
              <button type="submit" className={(signInEmail === "" || signInPassword === "") ? "font-sans rounded-lg mt-4 mx-4 text-white text-xl bg-gray-400 h-10 hover:cursor-not-allowed" : "font-sans rounded-lg mt-4 mx-4 text-white text-xl bg-black h-10 hover:cursor-pointer"}>Sign In</button>
            </div>
          </form>
          <button onClick={handleForgotPassword} className="ml-41 md:ml-80 font-sans my-2 mx-4 text-md text-red-500 font-semibold hover:cursor-pointer">Forgot Password?</button>
          <div className="flex flex-row justify-center">
            <p className="select-none font-sans md:mx-4 mb-2 p-1 text-sm md:text-lg">New to SASTRA CareerHub?</p>
            <button onClick={handleSignUpClick} className="font-sans rounded-lg mb-2 text-sm md:text-lg font-semibold p-1 hover:bg-black hover:text-white hover:cursor-pointer transition duration-300 ease-in-out">Sign Up</button>
          </div>
        </div>
      }

      {
        signUpClick &&
        <div className="font-sans bg-white rounded-3xl shadow-2xl shadow-gray-400 m-auto w-70 md:m-auto md:w-120">
          <h1 className="select-none flex justify-center font-sans font-semibold text-2xl pt-2">Sign Up</h1>
          <h1 className="select-none flex justify-center mx-2 md:mx-0 font-sans text-sm md:text-lg text-gray-600 pb-2 italic">Streamline Your Journey to Success</h1>
          <hr className="text-gray-400"></hr>
          <form>
            <div className="flex flex-col">
              <input value={signUpName} onChange={(e) => setSignUpName((e.target.value).toUpperCase())} required className="font-sans p-2 rounded-lg m-4 border border-gray-400 h-10" type="text" placeholder="Name"/>
              <input value={signUpEmail} onChange={(e) => {setSignUpEmail(e.target.value);checkEmail(e.target.value)}}required className="font-sans p-2 rounded-lg mx-4 border border-gray-400 h-10" type="email" placeholder="SASTRA Email"/>
              <label className="font-sans mx-4 my-2 text-sm text-red-500">{emailError}</label>
              <input value={signUpPassword} onChange={(e) => {setSignUpPassword(e.target.value);handlePasswordCheck(e.target.value,signUpConfirmPassword)}}required className="font-sans p-2 rounded-lg mx-4 mb-4 border border-gray-400 h-10" type="password" placeholder="Password"/>
              <input value={signUpConfirmPassword} onChange={(e) => {setSignUpConfirmPassword(e.target.value);handlePasswordCheck(signUpPassword,e.target.value)}}required className="font-sans p-2 rounded-lg mx-4 border border-gray-400 h-10" type="password" placeholder="Confirm Password"/>
              <label className="font-sans mx-4 mt-2 text-sm text-red-500">{pwdError}</label>
              <button type="submit" className={(signUpName === "" || signUpEmail === "" || signUpPassword === "" || signUpConfirmPassword === "")? "font-sans rounded-lg m-4 text-white text-xl bg-gray-400 h-10 hover:cursor-not-allowed" : "font-sans rounded-lg m-4 text-white text-xl bg-black h-10 hover:cursor-pointer"}>Sign Up</button>
            </div>
          </form>
          <div className="flex flex-row justify-center">
            <p className="select-none font-sans mx-4 mb-4 md:mx-4 p-1 text-sm md:text-lg">Already part of SASTRA CareerHub?</p>
            <button onClick={handleSignInFromSignUp} className="font-sans rounded-lg mx-4 mb-4 text-sm md:text-lg font-semibold p-1 hover:bg-black hover:text-white hover:cursor-pointer transition duration-300 ease-in-out">Sign In</button>
          </div>
        </div>
      }
    </div>
  );
}