'use client'
import { useEffect, useState } from 'react'
import { auth } from '../../_util/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
const page = () => {
  const [adminName,setAdminName] = useState("")
  const [adminEmail,setAdminEmail] = useState("")
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
  return (
    <>

    </>
  )
}

export default page