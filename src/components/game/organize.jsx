import { useState, useEffect, useRef } from 'react'
import Button from '@components/base/button'
import getText from '@utils/getText'

const Organize = ({ hostConnection, clientConnection, peerId, isHost, onHost, onJoin, onStart }) => {
  const hostIdInput = useRef('')
  const controller = new AbortController()
  const signal = controller.signal

  const [loading, setLoading] = useState(false)

  const handleJoin = event => {
    event.preventDefault()
    if (hostIdInput.current.value) {
      onJoin(hostIdInput.current.value.trim())
    }
  }

  const handlePlay = async () => {
    setLoading(true)
    const content = await getText(signal, {
      minLength: 100,
      maxLength: 125
    })
    onStart(content)
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
              Join with {peerId}
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