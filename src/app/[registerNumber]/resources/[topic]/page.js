"use client"

import { auth, db } from "@/app/_util/config";
import NavBar from "@/app/NavBar"
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home(){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [darkMode,setDarkMode] = useState(false);
    const [questions,setQuestions] = useState([]);
    const [loading,setLoading] = useState(false);

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

    useEffect(() => {
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
       let dp =  [
  {
    "question": "Inorder",
    "link": "https://leetcode.com/problems/binary-tree-inorder-traversal/description/",
    "difficulty": "Easy",
    "solution": "https://youtu.be/eKJrXBCRuNQ?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&t=2825",
    "companies": "Google, Amazon, Meta, Microsoft, Adobe, Uber"
  },
  {
    "question": "Preorder",
    "link": "https://leetcode.com/problems/binary-tree-preorder-traversal/description/",
    "difficulty": "Easy",
    "solution": "https://youtu.be/eKJrXBCRuNQ?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&t=2284",
    "companies": "Salesforce, Amazon, Microsoft, Meta, Google, Adobe"
  },
  {
    "question": "Postorder",
    "link": "https://leetcode.com/problems/binary-tree-postorder-traversal/description/",
    "difficulty": "Easy",
    "solution": "https://youtu.be/eKJrXBCRuNQ?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&t=3154",
    "companies": "Amazon, Meta, Google, Apple, Adobe"
  },
  {
    "question": "Symmetric Tree",
    "link": "https://leetcode.com/problems/symmetric-tree/description/",
    "difficulty": "Easy",
    "solution": "https://youtu.be/nKggNAiEpBE?si=I69wVna1wKLypaAu",
    "companies": "Amazon, Google, Oracle, Apple, Meta, Uber, Intuit, Adobe"
  },
  {
    "question": "Minimum Distance between Nodes",
    "link": "https://leetcode.com/problems/minimum-distance-between-bst-nodes/description/",
    "difficulty": "Easy",
    "solution": "https://www.youtube.com/watch?v=dSBcCynP1nA&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=100",
    "companies": "Amazon, Google, Meta, Linkedin, Adobe, Microsoft"
  },
  {
    "question": "Are 2 Trees Identical or Not",
    "link": "https://leetcode.com/problems/same-tree/description/",
    "difficulty": "Easy",
    "solution": "https://youtu.be/tumW7jsjv68?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt",
    "companies": "Meta, Google, Microsoft"
  },
  {
    "question": "Morris Inorder Traversal",
    "link": "https://leetcode.com/problems/binary-tree-inorder-traversal/description/",
    "difficulty": "Easy",
    "solution": "https://www.youtube.com/watch?v=PUfADhkq1LI&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=96",
    "companies": "Google, Amazon, Meta, Apple, Adobe, TCS, Flipkart, Uber, Linkedin"
  },
  {
    "question": "Diameter",
    "link": "https://leetcode.com/problems/diameter-of-binary-tree/description/",
    "difficulty": "Easy",
    "solution": "https://www.youtube.com/watch?v=aPyDPImR5UM&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=88",
    "companies": "Google, Amazon, Meta, Microsoft, Apple, Adobe, Uber"
  },
  {
    "question": "Check if Tree is Height Balanced",
    "link": "https://leetcode.com/problems/balanced-binary-tree/description/",
    "difficulty": "Easy",
    "solution": "https://leetcode.com/problems/balanced-binary-tree/description/",
    "companies": "Amazon, Meta, Google, Visa, Oracle, TCS, Adobe"
  },
  {
    "question": "Subtree of Another Tree",
    "link": "https://leetcode.com/problems/subtree-of-another-tree/description/",
    "difficulty": "Easy",
    "solution": "https://www.youtube.com/watch?v=tumW7jsjv68&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=87",
    "companies": "Amazon, Google, Microsoft, Adobe, Uber, Apple"
  },
  {
    "question": "Check if Binary Tree Mirror of itself or not",
    "link": "https://leetcode.com/problems/symmetric-tree/description/",
    "difficulty": "Easy",
    "solution": "https://youtu.be/UG3OhQ5QRkk?si=deGidXqgxb1Hoe2u",
    "companies": "Amazon, Google, Meta, Uber, Morgan Stanley, Ebay, Microsoft"
  },
  {
    "question": "Top View of a Tree",
    "link": "https://leetcode.com/problems/binary-tree-right-side-view/description/",
    "difficulty": "Medium",
    "solution": "https://www.youtube.com/watch?v=FGr-syrhvOA&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=89",
    "companies": "Amazon, Google, Meta, Linkedin, Apple, Adobe, Microsoft"
  },
  {
    "question": "Bottom View of a Tree",
    "link": "https://leetcode.com/problems/find-bottom-left-tree-value/description/",
    "difficulty": "Medium",
    "solution": "https://youtu.be/0FtVY6I4pB8?si=eeBBjwwsjyET6Z45",
    "companies": "Meta, Amazon, Google, Uber, Oracle, Flipkart, JP Morgan, Accolite"
  },
  {
    "question": "Level Order",
    "link": "https://leetcode.com/problems/binary-tree-level-order-traversal/description/",
    "difficulty": "Medium",
    "solution": "https://youtu.be/EoAsWbO7sqg?si=u8YYJeSpt9ePl8q3",
    "companies": "Josh Technology, Amazon, Google, Adobe"
  },
  {
    "question": "Kth Level of Tree",
    "link": "https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/description/",
    "difficulty": "Medium",
    "solution": "https://www.youtube.com/watch?v=ze4JO_ODl3w&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=90",
    "companies": "Meta, Google, Amazon, Adobe, Microsoft"
  },
  {
    "question": "Lowest Common Ancestor",
    "link": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/",
    "difficulty": "Medium",
    "solution": "https://www.youtube.com/watch?v=oX5D0uKOMck&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=91",
    "companies": "Meta, Amazon, Google, Linkedin, Intuit, Oracle, Adobe, Flipkart, Salesforce, Morgan Stanley"
  },
  {
    "question": "Transform to Sum Tree",
    "link": "https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/description/",
    "difficulty": "Medium",
    "solution": "https://www.youtube.com/watch?v=TY6kEejJEM0&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=93",
    "companies": "SAP, Amazon, Ebay, Microsoft"
  },
  {
    "question": "Construct BT from Inorder & Pre order",
    "link": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/",
    "difficulty": "Medium",
    "solution": "https://www.youtube.com/watch?v=33b1M980cCA&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=92",
    "companies": "Amazon, Microsoft, Meta, Adobe, Uber, VMware, Apple"
  },
  {
    "question": "Construct BT from Inorder & Post order",
    "link": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/",
    "difficulty": "Medium",
    "solution": "https://youtu.be/LgLRTaEMRVc?si=EwihnDgSQ_08xQpV",
    "companies": "Google, Amazon, Microsoft, Adobe, Bloomberg"
  },
  {
    "question": "Flatten Binary Tree to Linked List",
    "link": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/",
    "difficulty": "Medium",
    "solution": "https://www.youtube.com/watch?v=dU2Z5HWSGM0&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=97",
    "companies": "Google, Meta, Amazon, Microsoft, Myntra, Adobe, Oracle, Apple"
  },
  {
    "question": "Max Width of BT",
    "link": "https://leetcode.com/problems/maximum-width-of-binary-tree/description/",
    "difficulty": "Medium",
    "solution": "https://www.youtube.com/watch?v=rhz-csskg_A&list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&index=95",
    "companies": "Amazon, Meta, Uber, Microsoft, Adobe, Apple, Google"
  },
  {
    "question": "Zig Zag Traversal of BT",
    "link": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/",
    "difficulty": "Medium",
    "solution": "https://youtu.be/3OXWEdlIGl4?si=_FvsborcZx3W61Yy",
    "companies": "Amazon, Meta, Microsoft, Google, Oracle, Adobe, Walmart Labs, Ebay, Flipkart"
  },
  {
    "question": "Max Path Sum",
    "link": "https://leetcode.com/problems/binary-tree-maximum-path-sum/description/",
    "difficulty": "Hard",
    "solution": "https://youtu.be/WszrfSwMz58?si=4rekYXV6e1sGimJa",
    "companies": "Google, Meta, Amazon, Oracle, Salesforce, Goldman Sachs, Uber, Flipkart"
  },
  {
    "question": "Kth Ancestor",
    "link": "https://leetcode.com/problems/kth-ancestor-of-a-tree-node/description/",
    "difficulty": "Hard",
    "solution": "https://youtu.be/NWrh1OZ39EM?si=tvQVBNFz7rl5lq_l",
    "companies": "Google, Amazon, Microsoft"
  }
]


        await setDoc(doc(db,"resources","dsa-trees"),{problems:dp},{merge:true})

    }
    addData();

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={username} email={email} darkMode={darkMode} handleLogoClick={handleLogoClick} handleDarkMode={handleDarkMode} handleLightMode={handleLightMode} handleLogout={handleLogout}></NavBar>
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
                                            <td className="font-sans text-sm p-2 border border-black">NA</td>
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