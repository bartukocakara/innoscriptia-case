import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Profile = ({ t }) => {
    const [ avatar, setAvatar] = useState('');
    useEffect(() => {
        const user = localStorage.getItem('user')
        let parsedUser = JSON.parse(user)
        if (user && user.length !== 0 && parsedUser.image) {
            setAvatar(`${process.env.REACT_APP_FILE_URL}/avatar/${parsedUser.image}`)
        } else if (parsedUser.gender && !parsedUser.image) {
            let gender = parsedUser.gender
            switch (gender) {
                case 'WOMAN':
                    setAvatar('/assets/img/WOMAN-avatar.png')
                    break;
                case 'MAN':
                    setAvatar('/assets/img/MAN-avatar.png')
                    break;
                default:
                    break;
            } 
        } else {
            setAvatar('/assets/img/NORMAL-avatar.png')
        }
    }, [])
    
    return (
        <li className="nav-item dropdown user-profile-dropdown">
            <span className="nav-link dropdown-toggle user" id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <div className="avatar">
                    <img src={avatar} alt="avatar" />
                </div>
            </span>
            <div className="dropdown-menu position-absolute" aria-labelledby="userProfileDropdown">
                <div className="">
                    <div className="dropdown-item">
                        <NavLink to={`me/profile`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> 
                            Profile
                        </NavLink>
                    </div>
                    <div className="dropdown-item">
                        <NavLink to="/logout"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> 
                            Logout
                        </NavLink>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default Profile