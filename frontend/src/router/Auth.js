import { lazy } from 'react'

import LogoutLayout from'../layouts/LogoutLayout'

const Logout = lazy(() => import('../pages/Auth/Logout'))
const Login = lazy(() => import('../pages/Auth/Login'))
const Register = lazy(() => import('../pages/Auth/Register'))
const Error = lazy(() => import('../pages/Error'))

const AuthenticationRoutes = [
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
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'refresh-password',
                element: <RefreshPassword />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'auth/google',
                element: <GoogleCallback />
            },
            {
                path: 'auth/facebook',
                element: <FacebookCallback />
            },

        ]
    },
]
  
export default AuthenticationRoutes
  