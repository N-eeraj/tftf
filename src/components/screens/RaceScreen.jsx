import { useState, useEffect, useRef } from 'react'

import Button from '@components/base/button'

import getText from '@utils/getText'

const RaceScreen = ({ isHost, onStart, text, onKeyPress }) => {
  const controller = new AbortController()
  const signal = controller.signal

  const [loading, setLoading] = useState(false)
  const progress = useRef(0)

  const handleKeyPress = (event) => {
    if (event.key === text[progress.current]) {
      onKeyPress(++progress.current)
    }
    event.preventDefault()
  }

  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, {
      minLength: 100,
      maxLength: 125
    })
    onStart(content)
  }

  useEffect(() => {
    if (text) {
      setLoading(false)
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
      {
        text ?
          <>
          {text}
          </> :

          <>
            {
              isHost ?
              <Button loading={loading} autoFocus className='col-span-2 bg-primary text-white' onClick={handlePlay}>
                Start Race
              </Button> :
              <div>
                Please wait while host starts the race
              </div>
            }
          </>
      }
    </section>
  )
}

export default RaceScreen
