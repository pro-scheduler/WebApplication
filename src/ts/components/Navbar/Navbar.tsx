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
import { UserSummary } from '../../model/user/ProUser';
import LetterIcon from '../common/Icons/LetterIcon';

const Navbar = ({ user }: { user: UserSummary }) => {
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

        <SidebarContent>
          <Menu iconShape="circle">
            <hr className="newMeetingLine mt-3" />
            <MenuItem
              icon={<AiOutlinePlus className="plusIcon" />}
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
              <Link to="/declarations" />
            </MenuItem>

            <MenuItem
              icon={<BsEnvelope />}
              active={activeIcon === 'Invitations'}
              onClick={() => setActiveIcon('Invitations')}
            >
              Invitations
              <Link to="/invitations" />
            </MenuItem>

            <MenuItem
              icon={<FaList />}
              className="closeMenu"
              onClick={() => setMenuCollapse(!menuCollapse)}
            />
          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="circle">
            {user && user.username && (
              <MenuItem
                icon={
                  <LetterIcon
                    firstLetter={user.username.charAt(0)}
                    backgroundColor="var(--light-red)"
                  />
                }
              >
                {user.username}
                <Link to="/profile" />
              </MenuItem>
            )}
            <MenuItem icon={<FiLogOut />}>
              Sign out
              <Link to="/" />
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Navbar;
