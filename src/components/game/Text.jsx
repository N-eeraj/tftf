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
    <div className={`${className}`}>
      <div className='grid place-items-center h-12'>
      { capsOn && <span className='px-8 py-2 bg-accent text-dark text-center text-lg font-medium rounded-lg'> Caps Lock </span> }
      </div>
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
