"use client"
import Link from 'next/link'
import React from 'react'

const page = () => {
  const handleAdminLogin = () => {}
  const handleStudentLogin = () => {}
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6'>
      <h1 className='text-4xl font-bold text-gray-800 mb-12'>
        SASTRA Career Hub
      </h1>

      {/* Two-column layout */}
      <div className='flex flex-col md:flex-row w-full max-w-5xl gap-10'>
        
        {/* Admin Section - Left */}
        <div className='flex-1 bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-3'>
            For Admins
          </h2>
          <h3 className='text-gray-500 mb-6'>
            Easily manage all placement drives, internship postings, and prep updates in one place
          </h3>
          <button 
            onClick={handleAdminLogin} 
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition mb-3'
          >
            Login
          </button>
          <p className='text-sm text-gray-500'>
            Don't have an account?{" "}
            <Link href={"/"} className='text-blue-600 hover:underline'>
              Signup
            </Link>
          </p>
        </div>

        {/* Student Section - Right */}
        <div className='flex-1 bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center'>
          <h2 className='text-2xl font-semibold text-gray-700 mb-3'>
            For Students
          </h2>
          <h3 className='text-gray-500 mb-6'>
            One platform for DSA, aptitude, career prep, internships, and placements.
          </h3>
          <button 
            onClick={handleStudentLogin} 
            className='w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition mb-3'
          >
            Login
          </button>
          <p className='text-sm text-gray-500'>
            Don't have an account?{" "}
            <Link href={"/"} className='text-green-600 hover:underline'>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
