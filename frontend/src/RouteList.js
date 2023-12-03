

import { useRoutes } from 'react-router-dom'
import ProtectedLayout from './layouts/ProtectedLayout'

import AuthRoutes from './router/Auth'
import ArticleRoutes from './router/Article'

const RouteList = () => {
    let routes = useRoutes([
        ...AuthRoutes,
        {
            path: '/',
            element : <ProtectedLayout />,
            children: [
                ...ArticleRoutes,
            ]
        }
    ])

    return routes
}

export default RouteList