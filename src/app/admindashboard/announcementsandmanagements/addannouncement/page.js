'use client'
import { auth } from '@/app/_util/config'
import NavBar from '@/app/NavBar'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const page = () => {
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
    onAuthStateChanged(auth, (admin) => {
      if(admin){
        setAdminEmail(admin.email)
        setAdminName(admin.displayName)
      }
      else{
        router.push("/")
      }
    })
  },[])
  const getYear = () => {
    return new Date().getFullYear()
  }
  const handleSubmit = () => {

  }
  return (
    <div className="py-5 bg-gray-100 min-h-screen flex flex-col gap-y-5 font-sans">
      <NavBar username={adminName} email={adminEmail} handleLogoClick={handleLogoClick} handleLogout={handleLogout}/>
      <div className='mx-auto bg-white rounded-xl shadow-lg my-5 p-5 w-75 md:w-190 lg:w-250 overflow-hidden overflow-x-auto'>
        <div className='text-center font-bold text-3xl my-4'>Add Announcement Form</div>
        <div className='flex flex-col gap-y-5'>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-y-7'>
                  <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Title</div>
                <input 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Enter the title of the announcement..'
                />
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Description for the announcement</div>
                <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='rounded-xl p-3 border h-12'
                placeholder='Enter the content description of the announcement..'
                ></textarea>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Role</div>
                <input 
                required
                value={role}
                onChange={e => setRole(e.target.value)}
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Specify the role of the candidate in the system..'
                />
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Application Deadline</div>
                <input 
                required
                value={deadline}
                onChange={e => setDeadline(e.target.value)}
                type='datetime-local'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Choose the closing date for this announcement'
                />
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Schools applicable for this announcement (Multiple)</div>
                <select
                required
                value={schools}
                onChange={e => setSchools(Array.from(e.target.selectedOptions, option => option.value))}
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
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Batches applicable for this announcement (Multiple)</div>
                <select
                value={years}
                onChange={e => setYears(Array.from(e.target/selectedOptions, option => option.value))}
                multiple
                required
                className='border p-2 rounded-xl h-20'
                >
                  <option className='text-lg p-2'>{getYear()+1}</option>
                  <option className='text-lg p-2'>{getYear()+2}</option>
                </select>
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Links</div>
                <input 
                value={link}
                required
                onChange={e => setLink(e.target.value)}
                type='text'
                className='rounded-xl px-3 py-2 border border-black-100'
                placeholder='Enter any relevant links or attachments for this announcement..'
                />
              </div>
              <div className='flex flex-col gap-y-2 shadow-2xl bg-gray-100 p-3 rounded-xl'>
                <div className='text-lg'>Attachments</div>
                <input 
                required
                value={fileName}
                onChange={e => setFileName(e.target.files[0])}
                type='file'
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                  file:text-sm file:font-regular file:bg-blue-500 file:text-white
                  hover:file:bg-blue-600 file:cursor-pointer"
                />
              </div>
              <button className='py-2 px-6 rounded-xl bg-blue-500 text-white cursor-pointer hover:opacity-[70%] transition duration-300 ease-in-out text-center w-30 mx-auto mt-5' type='submit'>Submit</button>
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