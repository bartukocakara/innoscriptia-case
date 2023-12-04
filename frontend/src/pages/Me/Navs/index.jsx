import React from 'react'
import { NavLink } from 'react-router-dom'

const Index = () => {
  	return (
		<div className="scrollable-tabs-container">
  			<div className="scrollable-tabs">
				<ul className="nav nav-tabs mb-3 mt-3" id="iconTab" role="tablist">
					<li className="nav-item">
						<NavLink to={'profile'} className="nav-link text-light">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
								className="feather feather-user  mr-1"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
							</svg>
							Profile
						</NavLink>
					</li>
					<li className="nav-item dropdown text-light">
						<span className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">					
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
								className="feather feather-settings mr-1"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
							Preferences
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
								className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
						</span>
						<div className="dropdown-menu">
							<NavLink to={'categories'} 
									className="text-light" 
									>
								<span className='dropdown-item user'>
									Categories
								</span>
							</NavLink>
							<NavLink to={'sources'} 
									className="text-light" 
									>
								<span className='dropdown-item user'>
									Sources
								</span>
							</NavLink>
							<NavLink to={'authors'} 
									className="text-light" 
									>
								<span className='dropdown-item user'>
									Authors
								</span>
							</NavLink>
						</div>
					</li>
					
				</ul>
			</div>
		</div>
  	)
}
export default Index