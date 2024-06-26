import { useState, createContext } from 'react'

export const TypingContext = createContext()

const TypingContextProvider = ({ children }) => {
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
    <TypingContext.Provider value={allValues}>
      {children}
    </TypingContext.Provider>
  )
}

export default TypingContextProvider
