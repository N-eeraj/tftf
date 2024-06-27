import { useState, useEffect, useContext } from 'react'
import { useSnackbar } from 'react-simple-snackbar'
import { RaceContext } from '@contexts/Race'
import { TypingContext } from '@contexts/Typing'
import Button from '@components/base/button'
import getText from '@utils/getText'

const Lobby = () => {
  const {
    peerId,
    isHost,
    stopConnections,
  } = useContext(RaceContext)

  const [loading, setLoading] = useState(false)

  const controller = new AbortController()
  const signal = controller.signal

  const [openSnackbar] = useSnackbar({
    style: {
      borderRadius: '50px'
    },
    closeStyle: {
      color: '#50C878',
    }
  })
  const { setText } = useContext(TypingContext)


  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, 3)
    stopConnections(content)
    setText(content)
  }

  const handlePeerIdClick = () => {
    navigator.clipboard.writeText(peerId)
    openSnackbar('Copied to Host ID to Clipboard', 2000)
  }

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    isHost.current ?
      <div className='flex flex-col items-center gap-y-2'>
        <span className='cursor-pointer' onClick={handlePeerIdClick}>
          Join with {peerId}
        </span>
        <Button loading={loading} autoFocus className='col-span-2 bg-accent text-white' onClick={handlePlay}>
          Start Race
        </Button>
      </div> :
      <p>
        Please wait while host starts the race
      </p>
  )
}

export default Lobby
