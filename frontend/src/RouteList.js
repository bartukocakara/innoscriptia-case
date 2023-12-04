

import { useRoutes } from 'react-router-dom'
import ProtectedLayout from './layouts/ProtectedLayout'

import AuthRoutes from './router/Auth'
import ArticleRoutes from './router/Article'
import MeRoutes from './router/Profile'

const RouteList = () => {
    let routes = useRoutes([
        ...AuthRoutes,
        {
            path: '/',
            element : <ProtectedLayout />,
            children: [
                ...ArticleRoutes,
                ...MeRoutes,
            ]
        }
    ])

    return routes
}

export default RouteList