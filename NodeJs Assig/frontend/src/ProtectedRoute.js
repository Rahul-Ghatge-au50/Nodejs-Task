import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
  const user = JSON.parse(localStorage.getItem('user'));
  //console.log(user);
  if(!user){
    return <Navigate to='/login' />
  }else{
    return children
  }
}

export default ProtectedRoute
