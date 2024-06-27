import { useContext } from 'react'
import { ProfileContext } from '@contexts/Profile'
import Input from '@components/base/Input'
import Switch from '@components/base/Switch'
import carsList from '@utils/carImages'

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
    <section className='flex max-sm:flex-col justify-between gap-x-10 max-sm:gap-y-5 max-w-7xl mx-auto px-5 pt-2'>
      <div className='flex flex-col gap-y-6 md:w-1/3 sm:max-w-xs'>
        <label className='flex flex-col gap-y-1 cursor-pointer'>
          <span className='text-light text-lg'>
            Player Name
          </span>
          <Input value={playerName} placeholder='Enter Player Name' onChange={setPlayerName} onBlur={handleNameBlur} />
        </label>
        <div className='flex flex-col gap-y-4'>
          <span className='text-light text-2xl'>
            Sound
          </span>
          <Switch checked={sounds.typing} label='Typing Sound' onToggle={() => updateSound('toggleTyping')} />
          <Switch checked={sounds.background} label='Background' onToggle={() => updateSound('toggleBackground')} />
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-12 md:w-2/3'>
        {carsList.map((image, index) => (
          <label key={index} className={`relative h-32 p-4 bg-light/20 hover:bg-light/60 rounded-md ${index === playerCar && 'outline outline-accent'} duration-300 transition-colors cursor-pointer`}>
            <span className={`absolute top-0 left-0 pl-1 pr-2 bg-accent text-dark text-xs rounded-br duration-300 ${index !== playerCar && 'opacity-0'}`}>
              Selected
            </span>
            <img src={image} className='w-full h-full object-contain' />
            <input type='radio' name='car' value={index} className='hidden' onChange={() => setPlayerCar(index)} />
          </label>
        ))}
      </div>
    </section>
  )
}

export default Profile
