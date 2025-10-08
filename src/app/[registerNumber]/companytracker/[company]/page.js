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
    const [error,setError] = useState("");
    const [personalEmail,setPersonalEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [dob,setDob] = useState("");
    const [tenth,setTenth] = useState("");
    const [twelfth,setTwelfth] = useState("");
    const [cgpa,setCgpa] = useState("");
    const [resume,setResume] = useState("");

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

    function handleSubmit(){

    }

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={name} email={email} handleLogoClick={handleLogoClick} handleLogout={handleLogout}></NavBar>
                <div className="mx-auto select-none font-sans bg-white rounded-xl shadow-2xl w-250 mt-5 p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-100 rounded-xl shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Full Name
                            </div>
                            <input value={formName.toUpperCase()} onChange={(e) => setFormName(e.target.value)} required className="border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="text" placeholder="Enter your full name with initial"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Register Number
                            </div>
                            <input disabled value={getRegNo()} required className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="text"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                SASTRA Email
                            </div>
                            <input disabled value={email} required className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="email"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Personal Email
                            </div>
                            <input required value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="email" placeholder="Enter your personal email"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Mobile Number
                            </div>
                            <input required className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="number" placeholder="Enter your mobile number"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Gender
                            </div>
                            <input required className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="number" placeholder="Enter your mobile number"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Date of Birth (DOB)
                            </div>
                            <input required value={dob} onChange={(e) => setDob(e.target.value)} className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="date"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Percentage scored in 10th grade
                            </div>
                            <input required value={tenth} onChange={(e) => setTenth(e.target.value)} className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="number" max={100} placeholder="10th grade (%)"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Percentage scored in 12th grade
                            </div>
                            <input required value={twelfth} onChange={(e) => setTwelfth(e.target.value)} className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="number" max={100} placeholder="12th grade (%)"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Cumulative Grade Point Average (CGPA)
                            </div>
                            <input required value={cgpa} onChange={(e) => setCgpa(e.target.value)} className="select-none border mt-3 rounded-xl w-235 h-12 p-2 text-md" type="number" max={100} placeholder="CGPA"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-xl">
                                Upload your resume (Should be named as "REGNO_NAME")
                            </div>
                            <input required value={resume} onChange={(e) => setResume(e.target.value)} className="font-sans mt-3 rounded-xl font-bold hover:cursor-pointer transition duration-300" type="file" max={100} placeholder="CGPA"></input>
                        </div>
                        <div className="flex justify-center">
                            <button className="flex justify-center select-none rounded-xl bg-gray-200 border border-b font-sans font-bold text-xl my-10 p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duation-300">Submit Application</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}