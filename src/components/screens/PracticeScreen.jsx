import { useState, useContext, useEffect, useRef } from 'react'

import Text from '@components/game/Text'
import Button from '@components/base/button'
import LabelValue from '@components/LabelValue'
import { TypingContext } from '@contexts/Typing'

import getText from '@utils/getText'

const PracticeScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isIsLoadingText, setIsLoadingText] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [capsOn, setCapsOn] = useState(false)

  const sessionProgress = useRef({
    wpm: 0,
    length: 20,
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
  } = useContext(TypingContext)

  const handlePlay = async () => {
    setIsLoadingText(true)
    const content = await getText({
      min: sessionProgress.current.length,
      max: sessionProgress.current.length + 5
    })
    setText(content)
    setIsLoadingText(false)
    setIsPlaying(true)
  }

  const handleRestart = () => {
    const improvement = wpm - sessionProgress.current.wpm
    if (!sessionProgress.current.wpm && improvement > 3)
      sessionProgress.current.length += 5
    else if (improvement > 3)
      sessionProgress.current.length += 3
    else if (improvement < -5)
      sessionProgress.current.length -= 3

    if (sessionProgress.current.length > 100)
      sessionProgress.current.length = 100
    else if (sessionProgress.current.length < 10)
      sessionProgress.current.length = 10

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
    setCapsOn(event.getModifierState('CapsLock'))

    if (!startTime.current) {
      startTime.current = Date.now()
      stopWatch.current = setInterval(() => setTimeElapsed(Date.now() - startTime.current), 100)
    }
    if (event.key === text[typed]) {
      setTyped(prevTyped => ++prevTyped)
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, true])
    }
    else
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, false])
    event.preventDefault()
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

  const correctTyped = keysPressed.filter(correct => correct).length || 0
  const accuracy = (correctTyped * 100 / keysPressed.length || 0).toFixed(2)
  const wpm = Math.round(correctTyped / (timeElapsed / 12000) || 0)
  const progress = (typed * 100 / text.length).toFixed(2)

  return (
    isPlaying ?
      <>
        <div className='fixed top-[calc(50vh-50px)] left-1/2 flex flex-col justify-center items-center w-[90vw] md:min-w-[720px] max-w-7xl -translate-y-1/2 -translate-x-1/2'>
          <div className='flex justify-between w-full text-lg text-light/50'>
            <LabelValue label='Accuracy:' value={`${accuracy}%`} valueSize='text-3xl' />
            <LabelValue label='WPM' value={wpm} reverse valueSize='text-3xl' />
          </div>

          <Text capsOn={capsOn} className='min-h-[240px]' />
        </div>

        <div className='fixed bottom-12 left-1/2 w-3/4 text-center -translate-x-1/2'>
          { progress < 100 ?
            <>
              <LabelValue label='Progress:' value={`${progress}%`} />
              <div className='relative h-2 mt-2 bg-light/20 rounded-full overflow-hidden'>
                <div className='h-full bg-accent font-bold rounded-full duration-300' style={{ width: `${progress}%` }} />
              </div>
            </> :

            <Button autoFocus className='bg-accent text-dark hover:text-white duration-300' onClick={handleRestart}>
              Restart Practice
            </Button>
          }
        </div>
      </> :

      <Button loading={isIsLoadingText} autoFocus className='fixed top-1/2 left-1/2 bg-accent text-dark hover:text-white duration-300 -translate-x-1/2 -translate-y-1/2' onClick={handlePlay}>
        Start Practice
      </Button>
  )
}

export default PracticeScreen
