import { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSnackbar } from 'react-simple-snackbar'
import getText from '@utils/getText'
import Button from '@components/base/button'
import Lobby from '@components/game/organize/Lobby'
import { TypingContext } from '@contexts/Typing'
import { ProfileContext } from '@contexts/Profile'

const Organize = ({ hostConnection, clientConnection, peerId, isHost, onHost, onJoin, onStart }) => {
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
  const { playerName, playerCar } = useContext(ProfileContext)

  const handlePeerIdClick = () => {
    navigator.clipboard.writeText(peerId)
    openSnackbar('Copied to Host ID to Clipboard', 2000)
  }

  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, 3)
    onStart(content)
    setText(content)
  }

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      {
        peerId ?
          (isHost ?
            <div className='flex flex-col items-center gap-y-2'>
              <span className='cursor-pointer' onClick={handlePeerIdClick}>
                Join with {peerId}
              </span>
              <Button loading={loading} autoFocus className='col-span-2 bg-accent text-white' onClick={handlePlay}>
                Start Race
              </Button>
            </div> :
            <p> Please wait while host starts the race </p>) :
          <Lobby hostConnection={hostConnection} clientConnection={clientConnection} onHost={() => onHost({ playerName, playerCar })} onJoin={(hostId, playerInfo) => onJoin(hostId, playerInfo)} />
      }
    </>
  )
}

export default Organize
