import { createContext, useEffect, useReducer, useState } from 'react'
export const ProfileContext = createContext()
const ProfileContextProvider = ({ children }) => {
  const allValues = {
  }
  return (
    <ProfileContext.Provider value={allValues}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
