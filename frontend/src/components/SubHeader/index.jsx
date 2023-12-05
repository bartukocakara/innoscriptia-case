import React, { useState } from 'react'
import PreferencesModal from '../Modals/PreferencesModal';
const Index = () => {
    const [ showModal, setShowModal ] = useState({});
    return (
        <div className="sub-header-container mt-5">
            <PreferencesModal show={showModal.preferences}
                              onHide={() => setShowModal({})}
                            />
            <header className="header navbar navbar-expand-sm">
                    <ul className="navbar-nav flex-row ml-auto">
                        <li className="nav-item"
                            style={{ width: '250px' }}
                            onClick={() => setShowModal({preferences: true})}
                            >
                            <div className="dropdown custom-dropdown-icon ml-auto">
                                <h6 className="dropdown-toggle btn btn-dark w-100 user font-weight-bolder btn btn-info"
                                    >
                                    Preferences
                                </h6>
                            </div>
                        </li>
                    </ul>
            </header>
        </div>
    )
}

export default Index