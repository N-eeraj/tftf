import usePeer from '@hooks/usePeer'
import RaceScreen from '@components/screens/RaceScreen'
import Button from '@components/base/button'
import { useRef } from 'react'

const PVP = () => {
  const { peerId, host, connect, isHost, hostConnection, clientConnection, stopConnections, mainData } = usePeer()

  const hostIdInput = useRef('')

  const handleJoin = event => {
    event.preventDefault()
    if (hostIdInput.current.value) {
      connect(hostIdInput.current.value)
    }
  }

  return (
    <>
      {
        peerId ?
          <>
            {isHost.current & !mainData ? `Join with ${peerId}` : ''}
            <RaceScreen isHost={isHost.current} onStart={text => stopConnections(text)} text={mainData} />
          </> :
          <>
            <Button loading={hostConnection} className='col-span-2 bg-primary text-white' onClick={host}>
              Host
            </Button>
            <form onSubmit={handleJoin}>
              <input ref={hostIdInput} required />
              <Button loading={clientConnection} className='col-span-2 bg-primary text-white'>
                Join
              </Button>
            </form>
          </>
      }
    </>
  )
}

export default PVP
