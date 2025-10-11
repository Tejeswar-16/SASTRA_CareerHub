"use client"

import { auth } from "@/app/_util/config";
import NavBar from "@/app/NavBar"
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home(){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [emoji,setEmoji] = useState(false);
    const [emojiClick,setEmojiClick] = useState([]);
    const [emojiCount,setEmojiCount] = useState([]);
    const [addPost,setAddPost] = useState(false);

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            if (user){
                setUsername(user.displayName);
                setEmail(user.email);
            }
            else
                router.push("/studentlogin");
        })
    });

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

    return (
        <>
            <div className="relative bg-gray-100 py-5 min-h-screen md:bg-gray-100">
                <NavBar username={username} email={email} handleLogoClick={handleLogoClick} handleLogout={handleLogout}></NavBar>
                <div className="mx-auto mt-5 bg-white w-250 rounded-xl shadow-xl p-2 border border-b-4 border-r-2 border-blue-900">
                    <div className="flex justify-center flex-row items-center gap-x-2">
                        <div className="select-none bg-gray-300 font-sans font-bold text-2xl text-black rounded-3xl border-b-2 border-r-2 border p-2">
                            {username[0]}
                        </div>
                        <div onClick={() => setAddPost(true)} className="flex items-center select-none font-sans font-semibold rounded-3xl p-2 w-200 border h-13 hover:bg-gray-200 hover:cursor-pointer transition duration-300">
                            Start a post
                        </div>
                    </div>
                </div>

                {
                    addPost && 
                        <div>
                            <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                                <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-xl border-b-4 border-t-4 border-r-2 border-l-2 p-2 w-100 h-100">
                                    <div onClick={() => setAddPost(false)} className="ml-89 select-none hover:bg-red-400 hover:cursor-pointer p-1 transition duration-300">✖️</div>
                                    <div className="flex flex-row justify-center">
                                        <div className="select-none font-sans font-bold text-2xl">Share your experience</div>
                                        
                                    </div>
                                    <textarea placeholder="Share your thoughts..." className="resize-none h-70 w-80 p-2 my-2 text-lg rounded-xl border"></textarea>
                                    <button className="select-none font-sans font-semibold text-white p-2 rounded-xl shadoe-xl bg-blue-500 hover:bg-blue-700 hover:cursor-pointer transition duration-300">Add Post</button>
                                </div>
                            </div>
                        </div>
                }

                <div className="mx-auto w-250 bg-gray-300 border-b-5 border-t-5 border-l-2 border-r-2 rounded-xl mt-5 h-140 overflow-hidden overflow-y-auto">
                    <div className="mx-auto bg-white w-230 rounded-xl shadow-xl p-2 my-5 border border-t-5 border-b-5 border-r-3 border-l-3 border-blue-900">
                        <div className="flex flex-row justify-between items-center px-18 py-2">
                            <div className="flex flex-row items-center gap-x-2">
                                <div className="select-none bg-gray-300 font-sans font-bold text-2xl text-black rounded-3xl border-b-2 border-r-2 border p-2">
                                    {username[0]}
                                </div>
                                <div className="flex flex-col">
                                    <div className="select-none font-sans font-semibold">
                                        {username}
                                    </div>
                                    <div className="select-none font-sans font-semibold">
                                        {email}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="select-none font-sans font-semibold">Posted on</div>
                                <div className="select-none font-sans font-semibold">11th Oct, 2025</div>
                            </div>
                        </div>
                        <hr className="mx-auto my-2 w-190 text-gray-500 font-bold"></hr>
                        <div className="select-none mt-2 mx-auto font-sans w-190">
                            lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum
                        </div>
                        <hr className="mx-auto my-2 w-190 text-gray-500 font-bold"></hr>
                        <div className="flex flex-row">
                            {
                                !emoji && 
                                    <div className="select-none ml-15 text-2xl font-sans w-190">
                                        <Image onClick={() => setEmoji(true)} className="hover:cursor-pointer hover:scale-150 transition duration-300"src={"/like.png"} width={50} height={20} alt="like"></Image>
                                    </div>
                            }
                            {
                                emoji && 
                                    <div className="flex flex-row jusify-between select-none ml-17 rounded-xl shadow-2xl mt-2 w-50 text-2xl font-sans">
                                        <div onClick={() => {setEmojiClick([true,false,false,false,false,false,false]);setEmoji(false)}} className="hover:cursor-pointer hover:scale-150 transition duration-300">👍</div>
                                        <div onClick={() => {setEmojiClick([false,true,false,false,false,false,false]);setEmoji(false)}} className="hover:cursor-pointer hover:scale-150 transition duration-300">❤️</div>
                                        <div onClick={() => {setEmojiClick([false,false,true,false,false,false,false]);setEmoji(false)}} className="hover:cursor-pointer hover:scale-150 transition duration-300">🙏</div>
                                        <div onClick={() => {setEmojiClick([false,false,false,true,false,false,false]);setEmoji(false)}} className="hover:cursor-pointer hover:scale-150 transition duration-300">👏</div>
                                        <div onClick={() => {setEmojiClick([false,false,false,false,true,false,false]);setEmoji(false)}} className="hover:cursor-pointer hover:scale-150 transition duration-300">😂</div>
                                        <div onClick={() => {setEmojiClick([false,false,false,false,false,true,false]);setEmoji(false)}} className="hover:cursor-pointer hover:scale-150 transition duration-300">😊</div>
                                        <div onClick={() => {setEmojiClick([false,false,false,false,false,false,true]);setEmoji(false)}} className="hover:cursor-pointer hover:scale-150 transition duration-300">😲</div>
                                    </div>
                            }
                            {   emojiClick[0] && <div className="flex flex-row"><div className="select-none flex justify-end text-xl">👍</div><div className="font-sans mr-16 text-lg">{emojiCount[0]}</div></div> }
                            {   emojiClick[1] && <div className="flex flex-row"><div className="select-none flex justify-end text-xl">❤️</div><div className="font-sans mr-16 text-lg">{emojiCount[1]}</div></div> }
                            {   emojiClick[2] && <div className="flex flex-row"><div className="select-none flex justify-end text-xl">🙏</div><div className="font-sans mr-16 text-lg">{emojiCount[2]}</div></div> }
                            {   emojiClick[3] && <div className="flex flex-row"><div className="select-none flex justify-end text-xl">👏</div><div className="font-sans mr-16 text-lg">{emojiCount[3]}</div></div> }
                            {   emojiClick[4] && <div className="flex flex-row"><div className="select-none flex justify-end text-xl">😂</div><div className="font-sans mr-16 text-lg">{emojiCount[4]}</div></div> }
                            {   emojiClick[5] && <div className="flex flex-row"><div className="select-none flex justify-end text-xl">😊</div><div className="font-sans mr-16 text-lg">{emojiCount[5]}</div></div> }
                            {   emojiClick[6] && <div className="flex flex-row"><div className="select-none flex justify-end text-xl">😲</div><div className="font-sans mr-16 text-lg">{emojiCount[6]}</div></div> }
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}