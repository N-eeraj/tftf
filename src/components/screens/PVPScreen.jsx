import { useContext } from 'react'
import { RaceContext } from '@contexts/Race'
import RaceView from '@components/game/RaceView'
import Organize from '@components/game/organize'
import Canvas from '@components/game/Canvas'

const PVPScreen = () => {
  const { peerId, mainData } = useContext(RaceContext)

  return (
    <div className='flex flex-col gap-y-5 p-5'>
      { peerId && <Canvas /> }
      { mainData.data ? <RaceView /> : <Organize /> }
    </div>
  )
}

export default PVPScreen