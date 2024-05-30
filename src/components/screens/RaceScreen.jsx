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

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <section className='grid grid-cols-2 place-items-center h-full'>
      {text}
    </section>
  )
}

export default RaceScreen
