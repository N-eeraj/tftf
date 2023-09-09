import { useContext } from 'react'

import { RaceContext } from '@components/RaceContextProvider'

const Text = () => {
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

    return (
        <div className='w-8/12 py-5 px-10 border-8 border-primary'>
            {
                text.split('').map((letter, index) => <span className={`text-2xl font-mono duration-200 ${letterClass(index)}`} key={index}>{letter}</span>)
            }
        </div>
    )
}

export default Text