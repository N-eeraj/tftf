import { useEffect, useRef } from 'react'

const RaceScreen = ({ text, onKeyPress }) => {
  const progress = useRef(0)

  const handleKeyPress = (event) => {
    if (event.key === text[progress.current]) {
      onKeyPress(++progress.current)
    }
    event.preventDefault()
  }

  useEffect(() => {
    if (text) {
      document.addEventListener('keypress', handleKeyPress)
    }
  }, [text])

  const textclass = index => {
    if (index === progress.current)
      return 'bg-primary text-white'
    if (index < progress.current)
    return 'opacity-25'
  }

  return (
    <section className='p-5'>
      {
        text.split('').map((letter, index) => <span className={`p-[1px] font-mono ${textclass(index)}`} key={index}>{letter}</span>)
      }
    </section>
  )
}

export default RaceScreen
