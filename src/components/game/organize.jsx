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

  const { setText } = useContext(RaceContext)

  const handlePeerIdClick = () => {
    navigator.clipboard.writeText(peerId)
    openSnackbar('Copied to Host ID to Clipboard', 2000)
  }

  const handleJoin = event => {
    event.preventDefault()
    onJoin(hostIdInput.current.value)
  }

  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, {
      minLength: 150,
      maxLength: 200
    })
    onStart(content)
    setText(content)
  }

  useEffect(() => {
    hostIdInput.current.value = query.get('hostId')
    onJoin(query.get('hostId'))

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
            <Button disabled={clientConnection} loading={hostConnection} className='w-32 bg-primary text-white' onClick={onHost}>
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