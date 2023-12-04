import React from 'react'
import Profile from './Profile'
import { Link } from 'react-router-dom'

const Index = () => {
    return (
        <div className="header-container fixed-top">
            <header className=" header navbar navbar-expand-sm d-flex">
                <ul className="navbar-item theme-brand d-flex flex-row">
                    <li className="nav-item theme-text">
                        <Link to="/articles" className="nav-link">
                            Innoscripta
                        </Link>
                    </li>
                </ul>

                <ul className=" navbar-item flex-row ml-md-auto">
                    
                    <Profile />
                </ul>
            </header>
        </div>
    )
}

export default Index