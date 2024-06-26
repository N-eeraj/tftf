import { createContext, useEffect, useReducer, useState } from 'react'
import { setStorage, getStorage } from '@utils/storage'

export const ProfileContext = createContext()

const soundReducer = (state, action) => {

}

const soundInit = {
  typing: true,
  music: true,
}

const ProfileContextProvider = ({ children }) => {
  const [previousPlayerName, setPreviousPlayerName] = useState(getStorage('playerName', ''))
  const [playerName, setPlayerName] = useState(previousPlayerName)
  const [playerCar, setPlayerCar] = useState(getStorage('playerCar', 0))
  const [sounds, updateSound] = useReducer(soundReducer, localStorage.getItem('sound') ?? soundInit)

  useEffect(() => {
    setStorage('playerName', previousPlayerName)
  }, [previousPlayerName])

  useEffect(() => {
    setStorage('playerCar', playerCar)
  }, [playerCar])

  const allValues = {
    playerName,
    playerCar,
    sounds,
    setPlayerName,
    setPlayerCar,
    updateSound,
    setPreviousPlayerName,
  }

  return (
    <ProfileContext.Provider value={allValues}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContextProvider
