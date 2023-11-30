import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Navigate  } from "react-router-dom";
import { SportTypeContext } from '../../context/SportTypeContext';

const Index = () => {

    const { sportTypePath } = useContext(SportTypeContext);
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
        return <Navigate to="/logout" />;
    }
  return (
    <div className="page-content">
        <div>
            <h1>
                Welcome to <span style={{ color: "blue" }}>
                    Sportshub
                </span>
            </h1>
            <p>Sorry , The page you are looking for can't be found</p>
            <p>Try checking your URL</p>
            <h1>
            <Link style={{ textDecoration: "underline"}} to={`${sportTypePath}/matches`}>Go to matches list</Link>
            </h1>
            <h2>
                This is a <span style={{ color: "red" }}>404 page</span>
            </h2>
        </div>
    </div>
  )
}

export default Index