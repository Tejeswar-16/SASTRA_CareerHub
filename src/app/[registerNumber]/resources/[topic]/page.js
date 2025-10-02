"use client"

import { auth } from "@/app/_util/config";
import NavBar from "@/app/NavBar"
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home(){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [darkMode,setDarkMode] = useState(false);

    const params = useParams();

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user){
                setUsername(user.displayName);
                setEmail(user.email);
            }
            else{
                router.push("/studentLogin");
            }
        });
    },[]);

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

    function handleDarkMode(){
        setDarkMode(true);
        document.documentElement.classList.add('dark')
    }

    function handleLightMode(){
        setDarkMode(false);
        document.documentElement.classList.remove('dark')
    }

    const topicMap = {
        "aptitude" : "Aptitude",
        "arrays" : "Arrays",
        "strings" : "Strings",
        "dynamicprogramming" : "Dynamic Programming (DP)",
        "graphs" : "Graphs",
        "trees" : "Trees",
        "operatingsystems" : "Operating Systems (OS)",
        "computernetworks" : "Computer Networks (CN)",
        "objectorientedprogramming" : "Object Oriented Programming (OOPs)",
        "dbms" : "Database Management System (DBMS)",
        "hr" : "Human Resource (HR)"
    }

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={username} email={email} darkMode={darkMode} handleLogoClick={handleLogoClick} handleDarkMode={handleDarkMode} handleLightMode={handleLightMode} handleLogout={handleLogout}></NavBar>
                <div className="mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-250">
                    <div className="flex justify-center font-sans font-bold text-2xl">{topicMap[params.topic]}</div>
                </div>
            </div>
        </>
    )
}