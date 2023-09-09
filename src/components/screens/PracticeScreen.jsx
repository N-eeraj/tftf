import { useState, useContext, useEffect, useRef } from 'react'

import Text from '@components/game/Text'
import Button from '@components/base/button'
import { RaceContext } from '@components/RaceContextProvider'

const PracticeScreen = () => {
    const dummyText = 'The quick brown fox jumps over the lazy dog.'
    const minLength = 100
    const maxLength = 200

    const [isPlaying, setIsPlaying] = useState(false)
    const [isIsLoadingText, setIsLoadingText] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)

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
        try {
            const response = await fetch(`https://api.quotable.io/random?minLength=${minLength}&maxLength=${maxLength}`)
            const { content } = await response.json()
            setText(content)
        }
        catch (error) {
            console.error(error)
            setText(dummyText)
        }
        finally {
            setIsLoadingText(false)
            setIsPlaying(true)
            startTime.current = Date.now()
            stopWatch.current = setInterval(() => setTimeElapsed(Date.now() - startTime.current), 100)
        }
    }

    const handleKeyPress = ({ key }) => {
        if (key === text[typed]) {
            setTyped(prevTyped => ++prevTyped)
            setKeysPressed(prevKeysPressed => [...prevKeysPressed, true])
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
        if (typed === text.length) clearEvents()
    }, [keysPressed])

    useEffect(() => clearEvents, [])

    const correct = keysPressed.filter(correct => correct).length || 0
    const accuracy = (correct * 100 / keysPressed.length || 0).toFixed(2)
    const wpm = Math.round(correct / (timeElapsed / 12000) || 0)

    return (
        <section className='grid place-items-center h-full'>
            {
                isPlaying ?
                <>
                    <div className='flex gap-x-1'>
                        <span>
                            Accuracy:
                        </span>
                        <strong>
                            {accuracy} %
                        </strong>
                    </div>
                    <div className='flex gap-x-1'>
                        <span>
                            Speed:
                        </span>
                        <strong>
                            {wpm} WPM
                        </strong>
                    </div>

                    <Text />
                </> :
                <Button loading={isIsLoadingText} className='bg-primary text-white' onClick={handlePlay}>
                    Start Session
                </Button>
            }
        </section>
    )
}

export default PracticeScreen