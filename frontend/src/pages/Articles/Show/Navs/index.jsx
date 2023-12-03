import React from 'react'
import { NavLink } from 'react-router-dom'

const Index = () => {
	return (
		<div class="scrollable-tabs-container">
  			<div class="scrollable-tabs">
			  	<ul className="nav nav-tabs mb-3 mt-3" id="iconTab" role="tablist">
					{/* {
						list.map((item, index) => {
							return permissions.some(
								(permission) => permission.name === item.permission
							) && <li key={index} className="nav-item">
								<NavLink to={item.to} className="nav-link d-flex">
									{item.icon}
									<p className="ml-2">item.text</p>
								</NavLink>
							</li>
					})} */}
				</ul>
			</div>
		</div>
  )
}
export default Index