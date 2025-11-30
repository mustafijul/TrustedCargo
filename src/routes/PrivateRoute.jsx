import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router'
import { Audio } from 'react-loader-spinner'

export default function PrivateRoute() {
  
    const {loading, user} = useAuth()
    
    if(loading){
        return   <Audio
      height={80}
      width={80}
      radius={9}
      color="green"
      ariaLabel="audio-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    }

    if(!user){
        <Navigate to="/login"></Navigate>
    }


}
