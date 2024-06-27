import { useState, useContext, useEffect } from 'react'
import Text from '@components/game/Text'
import { TypingContext } from '@contexts/Typing'
import { RaceContext } from '@contexts/Race'

const RaceView = () => {
  const [raceRankings, setRaceRankings] = useState(null)
  const [capsOn, setCapsOn] = useState(false)
  const {
    text,
    typed,
    keysPressed,
    setText,
    setTyped,
    setKeysPressed,
  } = useContext(TypingContext)
  const {
    mainData,
    connections,
    peerId,
    updateProgress,
  } = useContext(RaceContext)

  const raceData = { ...mainData, connections, peerId }
  const raceCompleted = text.length == typed

  const handleKeyPress = (event) => {
    setCapsOn(event.getModifierState('CapsLock'))

    if (event.key === text[typed]) {
      setTyped(prevTyped => ++prevTyped)
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, true])
      updateProgress(typed + 1)
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

  useEffect(() => {
    if (raceData.connections[raceData.peerId].progress !== 1)
      return
    setRaceRankings(
      Object.entries(raceData.connections).sort(([_, a], [__, b]) => {
        if (a.progress > b.progress) return -1
        if (a.progress < b.progress) return 1
        if (a.lastUpdated < b.lastUpdated) return -1
        if (a.lastUpdated > b.lastUpdated) return 1
        return 0
      })
      .map(([key, { progress, playerInfo }]) => {
        return {
          key,
          ...playerInfo,
          progress: (progress * 100).toFixed(2),
        }
      })
    )
  }, [raceData.connections])

  return (
    <>
      { raceRankings ?
          JSON.stringify(raceRankings) :
          <Text capsOn={capsOn} className='w-full min-w-[720px] max-w-[1080px] min-h-[240px] m-auto' />
      }
    </>
  )
}

export default RaceView
