import { createContext, useEffect, useReducer, useState } from 'react'
import { setStorage, getStorage } from '@utils/storage'

export const ProfileContext = createContext()

const soundReducer = (sounds, action) => {
  switch(action) {
    case 'toggleTyping':
      return {
        ...sounds,
        typing: !sounds.typing,
      }
    case 'toggleBackground':
      return {
        ...sounds,
        background: !sounds.background,
      }
    default:
      console.warn('Invalid Sound Update')
      return sounds
  }
}

const soundsInit = {
  typing: true,
  background: true,
}

const ProfileContextProvider = ({ children }) => {
  const [previousPlayerName, setPreviousPlayerName] = useState(getStorage('playerName', ''))
  const [playerName, setPlayerName] = useState(previousPlayerName)
  const [playerCar, setPlayerCar] = useState(getStorage('playerCar', 0))
  const [sounds, updateSound] = useReducer(soundReducer, getStorage('sounds', soundsInit))

  useEffect(() => {
    setStorage('playerName', previousPlayerName)
  }, [previousPlayerName])

  useEffect(() => {
    setStorage('playerCar', playerCar)
  }, [playerCar])

  useEffect(() => {
    setStorage('sounds', sounds)
  }, [sounds])

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
