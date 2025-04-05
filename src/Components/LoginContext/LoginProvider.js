import React from 'react'
import { createContext } from 'react'

 export const LoginContext = createContext(null);
const LoginProvider = ({children}) => {

    
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser")) || null;
  return (
    <div>
    <LoginContext.Provider value = {loggedUser}>
        {children}
    </LoginContext.Provider>
    </div>
  )
}

export default LoginProvider
