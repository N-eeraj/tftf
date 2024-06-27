import { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProfileContext } from '@contexts/Profile'
import { RaceContext } from '@contexts/Race'
import PlayerInfo from '@components/game/PlayerInfo'
import Button from '@components/base/button'
import Input from '@components/base/Input'
import { useSnackbar } from 'react-simple-snackbar'

const Entry = () => {
  const [hostId, setHostId] = useState('')
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
    hostId && connect(hostId, { playerName, playerCar })
  }

  useEffect(() => {
    hasPlayerName()
    setHostId(query.get('hostId') ?? '')
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
        <Input value={hostId} required placeholder='Enter Host Id' disabled={hostConnection || clientConnection} onChange={setHostId} onBlur={setHostId} />
        <Button disabled={hostConnection} loading={clientConnection} className='w-32 bg-accent text-white'>
          Join
        </Button>
      </form>
    </div>
  )
}

export default Entry
