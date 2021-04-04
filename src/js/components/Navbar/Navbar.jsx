import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { FaList } from 'react-icons/fa';
import { FiLogOut, FiSettings, FiFolder, FiMonitor } from 'react-icons/fi';
import { VscHome } from 'react-icons/vsc';
import { BsPencil } from 'react-icons/bs';

import 'react-pro-sidebar/dist/css/styles.css';
import './Navbar.css';
import logo from '../../../images/logo.svg';

const Navbar = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [activeIcon, setActiveIcon] = useState('');

  return (
    <div id="navbar">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <Menu iconShape="circle">
            <MenuItem icon={<img src={logo} alt="logo" />} id="logotext">
              ProScheduler
              <Link to="/" />
            </MenuItem>
          </Menu>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<VscHome />}
              active={activeIcon === 'Home'}
              onClick={() => setActiveIcon('Home')}
            >
              Home
              <Link to="/" />
            </MenuItem>

            <MenuItem
              icon={<FiMonitor />}
              active={activeIcon === 'Dashboard'}
              onClick={() => setActiveIcon('Dashboard')}
            >
              Dashboard
              <Link to="/example" />
            </MenuItem>

            <MenuItem
              icon={<FiFolder />}
              active={activeIcon === 'Meetings'}
              onClick={() => setActiveIcon('Meetings')}
            >
              Meetings
              <Link to="/" />
            </MenuItem>

            <MenuItem
              icon={<BsPencil />}
              active={activeIcon === 'Schedule'}
              onClick={() => setActiveIcon('Schedule')}
            >
              Schedule a meeting
              <Link to="/" />
            </MenuItem>

            <MenuItem
              icon={<FiSettings />}
              active={activeIcon === 'Settings'}
              onClick={() => setActiveIcon('Settings')}
            >
              Settings
              <Link to="/" />
            </MenuItem>

            <MenuItem
              icon={<FaList />}
              className="closemenu"
              onClick={() => setMenuCollapse(!menuCollapse)}
            />
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Navbar;
