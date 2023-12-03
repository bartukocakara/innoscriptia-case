import React from 'react'
import { Navigate , Link } from "react-router-dom";

const Index = () => {

    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        return <Navigate to="/logout" />;
    }
  return (
    <div className="page-content">
        <div>
            <h1>
                Welcome to <span style={{ color: "blue" }}>
                    Innoscripta
                </span>
            </h1>
            <p>Sorry , The page you are looking for can't be found</p>
            <p>Try checking your URL</p>
            <h1>
            <Link style={{ textDecoration: "underline"}} to={`/articles`}>Go to articles list</Link>
            </h1>
            <h2>
                This is a <span style={{ color: "red" }}>404 page</span>
            </h2>
        </div>
    </div>
  )
}

export default Index