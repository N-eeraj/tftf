import usePeer from '@hooks/usePeer'
import RaceScreen from '@components/screens/RaceScreen'
import Organize from '@components/game/organize'

const PVP = () => {
  const { peerId, host, connect, isHost, hostConnection, clientConnection, connections, stopConnections, mainData, updateProgress } = usePeer()

  return (
    <>
      { Object.keys(connections).length ? <div className='border-2 border-primary'> {JSON.stringify(connections)} </div> : '' }
      {
        mainData.data ?
          <RaceScreen isHost={isHost.current} onStart={text => stopConnections(text)} text={mainData.data} onKeyPress={updateProgress} /> :
          <Organize hostConnection={hostConnection} clientConnection={clientConnection} peerId={peerId} isHost={isHost.current} onHost={host} onJoin={hostId => connect(hostId)} onStart={text => stopConnections(text)} />
      }
    </>
  )
}

export default PVP
