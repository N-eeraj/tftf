import { Peer } from 'peerjs'
import { useState, useRef, useEffect } from 'react'

const usePeer = () => {
  const peer = useRef(null)
  const connectionList = useRef([])
  const isHost = useRef(false)
  const connectionStopped = useRef(false)

  const [peerId, setPeerId] = useState()
  const [hostConnection, setHostConnection] = useState(false)
  const [clientConnection, setClientConnection] = useState(false)
  const [connections, setConnections] = useState([])
  const [mainData, setMainData] = useState(null)

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
    isHost.current = true
    setHostConnection(true)
    const handleHostConnection = hostId => {
      setHostConnection(false)
      setConnections([ hostId ])
    }
    createPeer(handleHostConnection)
    peer.current.on('connection', connection => {
      if (connectionStopped.current) {
        connection.close()
        return
      }
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

  const sendMessage = (message, from = peerId) => connectionList.current.forEach(connection => {
    if (from !== connection.peer)
      connection.send({ from, ...message })
  })

  const handleMessage = connection => connection?.on('data', ({ type, from, data }) => {
    if (isHost.current)
      sendMessage({ type, data }, from)
    switch (type) {
      case 'connection':
        setConnections(data)
        break
      case 'text':
        setMainData(data)
        break
      default:
        console.error(`Invalid data type ${type}`)
    }
  })

  const stopConnections = data => {
    connectionStopped.current = true
    setMainData(data)
    sendMessage({
      type: 'text',
      data,
    })
  }

  useEffect(() => {
    if (connections.length < 2 || !isHost.current) return
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
    isHost,
    hostConnection,
    clientConnection,
    stopConnections,
    mainData,
  }
}

export default usePeer
