import React, { useState } from 'react';
import AuthUser from '../AuthUser';
import { NavLink, useNavigate } from 'react-router-dom';
import { Drawer, Menu } from 'antd';
import { MenuItem } from '../../@types';
import { colors } from '../../assets/colors';
import { FaBars } from 'react-icons/fa6';
import { pathnames } from '../../routes/path-name';
const navItems = [
  {
    name: 'Home',
    path: pathnames.DASHBOARD,
    label: 'Home',
    key: pathnames.DASHBOARD,
  },
  {
    name: 'Academic Structure',
    label: 'Academic Structure',
    path: pathnames.ACADEMIC_STRUCTURE,
    key: pathnames.ACADEMIC_STRUCTURE,
  },
  {
    label: 'Form B',
    name: 'Form B',
    path: pathnames.FORM_B,
    key: pathnames.FORM_B,
  },
  {
    label: 'Fee Status',
    name: 'Fee Status',
    path: pathnames.FEE_STATUS,
    key: pathnames.FEE_STATUS,
  },
  {
    label: 'Academic Pass',
    name: 'Academic Pass',
    path: pathnames.ACADEMIC_PASS,
    key: pathnames.ACADEMIC_PASS,
  },
  {
    label: 'Organigram',
    name: 'Organigram',
    path: pathnames.ORGANIGRAM,
    key: pathnames.ORGANIGRAM,
  },
];
const StudentNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate();
  const [sideBarItems, _setSideBarItems] = useState<
    (MenuItem & {
      path: string;
      name: string;
    })[]
  >(navItems);
  return (
    <div className=" items-center bg-primaryColor py-4">
      <div className="flex  justify-between px-8   lg:justify-end items-center h-max">
        <FaBars
          onClick={toggleMenu}
          className="text-white text-3xl md:hidden"
        />
        <AuthUser />
      </div>
      <Drawer
        placement="right"
        onClose={toggleMenu}
        open={isMenuOpen}
        key="left"
        getContainer={false}
        className="md:hidden bg-white h-screen"
        mask={false}
        styles={{
          wrapper: {
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100dvh',
          },
        }}
      >
        <Menu
          onClick={(e) => {
            navigate(e.key);
            toggleMenu();
          }}
          style={{
            backgroundColor: colors.whiteColor,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            textAlign: 'left',
            width: '100%',
            color: colors.textColor,
          }}
          // defaultSelectedKeys={[selectedKey]}
          mode="inline"
          items={sideBarItems}
          // items={navItems}
        />
      </Drawer>
      <div className="h-fit hidden gap-4 md:flex border-b-2">
        {navItems.map((elt) => (
          <NavLink
            to={elt.path}
            className={({ isActive }) =>
              `text-2xl text-white hover:bg-white p-4 hover:text-primaryColor ${isActive ? 'bg-white !text-primaryColor' : 'text-white'}`
            }
            key={elt.key}
            end
          >
            {elt.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default StudentNavbar;
