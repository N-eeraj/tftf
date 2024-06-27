import { useContext } from 'react'
import { RaceContext } from '@contexts/Race'
import Entry from '@components/game/organize/Entry'
import Lobby from '@components/game/organize/Lobby'
import Canvas from '@components/game/Canvas'
import RaceView from '@components/game/RaceView'

const PVPScreen = () => {
  const { peerId, mainData } = useContext(RaceContext)

  return (
    <div className={`flex ${mainData.data || !peerId ? 'flex-col h-full' : 'flex-col-reverse'} gap-y-8 p-5`}>
      { peerId ?
          <>
            <Canvas />
            { mainData.data ? <RaceView /> : <Lobby /> }
          </> :
          <Entry />
      }
    </div>
  )
}

export default PVPScreen
