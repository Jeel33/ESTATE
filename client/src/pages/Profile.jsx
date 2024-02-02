import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserSuccess } from '../redux/user/userSlice';


export default function Profile() {
  const {currentUser, loading, error} = useSelector(state => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: "POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData) 
      });
      const data = await res.json();
      if(data.success == false){
        dispatch(updateUserFailure(data.message))
        return;
      }
      dispatch(updateUserSuccess(data))
    }catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state-changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred /
        snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
      },
    
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>setFormData({...formData, avatar: downloadURL}))
    },
    )
  }

  const handleDelete = async() =>{
    try{
      dispatch(deleteUserStart())
      const deleteUser = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'delete',
      });
      const data = await deleteUser.json();
      if(data.success == false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    }catch(error){
      dispatch(deleteUserFailure(error))
    }
  }
  const handleSignOut = async()=>{
    try{
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success == false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
       
    }catch(error){
      dispatch(signOutUserFailure(error));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
     <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input type='file' onChange={(e)=>setFile(e.target.files[0])} ref={fileRef}  hidden accept='image/*'/>
      <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
      {fileUploadError ? (
        <span className='text-red-700'>Error Image upload (size less then 2 mb)</span>
      ) : filePerc > 0 && filePerc < 100 ? (
        <span className='text-slate-700'>{`uploading ${filePerc}`}</span> 
      ) : filePerc === 100 ? (
        <span className='text-green-700'>Image uploaded successfully!</span>
      ) : (
      "")
    }
      <input type='text' placeholder='userName' className='border p-3 rounded-lg' id='userName' defaultValue={currentUser.userName} onChange={handleChange}/>
      <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
      <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
      <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
      {loading ? 'Loading...':'Update'}
      </button>
     </form>
     <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
     </div>
     <p className='text-red-700'>
      {error?error:''}  
     </p>
    </div>
  )
}
