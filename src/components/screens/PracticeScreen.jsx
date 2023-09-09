import { useState, useContext, useEffect } from 'react'

import Text from '@components/game/Text'
import Button from '@components/base/button'
import { RaceContext } from '@components/RaceContextProvider'

const PracticeScreen = () => {
    const dummyText = 'The quick brown fox jumps over the lazy dog.'
    const minLength = 100
    const maxLength = 200

    const [isPlaying, setIsPlaying] = useState(false)
    const [isIsLoadingText, setIsLoadingText] = useState(false)

    const {
        text,
        setText,
        typed,
        setTyped,
        setKeysPressed
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

    useEffect(() => {
        if (isPlaying)
            document.addEventListener('keypress', handleKeyPress)
        else
            document.removeEventListener('keypress', handleKeyPress)
        return () => {
            document.removeEventListener('keypress', handleKeyPress)
        }
    }, [isPlaying, typed])

    return (
        <section className='grid place-items-center h-full'>
            {
                isPlaying ?
                <Text />:
                <Button loading={isIsLoadingText} className='bg-primary text-white' onClick={handlePlay}>
                    Start Session
                </Button>
            }
        </section>
    )
}

export default PracticeScreen