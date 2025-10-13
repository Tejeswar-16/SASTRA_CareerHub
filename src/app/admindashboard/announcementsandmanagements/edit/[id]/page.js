'use client'
import { auth, db } from "@/app/_util/config"
import NavBar from "@/app/NavBar"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { getDoc, doc, updateDoc } from "firebase/firestore"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const page = () => {
  const [adminName,setAdminName] = useState("")
  const [adminEmail,setAdminEmail] = useState("")
  const [loading,setLoading] = useState(false)
  const [attachments,setAttachments] = useState("")
  const [batch,setBatch] = useState([])
  const [batchMessage,setBatchMessage] = useState("")
  const [companyName,setCompanyName] = useState("")
  const [companyNameMessage,setCompanyNameMessage] = useState("")
  const [content,setContent] = useState("")
  const [contentMessage,setContentMessage] = useState("")
  const [forDept,setForDept] = useState([])
  const [role,setRole] = useState("")
  const [roleMessage,setRoleMessage] = useState("")
  const [title,setTitle] = useState("")
  const [titleMessage,setTitleMessage] = useState("")
  const [type,setType] = useState("")
  const [deadline,setDeadline] = useState("")
  const [deadlineMessage,setDeadlineMessage] = useState("")
  const [forDeptMessage,setForDeptMessage] = useState("")
  const [attachmentsMessage,setAttachmentsMessage] = useState("")
  const [typeMessage,setTypeMessage] = useState("")
  const router = useRouter()
  const params = useParams()
  const handleLogoClick = () => {
    router.push("/admindashboard")
  }
  const handleLogout = async () => {
    try{
      await signOut(auth)
      router.push("/adminlogin")
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, (admin) => {
      if(admin){
        setAdminEmail(admin.email)
        setAdminName(admin.displayName)
      }
      else{
        router.push("/adminlogin")
      }
    })
  },[])
  useEffect(() => {
    async function fetchData(){
      setLoading(true)
      try{
        const result = await getDoc(doc(db,"announcements",params.id))
        const data = result.data()
        setAttachments(data.attachments)
        setBatch(data.batch)
        setCompanyName(data.companyName)
        setContent(data.content)
        setForDept(data.forDept)
        setRole(data.role)
        setTitle(data.title)
        setType(data.type)
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
  const handleTitle = (Title) => {
    if(Title.trim().length === 0 || Title.replace(/\s+/g,"").length === 0 || Title === ""){
      setTitleMessage("Title field is mandatory!")
    }
    else{
      setTitleMessage("")
    }
  }
  const handleCompanyName = (CompanyName) => {
    if(CompanyName.trim().length === 0 || CompanyName.replace(/\s+/g,"").length === 0 || CompanyName === ""){
      setCompanyNameMessage("Company Name field is mandatory!")
    }
    else{
      setCompanyNameMessage("")
    }
  }
  const handleContent = (Content) => {
    if(Content.trim().length === 0 || Content === ""){
      setContentMessage("Description field is mandatory!")
    }
    else if(Content.replace(/\s+/g).length < 50){
      setContentMessage("Description should not contain less than 50 characters!")
    }
    else{
      setContentMessage("")
    }
  }
  const handleRole = (Role) => {
    if(Role.trim().length === 0 || Role === ""){
      setRoleMessage("Role field is mandatory!")
    }
    else{
      setRoleMessage("")
    }
  }
  const handleDeadline = (Deadline) => {
    if(!Deadline){
      setDeadlineMessage("Deadline is mandatory!")
      return
    }
    const current = new Date()
    const selected = new Date(Deadline)
    if(selected < current){
      setDeadlineMessage("The deadline cannot be earlier than the current date and time!")
    }
    else{
      setDeadlineMessage("")
    }
  }
  const handleForDept = (ForDept) => {
    if(ForDept.length === 0){
      setForDeptMessage("Atleast select one school!")
    }
    else{
      setForDeptMessage("")
    }
  }
  const handleBatch = (Batch) => {
    if(Batch.length === 0){
      setBatchMessage("Atleast select one batch!")
    }
    else{
      setBatchMessage("")
    }
  }
  const getYear = () => {
    return new Date().getFullYear()
  }
  const handleAttachments = (Attachments) => {
    if(Attachments.trim().length === 0 || Attachments === ""){
      setAttachmentsMessage("Atleast one relevant attachment is mandatory!")
    }
    else{
      setAttachmentsMessage("")
    }
  }
  const handleType = (Type) => {
    if(Type.length === 0 || Type === ""){
      setTypeMessage("Select atleast one type!")
    }
    else{
      setTypeMessage("")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(batchMessage !== "" ){
      alert(batchMessage)
      return
    }
    if(companyNameMessage !== "" ){
      alert(companyNameMessage)
      return
    }
    if(contentMessage !== "" ){
      alert(contentMessage)
      return
    }
    if(attachmentsMessage !== "" ){
      alert(attachmentsMessage)
      return
    }
    if(forDeptMessage !== "" ){
      alert(forDeptMessage)
      return
    }
    if(roleMessage !== "" ){
      alert(roleMessage)
      return
    }
    if(typeMessage !== "" ){
      alert(typeMessage)
      return
    }
    if(deadlineMessage !== "" ){
      alert(deadlineMessage)
      return
    }
    if(titleMessage !== "" ){
      alert(titleMessage)
      return
    }
    try{
      setLoading(true)
      await updateDoc(doc(db,"announcements",params.id),{
        attachments,
        audience: ["students"],
        batch,
        companyName,
        content,
        createdBy: adminEmail,
        deadline: new Date(deadline),
        forDept,
        role,
        status: "Active",
        title,
        type,
        updatedAt: new Date(),
      })
    }
    catch(err){
      console.log(err)
    }
    finally{
      router.push("/admindashboard/announcementsandmanagements")
      setLoading(false)
    }
  }
  return(
    <>
    <div className="py-5 bg-gray-100 min-h-screen flex flex-col gap-y-5 font-sans">
      <NavBar username={adminName} email={adminEmail} handleLogoClick={handleLogoClick} handleLogout={handleLogout}/>
      <div className="mx-auto bg-white rounded-xl shadow-lg my-5 p-5 w-75 md:w-190 lg:w-250 ">
        <div className='text-center font-bold text-3xl my-4 select-none'>Edit Announcement Form</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Admin Name</div>
              <input 
              defaultValue={adminName}
              disabled
              type="text"
              required
              className="rounded-xl px-3 py-2 border border-black-100 select-none"
              placeholder="Enter the admin name.."
              />
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Admin Email</div>
              <input 
              defaultValue={adminEmail}
              required
              type="text"
              disabled
              className="rounded-xl px-3 py-2 border border-black-100 select-none"
              placeholder="Enter the admin email.."
              />
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Title</div>
              <input 
              value={title}
              required
              type="text"
              className="rounded-xl px-3 py-2 border border-black-100 select-none"
              placeholder="Enter the title of the announcement.."
              onChange={e => {setTitle(e.target.value); handleTitle(e.target.value);}}
              />
              <p className="text-red-600">{titleMessage}</p>
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Company Name</div>
              <input 
              value={companyName}
              required
              type="text"
              className="rounded-xl px-3 py-2 border border-black-100 select-none"
              placeholder="Enter the name of the company.."
              onChange={e => {setCompanyName(e.target.value); handleCompanyName(e.target.value);}}
              />
              <p className="text-red-600">{companyNameMessage}</p>
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Description for the announcement</div>
              <textarea 
              value={content}
              required
              className="rounded-xl px-3 py-2 border border-black-100 select-none"
              placeholder="Enter the description for the announcement.."
              onChange={e => {setContent(e.target.value); handleContent(e.target.value);}}
              />
              <p className="text-red-600">{contentMessage}</p>
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Role</div>
              <input 
              value={role}
              required
              type="text"
              className="rounded-xl px-3 py-2 border border-black-100 select-none"
              placeholder="Enter the role.."
              onChange={e => {setRole(e.target.value); handleRole(e.target.value);}}
              />
              <p className="text-red-600">{roleMessage}</p>
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Application Deadline</div>
              <div className="">Previously selected deadline: <span className="font-bold">{deadline
              ? (deadline.toDate
                  ? deadline.toDate().toLocaleString()
                  : new Date(deadline).toLocaleString())
              : ""}</span></div>
              <input 
              type="datetime-local"
              value={deadline}
              required
              className="rounded-xl px-3 py-2 border border-black-100 select-none"
              placeholder="Enter the application deadline.."
              onChange={e => {setDeadline(e.target.value); handleDeadline(e.target.value);}}
              />
              <p className="text-red-600">{deadlineMessage}</p>
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Schools applicable for this announcement (Multiple)</div>
              <div><span className="mr-1">Previously selected schools:</span> 
                {
                  forDept.map((item,index) => {
                    if(index !== forDept.length-1)
                      return <span key={index} className="font-bold">{item},</span>
                    else
                      return <span key={index} className="font-bold">{item}</span>
                  })
                }
                </div>
              <select
              required
              value={forDept}
              onChange={e => {setForDept(Array.from(e.target.selectedOptions, option => option.value)); handleForDept(Array.from(e.target.selectedOptions, option => option.value))}}
              multiple
              className='border p-2 rounded-xl'
              >
                <option value={"SOC"} className='text-lg p-2'>SOC</option>
                <option value={"SEEE"} className='text-lg p-2'>SEEE</option>
                <option value={"SoME"} className='text-lg p-2'>SoME</option>
                <option value={"SoCE"} className='text-lg p-2'>SoCE</option>
                <option value={"SCBT"} className='text-lg p-2'>SCBT</option>
                <option value={"SASHE"} className='text-lg p-2'>SASHE</option>
                <option value={"SoM"} className='text-lg p-2'>SoM</option>
                <option value={"LAW"} className='text-lg p-2'>LAW</option>
              </select>
              <p className="text-red-600">{forDeptMessage}</p>
            </div>
            <div className="flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl">
              <div className="text-lg">Batches applicable for this announcement (Multiple)</div>
              <div><span className="mr-1">Previously selected batches:</span> 
                {
                  batch.map((item,index) => {
                    if(index !== batch.length-1)
                      return <span key={index} className="font-bold">{item},</span>
                    else
                      return <span key={index} className="font-bold">{item}</span>
                  })
                }
                </div>
              <select
              required
              value={batch}
              onChange={e => {setBatch(Array.from(e.target.selectedOptions, option => option.value)); handleBatch(Array.from(e.target.selectedOptions, option => option.value))}}
              multiple
              className='border p-2 rounded-xl h-20'
              >
                <option value={getYear()+1} className='text-lg p-2'>{getYear()+1}</option>
                <option value={getYear()+2} className='text-lg p-2'>{getYear()+2}</option>
              </select>
              <p className="text-red-600">{batchMessage}</p>
            </div>
            <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Links</div>
                <input 
                value={attachments}
                required
                onChange={e => {setAttachments(e.target.value); handleAttachments(e.target.value)}}
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Enter any relevant links or attachments for this announcement..'
                />
                <p className='text-red-600'>{attachmentsMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Type [Intern/Full-time placement]</div>
                <select
                value={type}
                onChange={e => {setType(e.target.value); handleType(e.target.value);}}
                required
                className='border p-2 rounded-xl h-12'
                >
                  <option className='text-lg p-2' value={""}>Select type</option>
                  <option className='text-lg p-2' value={"Intern"}>Intern</option>
                  <option className='text-lg p-2' value={"Full-time placement"}>Full-time placement</option>
                </select>
                <p className='text-red-600'>{typeMessage}</p>
              </div>
          </div>
          <button className="flex justify-center py-2 px-6 rounded-3xl bg-blue-500 text-white cursor-pointer hover:opacity-[70%] transition duration-300 ease-in-out text-center w-30 mx-auto mt-10" type="submit">Update</button>
        </form>
      </div>
      {loading && 
          <>
              <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center">
                  <div className="mx-auto font-mono font-bold text-3xl">
                      <Image src={"/loading.gif"} width={200} height={20} alt="Loading..."></Image>
                  </div>
              </div>
          </>
      }
    </div>
    </>
  )
}

export default page