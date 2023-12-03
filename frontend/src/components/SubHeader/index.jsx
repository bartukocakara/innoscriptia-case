import React from 'react'
import { handleOverlayDismiss, handleSidebarToggle } from '../../utils/sidebarToggle';
import { AiOutlinePlus } from 'react-icons/ai' 
const Index = () => {
    return (
        <div className="sub-header-container mt-5">
            <header className="header navbar navbar-expand-sm">
                <span className="sidebarCollapse d-block user" data-placement="bottom" onClick={(sidebar) => handleSidebarToggle(sidebar)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </span>
                <div className="overlay" onClick={() => handleOverlayDismiss()}></div>
                    <ul className="navbar-nav flex-row ml-auto">
                        <li className="nav-item more-dropdown"
                            style={{ width: '250px' }}>
                            <div className="dropdown custom-dropdown-icon ml-auto">
                                {/* <h6 className="dropdown-toggle btn btn-dark w-100 user font-weight-bolder btn btn-info"
                                    role="button" 
                                    id="customDropdown" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false"
                                    >
                                        <AiOutlinePlus className='mx-2' />
                                    {create')}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </h6> */}
                                {/* <div className="dropdown-menu dropdown-menu-right" style={{ width: '250px' }} aria-labelledby="customDropdown">
                                {
                                    createOptions.map((item, index) => {
                                        if(item.role === role) {
                                            let link = `${item.prefix}${sportTypePath}/${item.link}`;
                                            return (
                                                <Link key={index}
                                                      className="dropdown-item text-center"
                                                      to={link}
                                                >
                                                    <h6>
                                                        {t(item.name)}
                                                    </h6>
                                                </Link>
                                            );
                                        }
                                        
                                    })
                                }
                                </div> */}
                            </div>
                        </li>
                    </ul>
            </header>
        </div>
    )
}

export default Index