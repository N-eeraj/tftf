import DefaultLayout from '@layouts/default'
import Home from '@pages/Home'
import PVP from '@pages/race/PVP'
import Practice from '@pages/race/Practice'
import Profile from '@pages/Profile'
import PageNotFound from '@pages/PageNotFound'

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'race',
        element: <PVP />
      },
      {
        path: 'practice',
        element: <Practice />
      },
      {
        path: 'profile',
        element: <Profile />
      },
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  }
]

export default routes
