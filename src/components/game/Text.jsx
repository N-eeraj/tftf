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
      return 'opacity-30'
    if (index === typed)
      return `${(keysPressed[keysPressed.length - 1] || !keysPressed.length) ? 'bg-primary' : 'bg-red-500'} text-white`
    return 'current'
  }


  return (
    <div className={`relative py-5 px-10 border-8 border-primary rounded-md ${className}`}>
      {
        capsOn && <span className='absolute -top-5 left-5 bg-red-500 text-white text-xl'>CapsLock is on</span>
      }
      {
        text.split('').map((letter, index) => <span className={`text-2xl font-mono ${letterClass(index)}`} key={index}>{letter}</span>)
      }
    </div>
  )
}

export default Text
