import usePeer from '@hooks/usePeer'
import RaceScreen from '@components/screens/RaceScreen'
import Organize from '@components/game/organize'

const PVP = () => {
  const { peerId, host, connect, isHost, hostConnection, clientConnection, connections, stopConnections, mainData, updateProgress } = usePeer()

  return (
    <>
      {
        Object.keys(connections).length ?
          Object.entries(connections).map(([connection, { progress }]) => 
            <div className='flex mt-1 gap-x-2' key={connection}>
              <div className='w-fit'>
                {connection}
              </div>
              <div className='flex-1 bg-primary/20'>
                <div className='h-full bg-primary duration-300' style={{width: `${progress}%`}} />
              </div>
            </div>) :
          ''
      }
      {
        mainData.data ?
          <RaceScreen isHost={isHost.current} onStart={text => stopConnections(text)} text={mainData.data} onKeyPress={updateProgress} /> :
          <Organize hostConnection={hostConnection} clientConnection={clientConnection} peerId={peerId} isHost={isHost.current} onHost={host} onJoin={hostId => connect(hostId)} onStart={text => stopConnections(text)} />
      }
    </>
  )
}

export default PVP
