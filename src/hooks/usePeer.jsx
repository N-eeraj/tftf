import { Peer } from 'peerjs'
import { useState, useRef, useEffect } from 'react'

const usePeer = () => {
  const peer = useRef(null)
  const connectionList = useRef([])
  const isClient = useRef(true)

  const [peerId, setPeerId] = useState()
  const [hostConnection, setHostConnection] = useState(false)
  const [clientConnection, setClientConnection] = useState(false)
  const [connections, setConnections] = useState([])

  // creates a peer object
  const createPeer = callback => {
    peer.current = new Peer()
    peer.current.on('open', id => {
      setPeerId(id)
      if (callback)
        callback(id)
    })
  }

  // initiate host
  const host = () => {
    isClient.current = false
    setHostConnection(true)
    const handleHostConnection = hostId => {
      setHostConnection(false)
      setConnections([ hostId ])
    }
    createPeer(handleHostConnection)
    peer.current.on('connection', connection => {
      connectionList.current.push(connection)
      // update connections list
      setConnections(_connections => {
        return [ 
          ..._connections,
          connection.peer,
        ]
      })
      handleMessage(connection)
    })
  }

  // connect client to a peer
  const connectToPeer = peerId => {
    const connection = peer.current.connect(peerId)
    connectionList.current.push(connection)
    connection.on('open', () => {
      setClientConnection(false)
      handleMessage(connection)
    })
  }

  // initiate client & connect to host
  const connect = hostId => {
    setClientConnection(true)
    createPeer(() => connectToPeer(hostId))
  }

  const sendMessage = message => connectionList.current.forEach(connection => connection.send(message))

  const handleMessage = connection => connection?.on('data', ({ type, data }) => {
    switch (type) {
      case 'connection':
        setConnections(data)
        data.forEach(peerId => {
          if (!connectionList.current.map(({ peer }) => peer).includes(peerId) && peerId !== peer.current.id) {
            connectToPeer(peerId)
          }
        })
        break
      default:
        console.error(`Invalid data type ${type}`)
    }
  })

  useEffect(() => {
    if (connections.length < 2 || isClient.current) return
    // delay to establish connection
    setTimeout(() => {
      sendMessage({
        type: 'connection',
        data: connections,
      })
    }, 400)
  }, [connections])
  

  return {
    peerId,
    host,
    connect,
    hostConnection,
    clientConnection,
    connections,
  }
}

export default usePeer
