import { findPlayerCar } from '@utils/carImages'

const Ranking = ({ ranking }) => {
  return (
    <div>
      {
        ranking.map(({ key, playerName, playerCar, wpm, accuracy }) => <div key={key}>
          {playerName}
          <img src={findPlayerCar(playerCar)} className='w-32' />
          {wpm} WPM
          Accuracy: {accuracy}%
        </div>)
      }
    </div>
  )
}

export default Ranking