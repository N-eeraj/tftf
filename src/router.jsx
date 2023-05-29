import { Routes, Route } from 'react-router-dom'

import Home from '@pages/Home'
import PVP from '@pages/race/PVP'
import Practice from '@pages/race/Practice'

const Router = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        <Route path='race' element={<PVP />} />
        <Route path='practice' element={<Practice />} />
      </Route>
    </Routes>
  )
}

export default Router