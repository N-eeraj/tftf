import { Peer } from 'peerjs'
import { useState, useRef } from 'react'

const usePeer = () => {
  const peer = useRef(null)
  const connection = useRef(null)

  const [ peerId, setPeerId ] = useState()
  const [serverConnection, setServerConnection] = useState(false)

  // creates a peer object
  const createPeer = callback => {
    setServerConnection(true)
    peer.current = new Peer()
    peer.current.on('open', id => {
      setPeerId(id)
      setServerConnection(false)
      if (callback)
        callback()
    })
  }

  const host = () => {
    createPeer()
    peer.current.on('connection', _connection => {
      connection.current = _connection
      console.log('host connected')
    })
  }

  const connect = hostId => {
    const connectToHost = () => {
      connection.current = peer.current.connect(hostId)
      connection.current.on('open', () => {
        console.log('client connected')
      })
    }
    createPeer(connectToHost)
  }

  return {
    peerId,
    host,
    connect,
    serverConnection,
  }
}

export default usePeer
