import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router'
import { Audio, ThreeDots } from 'react-loader-spinner'

export default function PrivateRoute({children}) {

    const { loading, user } = useAuth()

    if (loading) {
        // Loader
        return <ThreeDots
            height={80}
            width={80}
            radius={9}
            color="blue"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    }

    if (!user) {
        <Navigate to="/login"></Navigate>
    }

    return children


}
