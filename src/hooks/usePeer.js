import { Peer } from 'peerjs'
import { useState, useRef, useEffect, useReducer } from 'react'

const usePeer = () => {
  const peer = useRef(null)
  const connectionList = useRef([])
  const isHost = useRef(false)
  const connectionStopped = useRef(false)

  const [peerId, setPeerId] = useState()
  const [hostConnection, setHostConnection] = useState(false)
  const [clientConnection, setClientConnection] = useState(false)
  const [mainData, setMainData] = useState({
    start: 0,
    data: null,
  })

  const connectionUpdate = (connections, { type, data }) => {
    switch(type) {
      case 'replace':
        return data
      case 'new':
        return {
          ...connections,
          [data.from]: {
            lastUpdated: 0,
            progress: 0,
            accuracy: 100,
            index: Object.keys(connections).length,
            ...data.playerInfo
          }
        }
      case 'progress':
        return {
          ...connections,
          [data.from]: data.data
        }
      default:
        console.error(`Invalid connection update type: ${type}`)
        return connections
    }
  }
  const [connections, setConnections] = useReducer(connectionUpdate, {})

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
  const host = playerInfo => {
    isHost.current = true
    setHostConnection(true)
    const handleHostConnection = hostId => {
      setHostConnection(false)
      setConnections({
        type: 'replace',
        data: {
          [hostId]: {
            lastUpdated: 0,
            progress: 0,
            accuracy: 100,
            index: 0,
            ...playerInfo,
          }
        },
      })
    }
    createPeer(handleHostConnection)
    peer.current.on('connection', connection => {
      if (connectionStopped.current) {
        connection.close()
        return
      }
      connectionList.current.push(connection)
      handleMessage(connection)
    })
  }

  // connect client to a peer
  const connectToPeer = (connectionId, peerId, playerInfo) => {
    const connection = peer.current.connect(connectionId)
    connectionList.current.push(connection)
    connection.on('open', () => {
      setClientConnection(false)
      handleMessage(connection)
      sendMessage({
        type: 'newPlayer',
        data: playerInfo,
        from: peerId,
      })
    })
  }

  // initiate client & connect to host
  const connect = (hostId, playerInfo) => {
    setClientConnection(true)
    createPeer((peerId) => connectToPeer(hostId, peerId, playerInfo))
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
        setConnections({
          type: 'replace',
          data,
        })
        break
      case 'newPlayer':
        setConnections({
          type: 'new',
          data: { from, playerInfo: data },
        })
        break
      case 'text':
        setMainData({
          start: Date.now(),
          data,
        })
        break
      case 'progress':
        setConnections({
          type: 'progress',
          data: { from, data }
        })
        break
      default:
        console.error(`Invalid data type ${type}`)
    }
  })

  const stopConnections = data => {
    connectionStopped.current = true
    setMainData({
      start: Date.now(),
      data,
    })
    sendMessage({
      type: 'text',
      data,
    })
  }

  const updateProgress = (completed, accuracy) => {
    const data = {
      ...connections[peerId],
      lastUpdated: Date.now() - mainData.start,
      progress: completed / mainData.data.length,
      accuracy,
      index: connections[peerId].index,
    }
    setConnections({
      type: 'progress',
      data: {
        from: peerId,
        data,
      }
    })
    sendMessage({
      type: 'progress',
      data,
    })
  }

  useEffect(() => {
    if (Object.keys(connections).length < 2 || !isHost.current) return
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
    connections,
    stopConnections,
    mainData,
    updateProgress,
  }
}

export default usePeer
