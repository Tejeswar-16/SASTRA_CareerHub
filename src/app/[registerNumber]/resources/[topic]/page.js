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
    const [mcqs,setMcqs] = useState([]);
    const [loading,setLoading] = useState(false);

    const params = useParams();
    const router = useRouter();

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

    const topicFBMap = {
        "aptitude" : "aptitude",
        "operatingsystems" : "os",
        "computernetworks" : "cn",
        "objectorientedprogramming" : "oops",
        "dbms" : "dbms",
        "hr" : "hr"
    }

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

    async function fetchMCQs(){
        try
        {
            const q = query(
                collection(db,"resources",topicFBMap[params.topic],"questions")
            )
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());
            setMcqs(data);
        }
        catch (error)
        {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchQuestions();
        fetchMCQs();
    },[]);

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
                    <div className="overflow-hidden border border-white mx-auto mt-5 overflow-x-auto lg:w-240 border border-black">
                        
                        {loading && 
                            <>
                                <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                                    <div className="mx-auto font-mono font-bold text-3xl">
                                        <Image src={"/loading.gif"} width={200} height={20} alt="Loading..."></Image>
                                    </div>
                                </div>
                            </>
                        }
                        
                        {(params.topic === "arrays" || params.topic === "strings" || params.topic === "dynamicprogramming" || params.topic === "graphs" || params.topic === "trees") &&

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
                        }

                        {
                            params.topic === "hr" && 
                                <div>
                                    <div className="bg-gray-200 rounded-xl shadow-xl p-4 border border-b-4 border-r-2 hover:scale-95 transition duration-300">
                                        <div className="select-none flex flex-rows">
                                            <div className="mx-auto font-sans border border-b-4 border-r-4 border-black font-bold text-5xl bg-fuchsia-500 text-white rounded-lg shadow-lg p-5">S</div>
                                            <div className="mx-auto font-sans border border-b-4 border-r-4 border-black font-bold text-5xl bg-violet-500 text-white rounded-lg shadow-lg p-5">T</div>
                                            <div className="mx-auto font-sans border border-b-4 border-r-4 border-black font-bold text-5xl bg-purple-500 text-white rounded-lg shadow-lg p-5">A</div>
                                            <div className="mx-auto font-sans border border-b-4 border-r-4 border-black font-bold text-5xl bg-blue-500 text-white rounded-lg shadow-lg p-5">R</div>
                                        </div>
                                        <div className="select-none font-sans my-5 font-semibold text-xl">The STAR method is a structured way of answering behavioral interview questions, commonly used in HR interviews to assess your past experiences and predict future performance.</div>
                                        <div className="flex flex-row justify-between">
                                            <div className="flex items-center italic bg-fuchsia-500 text-white font-bold border border-b-4 border-r-4 border-black rounded-xl shadow-xl w-45 p-2 ">
                                                S - Situation: 
                                                Describe the context within which you performed a task or faced a challenge. 
                                                Example: “In my previous internship, our team was behind schedule on a project with a tight deadline.”
                                            </div>
                                            <div className="flex items-center italic bg-violet-500 text-white font-bold border border-b-4 border-r-4 border-black rounded-xl shadow-xl w-43 p-2 ">
                                                T - Task: Explain the task or responsibility you had in that situation.
                                                Example: “I was responsible for coordinating the team and ensuring all deliverables were submitted on time.”
                                            </div>
                                            <div className="flex items-center italic bg-purple-500 text-white font-bold border border-b-4 border-r-4 border-black rounded-xl shadow-xl w-60 p-2 ">
                                               A - Action: Describe the specific actions you took to address the task or challenge. Focus on your role, not the team’s.
                                               Example: “I created a detailed task schedule, delegated responsibilities according to strengths, and conducted daily check-ins to track progress.”
                                            </div>
                                            <div className="flex items-center italic bg-blue-500 text-white font-bold border border-b-4 border-r-4 border-black rounded-xl shadow-xl w-60 p-2 ">
                                                R - Result: Share the outcome of your actions, ideally with measurable results. Highlight your contribution.
                                                Example: “We completed the project two days ahead of schedule, which led to positive feedback from the client and a 10% increase in team efficiency for future projects.”
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex justify-center select-none font-sans font-bold text-2xl my-5">
                                            Some sample HR questions
                                        </div>
                                    </div>

                                    {
                                        mcqs.map((mcq,index) => (
                                            <div key={index}>
                                                <div className="bg-gray-200 mb-5 font-sans font-semibold text-lg rounded-xl p-2 border-b-4 border-r-2 border-l-2  border-t-1 border-black">
                                                    {mcq.stmt}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        }

                        {
                            (params.topic === "aptitude" || params.topic === "computernetworks" || params.topic === "operatingsystems" || params.topic === "objectorientedprogramming" || params.topic === "dbms") &&
                                mcqs.map((mcq,index) => (
                                    <div key={index} className="font-sans bg-gray-100 rounded-xl mb-5 shadow-lg p-2 hover:scale-99 transition duration-300 border border-b-4 border-r-2">
                                        <p className="font-semibold">Question {index+1}</p>
                                        <p className="font-semibold">{mcq.stmt}</p>
                                        <div className="flex flex-row">
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-70">{mcq.opt1}</p>
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-70 ml-5">{mcq.opt2}</p>
                                        </div>
                                        <div className="flex flex-row">
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-70">{mcq.opt3}</p>
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-70 ml-5">{mcq.opt4}</p>
                                        </div>
                                    </div>
                                ))
                        }

                    </div>
                </div>
            </div>
        </>
    )
}