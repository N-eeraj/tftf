import { useContext } from 'react'
import { RaceContext } from '@contexts/Race'
import { findPlayerCar } from '@utils/carImages'
import { ordinals } from '@utils/formatters'

const Ranking = ({ ranking }) => {
  const { peerId } = useContext(RaceContext)
  const playerRank = ordinals(ranking.findIndex(({ key }) => key === peerId) + 1)
  

  return (
    <div className='w-full max-w-3xl mx-auto pb-6 bg-black/50 text-light -z-10'>
      <div className='flex items-center w-fit text-3xl'>
        <strong className='relative py-2 px-6 bg-accent text-dark after:absolute after:-right-4 after:top-0 after:h-full after:w-8 after:bg-accent after:-skew-x-[20deg] after:z-10'>
          Race Result
        </strong>
        <span className='relative p-2 pl-8 bg-white text-accent after:absolute after:-right-4 after:top-0 after:h-full after:w-8 after:bg-white after:-skew-x-[20deg] after:-z-10'>
          {playerRank}
        </span>
      </div>

      <div className='flex flex-col gap-y-4 mx-4 mt-6'>
        {
          ranking.map(({ key, isPlayer, playerName, playerCar, wpm, accuracy, progress }) =>
            <div key={key} className={`relative flex justify-between items-center py-2 px-6 rounded overflow-hidden`}>
              <div className={`absolute top-0 left-0 h-full ${isPlayer ? 'bg-light/20' : 'bg-dark/80'} duration-200 -z-10`} style={{ width: `${progress}%` }} />
              <div className='flex gap-x-4'>
                <img src={findPlayerCar(playerCar)} className='w-32' />
                <span className={`${isPlayer ? 'text-accent' : 'text-light'} text-3xl`}>
                  {playerName}
                </span>
              </div>
              <div className='flex flex-col text-right font-mono'>
                <span>
                  {wpm} WPM
                </span>
                <span>
                  {accuracy}% Acc
                </span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Ranking