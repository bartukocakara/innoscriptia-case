import React, { useState } from 'react'
import PreferencesModal from '../Modals/PreferencesModal';
import { MdCleaningServices } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";
import DeleteModal from '../Modals/DeleteModal';

const Index = () => {
    const [ showModal, setShowModal ] = useState({});
    return (
        <div className="sub-header-container mt-5">
            {
                showModal.preferences &&  <PreferencesModal show={showModal.preferences}
                                                            onHide={() => setShowModal({})}
                                        />
            }
            {
                showModal.empty_preferences &&  <DeleteModal show={showModal.empty_preferences}
                                                            onHide={() => setShowModal({})}
                                        />
            }
           
            <header className="header navbar navbar-expand-sm">
                    <ul className="navbar-nav flex-row ml-auto">
                        <li className="nav-item"
                            style={{ width: '200px' }}
                            onClick={() => setShowModal({empty_preferences: true})}
                            >
                            <div className="dropdown custom-dropdown-icon ml-auto ">
                                <h6 className="dropdown-toggle btn btn-dark w-100 user bg-danger font-weight-bolder btn btn-info"
                                    >
                                        <MdCleaningServices />
                                    No preferences
                                </h6>
                            </div>
                        </li>
                        <li className="nav-item"
                            style={{ width: '250px' }}
                            onClick={() => setShowModal({preferences: true})}
                            >
                            <div className="dropdown custom-dropdown-icon ml-auto">
                                <h6 className="dropdown-toggle btn btn-dark w-100 user font-weight-bolder btn btn-info"
                                    >
                                    <GiSettingsKnobs />
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