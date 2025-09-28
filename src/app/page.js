"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen flex flex-col items-center bg-gray-100'>
      <Image className="mt-12 mb-12" src="/logo.png" width={200} height={50} alt="Logo"></Image>

      {/* Two-column layout */}
      <div className='flex flex-col md:flex-row w-full max-w-5xl gap-10'>
        
        {/* Admin Section - Left */}
        <div className='flex justify-center font-sans bg-gray-100 border border-gray-300 hover:scale-105 transition duration-300 rounded-3xl shadow-xl md:h-65 shadow-gray-400 mx-auto md:mx-5 w-75 md:w-120 flex-1 p-8 flex flex-col items-center text-center'>
          <h2 className='text-2xl font-semibold text-gray-700 italic mb-3'>
            For Admin
          </h2>
          <h3 className='text-gray-500 mb-6'>
            Easily manage all placement drives, internship postings, and prepation updates in one place
          </h3>
          <Link href={"/adminlogin"} className='w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-black hover:transition duration-300 mb-3'><button>Login</button></Link>
        </div>

        {/* Student Section - Right */}
        <div className='flex justify-center font-sans bg-gray-100 border border-gray-300 hover:scale-105 transition duration-300 rounded-3xl shadow-xl md:h-65 shadow-gray-400 mx-auto md:mx-5 mb-10 w-75 md:w-120 flex-1 p-8 flex flex-col items-center text-center'>
          <h2 className='text-2xl font-semibold text-gray-700 italic mb-3'>
            For Students
          </h2>
          <h3 className='text-gray-500 mb-6'>
            One platform for DSA, aptitude, career prepation, internships, and placements.
          </h3>
          <Link href={"/studentlogin"} className='w-full bg-gray-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-black hover:transition duration-300 mb-3'><button>Login</button></Link>
        </div>
      </div>
    </div>
  )
}

export default page
