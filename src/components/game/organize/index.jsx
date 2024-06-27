import { useState, useEffect, useContext } from 'react'
import { RaceContext } from '@contexts/Race'
import { useSnackbar } from 'react-simple-snackbar'
import getText from '@utils/getText'
import Button from '@components/base/button'
import Lobby from '@components/game/organize/Lobby'
import { TypingContext } from '@contexts/Typing'

const Organize = () => {
  const {
    peerId,
    isHost,
    stopConnections,
  } = useContext(RaceContext)

  const controller = new AbortController()
  const signal = controller.signal

  const [openSnackbar] = useSnackbar({
    style: {
      borderRadius: '50px'
    },
    closeStyle: {
      color: '#0C7',
    }
  })

  const [loading, setLoading] = useState(false)

  const { setText } = useContext(TypingContext)

  const handlePeerIdClick = () => {
    navigator.clipboard.writeText(peerId)
    openSnackbar('Copied to Host ID to Clipboard', 2000)
  }

  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, 3)
    stopConnections(content)
    setText(content)
  }

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      { peerId ?
          ( isHost.current ?
              <div className='flex flex-col items-center gap-y-2'>
                <span className='cursor-pointer' onClick={handlePeerIdClick}>
                  Join with {peerId}
                </span>
                <Button loading={loading} autoFocus className='col-span-2 bg-accent text-white' onClick={handlePlay}>
                  Start Race
                </Button>
              </div> :
              <p> Please wait while host starts the race </p>
          ) :
          <Lobby />
      }
    </>
  )
}

export default Organize
