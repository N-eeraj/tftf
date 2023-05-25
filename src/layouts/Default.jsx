import { NavLink, Outlet } from 'react-router-dom'

const Default = () => {
    return (
        <>
            <nav>
                <h1>
                    TFTF
                </h1>
                <ul>
                    <li>
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/race/practice'>
                            Practice
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/race/pvp'>
                            Race
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <main>
                <Outlet />
            </main>

            <footer>
                Footer
            </footer>
        </>
    )
}

export default Default