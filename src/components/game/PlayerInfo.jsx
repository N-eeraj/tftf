import { useRef, useContext } from 'react'
import { ProfileContext } from '@contexts/Profile'
import carsList from '@utils/carImages'

const findPlayerCar = playerCar => carsList[playerCar]

const PlayerInfo = () => {
  const { playerName, playerCar } = useContext(ProfileContext)
  const carImage = useRef(findPlayerCar(playerCar))

  return (
    <div className='flex justify-between max-w-md pb-10'>
      <h2 className='text-light text-5xl'>
        {playerName}
      </h2>
      <img src={carImage.current} className='w-52 -rotate-12' />
    </div>
  )
}

export default PlayerInfo
