import { Avatar, Popover } from 'antd';
import React from 'react';
import profile from '../assets/profile.jpg';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AuthUser = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate('/admin/login')

  };
  const content = (
    <div>
      <p
        className="flex gap-4 text-errorColor p-4 cursor-pointer  border-t-2 border-t-gray-200"
        onClick={handleLogout}
      >
        <LogoutOutlined />
        Logout
      </p>
    </div>
  );

  return (
    <div className="flex justify-center items-center w-fit gap-4">
      <div className="text-white flex flex-col items-center">
        <p className="lg:text-4xl font-bold">John Doe</p>
        <p className="text-xl ">First Semester 2025/2026</p>
      </div>
      <Popover
        content={content}
        trigger="click"
        overlayStyle={{
          padding: 0,
        }}
      >
        <Avatar className="lg:h-28 lg:w-28 cursor-pointer" src={profile} />
      </Popover>
    </div>
  );
};

export default AuthUser;
