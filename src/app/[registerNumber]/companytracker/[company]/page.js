"use client"

import { auth, db } from "@/app/_util/config";
import NavBar from "@/app/NavBar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Company(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [formName,setFormName] = useState("");
    const [personalEmail,setPersonalEmail] = useState("");
    const [mobile,setMobile] = useState("");
    const [gender,setGender] = useState("");
    const [dob,setDob] = useState("");
    const [tenth,setTenth] = useState("");
    const [twelfth,setTwelfth] = useState("");
    const [cgpa,setCgpa] = useState("");
    const [resume,setResume] = useState("");
    const [mobileError,setMobileError] = useState("");
    const [tenthError,setTenthError] = useState("");
    const [twelfthError,setTwelfthError] = useState("");
    const [cgpaError,setCgpaError] = useState("");
    const [regSuccess,setRegSuccess] = useState(false);
    const [regNotSuccess,setRegNotSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){
                setName(user.displayName)
                setEmail(user.email);
                setFormName(user.displayName);
            }
            else
                router.push("/studentlogin");
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

    function handleMobile(mobile){
        let count = 0;
        while (mobile !== 0){
            mobile = Math.floor(mobile / 10);
            count++;
        }
        if (count !== 10){
            setMobileError("Invalid Mobile Number");
        }
        else{
            setMobileError("");
        }
    }

    function handleTenth(tenth){
        if (Number(tenth) <= 0 || Number(tenth) > 100){
            setTenthError("Invalid %")
        }else{
            setTenthError("");
        }
    }

    function handleTwelfth(twelfth){
        if (Number(twelfth) <= 0 || Number(twelfth) > 100){
            setTwelfthError("Invalid %")
        }else{
            setTwelfthError("");
        }
    }

    function handleCgpa(cgpa){
        if (Number(cgpa) <= 0 || Number(cgpa) > 10){
            setCgpaError("Invalid CGPA")
        }else{
            setCgpaError("");
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        if (mobileError !== "")
            return alert(mobileError);
        if (tenthError !== "")
            return alert(tenthError);
        if (twelfthError !== "")   
            return alert(twelfthError);
        if (cgpaError !== "")
            return alert(cgpaError)
        try
        {
            setLoading(true);
            const q = query(
                collection(db,"applications"),
                where("registerNo","==",getRegNo()),
                where("company","==",params.company)
            );
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty)
            {
                await addDoc(collection(db,"applications"),{
                    company: params.company,
                    name: formName,
                    registerNo: getRegNo(),
                    sastraEmail: email,
                    personalEmail: personalEmail,
                    mobile: mobile,
                    gender: gender,
                    dob: dob,
                    tenth: tenth,
                    twelfth: twelfth,
                    cgpa: cgpa,
                    timestamp: new Date()
                });
                setLoading(false);
                setRegSuccess(true);
            }
            else{
                setLoading(false);
                setRegNotSuccess(true);
            }
        }
        catch (error){
            console.log(error.message);
        }
    }

    function handleRegSuccessOk(){
        setRegSuccess(false);
        router.push("/"+params.registerNumber+"/companytracker");
    }

    function handleRegNotSuccessOk(){
        setRegNotSuccess(false);
        router.push("/"+params.registerNumber+"/companytracker");
    }

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={name} email={email} handleLogoClick={handleLogoClick} handleLogout={handleLogout}></NavBar>
                <div className="mx-auto select-none font-sans bg-white rounded-xl shadow-2xl w-75 md:w-190 lg:w-250 mt-5 p-4">
                    
                    {loading && 
                        <>
                           <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                                <div className="mx-auto font-mono font-bold text-3xl">
                                    <Image src={"/loading.gif"} width={200} height={20} alt="Loading..."></Image>
                                </div>
                            </div>
                        </>
                    }

                    {
                        regSuccess && 
                        <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                            <div className="flex justify-center select-none font-sans bg-white rounded-xl shadow-xl p-5 border w-75 md:w-90">
                            <p className="text-lg">Thank you for registering. Your response has been submitted</p>
                            <div className="flex justify-center "><button onClick={handleRegSuccessOk} className="bg-black text-white w-10 rounded-xl mt-2 p-2 hover:cursor-pointer">OK</button></div>
                            </div>
                        </div>
                    }

                    {
                        regNotSuccess && 
                        <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                            <div className="select-none font-sans bg-white rounded-xl shadow-xl p-5 border w-75 md:w-90">
                            <p className="text-lg">Sorry! You have already registered for this position</p>
                            <div className="flex justify-center "><button onClick={handleRegNotSuccessOk} className="bg-black text-white w-10 rounded-xl mt-2 p-2 hover:cursor-pointer">OK</button></div>
                            </div>
                        </div>
                    }
                    
                    <form onSubmit={handleSubmit}>
                        <div className="bg-gray-100 rounded-xl shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Full Name
                            </div>
                            <input value={formName.toUpperCase()} onChange={(e) => setFormName(e.target.value)} required className="border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="text" placeholder="Enter your full name with initial"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Register Number
                            </div>
                            <input disabled value={getRegNo()} required className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="text"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                SASTRA Email
                            </div>
                            <input disabled value={email} required className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="email"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Personal Email
                            </div>
                            <input required value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="email" placeholder="Enter your personal email"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Mobile Number
                            </div>
                            <input required value={mobile} onChange={(e) => {setMobile(e.target.value);handleMobile(e.target.value)}} className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="number" placeholder="Enter your mobile number"></input>
                            <p className="select-none font-sans text-red-500 mt-1">{mobileError}</p> 
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Gender
                            </div>
                            <div className="flex flex-row">
                                <input required value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} className="select-none border mt-3" type="radio" name="gender"></input>
                                <p className="select-none font-sans mt-3 ml-1">Male</p>
                                <input required value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} className="select-none border mt-3 ml-10" type="radio" name="gender"></input>
                                <p className="select-none font-sans mt-3 ml-1">Female</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Date of Birth (DOB)
                            </div>
                            <input required value={dob} onChange={(e) => setDob(e.target.value)} className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="date"></input>
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Percentage scored in 10th grade
                            </div>
                            <input required value={tenth} onChange={(e) => {setTenth(e.target.value);handleTenth(e.target.value)}} className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="text" placeholder="10th grade (%)"></input>
                            <p className="select-none font-sans text-red-500 mt-1">{tenthError}</p> 
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Percentage scored in 12th grade
                            </div>
                            <input required value={twelfth} onChange={(e) => {setTwelfth(e.target.value);handleTwelfth(e.target.value)}} className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="text" placeholder="12th grade (%)"></input>
                            <p className="select-none font-sans text-red-500 mt-1">{twelfthError}</p> 
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Cumulative Grade Point Average (CGPA)
                            </div>
                            <input required value={cgpa} onChange={(e) => {setCgpa(e.target.value);handleCgpa(e.target.value)}} className="select-none border mt-3 rounded-xl w-61 md:w-176 lg:w-235 h-12 p-2 text-sm md:text-lg" type="text" placeholder="CGPA"></input>
                            <p className="select-none font-sans text-red-500 mt-1">{cgpaError}</p> 
                        </div>
                        <div className="bg-gray-100 rounded-xl mt-8 shadow-xl shadow-gray-300 p-3">
                            <div className="font-sans text-lg lg:text-xl">
                                Upload your resume (Should be named as "REGNO_NAME")
                            </div>
                            <input required onChange={(e) => setResume(e.target.files[0])} className="font-sans mt-3 w-60 md:w-200 text-sm file:rounded-xl font-bold file:bg-black file:text-white file:mr-5 file:p-2 hover:file:cursor-pointer transition duration-300" type="file"></input>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="flex justify-center select-none rounded-xl bg-gray-200 border border-b font-sans font-bold text-xl my-10 p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duation-300">Submit Application</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}