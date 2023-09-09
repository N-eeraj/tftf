import { useState, createContext } from 'react'

export const RaceContext = createContext()

const RaceContextProvider = ({ children }) => {
    const [text, setText] = useState('')
    const [keysPressed, setKeysPressed] = useState([])

    const allValues = {
        text,
        setText,
        keysPressed,
        setKeysPressed
    }

    return (
        <RaceContext.Provider value={allValues}>
            {children}
        </RaceContext.Provider>
    )
}

export default RaceContextProvider