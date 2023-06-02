import { Outlet } from 'react-router-dom'

import Navbar from '@components/Navbar'

const defaultLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />        
            </main>
        </>
    )
}

export default defaultLayout