import { useState, useContext, useEffect, useRef } from 'react'

import Text from '@components/game/Text'
import Button from '@components/base/button'
import { RaceContext } from '@components/RaceContextProvider'

import getText from '@utils/getText'
import typeSound from '@sounds/type.wav'

const PracticeScreen = () => {
  const controller = new AbortController()
  const signal = controller.signal

  const [isPlaying, setIsPlaying] = useState(false)
  const [isIsLoadingText, setIsLoadingText] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [capsOn, setCapsOn] = useState(false)

  const sessionProgress = useRef({
    wpm: 0,
    length: 100
  })
  const startTime = useRef(0)
  const stopWatch = useRef(null)

  const {
    text,
    typed,
    keysPressed,
    setText,
    setTyped,
    setKeysPressed,
  } = useContext(RaceContext)

  const handlePlay = async () => {
    setIsLoadingText(true)
    const content = await getText(signal, {
      minLength: sessionProgress.current.length,
      maxLength: sessionProgress.current.length + 25
    })
    setText(content)
    setIsLoadingText(false)
    setIsPlaying(true)
  }

  const handleRestart = () => {
    const improvement = wpm - sessionProgress.current.wpm
    if (!sessionProgress.current.wpm && improvement > 3)
      sessionProgress.current.length += 50
    else if (improvement > 3)
      sessionProgress.current.length += 25
    else if (improvement < -5)
      sessionProgress.current.length -= 25

    if (sessionProgress.current.length > 500)
      sessionProgress.current.length = 500
    else if (sessionProgress.current.length < 50)
      sessionProgress.current.length = 50

    sessionProgress.current.wpm = wpm
    startTime.current = 0
    setIsPlaying(false)
    setTimeElapsed(0)
    setText('')
    setTyped(0)
    setKeysPressed([])
    handlePlay()
  }

  const handleKeyPress = (event) => {
    setCapsOn(event.getModifierState("CapsLock"))

    if (!startTime.current) {
      startTime.current = Date.now()
      stopWatch.current = setInterval(() => setTimeElapsed(Date.now() - startTime.current), 100)
    }
    if (event.key === text[typed]) {
      setTyped(prevTyped => ++prevTyped)
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, true])
      const audioFile = new Audio(typeSound)
      audioFile.play()
    }
    else
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, false])
  }

  const clearEvents = () => {
    clearInterval(stopWatch.current)
    document.removeEventListener('keypress', handleKeyPress)
  }

  useEffect(() => {
    if (isPlaying)
      document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [isPlaying, typed])

  useEffect(() => {
    if (isPlaying && typed === text.length) clearEvents()
  }, [keysPressed])

  useEffect(() => {
    return () => {
      controller.abort()
      clearEvents()
    }
  }, [])

  const correctTyped = keysPressed.filter(correct => correct).length || 0
  const accuracy = (correctTyped * 100 / keysPressed.length || 0).toFixed(2)
  const wpm = Math.round(correctTyped / (timeElapsed / 12000) || 0)
  const completion = (typed * 100 / text.length).toFixed(2)

  return (
    <section className='grid grid-cols-2 place-items-center h-full'>
      {
        isPlaying ?
          <>
            <div className='flex flex-col justify-center items-center gap-x-1 w-full h-full border'>
              <span className='text-xl'>
                Accuracy:
              </span>
              <strong className='text-4xl'>
                {accuracy} %
              </strong>
            </div>
            <div className='flex flex-col justify-center items-center gap-x-1 w-full h-full border'>
              <span className='text-xl'>
                Speed:
              </span>
              <strong className='text-4xl'>
                {wpm} WPM
              </strong>
            </div>

            <Text capsOn={capsOn} className='col-span-2 w-3/4 min-w-[720px] max-w-[1080px] min-h-[240px]' />

            {
              completion < 100 ?
                <div className='relative col-span-2 w-3/4 h-12 bg-gray-200 rounded-md overflow-hidden'>
                  <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold'>
                    {completion}%
                  </span>
                  <div className='h-full bg-primary font-bold' style={{ width: `${completion}%` }} />
                </div> :

                <Button autoFocus className='col-span-2 text-primary border-2 border-primary' onClick={handleRestart}>
                  Restart Practice
                </Button>
            }

          </> :

          <Button loading={isIsLoadingText} autoFocus className='col-span-2 bg-primary text-white' onClick={handlePlay}>
            Start Practice
          </Button>
      }
    </section>
  )
}

export default PracticeScreen
