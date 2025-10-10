"use client"

import { auth, db } from "@/app/_util/config";
import NavBar from "@/app/NavBar"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [companyData,setCompanyData] = useState([]);

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){
                setName(user.displayName)
                setEmail(user.email);
            }
        })
    });

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

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            const q = query(
                collection(db,"announcements")
            )   
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());
            setCompanyData(data);
            setLoading(false);
        }
        fetchData();
    },[]);

    function handleSASTRAClick(company){
        let Company = "";
        for (let i=0;i<company.length;i++){
            if (company[i] === " "){
                Company+="";
            }
            else{
                Company+=company[i];
            }
        }
        router.push("/"+params.registerNumber+"/companytracker/"+Company.toLowerCase());
    }

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={name} email={email} handleLogoClick={handleLogoClick} handleLogout={handleLogout}></NavBar>
                    {loading && 
                        <>
                            <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                                <div className="mx-auto font-mono font-bold text-3xl">
                                    <Image src={"/loading.gif"} width={200} height={20} alt="Loading..."></Image>
                                </div>
                            </div>
                        </>
                    }
                    <div className="mx-auto flex flex-col md:flex-wrap md:flex-row justify-center md:gap-9 w-75 md:w-190 lg:w-250"> 
                        {
                            companyData.map((company,index) => (
                                <div key={index}>
                                    <div className="select-none border border-b-6 border-r-3 border-l-2 border-blue-900 hover:scale-105 flex flex-col items-center bg-white rounded-xl shadow-xl mt-10 w-75 md:w-90 lg:w-120 transition duration-300">
                                        <div className="flex justify-center font-sans rounded-lg bg-blue-900 text-white p-2 text-md lg:text-xl w-74 md:w-89 lg:w-119 font-bold">
                                            {company.title}
                                        </div>
                                        <div className="select-none p-5">
                                            <div className="flex flex-row justify-between items-center">
                                                <div className="flex flex-col lg:mr-27">
                                                    <div className="font-sans text-sm md:text-md font-semibold">
                                                        Role: {company.role}
                                                    </div>
                                                    <div className="font-sans text-sm lg:text-md font-semibold">
                                                        Batch(es) Eligible: {company.batch.join(", ")} passouts
                                                    </div>
                                                    <div className="font-sans text-sm md:text-md font-semibold">
                                                        Department: {company.forDept.join(", ")}
                                                    </div>
                                                </div>
                                                <div className={`font-sans flex md:ml-4 ${company.status === "Active" ? "bg-green-700" : "bg-red-700"} p-1 text-sm rounded-xl text-white`}>
                                                    {company.status}
                                                </div>
                                            </div>
                                            <div className="font-sans text-sm h-48 mt-2 p-2 border border-gray-300 rounded-xl overflow-hidden overflow-y-auto">
                                                {company.content}
                                            </div>
                                            <div className="flex flex-col items-center md:flex-row justify-between md:space-x-3 mt-5">
                                                <div onClick={() => {company.status === "Active" ? handleSASTRAClick(company.title) : undefined}} className={`font-sans bg-blue-200 rounded-xl font-semibold shadow-xl p-2 text-sm md:text-md ${company.status === "Active" ? "hover:cursor-pointer hover:bg-blue-500 hover:text-white" : "hover:cursor-not-allowed opacity-50"} transition duration-300`}>
                                                    Apply (SASTRA's Portal)
                                                </div>
                                                <div className={`font-sans bg-green-200 mt-3 md:mt-0 rounded-xl font-semibold shadow-xl p-2 text-sm md:text-md ${company.status === "Active" ? "hover:cursor-pointer hover:bg-green-500" : "hover:cursor-not-allowed opacity-50"} transition duration-300`}>
                                                    Apply (Company's Portal)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        } 
                    </div>
            </div>
        </>
    )
}