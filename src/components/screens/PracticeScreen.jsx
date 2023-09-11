import { useState, useContext, useEffect, useRef } from 'react'

import Text from '@components/game/Text'
import Button from '@components/base/button'
import { RaceContext } from '@components/RaceContextProvider'

import getText from '@utils/getText'

const PracticeScreen = () => {
    const controller = new AbortController()
    const signal = controller.signal

    const [isPlaying, setIsPlaying] = useState(false)
    const [isIsLoadingText, setIsLoadingText] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [countDown, setCountdown] = useState(false)

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
        const content = await getText(signal)
        setText(content)
        setIsLoadingText(false)
        setIsPlaying(true)
        setCountdown(true)
        setTimeout(() => {
            startTime.current = Date.now()
            stopWatch.current = setInterval(() => setTimeElapsed(Date.now() - startTime.current), 100)
        }, 3000)
    }

    const handleRestart = () => {
        startTime.current = 0
        setIsPlaying(false)
        setTimeElapsed(0)
        setText('')
        setTyped(0)
        setKeysPressed([])
        handlePlay()
    }

    const handleKeyPress = ({ key }) => {
        if (!startTime.current) return

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

                    <Text wait={!startTime.current} countDown={countDown} timeout={3} className='col-span-2 w-3/4 min-w-[720px] max-w- [1080px] min-h-[240px]' onCountDownComplete={() => setCountdown(false)} />
                    
                    {
                        completion < 100 ?
                        <div className='relative col-span-2 w-3/4 h-12 bg-gray-200 rounded-md overflow-hidden'>
                            <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold'>
                                {completion}%
                            </span>
                            <div className='h-full bg-primary font-bold' style={{width: `${completion}%`}} />
                        </div> :

                        <Button className='col-span-2 text-primary border-2 border-primary' onClick={handleRestart}>
                            Restart Practice
                        </Button>
                    }

                </> :

                <Button loading={isIsLoadingText} className='col-span-2 bg-primary text-white' onClick={handlePlay}>
                    Start Practice
                </Button>
            }
        </section>
    )
}

export default PracticeScreen