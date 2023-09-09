import { useState, useContext } from 'react'

import Text from '@components/game/Text'
import { RaceContext } from '@components/RaceContextProvider'

const PracticeScreen = () => {
    const dummyText = 'The quick brown fox jumps over the lazy dog'
    const minLength = 100
    const maxLength = 200

    const [isPlaying, setIsPlaying] = useState(false)
    const [loadingText, setLoadingText] = useState(false)

    const { setText } = useContext(RaceContext)

    const handlePlay = async () => {
        setLoadingText(true)
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
            setIsPlaying(true)
            setLoadingText(false)
        }
    }

    return (
        <>
            {
                isPlaying ?
                <Text />:
                <button disabled={loadingText} onClick={handlePlay}>
                    {
                        loadingText ? 'Loading...' : 'Play'
                    }
                </button>
            }
        </>
    )
}

export default PracticeScreen