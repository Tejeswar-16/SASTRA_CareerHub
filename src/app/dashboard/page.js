"use client"

import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "../_util/config";
import { useRouter } from "next/navigation";

export default function HOME(){

    const [username,setUsername] = useState("Tejeswar S");

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user)
                setUsername(user.displayName);
            else
                router.push("/");
        })
    })

    function handleLogoClick(){
        router.push("/dashboard");
    }

    async function handleLogout(){
        try{
            await signOut(auth);
            router.push("/studentlogin");
        }
        catch(error){
            console.log(error.message);
        }
    }

    return(
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <div className="mx-auto bg-white p-2 rounded-xl shadow-xl w-75 md:w-350">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row justify-left items-center">
                            <Image onClick={handleLogoClick} className="hover:cursor-pointer" src={"/logo.png"} width={60} height={20} alt="Logo"></Image>
                            <div className="flex flex-col md:flex-row">
                                <div className="select-none font-sans font-bold text-md md:text-3xl">Welcome,</div>
                                <div className="select-none font-sans font-bold text-md md:text-3xl">{username}</div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-right items-center md:space-x-6">
                            <button className="font-sans bg-blue-900 text-white p-1 mt-6 text-sm md:text-lg md:rounded-xl md:p-2 rounded-lg">Dark Mode</button>
                            <p className="select-none">Logout<Image onClick={handleLogout} src="/logout.png" width={30} height={20} alt="logout" className="mb-2 cursor-pointer"/></p>
                        </div>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col">
                    <div className="mx-auto my-10 md:ml-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                        <Image className="mx-auto rounded-xl" src={"/resources.jpg"} width={360} height={360} alt="resources"></Image>
                        <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Resource Library</div>
                        <div className="select-none text-center italic font-sans text-lg">Boost your career with expert resources on DSA, aptitude, interviews, HR, and more. Learn, practice, and excel!</div>
                        <Image className="mx-auto  hover:cursor-pointer" src={"/navigate.jpg"} width={80} height={10} alt="navigate"></Image>
                    </div>

                    <div className="mx-auto mb-10 md:ml-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                        <Image className="mx-auto rounded-xl" src={"/company.jpg"} width={360} height={360} alt="resources"></Image>
                        <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Comapany Tracker</div>
                        <div className="select-none text-center italic font-sans text-lg">Stay informed about SASTRA placements, internship openings, and company updates to plan your future</div>
                        <Image className="mx-auto  hover:cursor-pointer" src={"/navigate.jpg"} width={80} height={10} alt="navigate"></Image>
                    </div>

                    <div className="mx-auto mb-10 md:ml-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                        <Image className="mx-auto rounded-xl" src={"/progress.jpg"} width={360} height={360} alt="resources"></Image>
                        <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Track your progress</div>
                        <div className="select-none text-center italic font-sans text-lg">Discover your strengths, identify areas to improve, and keep moving forward. Every step counts!</div>
                        <Image className="mx-auto  hover:cursor-pointer" src={"/navigate.jpg"} width={80} height={10} alt="navigate"></Image>
                    </div>

                    <div className="mx-auto mb-10 md:ml-18 md:mr-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                        <Image className="mx-auto rounded-xl" src={"/interview.jpg"} width={360} height={360} alt="resources"></Image>
                        <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Interview Experience</div>
                        <div className="select-none text-center italic font-sans text-lg">Your story can guide someone&apos;s journey. Share your interview experience and discover others&apos; too.</div>
                        <Image className="mx-auto  hover:cursor-pointer" src={"/navigate.jpg"} width={80} height={10} alt="navigate"></Image>
                    </div>
                </div>
            </div>
        </>
    );
}