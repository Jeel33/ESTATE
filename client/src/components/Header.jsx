// import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
   <header className='bg-emerald-200 shedow-md'>
    <div className='flex justify-between items-center max-w-6xl p-3 mx-auto'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-emerald-500'>Real</span>
            <span className='text-emerald-800 '>Reantal</span>
        </h1>
        </Link>
        <form className='bg-emerald-100 rounded-lg p-3 flex items-center'>
            <input type='text' placeholder='Serach..' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-emerald-600'/>
        </form>
        <ul  className='flex gap-4'>
            <Link to='/'> <li className='hidden sm:inline-block text-emerald-500 hover:text-emerald-700'>Home</li></Link>
            <Link to='/About'><li className='hidden sm:inline-block text-emerald-500 hover:text-emerald-700'>About</li></Link>
            <Link to='/Sign-in'><li className=' text-emerald-500 hover:text-emerald-700'>Sign In</li></Link>
        </ul>
    </div>
   </header>
  )
}
