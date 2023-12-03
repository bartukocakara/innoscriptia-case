import { lazy } from 'react'

import LogoutLayout from'../layouts/LogoutLayout'

const Logout = lazy(() => import('../pages/Auth/Logout'))
const Login = lazy(() => import('../pages/Auth/Login'))
const Register = lazy(() => import('../pages/Auth/Register'))
const Error = lazy(() => import('../pages/Error'))

const AuthRoutes = [
    {
        path:'*',
        element: <Error />
    },
    {
        path: '/',
        element : <LogoutLayout />,
        children: [
            {
                path: 'logout',
                element: <Logout />
            },
            {
                path: '',
                element: <Login />
            },
            {
                path: 'login',
                element: <Login />
            },
           
            {
                path: 'register',
                element: <Register />
            }

        ]
    },
]
  
export default AuthRoutes
  