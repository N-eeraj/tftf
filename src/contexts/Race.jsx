import { createContext } from 'react'
import usePeer from '@hooks/usePeer'

export const RaceContext = createContext()

const RaceContextProvider = ({ children }) => {
  const { peerId, host, connect, isHost, hostConnection, clientConnection, connections, stopConnections, mainData, updateProgress } = usePeer()
  
  const allValues = {
    peerId,
    host,
    connect,
    isHost,
    hostConnection,
    clientConnection,
    connections,
    stopConnections,
    mainData,
    updateProgress
  }

  return (
    <RaceContext.Provider value={allValues}>
      {children}
    </RaceContext.Provider>
  )
}

export default RaceContextProvider
