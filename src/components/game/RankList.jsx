import { useContext } from 'react'
import { RaceContext } from '@contexts/Race'
import { findPlayerCar } from '@utils/carImages'
import { ordinals } from '@utils/formatters'

const Ranking = ({ ranking }) => {
  const { peerId } = useContext(RaceContext)
  const playerRank = ordinals(ranking.findIndex(({ key }) => key === peerId) + 1)
  

  return (
    <div className='w-full max-w-5xl mx-auto pb-2 bg-black/50 text-light -z-10'>
      <div className='flex items-center w-fit text-3xl'>
        <strong className='relative py-2 px-6 bg-accent text-dark after:absolute after:-right-4 after:top-0 after:h-full after:w-8 after:bg-accent after:-skew-x-[20deg] after:z-10'>
          Race Result
        </strong>
        <span className='relative p-2 pl-8 bg-white text-accent after:absolute after:-right-4 after:top-0 after:h-full after:w-8 after:bg-white after:-skew-x-[20deg] after:-z-10'>
          {playerRank}
        </span>
      </div>
      {
        ranking.map(({ key, playerName, playerCar, wpm, accuracy, progress }) =>
          <div key={key} className={`flex justify-between items-center mt-4 py-2 px-6 `}>
            <div className='flex gap-x-4'>
              <img src={findPlayerCar(playerCar)} className='w-32' />
              <span className='text-accent text-3xl'>
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
  )
}

export default Ranking