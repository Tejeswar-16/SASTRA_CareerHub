"use client"

import { auth, db } from "@/app/_util/config";
import NavBar from "@/app/NavBar"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home(){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [questions,setQuestions] = useState([]);
    const [loading,setLoading] = useState(false);

    const params = useParams();
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

    function getRegNo(){
        return email.substring(0,9);
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

    async function fetchQuestions(){
        setLoading(true);
        const q = query(
            collection(db,"resources")
        )
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,    
            ...doc.data()
        }));

        let filteredData = data;

        if (params.topic === "arrays")
            filteredData = filteredData.filter((fd) => fd.id === "dsa-arrays");
        else if (params.topic === "strings")
            filteredData = filteredData.filter((fd) => fd.id === "dsa-strings");
        else if (params.topic === "dynamicprogramming")
            filteredData = filteredData.filter((fd) => fd.id === "dsa-dp");
        else if (params.topic === "graphs")
            filteredData = filteredData.filter((fd) => fd.id === "dsa-graphs");
        else if (params.topic === "trees")
            filteredData = filteredData.filter((fd) => fd.id === "dsa-trees");

        let problems = filteredData[0].problems;
        setQuestions(problems);
        setLoading(false);
    }
    useEffect(() => {
        fetchQuestions()
    },[])

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

    async function addData(){
       await setDoc(doc(db,"resources","dsa-trees"),{problems:dp},{merge:true})
    }
    //addData();

    async function handleCheckBox(question){
        try
        {
          const q = query(
            collection(db,"resources")
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          
          let filteredData = data;
          if (params.topic === "arrays")
            filteredData = filteredData.filter((fd) => fd.id === "dsa-arrays");
          else if (params.topic === "strings")
            filteredData = filteredData.filter((fd) => fd.id === "dsa-strings");
          else if (params.topic === "dynamicprogramming")
              filteredData = filteredData.filter((fd) => fd.id === "dsa-dp");
          else if (params.topic === "graphs")
              filteredData = filteredData.filter((fd) => fd.id === "dsa-graphs");
          else if (params.topic === "trees")
              filteredData = filteredData.filter((fd) => fd.id === "dsa-trees");

          const problems = filteredData[0].problems;
          const updatedProblem = problems.map((problem) => {
            if (problem.question === question){
              if (!problem.solvedBy.includes(getRegNo())){
                return { ...problem, solvedBy: [...problem.solvedBy, getRegNo()] };
              }
              else{
                return { ...problem, solvedBy: problem.solvedBy.filter((fd) => fd !== getRegNo()) }
              }
            }
            return problem;
          })

          await updateDoc(doc(db,"resources",filteredData[0].id),{
              problems: updatedProblem
          });
          
        }
        catch(error){
          console.log(error.message);
        }
        finally{
          fetchQuestions();
        }
    }

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={username} email={email} handleLogoClick={handleLogoClick} handleLogout={handleLogout}></NavBar>
                <div className="mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-250">
                    <div className="select-none flex justify-center font-sans font-bold text-2xl">{topicMap[params.topic]}</div>
                    <div className="overflow-hidden border border-gray-300 mx-auto mt-5 overflow-x-auto lg:w-240 border border-black">
                        
                        {loading && 
                            <>
                                <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                                    <div className="mx-auto font-mono font-bold text-3xl">
                                        <Image src={"/loading.gif"} width={200} height={20} alt="Loading..."></Image>
                                    </div>
                                </div>
                            </>
                        }
                        
                        <table className="mx-auto text-center">
                            <thead className="bg-blue-950 text-white">
                                <tr>
                                    <th className="select-none font-sans p-2 font-semibold border border-gray-400">S. No.</th>
                                    <th className="select-none font-sans p-2 font-semibold border border-gray-400">Mark as done</th>
                                    <th className="select-none font-sans p-2 font-semibold border border-gray-400">Problem Title</th>
                                    <th className="select-none font-sans p-2 font-semibold border border-gray-400">Problem Link</th>
                                    <th className="select-none font-sans p-2 font-semibold border border-gray-400">Difficulty Level</th>
                                    <th className="select-none font-sans p-2 font-semibold border border-gray-400">Video Solution</th>
                                    <th className={`select-none font-sans ${params.topic === "arrays" ? "w-50" : "w-70"} p-2 font-semibold border border-gray-400`}>Companies Asked</th>
                                    {params.topic === "arrays" && <th className="select-none font-sans p-2 font-semibold border border-gray-400">Pre-requisites</th>}
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    questions.map((question,index) => (
                                        <tr key={index} className={`${question.difficulty === "Easy" ? "bg-green-100 hover:bg-green-200" : question.difficulty === "Medium" ? "bg-yellow-100 hover:bg-yellow-200" : "bg-red-100 hover:bg-red-200"} hover:bg-gray-200 transition duration-300 ease-in-out`}>
                                            <td className="select-none font-sans text-sm p-2 border border-black">{index+1}</td>
                                            <td className="font-sans text-sm p-2 border border-black"><input checked={question.solvedBy?.includes(getRegNo())} onChange={() => {handleCheckBox(question.question)}} className="h-4" type="checkbox"></input></td>
                                            <td className="select-none select-none font-sans text-sm p-2 border border-black">{question.question}</td>
                                            <td className="font-sans text-sm p-2 border border-black"><Link href={question.link}><Image className="mx-auto" src={"/leetcode.png"} width={25} height={20} alt="leetcode"></Image></Link></td>
                                            <td className="select-none font-sans text-sm p-2 border border-black">{question.difficulty}</td>
                                            <td className="select-none font-sans text-sm p-2 border border-black"><Link href={question.solution}><Image className="mx-auto" src={"/youtube.png"} width={25} height={20} alt="leetcode"></Image></Link></td>
                                            <td className="select-none font-sans text-sm p-2 border border-black">{question.companies}</td>
                                            {params.topic === "arrays" && <td className="select-none font-sans text-sm p-2 border border-black">{question.prerequisites}</td>}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}