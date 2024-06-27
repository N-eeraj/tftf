import { useRef, useContext } from 'react'
import { ProfileContext } from '@contexts/Profile'
import carsList from '@utils/carImages'

const findPlayerCar = playerCar => carsList[playerCar]

const PlayerInfo = () => {
  const { playerName, playerCar } = useContext(ProfileContext)
  const carImage = useRef(findPlayerCar(playerCar))

  return (
    <div className='flex justify-between gap-x-12 max-w-lg p-10 bg-black/30 rounded-md'>
      <h2 className='text-accent text-5xl'>
        {playerName}
      </h2>
      <img src={carImage.current} className='w-52 mt-5 rotate-[30deg] drop-shadow-[0_0_25px_#50C87877]' />
    </div>
  )
}

export default PlayerInfo
