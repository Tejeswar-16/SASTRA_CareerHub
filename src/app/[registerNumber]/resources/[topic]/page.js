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
                collection(db,"resources",params.topic,"questions")
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

    useEffect(() => {
        const qns = [
  {
    "stmt": "A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?",
    "opt1": "65 sec",
    "opt2": "89 sec",
    "opt3": "100 sec",
    "opt4": "150 sec",
    "ans": "opt2"
  },
  {
    "stmt": "Two trains of equal length are running on parallel lines in the same direction at 46 km/hr and 36 km/hr. The faster train passes the slower train in 36 seconds. The length of each train is:",
    "opt1": "50 m",
    "opt2": "72 m",
    "opt3": "80 m",
    "opt4": "82 m",
    "ans": "opt1"
  },
  {
    "stmt": "A train 360 m long is running at a speed of 45 km/hr. In what time will it pass a bridge 140 m long?",
    "opt1": "40 sec",
    "opt2": "42 sec",
    "opt3": "45 sec",
    "opt4": "48 sec",
    "ans": "opt1"
  },
  {
    "stmt": "Two trains are moving in opposite directions @ 60 km/hr and 90 km/hr. Their lengths are 1.10 km and 0.9 km respectively. The time taken by the slower train to cross the faster train in seconds is:",
    "opt1": "36",
    "opt2": "45",
    "opt3": "48",
    "opt4": "49",
    "ans": "opt3"
  },
  {
    "stmt": "A jogger running at 9 kmph alongside a railway track in 240 metres ahead of the engine of a 120 metres long train running at 45 kmph in the same direction. In how much time will the train pass the jogger?",
    "opt1": "3.6 sec",
    "opt2": "18 sec",
    "opt3": "36 sec",
    "opt4": "72 sec",
    "ans": "opt3"
  },
  {
    "stmt": "A 270 metres long train running at the speed of 120 kmph crosses another train running in opposite direction at the speed of 80 kmph in 9 seconds. What is the length of the other train?",
    "opt1": "230 m",
    "opt2": "240 m",
    "opt3": "260 m",
    "opt4": "320 m",
    "ans": "opt1"
  },
  {
    "stmt": "A goods train runs at the speed of 72 kmph and crosses a 250 m long platform in 26 seconds. What is the length of the goods train?",
    "opt1": "230 m",
    "opt2": "240 m",
    "opt3": "260 m",
    "opt4": "270 m",
    "ans": "opt4"
  },
  {
    "stmt": "Two trains, each 100 m long, moving in opposite directions, cross each other in 8 seconds. If one is moving twice as fast the other, then the speed of the faster train is:",
    "opt1": "30 km/hr",
    "opt2": "45 km/hr",
    "opt3": "60 km/hr",
    "opt4": "75 km/hr",
    "ans": "opt3"
  },
  {
    "stmt": "Two trains 140 m and 160 m long run at the speed of 60 km/hr and 40 km/hr respectively in opposite directions on parallel tracks. The time (in seconds) which they take to cross each other, is:",
    "opt1": "9",
    "opt2": "9.6",
    "opt3": "10",
    "opt4": "10.8",
    "ans": "opt4"
  },
  {
    "stmt": "A train 110 metres long is running with a speed of 60 kmph. In what time will it pass a man who is running at 6 kmph in the direction opposite to that in which the train is going?",
    "opt1": "5 sec",
    "opt2": "6 sec",
    "opt3": "7 sec",
    "opt4": "10 sec",
    "ans": "opt2"
  },
  {
    "stmt": "A train travelling at a speed of 75 mph enters a tunnel 3½ miles long. The train is ¼ mile long. How long does it take for the train to pass through the tunnel from the moment the front enters to the moment the rear emerges?",
    "opt1": "2.5 min",
    "opt2": "3 min",
    "opt3": "3.2 min",
    "opt4": "3.5 min",
    "ans": "opt2"
  },
  {
    "stmt": "A train 800 metres long is running at a speed of 78 km/hr. If it crosses a tunnel in 1 minute, then the length of the tunnel (in meters) is:",
    "opt1": "130",
    "opt2": "360",
    "opt3": "500",
    "opt4": "540",
    "ans": "opt3"
  },
  {
    "stmt": "A 300 metre long train crosses a platform in 39 seconds while it crosses a signal pole in 18 seconds. What is the length of the platform?",
    "opt1": "320 m",
    "opt2": "350 m",
    "opt3": "650 m",
    "opt4": "Data inadequate",
    "ans": "opt2"
  },
  {
    "stmt": "A train speeds past a pole in 15 seconds and a platform 100 m long in 25 seconds. Its length is:",
    "opt1": "50 m",
    "opt2": "150 m",
    "opt3": "200 m",
    "opt4": "Data inadequate",
    "ans": "opt2"
  },
  {
    "stmt": "A train moves past a telegraph post and a bridge 264 m long in 8 seconds and 20 seconds respectively. What is the speed of the train?",
    "opt1": "69.5 km/hr",
    "opt2": "70 km/hr",
    "opt3": "79 km/hr",
    "opt4": "79.2 km/hr",
    "ans": "opt4"
  },
  {
    "stmt": "How many seconds will a 500 metre long train take to cross a man walking with a speed of 3 km/hr in the direction of the moving train if the speed of the train is 63 km/hr?",
    "opt1": "25",
    "opt2": "30",
    "opt3": "40",
    "opt4": "45",
    "ans": "opt2"
  },
  {
    "stmt": "Two goods trains each 500 m long, are running in opposite directions on parallel tracks. Their speeds are 45 km/hr and 30 km/hr respectively. Find the time taken by the slower train to pass the driver of the faster one.",
    "opt1": "12 sec",
    "opt2": "24 sec",
    "opt3": "48 sec",
    "opt4": "60 sec",
    "ans": "opt2"
  },
  {
    "stmt": "Two trains are running in opposite directions with the same speed. If the length of each train is 120 metres and they cross each other in 12 seconds, then the speed of each train (in km/hr) is:",
    "opt1": "10",
    "opt2": "18",
    "opt3": "36",
    "opt4": "72",
    "ans": "opt3"
  },
  {
    "stmt": "Two trains of equal lengths take 10 seconds and 15 seconds respectively to cross a telegraph post. If the length of each train be 120 metres, in what time (in seconds) will they cross each other travelling in opposite direction?",
    "opt1": "10",
    "opt2": "12",
    "opt3": "15",
    "opt4": "20",
    "ans": "opt2"
  },
  {
    "stmt": "A train 108 m long moving at a speed of 50 km/hr crosses a train 112 m long coming from opposite direction in 6 seconds. The speed of the second train is:",
    "opt1": "48 km/hr",
    "opt2": "54 km/hr",
    "opt3": "66 km/hr",
    "opt4": "82 km/hr",
    "ans": "opt4"
  },
  {
    "stmt": "Two trains are running at 40 km/hr and 20 km/hr respectively in the same direction. Fast train completely passes a man sitting in the slower train in 5 seconds. What is the length of the fast train?",
    "opt1": "23 m",
    "opt2": "27.7 m",
    "opt3": "29 m",
    "opt4": "32 m",
    "ans": "opt2"
  },
  {
    "stmt": "A train overtakes two persons who are walking in the same direction in which the train is going, at the rate of 2 kmph and 4 kmph and passes them completely in 9 and 10 seconds respectively. The length of the train is:",
    "opt1": "45 m",
    "opt2": "50 m",
    "opt3": "54 m",
    "opt4": "72 m",
    "ans": "opt2"
  },
  {
    "stmt": "A train overtakes two persons walking along a railway track. The first one walks at 4.5 km/hr. The other one walks at 5.4 km/hr. The train needs 8.4 and 8.5 seconds respectively to overtake them. What is the speed of the train if both the persons are walking in the same direction as the train?",
    "opt1": "66 km/hr",
    "opt2": "72 km/hr",
    "opt3": "78 km/hr",
    "opt4": "81 km/hr",
    "ans": "opt4"
  },
  {
    "stmt": "A train travelling at 48 kmph completely crosses another train having half its length and travelling in opposite direction at 42 kmph, in 12 seconds. It also passes a railway platform in 45 seconds. The length of the platform is:",
    "opt1": "400 m",
    "opt2": "450 m",
    "opt3": "560 m",
    "opt4": "600 m",
    "ans": "opt4"
  },
  {
    "stmt": "Two stations A and B are 110 km apart on a straight line. One train starts from A at 7 a.m. and travels towards B at 20 kmph. Another train starts from B at 8 a.m. and travels towards A at a speed of 25 kmph. At what time will they meet?",
    "opt1": "9 a.m.",
    "opt2": "10 a.m.",
    "opt3": "10.30 a.m.",
    "opt4": "11 a.m.",
    "ans": "opt2"
  },
  {
    "stmt": "Two trains, one from Howrah to Patna and the other from Patna to Howrah, start simultaneously. After they meet, the trains reach their destinations after 9 hours and 16 hours respectively. The ratio of their speeds is:",
    "opt1": "2 : 3",
    "opt2": "4 : 3",
    "opt3": "6 : 7",
    "opt4": "9 : 16",
    "ans": "opt1"
  }
]

    async function addData(){
       for (let i=0;i<qns.length;i++){
            await addDoc(collection(doc(db,"resources","aptitude"),"questions"),(
                qns[i]
            ));
       }
    }
    //addData();

    },[])

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
                            (params.topic === "aptitude" || params.topic === "computernetworks" || params.topic === "operatingsystems" || params.topic === "hr" || params.topic === "objectorientedprogramming" || params.topic === "dbms") &&
                                mcqs.map((mcq,index) => (
                                    <div key={index} className="font-sans bg-gray-100 rounded-xl mb-5 shadow-lg p-2">
                                        <p className="font-semibold">Question {index+1}</p>
                                        <p className="font-semibold">{mcq.stmt}</p>
                                        <div className="flex flex-row">
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-50">{mcq.opt1}</p>
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-50 ml-5">{mcq.opt2}</p>
                                        </div>
                                        <div className="flex flex-row">
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-50">{mcq.opt3}</p>
                                            <p className="flex justify-center select-none bg-gray-200 my-2 rounded-lg p-2 hover:cursor-pointer border border-gray-300 hover:bg-gray-700 hover:text-white transition duration-300 w-50 ml-5">{mcq.opt4}</p>
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