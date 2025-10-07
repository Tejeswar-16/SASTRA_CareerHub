"use client"

import { auth } from "@/app/_util/config";
import NavBar from "@/app/NavBar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [formName,setFormName] = useState("");

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){
                setName(user.displayName)
                setEmail(user.email);
                setFormName(user.displayName);
            }
        })
    },[]);
    
    function getRegNo(){
        return email.substring(0,9);
    }

    function handleLogoClick(){
        router.push("/dashboard")
    }

    async function handleLogout(){
        try{
            await signOut(auth);
            router.push("/studentlogin");
        }
        catch (error){
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={name} email={email} handleLogoClick={handleLogoClick} handleLogout={handleLogout}></NavBar>
                <div className="mx-auto select-none font-sans bg-white rounded-xl shadow-2xl w-250 mt-5 p-4">
                    <div className="bg-gray-100 rounded-xl shadow-lg p-3">
                        <div className="font-sans text-xl">
                            Full Name
                        </div>
                        <input value={formName.toUpperCase()} onChange={(e) => setFormName(e.target.value)} className="border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="text" placeholder="Enter your full name with initial"></input>
                    </div>
                    <div className="bg-gray-100 rounded-xl mt-5 shadow-lg p-3">
                        <div className="font-sans text-xl">
                            Register Number
                        </div>
                        <input disabled value={getRegNo()} className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="text"></input>
                    </div>
                    <div className="bg-gray-100 rounded-xl mt-5 shadow-lg p-3">
                        <div className="font-sans text-xl">
                            SASTRA Email
                        </div>
                        <input disabled value={email} className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="email"></input>
                    </div>
                    <div className="bg-gray-100 rounded-xl mt-5 shadow-lg p-3">
                        <div className="font-sans text-xl">
                            Personal Email
                        </div>
                        <input className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="email" placeholder="Enter your personal email id"></input>
                    </div>
                </div>
            </div>
        </>
    )
}