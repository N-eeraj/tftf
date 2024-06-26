import { useRef, useState, useEffect, useContext } from 'react'
import { TypingContext } from '@contexts/Typing'
import { ProfileContext } from '@contexts/Profile'
import typingSound from '@sounds/type.wav'

const Text = ({ capsOn, className }) => {
  const container = useRef(null)
  const letters = useRef([])
  const blink = useRef(true)
  const [caretCoords, setCaretCoords] = useState({ x: -2, y: 0 })
  const typingAudio = useRef(new Audio(typingSound))

  const {
    text,
    typed,
    keysPressed,
  } = useContext(TypingContext)
  const { sounds } = useContext(ProfileContext)

  const letterClass = index => {
    if (index < typed)
      return 'text-light'
    return 'text-light opacity-30'
  }

  const mistake = keysPressed[keysPressed.length - 1] || !keysPressed.length

  useEffect(() => {
    if (!typed || !container.current || !letters.current[typed]) return
    blink.current = false
    const blinker = setTimeout(() => blink.current = true, 3000)
    if (sounds.typing)
      typingAudio.current.play()

    const { x: containerX, y: containerY } = container.current.getBoundingClientRect()
    const { x: lettersX, y: lettersY } = letters.current[typed].getBoundingClientRect()
    setCaretCoords({
      x: lettersX - containerX - 2,
      y: lettersY - containerY - 48,
    })

    return () => {
      clearTimeout(blinker)
      typingAudio.current.currentTime = 0
    }
  }, [typed])


  return (
    <div ref={container} className={`relative ${className}`}>
      <div className='grid place-items-center h-12'>
      { capsOn && <span className='px-8 py-2 bg-accent text-dark text-center text-lg font-medium rounded-lg'> Caps Lock </span> }
      </div>

      { typed !== text.length && <span className={`absolute w-[3px] h-9 rounded-full duration-200 ${mistake ? 'bg-accent' : 'bg-red-500'} ${blink.current && 'animate-blink'}`} style={{ transform: `translate(${caretCoords.x}px, ${caretCoords.y}px)` }} /> }

      { text.split('').map((letter, index) => (
          <span ref={el => letters.current[index] = el} className={`text-3xl font-mono tracking-wider leading-10 duration-300 ${letterClass(index)}`} key={index}>
            {letter}
          </span>
        ))
      }
    </div>
  )
}

export default Text
