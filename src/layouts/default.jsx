import { Outlet } from 'react-router-dom'
import SnackbarProvider from 'react-simple-snackbar'

import Navbar from '@components/Navbar'

const defaultLayout = () => {

  return (
    <>
      <SnackbarProvider>
        <Navbar />
        <main className='h-[calc(100vh-96px)] mt-24 bg-dark overflow-y-visible'>
          <Outlet />
        </main>
      </SnackbarProvider>
    </>
  )
}

export default defaultLayout
