import { Avatar } from 'antd';
import React from 'react';
import profile from '../assets/profile.jpg';

const AuthUser = () => {
  return (
    <div className="flex justify-center items-center w-fit gap-4">
      <div className="text-white flex flex-col items-center">
        <p className="lg:text-4xl font-bold">John Doe</p>
        <p className="text-xl ">First Semester 2025/2026</p>
      </div>
      <Avatar className="lg:h-28 lg:w-28" src={profile} />
    </div>
  );
};

export default AuthUser;
