import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


function Signups() {
    const navigate=useNavigate()
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[success,setSuccess]=useState(false);
    const [message,setMessage]=useState('');
    const[alertStatus,setAlertStatus]=useState(false);
    let [loading,setLoading]=useState(false);

    const handleSignup=async()=>{
        try{
            setLoading(true);
            const result=await axios.post('https://todobackend-c4le.onrender.com/users/signUp',{
                name:name,
                email:email,
                password:password
            })
            console.log(result.data);
            console.log(result.data.success);
            setMessage(result.data.message);
            if(result.data.success===true){
                const token=result.data.token
                localStorage.setItem('token',token);
                setSuccess(false);
                setAlertStatus(true);
            }else{
                setSuccess(true);
            }
        }catch(err){
console.log('Error sending'+err)
        }finally{
            setLoading(false);
        }
        
    }

    const handleAlertOK=()=>{
        navigate('/');
        window.location.reload();
    } 
    return (
        <div>
            <div>
                <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    {
                        loading? <div className="flex justify-center items-center">
                        <CircularProgress className="text-black" size={80} thickness={4} />
                        <p className="text-black ml-4">Loading...</p>
                      </div>:(
                        <div className="max-w-md w-full space-y-8">
                        <div>
                            {alertStatus&& <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                    <span className="block sm:inline">SignUp was Successfull</span>
                                    <button className="absolute top-1 right-0 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded" onClick={handleAlertOK}>
                                        OK
                                    </button>
                                </div>}
                        </div>
                        <div>
                            {success?<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline"> {message}</span>
                        </div>:null}
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create account</h2>
                        </div>
                        <form className="mt-8 space-y-6"  method="POST">
                            <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px ">
                                <div >
                                    <label htmlFor="name" className="sr-only"></label>
                                    <input id="name" name="name" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div >
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"onChange={(e)=>{setEmail(e.target.value)}}/>
                                </div>
                                <div >
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <button type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleSignup}>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M7.293 6.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                      )
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Signups;
