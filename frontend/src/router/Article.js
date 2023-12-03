import { lazy } from 'react'

import Articles from '../pages/Articles'

const ArticleShow  = lazy(() => import('../pages/Articles/Show'))
const ArticleProfile  = lazy(() => import('../pages/Articles/Show/Contents/Profile'))

const ArticleRoutes = [
    {
        path : 'articles',
        element: <Articles />
    },
    {
        path : 'articles/:slug',
        element: <ArticleShow />,
        children: [
            {
                path : 'profile',
                element: <ArticleProfile />
            },
        ]
    }
]
  
export default ArticleRoutes
  