import { useContext } from 'react'

import { RaceContext } from '@components/RaceContextProvider'

const Text = () => {
    const {
        text,
        keysPressed
    } = useContext(RaceContext)

    return (
        <>
            {text}
        </>
    )
}

export default Text