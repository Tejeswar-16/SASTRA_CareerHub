'use client'
import { useEffect, useState } from 'react'
import { auth, db } from '../../_util/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import NavBar from '@/app/NavBar'
import { MdCheckCircle, MdSearch } from 'react-icons/md'
import { FiExternalLink, FiPlus, FiEdit, FiTrash } from 'react-icons/fi'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { addDoc, collection, deleteDoc, documentId, getDocs, query, updateDoc, doc } from 'firebase/firestore'
import Image from 'next/image'
const page = () => {
  const [adminName,setAdminName] = useState("")
  const [adminEmail,setAdminEmail] = useState("")
  const [loading,setLoading] = useState(false)
  const [isdark,setIsDark] = useState(false)
  const [dataFromDB,setDataFromDB] = useState([])
  const [confirmDelete,setConfirmDelete] = useState(false)
  const [deleteID,setDeleteID] = useState(null)
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
      const data = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      data.forEach((announcement) => {
        console.log(announcement.title)
      })
      setDataFromDB(data)
      setLoading(false)
    }
    fetchData()
  },[])
  const getRandom = () => {
    return Math.floor(Math.random()*(1000-100+1)) + 100
  }
  const handleView = () => {

  }
  const handleEdit = () => {

  }
  const getType = () => {
    const type = ["Intern" , "Full-time Placement"]
    return type[Math.floor(Math.random() * type.length)]
  }
  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id)
    setDeleteID(id)
    setConfirmDelete(true)
  }
  const handleConfirmDelete = async () => {
    if(!deleteID){
      setConfirmDelete(false)
      return
    }
    setLoading(true)
    setConfirmDelete(false)
    try{
      await deleteDoc(doc(db,"announcements",deleteID))
      setDataFromDB(prev => prev.filter(a => a.id !== deleteID))
    }
    catch(err){
      console.log(err)
    }
    finally{
      setDeleteID(null)
      setLoading(false)
    }
  }
  const handleAddAnnouncement = () => {
    router.push("/admindashboard/announcementsandmanagements/addannouncement")
  }
  return (
    <>
    <div className='py-5 bg-gray-100 min-h-screen flex flex-col gap-y-5'>
      <NavBar username={adminName} email={adminEmail} handleLogoClick={handleLogoClick} handleLogout={handleLogout}/>
      <div className='mx-auto bg-white rounded-xl shadow-lg my-5 p-2 w-75 md:w-190 lg:w-250 overflow-hidden overflow-x-auto'>
      <div className='font-sans text-center py-5 text-3xl font-bold select-none'>Announcements & Notifications</div>
      <div className='flex flex-row font-sans mb-10 justify-between items-center p-4'>
        <div className='rounded-3xl py-2 px-4 bg-blue-500 flex gap-x-1 text-white items-center text-center cursor-pointer hover:opacity-[70%] transition duration-300 ease-in-out' onClick={handleAddAnnouncement}><FiPlus color='white'/>Add</div>
        <div className='flex flex-row border border-black p-2 rounded-3xl gap-x-4 items-center'>
          <MdSearch className='ml-1'/>
          <input
        className='appearance-none outline-none bg-transparent'
        placeholder='Search'
        />
        </div>
      </div>
      <div className='flex flex-row flex-wrap justify-center items-center font-sans gap-10'>
      {
        dataFromDB.map((announcement,index) => {
          return(
            <div key={index} className='border rounded-2xl h-65 w-50 shadow-[2px_2px_0_0_black] flex flex-col justify-center items-center relative hover:-translate-y-1 hover:shadow-[6px_6px_0_0_black] transition duration-300 ease-in-out'>
              <div className='absolute top-0 w-full bg-green-500 py-2 rounded-tr-2xl rounded-tl-2xl text-center select-none'>{getType()}</div>
              <div className='font-bold mt-8 select-none'>{announcement.role}</div>
              <div className='flex flex-row gap-1 items-center mt-2 ml-2'>
                <div><img className="w-12 mr-3 select-none" src={`https://logo.clearbit.com/${announcement.title.split(" ")[0]}.com`} alt={`${announcement.title.split(" ")[0]}`}/></div>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <div className='font-bold select-none text-lg'>{announcement.title.split(" ")[0] == "Wells" ? "Wells Fargo" : announcement.title.split(" ")[0]}</div>
                    <MdCheckCircle className="ml-1" size={15} color='#0a98f7'/>
                  </div>
                  <div className='text-gray-900 text-[10px] select-none'>{getRandom()}+ students applied</div>  
                </div>
              </div>
              <div className='flex flex-row gap-x-1 mt-2 select-none'>
                Schools: 
                {
                  announcement.forDept.map((dept,index) => {
                    return(
                      <div key={index} className='bg-green-300 p-1 text-[10px] font-semibold text-black rounded-sm select-none'>{dept}</div>
                    )
                  })
                }
              </div>
              <div className='flex flex-row gap-x-1 mt-2 select-none'>
                Batches:
                {
                  announcement.batch.map((year,index) => {
                    return(
                      <div key={index} className='bg-green-300 p-1 text-[10px] font-semibold text-black rounded-sm select-none'>{year}</div>
                    )
                  })
                }
              </div>
              <div className='flex flex-row justify-center items-center gap-x-3 mt-4'>
                <div className='bg-blue-500 rounded-2xl p-2 cursor-pointer hover:opacity-[70%] transition duration-300 ease-in-out'><FiExternalLink color='white'/></div>
                <div className='bg-blue-500 rounded-2xl p-2 cursor-pointer hover:opacity-[70%] transition duration-300 ease-in-out'><FiEdit color='white'/></div>
                <div className='bg-blue-500 rounded-2xl p-2 cursor-pointer hover:opacity-[70%] transition duration-300 ease-in-out' onClick={() => handleDelete(announcement.id)}><FiTrash color='white'/></div>
              </div>
            </div>
          )
        })
      }
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
      {
        confirmDelete && 
        <>
            <div className="fixed inset-0 flex flex-col justify-center backdrop-blur-sm items-center font-sans bg-opacity-40">
              <div className='bg-white w-80 p-5 rounded-xl border-2'>
                  <div className='text-center'>This action will permanently remove the announcement. Do you want to continue?</div>
                  <div className='flex flex-row gap-x-3 justify-center items-center mt-3'>
                    <div className='bg-blue-500 px-8 py-2 cursor-pointer rounded-3xl font-bold text-white' onClick={() => handleConfirmDelete()}>Yes</div>
                    <div className='bg-blue-500 px-8 py-2 cursor-pointer rounded-3xl font-bold text-white' onClick={() => setConfirmDelete(false)}>No</div>
                  </div>
              </div>
              </div>
        </>
      }
    </div>
    </>
  )
}

export default page