import { Outlet } from 'react-router-dom'

import Navbar from '@components/Navbar'

const defaultLayout = () => {
    return (
        <>
            <Navbar />
            <main className='h-[calc(100vh-96px)] mt-24 overflow-y-visible'>
                <Outlet />
            </main>
        </>
    )
}

export default defaultLayout