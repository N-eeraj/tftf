import usePeer from '@hooks/usePeer'
import RaceScreen from '@components/screens/RaceScreen'
import Organize from '@components/game/organize'
import Canvas from '@components/game/Canvas'
import RaceContextProvider from '@components/RaceContextProvider'

const PVP = () => {
  const { peerId, host, connect, isHost, hostConnection, clientConnection, connections, stopConnections, mainData, updateProgress } = usePeer()

  const handleJoin = (hostId, playerName) => {
    if (hostId?.trim())
      connect(hostId.trim(), playerName)
  }

  return (
    <RaceContextProvider>
      <div className='flex flex-col gap-y-5 p-5'>
        { peerId && <Canvas peerId={peerId} connections={connections} started={!!mainData.data} /> }

        {
          mainData.data ?
            <RaceScreen raceData={{ ...mainData, connections, peerId }} onKeyPress={updateProgress} /> :
            <Organize hostConnection={hostConnection} clientConnection={clientConnection} peerId={peerId} isHost={isHost.current} onHost={host} onJoin={handleJoin} onStart={text => stopConnections(text)} />
        }
      </div>
    </RaceContextProvider>
  )
}

export default PVP
