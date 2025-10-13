'use client'
import { auth, db } from '@/app/_util/config'
import NavBar from '@/app/NavBar'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
const page = () => {
  const fileRef = useRef(null)
  const [firmName,setFirmName] = useState("")
  const [companyMessage,setCompanyMessage] = useState("")
  const [titleMessage,setTitleMessage] = useState("")
  const [descriptionMessage,setDescriptionMessage] = useState("")
  const [roleMessage,setRoleMessage] = useState("")
  const [deadlineMessage,setDeadlineMessage] = useState("")
  const [schoolsMessage,setSchoolsMessage] = useState("")
  const [batchesMessage,setBatchesMessage] = useState("")
  const [linksMessage,setLinksMessage] = useState("")
  const [attachmentsMessage,setAttachmentsMessage] = useState("")
  const [adminEmail,setAdminEmail] = useState("")
  const [adminName,setAdminName] = useState("")
  const [loading,setLoading] = useState(false)
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [role,setRole] = useState("")
  const [deadline,setDeadline] = useState("")
  const [schools,setSchools] = useState([])
  const [years,setYears] = useState([])
  const [link,setLink] = useState("")
  const [fileName,setFileName] = useState("")
  const [postingType,setPostingType] = useState("")
  const [postingMessage,setPostingMessage] = useState("")
  const router = useRouter()
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
    setLoading(true)
    onAuthStateChanged(auth, (admin) => {
      if(admin){
        setAdminEmail(admin.email)
        setAdminName(admin.displayName)
      }
      else{
        router.push("/")
      }
    })
    setLoading(false)
  },[])
  const getYear = () => {
    return new Date().getFullYear()
  }
  const handleTitle = (Title) => {
    if(Title.trim() === "" || Title.trim().length === 0){
      setTitleMessage("Title field is mandatory!")
    }
    else{
      setTitleMessage("")
    }
  }
  const handleDescription = (Description) => {
    if(Description.trim() === "" || Description.trim().length === 0){
      setDescriptionMessage("Description field is mandatory!")
    }
    else if(Description.trim().length < 50){
      setDescriptionMessage("Description must be atleast 50 characters long!")
    }
    else{
      setDescriptionMessage("")
    }
  }
  const handleRole = (Role) => {
    if(Role.trim() === "" || Role.trim().length === 0){
      setRoleMessage("Role is mandatory!")
    }
    else{
      setRoleMessage("")
    }
  }
  const handleDeadline = (Deadline) => {
    if(!Deadline){
      setDeadlineMessage("Application deadline is mandatory!");
      return
    }
    const current = new Date();
    const selected = new Date(Deadline);
    if(selected < current){
      setDeadlineMessage("The deadline cannot be earlier than the current date and time!");
    }
    else{
      setDeadlineMessage("");
    }
  }
  const handleSchools = (Schools) => {
    if(Schools.length === 0){
      setSchoolsMessage("Atleast one school is mandatory!")
    }
    else{
      setSchoolsMessage("")
    }
  }
  const handleBatches = (Batches) => {
    if(Batches.length === 0){
      setBatchesMessage("Atleast one batch is mandatory!")
    }
    else{
      setBatchesMessage("")
    }
  }
  const handleLinks = (Link) => {
    if(Link?.trim() === "" || Link?.trim().length === 0){
      setLinksMessage("Atleast one link is mandatory!")
    }
    else{
      setLinksMessage("")
    }
  }
  const handleType = (Type) => {
    if(Type?.trim().length === 0 || Type?.trim() === ""){
      setPostingMessage("Type is a mandatory field!")
    }
    else{
      setPostingMessage("")
    }
  }
  const handleCompanyName = (Name) => {
    if(Name.trim() === "" || Name.trim().length === 0){
      setCompanyMessage("Company/Firm name is mandatory!")
    }
    else{
      setCompanyMessage("")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!postingType){
      alert("Type is a mandatory field!")
      return
    }
    if(titleMessage !== ""){
      alert(titleMessage)
      return
    }
    if(descriptionMessage !== ""){
      alert(descriptionMessage)
      return 
    }
    if(roleMessage !== ""){
      alert(roleMessage)
      return 
    }
    if(deadlineMessage !== ""){
      alert(deadlineMessage)
      return 
    }
    if(schoolsMessage !== ""){
      alert(schoolsMessage)
      return 
    }
    if(batchesMessage !== ""){
      alert(batchesMessage)
      return 
    }
    if(linksMessage !== ""){
      alert(linksMessage)
      return 
    }
    if(attachmentsMessage !== ""){
      alert(attachmentsMessage)
      return 
    }
    if(companyMessage !== ""){
      alert(companyMessage)
      return 
    }
    if(postingMessage !== ""){
      alert(postingMessage)
      return 
    }
    try{
      setLoading(true)
      await addDoc(collection(db,"announcements"),{
        attachments: fileName,
        audience: ["students"],
        batch: years,
        companyName: firmName,
        content,
        createdAt: new Date().toISOString().slice(0,16),
        createdBy: adminEmail,
        forDept: schools,
        role,
        status: "Active",
        title,
        type: postingType,
        updatedAt: new Date().toISOString().slice(0,16)
      })
    }
    catch(err){
      console.log(err)
    }
    finally{
      setTitle("")
      setFirmName("")
      setContent("")
      setRole("")
      setDeadline("")
      setSchools([])
      setYears([])
      setLink("")
      setPostingType("")
      setFileName(null)
      router.push("/admindashboard/announcementsandmanagements")
      setLoading(false)
    }
  }
  return (
    <div className="py-5 bg-gray-100 min-h-screen flex flex-col gap-y-5 font-sans">
      <NavBar username={adminName} email={adminEmail} handleLogoClick={handleLogoClick} handleLogout={handleLogout}/>
      <div className='mx-auto bg-white rounded-xl shadow-lg my-5 p-5 w-75 md:w-190 lg:w-250 overflow-hidden overflow-x-auto'>
        <div className='text-center font-bold text-3xl my-4 select-none'>Add Announcement Form</div>
        <div className='flex flex-col gap-y-5'>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-y-7'>
            <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Admin Name</div>
                <input 
                required
                defaultValue={adminName}
                disabled
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100 select-none'
                placeholder='Enter the title of the announcement..'
                />
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Admin Email</div>
                <input 
                required
                defaultValue={adminEmail}
                disabled
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Enter the title of the announcement..'
                />
              </div>
                  <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Title</div>
                <input 
                required
                value={title.toUpperCase()}
                onChange={(e) => {setTitle(e.target.value);handleTitle(e.target.value);}}
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Enter the title of the announcement..'
                />
                <p className='text-red-600'>{titleMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Company name</div>
                <input 
                required
                value={firmName}
                onChange={(e) => {setFirmName(e.target.value);handleCompanyName(e.target.value);}}
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Enter the name of the company..'
                />
                <p className='text-red-600'>{companyMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Description for the announcement</div>
                <textarea
                required
                value={content}
                onChange={(e) => {setContent(e.target.value);handleDescription(e.target.value)}}
                className='rounded-xl p-3 border h-12'
                placeholder='Enter the content description of the announcement..'
                ></textarea>
                <p className='text-red-600'>{descriptionMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Role</div>
                <input 
                required
                value={role.toUpperCase()}
                onChange={e => {setRole(e.target.value);handleRole(e.target.value)}}
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Specify the role of the candidate in the system..'
                />
                <p className='text-red-600'>{roleMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Application Deadline</div>
                <input 
                required
                value={deadline || ""}
                onChange={e => {setDeadline(e.target.value);handleDeadline(e.target.value)}}
                type='datetime-local'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Choose the closing date for this announcement'
                />
                <p className='text-red-600'>{deadlineMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Schools applicable for this announcement (Multiple)</div>
                <select
                required
                value={schools}
                onChange={e => {setSchools(Array.from(e.target.selectedOptions, option => option.value)); handleSchools(Array.from(e.target.selectedOptions, option => option.value))}}
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
                <p className='text-red-600'>{schoolsMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Batches applicable for this announcement (Multiple)</div>
                <select
                value={years}
                onChange={e => {setYears(Array.from(e.target.selectedOptions, option => option.value)); handleBatches(Array.from(e.target.selectedOptions,option => option.value))}}
                multiple
                required
                className='border p-2 rounded-xl h-20'
                >
                  <option className='text-lg p-2' value={getYear()+1}>{getYear()+1}</option>
                  <option className='text-lg p-2' value={getYear()+2}>{getYear()+2}</option>
                </select>
                <p className='text-red-600'>{batchesMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Links</div>
                <input 
                value={link}
                required
                onChange={e => {setLink(e.target.value); handleLinks(e.target.value)}}
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Enter any relevant links or attachments for this announcement..'
                />
                <p className='text-red-600'>{linksMessage}</p>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Type [Intern/Full-time placement]</div>
                <select
                value={postingType}
                onChange={e => {setPostingType(e.target.value); handleType(e.target.value);}}
                required
                className='border p-2 rounded-xl h-12'
                >
                  <option className='text-lg p-2' value={""}>Select type</option>
                  <option className='text-lg p-2' value={"Intern"}>Intern</option>
                  <option className='text-lg p-2' value={"Full-time placement"}>Full-time placement</option>
                </select>
                <p className='text-red-600'>{postingMessage}</p>
              </div>
              <button className='py-2 px-6 rounded-3xl bg-blue-500 text-white cursor-pointer hover:opacity-[70%] transition duration-300 ease-in-out text-center w-30 mx-auto mt-5' type='submit'>Submit</button>
          </form>
        </div>
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
  )
}

export default page