import { lazy } from 'react'

const Me = lazy(() => import('../pages/Me'))
const Profile = lazy(() => import('../pages/Me/Contents/Profile'))

MeRoutes = [
    {
        path: 'me',
        element: <Me />,
        children : [
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'settings',
                element: <Settings />
            }
        ]
    }
]
  
export default MeRoutes
  