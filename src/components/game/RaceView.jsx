import { useState, useContext, useEffect } from 'react'
import Text from '@components/game/Text'
import RankList from '@components/game/RankList'
import { TypingContext } from '@contexts/Typing'
import { RaceContext } from '@contexts/Race'

const RaceView = () => {
  const [ranking, setRanking] = useState(null)
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
  const correctTyped = keysPressed.filter(correct => correct).length || 0

  const handleKeyPress = (event) => {
    setCapsOn(event.getModifierState('CapsLock'))

    if (event.key === text[typed]) {
      setTyped(prevTyped => ++prevTyped)
      setKeysPressed(prevKeysPressed => [...prevKeysPressed, true])
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
    const accuracy = +(correctTyped * 100 / keysPressed.length || 0).toFixed(2)
    updateProgress(typed, accuracy)
    if (raceCompleted) {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [keysPressed])

  useEffect(() => {
    if (!text)
      setText(raceData.data)
  }, [raceData.data])

  useEffect(() => {
    if (raceData.connections[raceData.peerId].progress !== 1)
      return
    setRanking(
      Object.entries(raceData.connections).sort(([_, a], [__, b]) => {
        if (a.progress > b.progress) return -1
        if (a.progress < b.progress) return 1
        if (a.lastUpdated < b.lastUpdated) return -1
        if (a.lastUpdated > b.lastUpdated) return 1
        if (a.accuracy > b.accuracy) return -1
        if (a.accuracy < b.accuracy) return 1
        return 0
      })
      .map(([key, { progress, playerName, playerCar, lastUpdated, accuracy }]) => {
        return {
          key,
          isPlayer: key === peerId,
          wpm: Math.round(correctTyped / (lastUpdated / 12000) || 0),
          accuracy,
          playerName,
          playerCar,
          progress: (progress * 100).toFixed(2),
        }
      })
    )
  }, [raceData.connections])

  return (
    ranking ?
      <RankList ranking={ranking} /> :
      <Text capsOn={capsOn} className='w-full min-w-[720px] max-w-[1080px] min-h-[240px] mt-12 mx-auto' />
  )
}

export default RaceView
