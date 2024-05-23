import usePeer from '@hooks/usePeer'

import Button from '@components/base/button'
import { useRef } from 'react'

const PVP = () => {
  const { peerId, host, connect, serverConnection } = usePeer()

  const hostIdInput = useRef('')

  const handleJoin = event => {
    event.preventDefault()
    connect(hostIdInput.current.value)
  }

  return (
    <>
      {
        peerId ?
          peerId :
          <>
            <Button loading={serverConnection} className='col-span-2 bg-primary text-white' onClick={host}>
              Host
            </Button>
            <form onSubmit={handleJoin}>
              <input type="text" ref={hostIdInput} />
              <Button loading={serverConnection} className='col-span-2 bg-primary text-white'>
                Join
              </Button>
            </form>
          </>
      }
    </>
  )
}

export default PVP
