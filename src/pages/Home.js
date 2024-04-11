
import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';



function Home() {
  let [toDo,settoDo]=useState(null)
  let [toDos,settoDos]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
   fetchToDo();
  },[]);

  const fetchToDo=async()=>{
    try{
      const result=await axiosInstance.get('http://localhost:4000/users/viewToDo');
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
    const result= await axiosInstance.post('http://localhost:4000/users/addToDo',{
      id:Date.now(),value:toDo,status:false
    })
    if(result.data.message==="notAuth"){
      navigate('/login');
    }
    if(result.data.success){
      fetchToDo();
    }

    settoDo("");
  }
  
  const updateStatus=async(id,status)=>{
    const result=await axiosInstance.post(`http://localhost:4000/users/UpdateStatus/${id}`,{
      status:status
    });
    if(result.data.success){
      fetchToDo();
    }else{
      alert(result.data.message);
    }
  }

  const removeTask=async(id)=>{
    const result=await axiosInstance.post(`http://localhost:4000/users/deleteToDo/${id}`);
    if(result.data.success){
      fetchToDo();
    }else{
      alert(result.data.message);
    }
  }
      
  return (
      <div className="bg-gradient-to-br from-purple-400 to-indigo-900 min-h-screen flex justify-center pt-56">
      <div>
      <h1 className='text-lg font-bold text-black-500 mb-4'>🚀 Stay Productive Today! {days[day]} {months[month]} {datee}🎯 </h1>

      <input type="text" className="py-2 px-4 border rounded-l-lg outline-none" placeholder="Add a task..." value={toDo} onChange={(e)=>settoDo(e.target.value)}/>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-lg" onClick={addTODO}>Add</button>
          {
            toDos.map((obj)=>{
              console.log(obj);
              return(
                <div className='toDo mt-9 bg-gray-200 rounded-lg p-3'> <input type="checkbox"  name="" id="" className='h-6 w-6 mr-2 rounded' checked={obj.status} onChange={(e)=>{updateStatus(obj.id,obj.status)
                  
                    }}
                     />
               <span className='font-bold'> {obj.value}</span> {obj.status && <span className='CompletionStatus text-green-600'>Completed</span>} <button className='ml-4 text-red-500' onClick={()=>{
                removeTask(obj.id);
               }}>RemoveTask</button></div>

              )
            })
          }
      </div>
    </div>  
    
  );
}

export default Home;
