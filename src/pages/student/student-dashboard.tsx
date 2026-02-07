import Chatbot from '../../components/chatbot/Chatbot';
import UserProfileCard from '../../components/Card/UserProfileCard';
import { MdBarChart } from "react-icons/md";import profile from '../../assets/profile.jpg';
import { PhoneOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { usePrincipal } from '../../hooks/common.hooks';
import dayjs from 'dayjs';

const DashboardMainContent = () => {
  const principal = usePrincipal();
  return (
    <div className="lg:w-[50%] w-full p-5 lg:p-0 lg:my-8 ">
      <div className="flex flex-col gap-12">
        <div className="flex gap-4">
          <div>
            <MdBarChart className="text-4xl" />
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
              <span className="lg:w-1/3">Creation Date:</span>
              <span className="flex-1 text-textColor ">
                {dayjs(principal.created_at).format('DD MMMM YYYY')}
              </span>
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
              <span className="flex-1 text-textColor ">
                {principal?.full_name}
              </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3 ">Degree Program</span>
              <span className="flex-1 text-textColor ">
                {principal?.student?.program?.name}
              </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Matriculation Number</span>
              <span className="flex-1 text-textColor ">
                {principal?.student?.matricule}
              </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Gender</span>
              <span className="flex-1 text-textColor ">
                {principal?.student?.gender}
              </span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Degree/Diploma</span>
              <span className="flex-1 text-textColor ">
                {principal?.student?.program?.award}
              </span>
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
              <span className="flex-1 text-textColor ">{principal?.email}</span>
            </p>
            <p className="flex text-2xl flex-col lg:flex-row gap-2 lg:gap-0">
              <span className="lg:w-1/3">Students Address</span>
              <span className="flex-1 text-textColor ">{principal.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const Dashboard = () => {
  const principal = usePrincipal();
  return (
    <>
      <Chatbot />
      <div className="justify-center gap-8 flex flex-col lg:flex-row items-center lg:items-start">
        <div>
          <UserProfileCard
            email={principal?.email ?? ''}
            name={principal?.full_name ?? ''}
            location={principal?.address ?? 'N/A'}
            phone={
              principal?.phone?.trim().length ? principal?.phone : '123456789'
            }
            profile_url={profile}
          />
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
