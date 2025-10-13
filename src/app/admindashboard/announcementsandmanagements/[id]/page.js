'use client'
import { auth, db } from "@/app/_util/config"
import NavBar from "@/app/NavBar"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useParams, useRouter } from "next/navigation"
import { use, useEffect, useReducer, useState } from "react"
import Image from "next/image"
import { MdCheckCircle } from 'react-icons/md'
const page = () => {
  const router = useRouter()
  const [adminName,setAdminName] = useState("")
  const [adminEmail,setAdminEmail] = useState("")
  const [attachments,setAttachments] = useState("")
  const [audience,setAudience] = useState("")
  const [batch,setBatch] = useState([])
  const [companyName,setCompanyName] = useState("")
  const [content,setContent] = useState("")
  const [createdAt,setCreatedAt] = useState("")
  const [createdBy,setCreatedBy] = useState("")
  const [forDept,setForDept] = useState([])
  const [role,setRole] = useState("")
  const [status,setStatus] = useState("")
  const [title,setTitle] = useState("")
  const [type,setType] = useState("")
  const [deadline,setDeadline] = useState("")
  const [updatedAt,setUpdatedAt] = useState("")
  const [loading,setLoading] = useState(false)
  const handleLogoClick = () => {
    router.push("/admindashboard")
  }
  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (admin) => {
      if(admin){
        setAdminName(admin.displayName)
        setAdminEmail(admin.email)
      }
      else{
        router.push("/adminlogin")
      }
    })
    setLoading(false)
  },[])
  useEffect(() => {
    async function fetchData(){
      setLoading(true)
      try{
        const result = await getDoc(doc(db,"announcements",params.id))
        const data = result.data()
        setAttachments(data.attachments)
        setAudience(data.audience)
        setBatch(data.batch)
        setCompanyName(data.companyName)
        setContent(data.content)
        setCreatedAt(data.createdAt)
        setCreatedBy(data.createdBy)
        setForDept(data.forDept)
        setRole(data.role)
        setStatus(data.status)
        setTitle(data.title)
        setType(data.type)
        setUpdatedAt(data.updatedAt)
        setDeadline(data.deadline)
      }
      catch(err){
        console.log(err)
      }
      finally{
        setLoading(false)
      }
    }
    fetchData()
  },[])
  
  const handleLogout = async () => {
    try{
      await signOut(auth)
      router.push("/adminlogin")
    }
    catch(err){
      console.log(err)
    }
  }
  const params = useParams()
  const logoURL = companyName ? `https://logo.clearbit.com/${companyName.toLowerCase().replace(/\s+/g, "")}.com` : null
  return (
    <div className="py-5 bg-gray-100 min-h-screen flex flex-col gap-y-5 relative">
    <NavBar username={adminName} email={adminEmail} handleLogoClick={handleLogoClick} handleLogout={handleLogout}/>
    {loading && 
      <>
          <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
              <div className="mx-auto font-mono font-bold text-3xl">
                  <Image src={"/loading.gif"} width={200} height={20} alt="Loading..."></Image>
              </div>
          </div>
      </>
    }
    <div className="mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-250">
        <div className="flex flex-col font-sans justify-center p-5 gap-y-5">
          <div className="text-xl font-bold mx-auto">{role}, {type}</div>
          <div className="flex flex-row mx-auto gap-x-3 items-center">
            <img src={logoURL} width={70} height={70} alt={`${companyName} logo`}/>
            <div className="text-xl font-bold flex items-center">{companyName} <MdCheckCircle className="ml-2" color="green" width={20}/></div>
          </div>
          <div className="text-xl font-bold text-center">About the job/intern post:</div>
          <div className="text-lg font-semibold text-center">{title}</div>
          <div className="text-center italic">{content}</div>
          <div className="text-center text-xl font-bold">Eligible batches:</div>
          <div className="text-center italic flex justify-center">
            {
              batch.map((b,index) => {
                if(index !== batch.length-1)
                  return <div key={index}>{b},</div>
                else
                  return <div key={index}>{b}</div>
              })
            }
          </div>
          <div className="text-center text-xl font-bold">Eligible Schools:</div>
          <div className="text-center italic flex justify-center">
            {
              forDept.map((dept,index) => {
                if(index !== forDept.length-1)
                  return <div key={index}>{dept},</div>
                else
                  return <div key={index}>{dept}</div>
              })
            }
          </div>
          <div className="text-center text-xl font-bold">Attachments</div>
          <div className="text-center italic">{attachments}</div>
          <div className="text-center text-xl font-bold">Application Deadline:</div>
          <div className="text-center italic">{deadline ? deadline.toDate().toLocaleString() : ""}</div>
          <div className="text-center text-xl font-bold">Post Created By:</div>
          <div className="text-center italic">{adminName} ({adminEmail})</div>
          <div className="text-center text-xl font-bold">Post Created On:</div>
          <div className="text-center italic">{createdAt ? createdAt.toDate().toLocaleString() : ""}</div>
          <div className="text-center text-xl font-bold">Lastly Updated On:</div>
          <div className="text-center italic">{(updatedAt && updatedAt.toDate().toLocaleString() !== createdAt.toDate().toLocaleString()) ? updatedAt.toDate().toLocaleString() : "This post/announcement hasn't been updated since it was created."}</div>
        </div>
    </div>
    </div>
  )
}

export default page