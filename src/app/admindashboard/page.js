'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from 'react-icons/fi'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { FiExternalLink } from 'react-icons/fi'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../_util/config'
export default function Home(){
    const [adminName,setAdminName] = useState("Admin")
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
            if(admin)
                setAdminName(admin.displayName)
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
                            <div className="mx-auto bg-white p-2 rounded-xl shadow-xl w-75 md:w-350">
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row justify-left items-center">
                                        <Image onClick={handleLogoClick} className="hover:cursor-pointer" src={"/logo.png"} width={60} height={20} alt="Logo"></Image>
                                        <div className="flex flex-col md:flex-row">
                                            <div className="select-none font-sans font-bold text-md md:text-3xl">Welcome, {adminName}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-row justify-right items-center md:space-x-6">
                                        {isdark ? <button title="Toggle mode" className="rounded-[10px] mx-3 px-5 py-2 cursor-pointer transform transition-transform duration-400 hover:scale-130 hover:rotate-360" onClick={() => handleToggleModeClick()}><MdLightMode size={30} color="white"/></button> : <button title="Toggle mode" className=" rounded-[10px] mx-3 px-5 py-2 cursor-pointer transform transition-transform duration-300 hover:scale-130 hover:rotate-360" onClick={() => handleToggleModeClick()}><MdDarkMode size={30} color="black"/></button>}
                                        <button title="Logout" onClick={handleLogout} className="mr-2 transform transition-transform duration-400 cursor-pointer hover:translate-x-2 hover:scale-110"><FiLogOut size={30} color={isdark ? "white" : "black"}/></button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex md:flex-row flex-col">
                                <div className="mx-auto my-10 md:ml-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                                    <Image className="mx-auto rounded-xl" src={"/resources.jpg"} width={360} height={360} alt="resources"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Announcements Management</div>
                                    <div className="select-none text-center italic font-sans text-lg">Create, update, or remove job and internship postings with complete details to maintain accurate listings.</div>
                                    <button className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
            
                                <div className="mx-auto mb-10 md:ml-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                                    <Image className="mx-auto rounded-xl" src={"/company.jpg"} width={360} height={360} alt="resources"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Application Tracking</div>
                                    <div className="select-none text-center italic font-sans text-lg">Track student applications with status updates, and generate reports to analyze trends and engagement.</div>
                                    <button className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
            
                                <div className="mx-auto mb-10 md:ml-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                                    <Image className="mx-auto rounded-xl" src={"/progress.jpg"} width={360} height={360} alt="resources"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Content & Resource Management</div>
                                    <div className="select-none text-center italic font-sans text-lg">Upload, organize, and manage career resources to provide students with a centralized hub for learning and preparation.</div>
                                    <button className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
            
                                <div className="mx-auto mb-10 md:ml-18 md:mr-18 md:my-20 p-5 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-80 hover:scale-105 transition duration-300">
                                    <Image className="mx-auto rounded-xl" src={"/interview.jpg"} width={360} height={360} alt="resources"></Image>
                                    <div className="select-none text-center font-sans mt-2 font-bold text-2xl">Feedback & Support</div>
                                    <div className="select-none text-center italic font-sans text-lg">Manage and respond to student and recruiter feedback, complaints, and queries while tracking support tickets to enhance the platform experience.</div>
                                    <button className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                                </div>
                            </div>
                        </div>
        </>
    );
}
/*

Core Features

Create Announcements – Post new job openings, internships, workshops, and events.

Edit / Delete Announcements – Modify or remove outdated announcements.

Schedule Announcements – Set a future date/time for announcements to go live.

Categorize Announcements – Organize by type (Jobs, Internships, Events).

Highlight / Feature Announcements – Make important announcements stand out.

User & Engagement Management

View User Engagement – Track which announcements are viewed or clicked most.

Send Notifications – Push browser or email notifications to users.

Segmented Announcements – Target users based on location, field of study, or interests.

Admin Management

Manage Admin Accounts – Add, remove, or change permissions of other admins.

Activity Logs – Track all admin actions (posted, edited, deleted announcements).

Analytics & Reporting

Dashboard Overview – Quick metrics: total announcements, upcoming, expired.

Engagement Analytics – Number of clicks, views, or user interactions per announcement.

Optional Enhancements

Templates for Announcements – Predefined formats for job or internship posts.

Archive Past Announcements – Maintain a record of all previous postings.

Export Reports – Download data on announcements or user engagement for record-keeping.
*/