import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom'

import DefaultLayout from '@layouts/Default'

import Home from '@pages/Home'
import Practice from '@pages/race/Practice'
import PVP from '@pages/race/PVP'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path='race/'>
                <Route path='practice' element={<Practice />} />
                <Route path='pvp' element={<PVP />} />
            </Route>
        </Route>
    )
)

export default router