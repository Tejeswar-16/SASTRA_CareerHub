"use client"

import { auth, db } from "@/app/_util/config";
import NavBar from "@/app/NavBar"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Home(){

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [addPost,setAddPost] = useState(false);
    const [postContent,setPostContent] = useState("");
    const [alert,setAlert] = useState(false);
    const [loading,setLoading] = useState(false);
    const [postData,setPostData] = useState([]);
    const [emoji,setEmoji] = useState([]);
    const [emojiClick,setEmojiClick] = useState([]);

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

    useEffect(() => {
        if (postData.length > 0){
            setEmoji(new Array(postData.length).fill(false));
            setEmojiClick(new Array(postData.length).fill(null));
        }
    },[postData]);

    function getRegNo(){
        return email.substring(0,9);
    }

    async function handleAddPost(){
        try
        {
            setLoading(true);
            await addDoc(collection(db,"posts"),{
                post: postContent,
                addedAt: new Date(),
                regno: getRegNo()
            });
            setLoading(false);
            setAddPost(false);
            setAlert(true);
        }
        catch(error)
        {
            console.log(error.message);
        }
    }

    function handleAlertOk(){
        setAlert(false);
    }

    async function fetchPosts(){
        try
        {
            setLoading(true);
            const q = query(
                collection(db,"posts"),
                orderBy("addedAt","desc")
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => doc.data());
            setPostData(data);
            setLoading(false);
        }
        catch(error)
        {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchPosts();
    },[]);

    function handleEmojiClick(index){
        setEmoji((prev) => {
            const newArr = [...prev];
            newArr[index] = true;
            return newArr;
        });
    }

    function selectEmoji(index,emojiChar){
        setEmojiClick((prev) => {
            const updated = [...prev];
            updated[index] = emojiChar;
            return updated;
        });
        setEmoji((prev) => {
            const updated = [...prev];
            updated[index]  = false;
            return updated;
        })
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
                                    <textarea onChange={(e) => setPostContent(e.target.value)} placeholder="Share your thoughts..." className="resize-none h-70 w-80 p-2 my-2 text-lg rounded-xl border"></textarea>
                                    <button onClick={handleAddPost} className="select-none font-sans font-semibold text-white p-2 rounded-xl shadoe-xl bg-blue-500 hover:bg-blue-700 hover:cursor-pointer transition duration-300">Add Post</button>
                                </div>
                            </div>
                        </div>
                }

                {
                    alert && 
                    <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                        <div className="select-none font-sans bg-white rounded-xl shadow-xl p-5 border">
                        <p className="text-lg">Post added successfully!</p>
                        <div className="flex justify-center "><button onClick={handleAlertOk} className="bg-black text-white w-10 rounded-xl mt-2 p-2 hover:cursor-pointer">OK</button></div>
                        </div>
                    </div>
                }

                {loading && 
                    <>
                        <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                            <div className="mx-auto font-mono font-bold text-3xl">
                                <Image src={"/loading.gif"} width={200} height={20} alt="Loading..."></Image>
                            </div>
                        </div>
                    </>
                }

                <div className="mx-auto w-250 bg-gray-300 border-b-5 border-t-5 border-l-2 border-r-2 rounded-xl mt-5 h-140 overflow-hidden overflow-y-auto">
                    {
                        postData.map((post,index) => (
                            <div key={index}>
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
                                            <div className="select-none font-sans font-semibold">{post.addedAt.toDate().toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="select-none my-2 rounded-xl shadow-xl shadow-gray-200 border p-2 mx-auto font-sans w-190">
                                        {post.post}
                                    </div>
                                    <div className="flex flex-row">
                                        {
                                            !emoji[index] && 
                                                <div className="select-none ml-15 text-2xl font-sans w-190">
                                                    <Image onClick={() => handleEmojiClick(index)} className="hover:cursor-pointer hover:scale-150 transition duration-300"src={"/like.png"} width={50} height={20} alt="like"></Image>
                                                </div>
                                        }
                                        {
                                            emoji[index] && 
                                                <div className="flex flex-row jusify-between select-none ml-17 rounded-xl shadow-2xl mt-2 w-50 text-2xl font-sans">
                                                    {
                                                        ["👍","❤️","🙏","👏","😂","😊","😲"].map((emojiChar,eIndex) => (
                                                            <div key={eIndex} onClick={() => selectEmoji(index,emojiChar)} className="hover:cursor-pointer hover:scale-150 transition duration-300">
                                                                {emojiChar}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                        }
                                        {
                                            emojiClick[index] && (
                                                <div className="flex flex-row mr-17 text-xl">
                                                    {emojiClick[index]}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}