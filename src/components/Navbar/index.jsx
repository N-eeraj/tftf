import { Link } from "react-router-dom"

import NavItem from "@components/Navbar/NavItem"

const Navbar = () => {
  return (
    <nav className='bg-dark fixed top-0 flex justify-between items-baseline w-screen h-24 py-3 md:py-5 px-3 md:px-10 backdrop-blur-sm'>
      <h1 className='text-2xl md:text-4xl text-accent font-black'>
        <Link to='/'>
          TFTF
        </Link>
      </h1>

      <ul className='flex gap-x-3 md:gap-x-5'>
        <li>
          <NavItem to='/' text='Home' />
        </li>
        <li>
          <NavItem to='/race' text='Race' />
        </li>
        <li>
          <NavItem to='/practice' text='Practice' />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
