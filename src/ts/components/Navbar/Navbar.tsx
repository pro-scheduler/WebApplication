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

import { FaList, FaRegClipboard } from 'react-icons/fa';
import { FiLogOut, FiFolder, FiMonitor } from 'react-icons/fi';
import { BsEnvelope, BsPencil } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

import 'react-pro-sidebar/dist/css/styles.css';
import './Navbar.css';
import logo from '../../../images/logo.svg';

const Navbar = ({ showDetails = true }: { showDetails?: boolean }) => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [activeIcon, setActiveIcon] = useState('');

  return (
    <div id="navbar">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <Menu iconShape="circle">
            <MenuItem icon={<img src={logo} alt="logo" />} id="logotext">
              ProScheduler
              <Link to="/meetings" />
            </MenuItem>
          </Menu>
        </SidebarHeader>

        {showDetails ? (
          <SidebarContent>
            <Menu iconShape="circle">
              <hr className="newMeetingLine mt-3" />
              <MenuItem
                icon={<AiOutlinePlus />}
                active={activeIcon === 'Schedule'}
                onClick={() => setActiveIcon('Schedule')}
              >
                New meeting
                <Link to="/create" />
              </MenuItem>
              <hr className="newMeetingLine" />

              <MenuItem
                icon={<FiMonitor />}
                active={activeIcon === 'Home'}
                onClick={() => setActiveIcon('Home')}
              >
                Home
              </MenuItem>

              <MenuItem
                icon={<FiFolder />}
                active={activeIcon === 'Meetings'}
                onClick={() => setActiveIcon('Meetings')}
              >
                Meetings
                <Link to="/meetings" />
              </MenuItem>

              <MenuItem
                icon={<FaRegClipboard />}
                active={activeIcon === 'Surveys'}
                onClick={() => setActiveIcon('Surveys')}
              >
                Surveys
              </MenuItem>

              <MenuItem
                icon={<BsPencil />}
                active={activeIcon === 'Declarations'}
                onClick={() => setActiveIcon('Declarations')}
              >
                Declarations
              </MenuItem>

              <MenuItem
                icon={<BsEnvelope />}
                active={activeIcon === 'Invitations'}
                onClick={() => setActiveIcon('Invitations')}
              >
                Invitations
              </MenuItem>

              <MenuItem
                icon={<FaList />}
                className="closeMenu"
                onClick={() => setMenuCollapse(!menuCollapse)}
              />
            </Menu>
          </SidebarContent>
        ) : (
          <div />
        )}

        {showDetails ? (
          <SidebarFooter>
            <Menu iconShape="circle">
              <MenuItem icon={<FiLogOut />}>
                Sign out
                <Link to="/" />
              </MenuItem>
            </Menu>
          </SidebarFooter>
        ) : (
          <div />
        )}
      </ProSidebar>
    </div>
  );
};

export default Navbar;
