import { useState, useEffect, useContext, useRef } from 'react'

import { RaceContext } from '@components/RaceContextProvider'

const Text = ({wait, timeout, countDown, onCountDownComplete, className}) => {
    const [timeLeft, setTimeLeft] = useState(timeout)
    const interval = useRef(null)

    const {
        text,
        typed,
        keysPressed
    } = useContext(RaceContext)

    const letterClass = index => {
        if (index < typed)
            return 'opacity-30'
        if (index === typed)
            return `${(keysPressed[keysPressed.length - 1] || !keysPressed.length) ? 'bg-primary' : 'bg-red-500'} text-white`
        return 'current'
    }

    useEffect(() => {
        if (!countDown) {
            if (!wait) setTimeLeft(timeout)
            return
        }

        interval.current = setInterval(() => {
            setTimeLeft(prevTime => --prevTime)
        }, 1000)
      return () => {
        clearInterval(interval.current)
        onCountDownComplete()
      }
    }, [countDown])

    useEffect(() => {
        if (timeLeft) return
        clearInterval(interval.current)
        onCountDownComplete()
    }, [timeLeft])
    

    return (
        <div className={`relative py-5 px-10 border-8 border-primary rounded-md ${className}`}>
            {
                text.split('').map((letter, index) => <span className={`text-2xl font-mono duration-200 ${wait ? 'blur-md' : undefined} ${letterClass(index)}`} key={index}>{letter}</span>)
            }
            {
                (timeLeft && wait) ?
                <div className='absolute top-1/2 left-1/2 text-9xl -translate-x-1/2 -translate-y-1/2'>
                    {timeLeft}
                </div>
                : undefined
            }
        </div>
    )
}

export default Text