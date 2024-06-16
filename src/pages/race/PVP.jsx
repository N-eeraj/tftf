import usePeer from '@hooks/usePeer'
import RaceScreen from '@components/screens/RaceScreen'
import Organize from '@components/game/organize'
import Canvas from '@components/game/Canvas'

const PVP = () => {
  const { peerId, host, connect, isHost, hostConnection, clientConnection, connections, stopConnections, mainData, updateProgress } = usePeer()

  const handleJoin = hostId => {
    if (hostId?.trim())
      connect(hostId.trim())
  }

  return (
    <div className='flex flex-col gap-y-5 p-5'>
      { peerId && <Canvas peerId={peerId} connections={connections} started={!!mainData.data} /> }

      {
        mainData.data ?
          <RaceScreen isHost={isHost.current} connections={connections} onStart={text => stopConnections(text)} text={mainData.data} onKeyPress={updateProgress} /> :
          <Organize hostConnection={hostConnection} clientConnection={clientConnection} peerId={peerId} isHost={isHost.current} onHost={host} onJoin={handleJoin} onStart={text => stopConnections(text)} />
      }
    </div>
  )
}

export default PVP
