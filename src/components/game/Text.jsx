import { useContext } from 'react'

import { RaceContext } from '@components/RaceContextProvider'

const Text = ({ capsOn, className }) => {

  const {
    text,
    typed,
    keysPressed
  } = useContext(RaceContext)

  const letterClass = index => {
    if (index < typed)
      return 'text-light'
    if (index === typed)
      return `${(keysPressed[keysPressed.length - 1] || !keysPressed.length) ? 'bg-accent' : 'bg-red-500'} text-dark`
    return 'text-light opacity-30'
  }


  return (
    <div className={`py-5 ${className}`}>
      { capsOn && (
        <span className='absolute -top-5 left-5 bg-red-500 text-light text-xl'>
          CapsLock is on
        </span>
        )
      }
      { text.split('').map((letter, index) => (
          <span className={`text-3xl font-mono tracking-wide leading-10 ${letterClass(index)}`} key={index}>
            {letter}
          </span>
        ))
      }
    </div>
  )
}

export default Text
