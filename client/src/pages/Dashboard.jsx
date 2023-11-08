/* eslint-disable no-unused-vars */
import React from 'react'
import NavDash from '../components/Dashboard/NavDash'
import Stats from '../components/Dashboard/Stats'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Element from '../components/Dashboard/Element'

const Dashboard = () => {
    return (
        <div className='flex flex-col px-24 pt-4 pb-40 gap-4 bg-[#F0F2F5]'>
            <div className=' h-28 rounded-lg items-end bg-white flex justify-between'>
                <div className='w-[20%]] flex flex-col gap-5 font-bold text-xl pl-5 pb-6'>
                    <p className='text-gray-500 font-medium text-base'>Dashboard</p>
                    <p>Hello Lucifer</p>
                </div>
                <div className='w-[80%] items-end justify-end pr-5 pb-6 flex'>
                    <button className='px-3 py-1.5 gap-1 justify-center items-center flex text-sm text-white duration-150 bg-[#1677FF] font-medium pb-2 rounded-lg hover:bg-indigo-500 active:shadow-lg '>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                        </svg>
                        Create Group
                    </button>
                </div>
            </div>
            <Stats/>
            <div className='flex justify-end rounded-lg bg-white py-5 px-10 items-center'>
                <Element/>
            </div>
        </div>
    )
}

export default Dashboard