import { createBrowserRouter } from 'react-router-dom'

import routes from '@router/routes'

const basename = import.meta.env.BASE_URL

const router = createBrowserRouter(routes, {basename})

export default router
