    "use client"

    import { onAuthStateChanged, signOut } from "firebase/auth";
    import Image from "next/image";
    import { useEffect, useState } from "react";
    import { auth } from "../_util/config";
    import { useRouter } from "next/navigation";
    import NavBar from "../NavBar";
    import { FiExternalLink } from "react-icons/fi";

    export default function HOME(){

        const [username,setUsername] = useState("");
        const [email,setEmail] = useState("");

        const router = useRouter();

        useEffect(() => {
            onAuthStateChanged(auth, (user) => {
                if (user){
                    setUsername(user.displayName);
                    setEmail(user.email);
                }
                else
                    router.push("/studentLogin");
            })
        })

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

        function handleResourceExplore(){
            router.push("/"+getRegNo()+"/resources");
        }

        function handleCompanyExplore(){
            router.push("/"+getRegNo()+"/companytracker")
        }

        function handleProgressExplore(){

        }

        function handleInterviewExplore(){

        }

        return(
            <>
                <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                    <NavBar username={username} email={email} handleLogoClick={handleLogoClick} handleLogout={handleLogout}></NavBar>
                    <div className="flex md:flex-row flex-col justify-center">
                        <div className="mx-auto md:ml-1 lg:ml-0 lg:mx-0 my-10 lg:my-15 p-3 border border-b-5 border-r-2 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/resources.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Resource Library</div>
                            <div className="select-none text-center italic font-sans text-md">Boost your career with expert resources on DSA, aptitude, interviews, HR, and more. Learn, practice, and excel!</div>
                            <button onClick={handleResourceExplore} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-5 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                        </div>

                        <div className="mx-auto md:mx-0 md:my-10 md:ml-1 lg:ml-4 mb-10 lg:my-15 p-3 border border-b-5 border-r-2 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/company.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Company Tracker</div>
                            <div className="select-none text-center italic font-sans text-md">Stay informed about SASTRA placements, internship openings, and company updates to plan your future</div>
                            <button onClick={handleCompanyExplore} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-11 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                        </div>

                        <div className="mx-auto md:mx-0 md:my-10 md:ml-1 lg:ml-4 mb-10 lg:my-15 p-3 border border-b-5 border-r-2 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/progress.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Track your progress</div>
                            <div className="select-none text-center italic font-sans text-md">Discover your strengths, identify areas to improve, and keep moving forward. Every step counts!</div>
                            <button onClick={handleProgressExplore} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-11 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                        </div>

                        <div className="mx-auto md:mx-0 md:my-10 md:ml-1 md:mr-1 lg:mr-0 lg:ml-4 mb-10 lg:my-15 p-3 border border-b-5 border-r-2 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/interview.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Interview Experience</div>
                            <div className="select-none text-center italic font-sans text-md">Your story can guide someone&apos;s journey. Share your interview experience and discover others&apos; too.</div>
                            <button onClick={handleInterviewExplore} className="flex flex-row px-5 py-2 items-center cursor-pointer bg-[#1a73e8] rounded-3xl text-white font-sans mx-auto mt-9 transition-colors  duration-300 ease-in-out hover:bg-[#0e53ad]">Visit <FiExternalLink className="ml-2"/></button>
                        </div>
                    </div>
                </div>
            </>
        );
    }