import { lazy } from 'react'
import Categories from '../pages/Me/Contents/Categories'
import Authors from '../pages/Me/Contents/Authors'
import Sources from '../pages/Me/Contents/Sources'

const Me = lazy(() => import('../pages/Me'))
const Profile = lazy(() => import('../pages/Me/Contents/Profile'))

const MeRoutes = [
    {
        path: 'me',
        element: <Me />,
        children : [
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'categories',
                element: <Categories />
            },
            {
                path: 'authors',
                element: <Authors />
            },
            {
                path: 'sources',
                element: <Sources />
            }
        ]
    }
]
  
export default MeRoutes
  