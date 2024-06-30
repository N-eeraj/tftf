import { NavLink } from 'react-router-dom'
import Button from '@components/base/button'
import { randomCar } from '@utils/carImages'

const Home = () => {
  return (
    <div className='flex flex-col justify-evenly gap-y-12 max-w-5xl min-h-[80%] mx-auto p-6'>
      <header className='flex flex-col gap-y-6'>
        <h2 className='text-accent text-4xl font-semibold'>
          Boost Your Typing Speed Now!
        </h2>
        <div className='flex max-md:flex-col items-start md:items-center gap-16'>
          <p className='max-w-lg text-light'>
            Improve your typing skills and compete against others with our typing platform. Join now and start typing to improve your typing and race along your friends, track your scores for free!
          </p>
          <img src={randomCar} className='h-28 rotate-[30deg]' />
        </div>
        <div className='flex flex-wrap gap-4 max-md:mt-8'>
          <NavLink to='/practice' className='w-full sm:max-w-fit'>
            <Button className='w-full bg-accent text-white hover:text-dark duration-200'>
              Practice Now
            </Button>
          </NavLink>
          <NavLink to='/profile' className='w-full sm:max-w-fit'>
            <Button className='w-full hover:bg-light/20 text-accent outline outline-light/20 duration-200'>
              Set up your Profile
            </Button>
          </NavLink>
        </div>
      </header>

      <section className='flex flex-col gap-y-6'>
        <h2 className='text-accent text-4xl font-semibold'>
          What is TFTF?
        </h2>
        <p className='text-light'>
          TFTF (Type Fast Type Furious) gives players the opportunity to improve their typing speed and accuracy while participating in mini drag-race typing challenges or practicing solo in this free typing game.
        </p>
      </section>
    </div>
  )
}

export default Home
