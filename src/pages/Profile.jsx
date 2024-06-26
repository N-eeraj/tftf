import { useContext } from 'react'
import { ProfileContext } from '@contexts/Profile'
import Input from '@components/base/Input'

const Profile = () => {
  const {
    playerName,
    playerCar,
    sounds,
    setPlayerName,
    setPlayerCar,
    updateSound,
    setPreviousPlayerName,
  } = useContext(ProfileContext)

  const handleNameBlur = value => value && setPreviousPlayerName(value)

  return (
    <section className='max-w-7xl mx-auto p-3'>
      <label className='flex items-center gap-x-2'>
        <span className='text-accent text-lg'>
          Player Name:
        </span>
        <Input value={playerName} placeholder='Enter Player Name' onChange={setPlayerName} onBlur={handleNameBlur} />
      </label>
    </section>
  )
}

export default Profile
