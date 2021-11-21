import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { FaRegClipboard } from 'react-icons/fa';
import { FiLogOut, FiFolder, FiMonitor } from 'react-icons/fi';
import { BsEnvelope, BsPencil } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

import 'react-pro-sidebar/dist/css/styles.css';
import './Navbar.css';
import styles from './Navbar.module.css';
import logo from '../../../images/logo.svg';
import { UserSummary } from '../../model/user/ProUser';
import UserIcon from '../common/Icons/UserIcon';
import { getSignOutUrl } from '../../API/user/urls';
import HamburgerMenuIcon from '../common/Icons/HamburgerMenuIcon';
import CountDot from '../common/CountDot/CountDot';
import useOnClickOutside from '../../tools/useOnClickOutside';

const Navbar = ({
  user,
  width,
  invitationCount,
  surveyCount,
}: {
  user: UserSummary;
  width: number;
  invitationCount: number;
  surveyCount: number;
}) => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const [activeIcon, setActiveIcon] = useState('');
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const ref = useRef(null);

  const hideNavbar = () => {
    setMenuCollapse(true);
    setShowNavbar(false);
  };

  const handleClickOutside = () => {
    hideNavbar();
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref}>
      {width <= 500 && (
        <HamburgerMenuIcon
          onClick={() => {
            setShowNavbar(!showNavbar);
            setMenuCollapse(true);
          }}
          positionRight={!showNavbar}
          extended={!menuCollapse}
        />
      )}
      <div
        id="navbar"
        className={
          width > 500
            ? styles.navbarVisible
            : showNavbar
            ? styles.navbarVisible
            : styles.navbarHidden
        }
      >
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
              <hr className="newMeetingLine mt-3" />
              <MenuItem
                icon={<AiOutlinePlus className="plusIcon" />}
                active={activeIcon === 'Schedule'}
                onClick={() => setActiveIcon('Schedule')}
              >
                New meeting
                <Link to="/create" onClick={hideNavbar} />
              </MenuItem>
              <hr className="newMeetingLine" />

              <MenuItem
                icon={<FiMonitor />}
                active={activeIcon === 'Home'}
                onClick={() => setActiveIcon('Home')}
              >
                Home
                <Link to="/home" onClick={hideNavbar} />
              </MenuItem>

              <MenuItem
                icon={<FiFolder />}
                active={activeIcon === 'Meetings'}
                onClick={() => setActiveIcon('Meetings')}
              >
                Meetings
                <Link to="/meetings" onClick={hideNavbar} />
              </MenuItem>

              <MenuItem
                icon={<FaRegClipboard />}
                active={activeIcon === 'Surveys'}
                onClick={() => setActiveIcon('Surveys')}
              >
                <CountDot count={surveyCount} display={surveyCount > 0} />
                Surveys
                <Link to="/surveys" onClick={hideNavbar} />
              </MenuItem>

              <MenuItem
                icon={<BsPencil />}
                active={activeIcon === 'Declarations'}
                onClick={() => setActiveIcon('Declarations')}
              >
                Declarations
                <Link to="/declarations" onClick={hideNavbar} />
              </MenuItem>

              <MenuItem
                icon={<BsEnvelope />}
                active={activeIcon === 'Invitations'}
                onClick={() => setActiveIcon('Invitations')}
              >
                <CountDot count={invitationCount} display={invitationCount > 0} />
                Invitations
                <Link to="/invitations" onClick={hideNavbar} />
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter>
            <Menu iconShape="circle">
              <MenuItem
                icon={menuCollapse ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                onClick={() => setMenuCollapse(!menuCollapse)}
              >
                {!menuCollapse && 'Hide'}
              </MenuItem>
              {user && user.username && (
                <MenuItem icon={<UserIcon user={user} backgroundColor="var(--light-red)" />}>
                  {user.username}
                  <Link to="/profile" onClick={hideNavbar} />
                </MenuItem>
              )}
              <MenuItem icon={<FiLogOut />}>
                <a href={getSignOutUrl()}>Sign out</a>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </div>
  );
};

export default Navbar;
