
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import '../pages/Home.css'
function Home() {
  let [toDo,settoDo]=useState(null)
  let [toDos,settoDos]=useState([]);
  let [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  useEffect(()=>{
   fetchToDo();
  },[]);

  const fetchToDo=async()=>{
    try{
      setLoading(true);
      const result=await axiosInstance.get('https://todobackend-c4le.onrender.com/users/viewToDo');
    if(result.data.toDos){
      settoDos(result.data.toDos.toDos);
      console.log("hi fetch to do executed")
      console.log(result.data.toDos.toDos)
    }else if(result.data.message==="notAuth"){
      settoDo(null);
      settoDos([]);
      navigate('/');
    }
    }catch{
      settoDo(null);
      settoDos([]);
      navigate('/');
    }finally{
      setLoading(false)
    }
    
  }
  let date=new Date();
  let formatted=date.toDateString();
  let day=date.getDay();
  let month=date.getMonth();
  let datee=date.getDate();
  let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let addTODO=async()=>{
    try{
      setLoading(true)
      const result= await axiosInstance.post('https://todobackend-c4le.onrender.com/users/addToDo',{
        id:Date.now(),value:toDo,status:false
      })
      if(result.data.message==="notAuth"){
        navigate('/login');
      }
      if(result.data.success){
        fetchToDo();
      }
  
      settoDo("");
    }catch{
      navigate('/login');    
    }finally{
      setLoading(false);
    }
   
  }
  
  const updateStatus=async(id,status)=>{
    try{
      setLoading(true);
      const result=await axiosInstance.post(`https://todobackend-c4le.onrender.com/users/UpdateStatus/${id}`,{
      status:status
    });
    if(result.data.success){
      fetchToDo();
    }else{
      alert(result.data.message);
    }
    }catch{
      settoDo(null);
      settoDos([]);
      navigate('/');  
    }
    
  }

  const removeTask=async(id)=>{
    try{
      const result=await axiosInstance.post(`https://todobackend-c4le.onrender.com/users/deleteToDo/${id}`);
    if(result.data.success){
      fetchToDo();
    }else{
      alert(result.data.message);
    }
    }catch{
      settoDo(null);
      settoDos([]);
      navigate('/'); 
    }
    
  }
      
  return (
      <div className="bg-gradient-to-br from-purple-400 to-indigo-900 min-h-screen flex justify-center pt-56">
      <div>
        {
          loading?(
            <div className="flex justify-center items-center">
            <CircularProgress style={{ color: '#ffffff' }} size={80} thickness={4} />
            <p className="text-white ml-4">Loading...</p>
          </div>
          ):(
            <div>
              <h1 className='text-lg font-bold text-black-500 mb-4'>🚀 Stay Productive Today! {days[day]} {months[month]} {datee}🎯 </h1>

<input type="text" className="py-2 px-4 border rounded-l-lg outline-none" placeholder="Add a task..." value={toDo} onChange={(e)=>settoDo(e.target.value)}/>
    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg" onClick={addTODO}>Add</button>
    {
      toDos.map((obj)=>{
        console.log(obj);
        return(
          <div className='toDo mt-9 bg-gray-200 rounded-lg p-4 custom-checkbox'> <input type="checkbox"  name="" id="" className='h-6 w-6 mr-2' checked={obj.status} onChange={(e)=>{updateStatus(obj.id,obj.status)
            
              }}
               />
         <span className='font-bold text-lg'> {obj.value}</span> {obj.status && <span className='CompletionStatus text-green-600 text-sm'>  completed<CheckCircleIcon/></span>} <button className='ml-4 delete-button' onClick={()=>{
          removeTask(obj.id);
         }}><DeleteIcon/></button></div>

        )
      })
    }
            </div>
          )
        }
      
      </div>
    </div>  
    
  );
}

export default Home;
