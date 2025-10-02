"use client"

import { auth } from "@/app/_util/config";
import NavBar from "@/app/NavBar"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"

export default function Home(){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [darkMode,setDarkMode] = useState(false);

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

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={username} email={email} darkMode={darkMode} handleLogoClick={handleLogoClick} handleDarkMode={handleDarkMode} handleLightMode={handleLightMode} handleLogout={handleLogout}></NavBar>
            </div>
        </>
    )
}