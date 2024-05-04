import { useState, createContext } from 'react'

export const RaceContext = createContext()

const RaceContextProvider = ({ children }) => {
  const [text, setText] = useState('')
  const [typed, setTyped] = useState(0)
  const [keysPressed, setKeysPressed] = useState([])

  const allValues = {
    text,
    typed,
    keysPressed,
    setText,
    setTyped,
    setKeysPressed,
  }

  return (
    <RaceContext.Provider value={allValues}>
      {children}
    </RaceContext.Provider>
  )
}

export default RaceContextProvider
