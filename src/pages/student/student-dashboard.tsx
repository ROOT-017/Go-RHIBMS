import React from 'react';
import Chatbot from '../../components/chatbot/Chatbot';
import UserProfileCard from '../../components/Card/UserProfileCard';
import { FaRegChartBar } from 'react-icons/fa6';
import profile from '../../assets/profile.jpg';
import {
  PhoneOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

const DashboardMainContent = () => {
  return (
    <div className="lg:w-[50%] w-full p-5 lg:p-0 lg:my-8 ">
      <div className="flex flex-col gap-12">
        <div className="flex gap-4">
          <div>
            <FaRegChartBar className="text-4xl" />
          </div>
          <div className="w-full mt-2 flex flex-col gap-4">
            <p className="text-4xl mb-4">Summary</p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Foreign Status:</span>
              <span className="flex-1 text-textColor ">
                Admitted as a Cameroonian
              </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Admission Date:</span>
              <span className="flex-1 text-textColor ">25 Jan 2024</span>
            </p>
          </div>
        </div>{' '}
        <div className="flex gap-4">
          <div>
            <UserSwitchOutlined className="text-4xl" />{' '}
          </div>
          <div className="w-full mt-2 flex flex-col gap-8 lg:gap-4">
            <p className="text-4xl mb-4 ">Basic Information</p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Name</span>
              <span className="flex-1 text-textColor ">Jane Does </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3 ">Degree Program</span>
              <span className="flex-1 text-textColor ">
                Computer Science and Network
              </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Matriculation Number</span>
              <span className="flex-1 text-textColor ">23-CSN-00567</span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Gender</span>
              <span className="flex-1 text-textColor ">Female </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Degree/Diploma</span>
              <span className="flex-1 text-textColor ">HND</span>
            </p>
          </div>
        </div>{' '}
        <div className="flex gap-4">
          <div>
            <PhoneOutlined className="text-4xl" />{' '}
          </div>
          <div className="w-full mt-2 flex flex-col gap-8 lg:gap-4">
            <p className="text-4xl mb-4 ">Contact Information</p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Phone Number</span>
              <span className="flex-1 text-textColor ">2345678234 </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3 ">Email</span>
              <span className="flex-1 text-textColor ">jane@example.com </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Students Address</span>
              <span className="flex-1 text-textColor ">Muea, Buea</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Dashboard = () => {
  const userdata = {
    name: 'Jane Doe',
    profile_url: profile,
    email: 'jane@example.com',
    phone: '123456789',
    location: 'Muea, Buea',
  };
  return (
    <>
      <Chatbot />
      <div className="justify-center gap-8 flex flex-col lg:flex-row items-center lg:items-start">
        <div>
          <UserProfileCard {...userdata} />
        </div>
        <DashboardMainContent />
        {/*  <div className="flex lg:flex-co flex-wrap justify-center  w-full items-center lg:w-[60%]  lg:flex  pt-4 grid-cols-2 grid-rows-2 gap-8 mb-14">
         {dashboardData.map((elt) => (
            <DashboardCard {...elt} key={elt.path} />
          ))} 
        </div>*/}
      </div>
    </>
  );
};

export default Dashboard;
