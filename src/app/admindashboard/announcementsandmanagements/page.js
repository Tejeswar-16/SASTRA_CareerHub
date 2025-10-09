'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '../../_util/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import NavBar from '@/app/NavBar'
import { MdCheckCircle } from 'react-icons/md'
import { FiExternalLink, FiPlus, FiEdit, FiTrash } from 'react-icons/fi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { addDoc, collection, documentId, getDocs, query, updateDoc } from 'firebase/firestore'
const page = () => {
  const [adminName,setAdminName] = useState("")
  const [adminEmail,setAdminEmail] = useState("")
  const [loading,setLoading] = useState(false)
  const [isdark,setIsDark] = useState(false)
  const [dataFromDB,setDataFromDB] = useState([])
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
  const router = useRouter()
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
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const q = query(collection(db, "announcements"))
      const snapShot = await getDocs(q)
      const data = snapShot.docs.map((doc) => doc.data())
      data.forEach((announcement) => {
        console.log(announcement.title)
      })
      setDataFromDB(data)
      console.log(dataFromDB)
      setLoading(false)
    }
    fetchData()
  },[])
  const handleView = () => {

  }
  const handleEdit = () => {

  }
  const handleRemove = () => {

  }
  return (
    <>
    <div className='py-5 bg-gray-100 min-h-screen flex flex-col gap-y-5'>
      <NavBar username={adminName} email={adminEmail} darkMode={false} handleLogoClick={handleLogoClick} handleDarkMode={handleToggleModeClick}
      handleLightMode={handleToggleModeClick} handleLogout={handleLogout}/>
      
      <div className='font-sans text-center py-5 text-3xl font-bold'>📣Announcements & Notifications</div>
      <div className='mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-250'>
        <div className='flex flex-row font-sans justify-between items-center gap-x-3 '>
          <div className='px-4 py-2 rounded-3xl bg-[#1a73e8] text-white font-regular text-center flex gap-x-1 items-center cursor-pointer hover:opacity-[80%] transition duration-300 ease-in-out'><FiPlus />Add</div>
          <input 
          placeholder='Search..'
          className='rounded-3xl w-full border-none p-1 appearance-none border-none outline-none bg-transparent font-sans'
          />
        </div>
      </div>
      {/*<div className='mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-250'>
      <table className=' text-center font-sans'>
        <thead>
          <tr className='text-lg'>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>S.No</th>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>Title</th>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>Description</th>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>Applicable Departments</th>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>Eligible Batches</th>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>Attachments</th>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>Status</th>
            <th className='bg-blue-950 text-white py-3 px-4 border border-gray-400'>Role</th>
          </tr>
        </thead>
        <tbody>
          {
            dataFromDB.map((announcement,index) => {
              return <tr key={index} className='bg-yellow-100 text-sm font-medium p-2 hover:bg-yellow-200 transition duration-300 ease-in-out'>
                <td className='border border-black p-2'>{index+1}</td>
                <td className='border border-black p-2'>{announcement.title}</td>
                <td className="border border-black p-2 whitespace-nowrap max-w-[100px] overflow-x-auto hide-scrollbar">
                  {announcement.content}
                </td>
                  <td className='border border-black p-2'>
                  {announcement.forDept.map((dept, index) => (
                    index === announcement.forDept.length - 1
                      ? <span key={index}>{dept}</span>
                      : <span key={index}>{dept}, </span>
                  ))}

                </td>
                <td className='border border-black p-2'>
                  <ul>
                  {announcement.batch.map((b,index) => (
                    index === announcement.batch.length - 1
                    ? <span key={index}>{b}</span>
                    : <span key={index}>{b},</span>
            ))}
                  </ul>
                </td>
                <td className='border border-black p-2'><span className='cursor-pointer'>{announcement.attachments}</span></td>
                <td className='border border-black p-2 font-bold'><span
                className={announcement.status == "Active" ? `bg-red-500 p-2 rounded-xl` : announcement.status == "Inactive" ? "bg-blue-500 p-2 rounded-xl" : "bg-green-500 p-2 rounded-xl"}
                >{announcement.status}</span></td>
                <td className='border border-black p-2'>{announcement.role}</td>
              </tr>
            })
          }
        </tbody>
      </table>
      </div>*/}
      <div className='mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-250 flex flex-row flex-wrap gap-10 p-5 justify-center items-center font-sans'>
          {
        dataFromDB.map((announcement,index) => {
          return(
            <div key={index} className='flex flex-col gap-y-2 bg-white w-50 h-70 rounded-xl border border-black p-2 text-center shadow-[2px_2px_0_0_black] hover:shadow-[6px_6px_0_0_black] transition-all duration-300 ease-in-out hover:-translate-y-1 relative pt-12'>
              <div className='font-bold'>{announcement.role}</div>
              <div className='flex flex-row gap-1 items-center justify-center mx-auto'>
              <img className="w-5 mr-1" src={`https://logo.clearbit.com/${announcement.title.split(" ")[0] == "Wells" ? "wellsfargo" : announcement.title.split(" ")[0] == "L&T" ? "larsenandtourbo" : announcement.title.split(" ")[0]}.com`} alt={`${announcement.title.split(" ")[0] == "Wells" ? "Wells Fargo" : announcement.title.split(" ")[0]} logo`} />
              <div className='font-medium'>{announcement.title.split(" ")[0] == "Wells" ? "Wells Fargo" : announcement.title.split(" ")[0]}</div>
              <div className=''><MdCheckCircle color="green" size={20} /></div>
              </div>
              <div
                className={announcement.status == "Active" ? `rounded-tr-xl absolute top-0 right-0 w-20 bg-green-500 p-2 text-sm font-bold` : announcement.status == "Inactive" ? "rounded-tr-xl w-20 absolute top-0 right-0 w-20 bg-red-500 p-2 text-sm font-bold" : "rounded-tr-xl w-20 absolute top-0 right-0 w-20 bg-blue-500 p-2 text-sm font-bold"}
                >{announcement.status}</div>
                <div className=''>
                Applicable Schools:{" "}
                {announcement.forDept.map((dept, index) => (
                    index === announcement.forDept.length - 1
                      ? <span key={index}>{dept}</span>
                      : <span key={index}>{dept}, </span>
                  ))}
              </div>
              <div className=''>
                Applicable batches: 
                {announcement.batch.map((b, index) => (
                    index === announcement.forDept.length - 1
                      ? <span key={index}>{b}</span>
                      : <span key={index}>{b}, </span>
                  ))}
              </div>
              <div className='flex flex-row mx-auto gap-x-2'>
              <div className='rounded-3xl bg-[#1a73e8] text-sm text-white font-regular flex flex-row items-center justify-center cursor-pointer hover:opacity-[80%] transition duration-300 ease-in-out px-4 py-2' onClick={handleView} tooltip="View details"><FiExternalLink size={12}/></div>
              <div className='px-4 py-2 rounded-3xl bg-[#1a73e8] text-white font-regular text-center flex gap-x-1 items-center cursor-pointer hover:opacity-[80%] transition duration-300 ease-in-out' tooltip="Edit announcement" onClick={handleEdit}><FiEdit size={12}/></div>
              <div className='px-4 py-2 rounded-3xl bg-[#1a73e8] text-white font-regular text-center flex gap-x-1 items-center cursor-pointer hover:opacity-[80%] transition duration-300 ease-in-out' tooltip="Remove announcement" onClickCapture={handleRemove}><FiTrash size={12}/></div>
              </div>
            </div>
          )
        })
        }
      </div>
      {loading && 
      <>
        <div className='fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center'>
          <div className='mx-auto font-sans font-bold text-3xl'>Loading</div>
        </div>
      </>
      }
    </div>
    </>
  )
}

export default page