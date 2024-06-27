import { Outlet } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'
import ProfileContextProvider from '@contexts/Profile'

import Navbar from '@components/Navbar'

const defaultLayout = () => {

  return (
    <>
      <SnackbarProvider>
        <Navbar />
        <main className='h-[calc(100vh-96px)] mt-24 overflow-y-visible'>
          <ProfileContextProvider>
            <Outlet />
          </ProfileContextProvider>
        </main>
      </SnackbarProvider>
    </>
  )
}

export default defaultLayout
