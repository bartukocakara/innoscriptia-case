import React from 'react';
import '../../../component-style/users/user-profile.css';
import Navs from './Navs';
import { Outlet } from 'react-router-dom';

export default function Index() {
  return (
    <div id="tabsIcons" className="col-lg-12 col-12">
        <div className="statbox widget box box-shadow">
            <div className='simple-tab'>
                <Navs  />
                <Outlet />
            </div>
        </div>
    </div>
  );
}
