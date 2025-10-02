    "use client"

    import { onAuthStateChanged, signOut } from "firebase/auth";
    import Image from "next/image";
    import { useEffect, useState } from "react";
    import { auth } from "../_util/config";
    import { useRouter } from "next/navigation";

    export default function HOME(){

        const [username,setUsername] = useState("");
        const [email,setEmail] = useState("");
        const [darkMode,setDarkMode] = useState(false);

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

        }

        function handleProgressExplore(){

        }

        function handleInterviewExplore(){

        }

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
                    <div className="flex md:flex-row flex-col justify-center">
                        <div className="mx-auto md:ml-1 lg:ml-0 lg:mx-0 my-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/resources.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Resource Library</div>
                            <div className="select-none text-center italic font-sans text-md">Boost your career with expert resources on DSA, aptitude, interviews, HR, and more. Learn, practice, and excel!</div>
                            <div onClick={handleResourceExplore} className="font-sans flex justify-center items-center mx-auto my-3 font-bold bg-yellow-400 text-blue-900 w-30 rounded-xl shadow-xl hover:cursor-pointer p-2">Explore🔍</div>
                        </div>

                        <div className="mx-auto md:mx-0 md:my-10 md:ml-1 lg:ml-4 mb-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/company.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Comapany Tracker</div>
                            <div className="select-none text-center italic font-sans text-md">Stay informed about SASTRA placements, internship openings, and company updates to plan your future</div>
                            <div onClick={handleCompanyExplore} className="font-sans flex justify-center items-center mx-auto mt-9 font-bold bg-yellow-400 text-blue-900 w-30 rounded-xl shadow-xl hover:cursor-pointer p-2">Explore🔍</div>
                        </div>

                        <div className="mx-auto md:mx-0 md:my-10 md:ml-1 lg:ml-4 mb-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/progress.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Track your progress</div>
                            <div className="select-none text-center italic font-sans text-md">Discover your strengths, identify areas to improve, and keep moving forward. Every step counts!</div>
                            <div onClick={handleProgressExplore} className="font-sans flex justify-center items-center mx-auto mt-9 font-bold bg-yellow-400 text-blue-900 w-30 rounded-xl shadow-xl hover:cursor-pointer p-2">Explore🔍</div>
                        </div>

                        <div className="mx-auto md:mx-0 md:my-10 md:ml-1 md:mr-1 lg:mr-0 lg:ml-4 mb-10 lg:my-15 p-3 bg-white rounded-2xl shadow-gray-500 shadow-2xl w-75 md:w-60 hover:scale-105 transition duration-300">
                            <Image className="mx-auto rounded-xl" src={"/interview.jpg"} width={360} height={360} alt="resources"></Image>
                            <div className="select-none text-center font-sans mt-2 font-bold text-xl">Interview Experience</div>
                            <div className="select-none text-center italic font-sans text-md">Your story can guide someone&apos;s journey. Share your interview experience and discover others&apos; too.</div>
                            <div onClick={handleInterviewExplore} className="font-sans flex justify-center items-center mx-auto mt-7 font-bold bg-yellow-400 text-blue-900 w-30 rounded-xl shadow-xl hover:cursor-pointer p-2">Explore🔍</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }