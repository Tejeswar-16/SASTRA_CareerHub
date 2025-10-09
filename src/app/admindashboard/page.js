'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from 'react-icons/fi'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { FiExternalLink } from 'react-icons/fi'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../_util/config'
import NavBar from "../NavBar";
export default function Home(){
    const [adminName,setAdminName] = useState("")
    const [adminEmail,setAdminEmail] = useState("")
    const [isdark,setIsDark] = useState(false)
    const router = useRouter()
    const handleLogoClick = () => {
        router.push("/admindashboard")
    }
    const handleToggleModeClick = () => {
        setIsDark(prev => !prev)
    }
    async function handleLogout(){
        try{
            await signOut(auth)
            router.push("/adminlogin")
        }
        catch(err){
            console.error(err)
        }
    }
    useEffect(() => {
        onAuthStateChanged(auth , (admin) => {
            if(admin){
                setAdminEmail(admin.email)
                setAdminName(admin.displayName)
            }
            else
                router.push("/")
        })
    },[])
    const handleAnnouncementsManagementClick = () => {
        router.push("/admindashboard/announcementsandmanagements")
    }
    const handleApplicationTrackingClick = () => {
        router.push("/admindashboard/applicationtracking")
    }
    const handleContentAndResourceManagementClick = () => {
        router.push("/admindashboard/contentandresourcemanagement")
    }
    const handleFeedbackAndSupportClick = () => {
        router.push("/admindashboard/feedbackandsupport")
    }
    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                            <NavBar username={adminName} email={adminEmail} handleLogoClick={handleLogoClick} handleLogout={handleLogout}/>
                            <div className="flex md:flex-row flex-col justify-center md:gap-x-7 lg:gap-x-4">
                                <div className="mx-auto md:ml-1 lg:ml-0 lg:mx-0 my-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300 flex flex-col">
                                    <Image className="mx-auto rounded-xl" src={"/announcements.jpg"} width={360} height={360} alt="Announcements Management"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-xl">Announcements Management</div>
                                    <div className="select-none text-center italic font-sans text-md mt-2">Create, update, or remove job and internship postings with complete details to maintain accurate listings.</div>
                                    <button onClick={handleAnnouncementsManagementClick} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad] mt-auto">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
            
                                <div className="mx-auto md:ml-1 lg:ml-0 lg:mx-0 my-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300 flex flex-col">
                                    <Image className="mx-auto rounded-xl" src={"/track_job.jpg"} width={360} height={360} alt="Application Tracking"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-xl">Application Tracking</div>
                                    <div className="select-none text-center italic font-sans text-md mt-2">Track student applications with status updates, and generate reports to analyze trends and engagement.</div>
                                    <button onClick={handleApplicationTrackingClick} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad] mt-auto">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
            
                                <div className="mx-auto md:ml-1 lg:ml-0 lg:mx-0 my-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300 flex flex-col">
                                    <Image className="mx-auto rounded-xl" src={"/contentresources.jpg"} width={360} height={360} alt="Content & Resource Management"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-xl">Content & Resource Management</div>
                                    <div className="select-none text-center italic font-sans text-md mt-2">Upload, organize, and manage career resources to provide students with a centralized hub for learning and preparation.</div>
                                    <button onClick={handleContentAndResourceManagementClick} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad] mt-auto">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
            
                                <div className="mx-auto md:ml-1 lg:ml-0 lg:mx-0 my-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300 flex flex-col">
                                    <Image className="mx-auto rounded-xl" src={"/feedback.jpg"} width={360} height={360} alt="Feedback & Support"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-xl">Feedback & Support</div>
                                    <div className="select-none text-center italic font-sans text-md mt-2">Manage and respond to student and recruiter feedback, complaints, and queries while tracking support tickets to enhance the platform experience.</div>
                                    <button onClick={handleFeedbackAndSupportClick} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad] mt-auto">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
                            </div>
            </div>
        </>
    );
}