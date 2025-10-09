'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '../../_util/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import NavBar from '@/app/NavBar'
import { addDoc, collection, getDocs, query } from 'firebase/firestore'
import Image from 'next/image'
const page = () => {
  const [adminName,setAdminName] = useState("")
  const [adminEmail,setAdminEmail] = useState("")
  const [loading,setLoading] = useState(false)
  const [isdark,setIsDark] = useState(false)
  const [dataFromDB,setDataFromDB] = useState([])
  const handleLogoClick = () => {
          router.push("/admindashboard")
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
  return (
    <>
    <div className='py-5 bg-gray-100 min-h-screen flex flex-col gap-y-5'>
      <NavBar username={adminName} email={adminEmail} handleLogoClick={handleLogoClick} handleLogout={handleLogout}/>
      <div className='mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-240 overflow-hidden overflow-x-auto'>
        
      <div className='font-sans text-center py-5 text-3xl font-bold'>Announcements & Notifications</div>
      <table className='text-center font-sans'>
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
              return <tr key={index} className='text-sm font-medium p-2 hover:bg-gray-200 transition duration-300 ease-in-out'>
                <td className='border border-black p-2'>{index+1}</td>
                <td className='border border-black p-2'>{announcement.title}</td>
                <td className='border border-black p-2 w-50 '>
                <div className="overflow-x-auto overflow-hidden w-60">
                  {announcement.content}
                </div>
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
                <td className='border border-black p-2'>{announcement.status}</td>
                <td className='border border-black p-2'>{announcement.role}</td>
              </tr>
            })
          }
        </tbody>
      </table>
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