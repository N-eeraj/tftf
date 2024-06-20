import { useState, useEffect, useContext, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSnackbar } from 'react-simple-snackbar'
import Button from '@components/base/button'
import getText from '@utils/getText'
import { RaceContext } from '@components/RaceContextProvider'

const Organize = ({ hostConnection, clientConnection, peerId, isHost, onHost, onJoin, onStart }) => {
  const hostIdInput = useRef('')
  const controller = new AbortController()
  const signal = controller.signal
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

  const [playerName, setPlayerName] = useState(() => localStorage.getItem('playerName') || '')
  const handlePlayerNameChange = (event) => {
    const name = event.target.value.trim()
    setPlayerName(name)
    if (name)
      localStorage.setItem('playerName', name)
  }

  const { setText } = useContext(RaceContext)

  const handlePeerIdClick = () => {
    navigator.clipboard.writeText(peerId)
    openSnackbar('Copied to Host ID to Clipboard', 2000)
  }

  const handleHost = () => {
    if (!playerName)
      return openSnackbar('Please enter you name', 2000)
    onHost(playerName)
  }

  const handleJoin = event => {
    event.preventDefault()
    if (!playerName)
      return openSnackbar('Please enter you name', 2000)
    onJoin(hostIdInput.current.value, playerName)
  }

  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, {
      minLength: 50,
      maxLength: 60
    })
    onStart(content)
    setText(content)
  }

  useEffect(() => {
    hostIdInput.current.value = query.get('hostId')
    if (!playerName)
      return openSnackbar('Please enter you name', 2000)
    onJoin(query.get('hostId'), playerName)

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
              <Button loading={loading} autoFocus className='col-span-2 bg-primary text-white' onClick={handlePlay}>
                Start Race
              </Button>
            </div> :
            <p> Please wait while host starts the race </p>) :
          <div className='flex flex-col items-center gap-y-4'>
            <div className='flex justify-center items-center gap-x-4'>
              <input value={playerName} placeholder='Your Name' className={`py-1 px-4 text-xl text-primary focus:text-black font-bold focus:font-normal text-center ${!playerName && 'border'} border-primary focus:border-2 outline-none rounded-md`} onChange={handlePlayerNameChange} />
            </div>
    
            <Button disabled={clientConnection} loading={hostConnection} className='w-32 bg-primary text-white' onClick={handleHost}>
              Host
            </Button>
            <span>
              OR
            </span>
            <form className='flex gap-x-4' onSubmit={handleJoin}>
              <input ref={hostIdInput} required disabled={hostConnection || clientConnection} className='py-1 px-4 border border-primary focus:border-2 outline-none rounded-md' />
              <Button disabled={hostConnection} loading={clientConnection} className='w-32 bg-primary text-white'>
                Join
              </Button>
            </form>
          </div>
      }
    </>
  )
}

export default Organize
