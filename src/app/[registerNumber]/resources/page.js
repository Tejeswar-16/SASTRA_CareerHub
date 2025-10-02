"use client"

import { auth, db } from "@/app/_util/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [darkMode,setDarkMode] = useState(false);
    const [clicked,setClicked] = useState([true,false,false,false,false,false,false,false]);
    const [resource,setResource] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchResource,setSearchResource] = useState("");

    const router = useRouter();

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

    function handleChipsClick(param){
        const updated = [...clicked];
        updated[param] ? updated[param] = false : updated[param] = true;
        for (let i=0;i<updated.length;i++){
            if (i !== param && updated[i] === true){
                updated[i] = false;
            }
        }
        setClicked(updated);
    }

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            const q = query(
                collection(db,"resources")
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());

            let filteredData = data;
            
            if (searchResource !== ""){
                filteredData = filteredData.filter((fd) => ((fd.topic).toLowerCase()).startsWith(searchResource.toLowerCase()));
            }
            else if (clicked[1]){
                filteredData = filteredData.filter((fd) => (fd.topic === "Arrays" || fd.topic === "Strings" || fd.topic === "Dynamic Programming" || fd.topic === "Trees" || fd.topic === "Graphs"))
            }
            else if (clicked[2]){
                filteredData = filteredData.filter((fd) => (fd.topic === "Object Oriented Programming"))
            }
            else if (clicked[3]){
                filteredData = filteredData.filter((fd) => (fd.topic === "DBMS"))
            }
            else if (clicked[4]){
                filteredData = filteredData.filter((fd) => (fd.topic === "Operating Systems"))
            }
            else if (clicked[5]){
                filteredData = filteredData.filter((fd) => (fd.topic === "Computer Networks"))
            }
            else if (clicked[6]){
                filteredData = filteredData.filter((fd) => (fd.topic === "HR"))
            }
            else if (clicked[7]){
                filteredData = filteredData.filter((fd) => (fd.topic === "Aptitude"))
            }

            setResource(filteredData);
            setLoading(false);
        }
        fetchData();
    },[clicked,searchResource]);

    function handleDarkMode(){
        setDarkMode(true);
        document.documentElement.classList.add('dark')
    }

    function handleLightMode(){
        setDarkMode(false);
        document.documentElement.classList.remove('dark')
    }

    return(
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <div className="mx-auto bg-white p-2 rounded-xl shadow-xl w-75 md:w-190 lg:w-250">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row justify-left items-center">
                            <Image onClick={handleLogoClick} className="hover:cursor-pointer" src={"/logo.png"} width={60} height={20} alt="Logo"></Image>
                            <div className="flex flex-col">
                                <div className="select-none font-sans font-bold text-lg md:text-2xl">Welcome, {username}</div>
                                <div className="select-none font-sans font-semibold text-sm md:text-sm">{email}</div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-6">
                            <div className="bg-gray-200 rounded-lg shadow-3xl p-2 mb-2 md:mb-0">
                                {darkMode && <Image onClick={handleLightMode} className="cursor-pointer" src={"/sun.png"} width={28} height={20} alt="light mode"></Image>}
                                {!darkMode && <Image onClick={handleDarkMode} className="cursor-pointer" src={"/moon.png"} width={28} height={20} alt="dark mode"></Image> }
                            </div>
                            <div  className="bg-gray-200 rounded-lg shadow-3xl p-1 hover:cusror-pointer">
                                <Image onClick={handleLogout} src="/logout.png" width={35} height={20} alt="logout"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="select-none flex justify-center font-sans font-bold text-2xl md:text-3xl my-5">
                    📚Resources Hub
                </div>
                <div className="flex flex-col lg:flex-row justify-center">
                    <div className="mx-auto lg:mx-0 bg-white rounded-xl shadow-xl p-4 w-75 md:w-190 lg:w-80 lg:mr-5 mb-5 md:mb-0">
                        <div className="select-none font-sans font-bold text-xl">
                            Browse Categories
                        </div>
                        <div className="flex flex-col md:flex-row lg:flex-col">
                            <div className="bg-gray-100 rounded-xl shadow-2xl p-2 mt-2 mr-0 lg:mr-0 md:mr-2 hover:bg-gray-200 transition duration-300">
                                <div className="select-none font-sans text-xl font-semibold">DSA</div>
                                <div className="select-none font-sans text-sm">Topic-wise problems and patterns for online assesment and more</div>
                            </div>
                            <div className="bg-gray-100 rounded-xl shadow-2xl p-2 mt-2 mr-0 lg:mr-0 md:mr-2 hover:bg-gray-200 transition duration-300">   
                                <div className="select-none font-sans text-xl font-semibold">OOPs</div>
                                <div className="select-none font-sans text-sm">Key concepts, interview questions and more</div>
                            </div>
                            <div className="bg-gray-100 rounded-xl shadow-2xl p-2 mt-2 mr-0 lg:mr-0 md:mr-2 hover:bg-gray-200 transition duration-300">
                                <div className="select-none font-sans text-xl font-semibold">OS</div>
                                <div className="select-none font-sans text-sm">Scheduling, deadlocks, core theory and more</div>
                            </div>
                            <div className="bg-gray-100 rounded-xl shadow-2xl p-2 mt-2 mr-0 lg:mr-0 md:mr-2 hover:bg-gray-200 transition duration-300">
                                <div className="select-none font-sans text-xl font-semibold">CN</div>
                                <div className="select-none font-sans text-sm">Protocols, TCP/IP, key diagrams and more</div>
                            </div>
                            <div className="bg-gray-100 rounded-xl shadow-2xl p-2 mt-2 mr-0 lg:mr-0 md:mr-2 hover:bg-gray-200 transition duration-300">
                                <div className="select-none font-sans text-xl font-semibold">Aptitude</div>
                                <div className="select-none font-sans text-sm">Topic-wise problems and patterns for online assesment</div>
                            </div>
                            <div className="bg-gray-100 rounded-xl shadow-2xl p-2 mt-2 hover:bg-gray-200 transition duration-300">
                                <div className="select-none font-sans text-xl font-semibold">HR</div>
                                <div className="select-none font-sans text-sm">Behavioural questions, STAR method and more</div>
                            </div>
                        </div>
                    </div>

                    {loading && 
                        <>
                           <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                                <div className="mx-auto font-mono font-bold text-3xl">
                                    Loading...
                                </div>
                            </div>
                        </>
                    }

                    <div className="mx-auto lg:mx-0 mt-0 md:mt-5 lg:mt-0 bg-white rounded-xl shadow-xl w-75 md:w-190 lg:w-165 md:h-150">
                        <div className="bg-gray-100 rounded-xl shadow-xl px-4 py-2">
                            <input value={searchResource} onChange={(e) => setSearchResource(e.target.value)} className="font-sans border rounded-xl w-67 md:w-182 lg:w-153 h-10 p-2" type="search" placeholder="Search topics..."></input>
                            <div className="flex flex-wrap md:flex-row justify-between items-center">
                                <div onClick={() => handleChipsClick(0)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[0] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>All</div> 
                                <div onClick={() => handleChipsClick(1)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[1] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>DSA</div>
                                <div onClick={() => handleChipsClick(2)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[2] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>OOPs</div>
                                <div onClick={() => handleChipsClick(3)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[3] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>DBMS</div>
                                <div onClick={() => handleChipsClick(4)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[4] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>OS</div>
                                <div onClick={() => handleChipsClick(5)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[5] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>CN</div>
                                <div onClick={() => handleChipsClick(6)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[6] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>HR</div>
                                <div onClick={() => handleChipsClick(7)} className={`select-none font-sans border-gray-300 rounded-2xl ${clicked[7] ? "bg-yellow-200" : ""} p-2 mt-2 hover:cursor-pointer`}>Aptitude</div>
                            </div>
                        </div>
                        <div className="select-none font-sans font-bold text-xl px-4 my-4">
                            Resources
                        </div>
                        <div className="mx- 0 lg:mx-0 md:mx-auto bg-white rounded-xl p-4 md:w-165 h-100 overflow-hidden overflow-y-auto">
                            <div className="flex md:flex-wrap md:flex-row flex-col justify-between">
                                {
                                    resource.map((resource,index) => (
                                        <div key={index} className="mx-auto lg:mx-0 bg-gray-100 rounded-xl shadow-xl p-2 w-65 md:w-[48%] mb-4 border border-gray-200">
                                            <div className="select-none font-sans font-bold text-lg">
                                                {resource.topic}
                                            </div>
                                            <div className="select-none font-sans">
                                                {resource.description}
                                            </div>
                                            <div className="mx-auto select-none font-sans font-semibold bg-green-300 rounded-xl shadow-xl p-2 w-14 cursor-pointer">Open</div>
                                        </div>    
                                    ))
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}