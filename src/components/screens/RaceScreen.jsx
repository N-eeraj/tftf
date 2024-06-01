import { useState, useEffect, useRef } from 'react'

const RaceScreen = ({ text, onKeyPress }) => {
  const [keysPressed, setKeysPressed] = useState([])
  const [capsOn, setCapsOn] = useState(false)

  const typed = useRef(0)

  const handleKeyPress = (event) => {
    setCapsOn(event.getModifierState("CapsLock"))
    if (event.key === text[typed.current]) {
      onKeyPress(++typed.current)
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, true])
    }
    else
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, false])
    event.preventDefault()
  }

  useEffect(() => {
    if (text)
      document.addEventListener('keypress', handleKeyPress)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [text])

  useEffect(() => {
    if (text.length == typed.current) {
      document.removeEventListener('keypress', handleKeyPress)
      console.log(keysPressed)
    }
  }, [keysPressed])

  const letterClass = index => {
    if (index < typed.current)
      return 'opacity-30'
    if (index === typed.current)
      return `${(keysPressed[keysPressed.length - 1] || !keysPressed.length) ? 'bg-primary' : 'bg-red-500'} text-white`
    return 'current'
  }

  return (
    <div className="relative py-5 px-10 border-8 border-primary rounded-md">
      {
        capsOn && <span className='absolute -top-5 left-5 bg-red-500 text-white text-xl'>CapsLock is on</span>
      }
      {
        text.split('').map((letter, index) => <span className={`text-2xl font-mono ${letterClass(index)}`} key={index}>{letter}</span>)
      }
    </div>
  )
}

export default RaceScreen
