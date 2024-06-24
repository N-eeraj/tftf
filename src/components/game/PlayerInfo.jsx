import carsList from '@utils/carImages'

const PlayerInfo = ({name, car, onNameChange, onCarChange}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 w-full'>
      <input value={name} placeholder='Your Name' className={`py-1 px-4 text-xl text-accent focus:text-black font-bold focus:font-normal text-center ${!name && 'border'} border-accent focus:border-2 outline-none rounded-md`} onChange={onNameChange} />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 w-full'>
        {carsList.map((image, index) => (
          <label key={index} className={`h-32 p-4 rounded-md cursor-pointer ${car === index && 'outline outline-accent'}`}>
            <img src={image} className='w-full h-full object-contain' />
            <input type='radio' name='car' value={index} className='hidden' onChange={onCarChange} />
          </label>
        ))}
      </div>
    </div>
  )
}

export default PlayerInfo
