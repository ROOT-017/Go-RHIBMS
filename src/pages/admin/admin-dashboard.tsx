import { Link } from 'react-router-dom';
import { pathnames } from '../../routes/path-name';
import { colors } from '../../assets/colors';
import UserProfileCard from '../../components/Card/UserProfileCard';
import Chatbot from '../../components/chatbot/Chatbot';

interface DashboardCardProps {
  label: string;
  color: string;
  path: string;
}
const DashboardCard = ({ color, label, path }: DashboardCardProps) => {
  return (
    <Link to={path}>
      <div
        className="flex justify-center h-[150px] w-[150px] lg:h-[250px] lg:w-[250px] items-center hover:shadow-lg "
        style={{
          backgroundColor: color,
        }}
      >
        <p className="text-2xl text-white">{label}</p>
      </div>
    </Link>
  );
};

const dashboardData: DashboardCardProps[] = [
  {
    color: colors.blueColorPrimary,
    path: pathnames.ADD_STUDENTS,
    label: 'Add Students',
  },
  {
    color: colors.lightGreen,
    path: pathnames.ADD_COURSES,
    label: 'Add Courses',
  },
  {
    color: colors.lightYellow,
    path: pathnames.ADD_PROGRAMS,
    label: 'Add Programs',
  },
  {
    color: colors.primaryRedColor,
    path: pathnames.ADD_DEPARTMENTS,
    label: 'Add Departments',
  },
  {
    color: colors.primaryRedColor,
    path: pathnames.INSTITUTIONAL_DATA,
    label: 'Institutional Data',
  },
];
const AdminDashboard = () => {
  return (
    <>
      <Chatbot />
      <div className="justify-center gap-8 flex flex-col lg:flex-row items-center lg:items-start">
        <div>
          <UserProfileCard />
        </div>
        <div className="flex lg:flex-col flex-wrap justify-center  w-full items-center lg:w-fit lg:grid pt-4 grid-cols-2 grid-rows-2 gap-8 mb-14">
          {dashboardData.map((elt) => (
            <DashboardCard {...elt} key={elt.path} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
