import { NavLink } from "react-router-dom"

const NavItem = ({ to, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `text-md md:text-xl font-medium duration-300 ${isActive ? 'text-primary' : undefined}`}>
      {text}
    </NavLink>
  )
}

export default NavItem
