import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSnackbar } from 'react-simple-snackbar'
import getText from '@utils/getText'
import Button from '@components/base/button'
import { TypingContext } from '@contexts/Typing'
import { ProfileContext } from '@contexts/Profile'
import PlayerInfo from '@components/game/PlayerInfo'

const Organize = ({ hostConnection, clientConnection, peerId, isHost, onHost, onJoin, onStart }) => {
  const hostIdInput = useRef('')
  const controller = new AbortController()
  const signal = controller.signal

  const navigate = useNavigate()
  const [query] = useSearchParams()

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

  const hasPlayerName = () => {
    if (playerName) return true
    openSnackbar('Enter a name to continue', 2000)
    navigate('/profile')
    return false
  }

  const handlePeerIdClick = () => {
    navigator.clipboard.writeText(peerId)
    openSnackbar('Copied to Host ID to Clipboard', 2000)
  }

  const handleHost = () => {
    if (hasPlayerName())
      onHost({ playerName, playerCar })
  }

  const handleJoin = event => {
    event.preventDefault()
    if (hasPlayerName())
      onJoin(hostIdInput.current.value, { playerName, playerCar })
  }

  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, 3)
    onStart(content)
    setText(content)
  }

  useEffect(() => {
    hostIdInput.current.value = query.get('hostId')
    if (hasPlayerName())
      onJoin(query.get('hostId'), { playerName, playerCar })

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
          <div className='flex flex-col items-center gap-y-4'>
            <PlayerInfo />
    
            <Button disabled={clientConnection} loading={hostConnection} className='w-32 bg-accent text-white' onClick={handleHost}>
              Host
            </Button>
            <span>
              OR
            </span>
            <form className='flex gap-x-4' onSubmit={handleJoin}>
              <input ref={hostIdInput} required disabled={hostConnection || clientConnection} className='py-1 px-4 border border-accent focus:border-2 outline-none rounded-md' />
              <Button disabled={hostConnection} loading={clientConnection} className='w-32 bg-accent text-white'>
                Join
              </Button>
            </form>
          </div>
      }
    </>
  )
}

export default Organize
