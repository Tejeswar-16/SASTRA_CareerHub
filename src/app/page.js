"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  const handleAdminLogin = () => {}
  const handleStudentLogin = () => {}
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <Image className="mb-12" src="/logo.png" width={250} height={50} alt="Logo"></Image>

      {/* Two-column layout */}
      <div className='flex flex-col md:flex-row w-full max-w-5xl gap-10'>
        
        {/* Admin Section - Left */}
        <div className='font-sans bg-white rounded-3xl shadow-2xl md:h-58 shadow-gray-400 mx-auto md:mx-5 w-75 md:w-120 flex-1 p-8 flex flex-col items-center text-center'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-3'>
            For Admins
          </h2>
          <h3 className='text-gray-500 mb-6'>
            Easily manage all placement drives, internship postings, and prep updates in one place
          </h3>
          <Link href={"/adminlogin"} className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition mb-3'><button onClick={handleAdminLogin}>Login</button></Link>
        </div>

        {/* Student Section - Right */}
        <div className='font-sans bg-white rounded-3xl shadow-2xl md:h-58 shadow-gray-400 mx-auto md:mx-5 mb-10 w-75 md:w-120 flex-1 p-8 flex flex-col items-center text-center'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-3'>
            For Students
          </h2>
          <h3 className='text-gray-500 mb-6'>
            One platform for DSA, aptitude, career prep, internships, and placements.
          </h3>
          <Link href={"/studentlogin"} className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition mb-3'><button onClick={handleAdminLogin}>Login</button></Link>
        </div>
      </div>
    </div>
  )
}

export default page
