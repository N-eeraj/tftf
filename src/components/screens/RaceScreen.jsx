import { useState, useContext, useEffect } from 'react'
import Text from '@components/game/Text'
import { RaceContext } from '@components/RaceContextProvider'

const RaceScreen = ({ raceData, onKeyPress }) => {
  const [capsOn, setCapsOn] = useState(false)
  const {
    text,
    typed,
    keysPressed,
    setText,
    setTyped,
    setKeysPressed,
  } = useContext(RaceContext)

  const raceCompleted = text.length == typed

  const handleKeyPress = (event) => {
    setCapsOn(event.getModifierState('CapsLock'))

    if (event.key === text[typed]) {
      setTyped(prevTyped => ++prevTyped)
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, true])
      onKeyPress(typed + 1)
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
  }, [text, typed])

  useEffect(() => {
    if (raceCompleted) {
      document.removeEventListener('keypress', handleKeyPress)
      // console.log(keysPressed)
    }
  }, [keysPressed])

  useEffect(() => {
    if (!text)
      setText(raceData.data)
  }, [raceData.data])

  return (
    <>
      <Text capsOn={capsOn} className='col-span-2 w-full min-w-[720px] max-w-[1080px] min-h-[240px]' />
    </>
  )
}

export default RaceScreen
