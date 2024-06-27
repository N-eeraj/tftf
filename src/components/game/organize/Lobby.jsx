import { useContext, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProfileContext } from '@contexts/Profile'
import { RaceContext } from '@contexts/Race'
import PlayerInfo from '@components/game/PlayerInfo'
import Button from '@components/base/button'
import { useSnackbar } from 'react-simple-snackbar'

const Lobby = () => {
  const hostIdInput = useRef('')
  const { playerName, playerCar } = useContext(ProfileContext)
  const {
    hostConnection,
    clientConnection,
    host,
    connect,
  } = useContext(RaceContext)

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

  const hasPlayerName = () => {
    if (playerName) return true
    openSnackbar('Enter a name to continue', 2000)
    navigate('/profile')
    return false
  }

  const handleJoin = event => {
    event.preventDefault()
    const hostId = hostIdInput.current.value.trim()
    hostId && connect(hostId, { playerName, playerCar })
  }

  useEffect(() => {
    hasPlayerName()
    hostIdInput.current.value = query.get('hostId')
  }, [])

  return (
    <div className='flex flex-col items-center gap-y-4'>
      <PlayerInfo />

      <Button disabled={clientConnection} loading={hostConnection} className='w-32 bg-accent text-white' onClick={() => host({ playerName, playerCar })}>
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
  )
}

export default Lobby
