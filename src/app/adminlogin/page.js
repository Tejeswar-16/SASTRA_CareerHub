"use client"

import Image from "next/image";
import { useState } from "react";
import { auth } from "../_util/config";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminLogin(){

    const [emailError,setEmailError] = useState("");
    const [signInEmail,setSignInEmail] = useState("");
    const [clicked,setClicked] = useState(false);
    const [signInPassword,setSignInPassword] = useState("");
    const [signUpName,setSignUpName] = useState("");
    const [signUpEmail,setSignUpEmail] = useState("");
    const [signUpPassword,setSignUpPassword] = useState("");
    const [signUpConfirmPassword,setSignUpConfirmPassword] = useState("");
    const [pwdError,setPwdError] = useState("");

    const router = useRouter();

    function checkEmail(email){
        if (!email.endsWith(".sastra.edu"))
            setEmailError("Use only SASTRA Email ID");
        else    
            setEmailError("");
    }

    function handlePasswordCheck(passwordValue,confirmPasswordValue){
        if (passwordValue !== confirmPasswordValue)
            setPwdError("Passwords do not match");
        else  
            setPwdError("");
    }

    //Password Reset Alert Message
    async function handleForgotPassword(email){
        if (email === ""){
            setEmailError("Provide your email");
            return;
        }
        if (emailError != ""){
            alert(emailError);
            return;
        }
        setEmailError("");
        try
        {
            await sendPasswordResetEmail(auth,email);
            alert("A password reset link has been sent to your registered SASTRA email ID")
        }
        catch(error)
        {
            if (error.code === "auth/invalid-email")
                setEmailError("Invalid Email");
        }
    }

    function handleSignUpClick(){
        setClicked(true);
    }

    function handleSignInFromSignUp(){
        setClicked(false);
    }

    async function handleSignUp(name,email,password){
        try
        {
            if (emailError != ""){
                alert("Invalid Email");
                return;
            }
            if (pwdError != ""){
                alert("Passwords do not match");
                return;
            }
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            await updateProfile(user,{displayName: name});
            alert("Success! Created account with SASTRA CareerHub");
        }
        catch (error)
        {
            if (error.code == "auth/password-does-not-meet-requirements")
                setPwdError("Password must contain at least 8 characters, an upper case character, numeric character, a non-alphanumeric character");
        }
    }

    async function handleLogin(email,password){
        try
        {
            await signInWithEmailAndPassword(auth,email,password);
            router.push("/admindashboard");
        }
        catch (error)
        {
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential")
                alert("Hey! Invalid Email or Password");
        }
    }

    return(
        <>
            <div className="relative bg-gray-100 min-h-screen md:bg-gray-100">
                <div className="px-5 py-5 font-sans text-black font-bold text-2xl">
                    <Image className="mx-auto md:mx-0" src="/logo.png" width={150} height={150} alt="App Logo"></Image>
                </div>
                {!clicked && 
                    <div className="font-sans bg-white rounded-3xl shadow-2xl shadow-gray-400 m-auto w-70 md:m-auto md:w-120">
                        <h1 className="select-none flex justify-center font-sans font-semibold text-2xl pt-2">Sign In</h1>
                        <h1 className="select-none flex justify-center mx-2 md:mx-0 font-sans text-sm md:text-lg text-gray-600 pb-2 italic">Supporting Success Behind The Scenes</h1>
                        <hr className="text-gray-400"></hr>
                        <form onSubmit={(e) => {e.preventDefault();handleLogin(signInEmail,signInPassword)}}>
                            <div className="flex flex-col">
                            <input onChange={(e) => {setSignInEmail(e.target.value);checkEmail(e.target.value)}} required className="font-sans p-2 rounded-lg mx-4 mt-4 mb-2 border border-gray-400 h-10" type="email" placeholder="Email"/>
                            <label className="font-sans mx-4 mb-2 text-sm text-red-500">{emailError}</label>
                            <input onChange={(e) => setSignInPassword(e.target.value)} required className="font-sans p-2 rounded-lg mx-4 border border-gray-400 h-10" type="password" placeholder="Password"/>
                            <button type="submit" className={(signInEmail === "" || signInPassword === "") ? "font-sans rounded-lg mt-4 mx-4 text-white text-xl bg-gray-400 h-10 hover:cursor-not-allowed" : "font-sans rounded-lg mt-4 mx-4 text-white text-xl bg-black h-10 hover:cursor-pointer"}>Sign In</button>
                            </div>
                        </form>
                        <button onClick={() => handleForgotPassword(signInEmail)} className="ml-45 md:ml-85 font-sans my-2 mx-4 text-sm md:text-md text-red-500 font-semibold hover:cursor-pointer">Forgot Password?</button>
                        <div className="flex flex-row justify-center">
                            <p className="select-none font-sans md:mx-4 mb-2 p-1 text-sm md:text-lg">New to SASTRA CareerHub?</p>
                            <button onClick={handleSignUpClick} className="font-sans rounded-lg mb-2 text-sm md:text-lg font-semibold p-1 hover:bg-black hover:text-white hover:cursor-pointer transition duration-300 ease-in-out">Sign Up</button>
                        </div>
                    </div>
                }

                {clicked && 
                    <div className="font-sans bg-white rounded-3xl shadow-2xl shadow-gray-400 m-auto w-70 md:m-auto md:w-120">
                        <h1 className="select-none flex justify-center font-sans font-semibold text-2xl pt-2">Sign Up</h1>
                        <h1 className="select-none flex justify-center mx-2 md:mx-0 font-sans text-sm md:text-lg text-gray-600 pb-2 italic">Supporting Success Behind The Scenes</h1>
                        <hr className="text-gray-400"></hr>
                        <form onSubmit={(e) => {e.preventDefault();handleSignUp(signUpName,signUpEmail,signUpPassword)}}>
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
        </>
    );
}