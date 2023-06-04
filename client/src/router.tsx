import { createBrowserRouter } from 'react-router-dom'
import Default from './layouts/default'
import Home from './pages'
import Clients from './pages/clients'
import Materials from './pages/materials'

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: '/',
      element: <Default />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/clients',
          element: <Clients />,
        },
        {
          path: '/materials',
          element: <Materials />,
        },
      ],
    },
  ])
