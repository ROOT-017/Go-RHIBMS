import { pathnames } from '../routes/path-name';
import Chatbot from '../components/chatbot/Chatbot';
import { ButtonPrimary } from '../components/design-system/buttons';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col text-textColor bg-dashboardCardColor">
      <Chatbot />
      {/* <NavbarOrganism /> */}
      <main className="flex flex-col gap-[100px]">
        <div className="flex h-screen gap-6 justify-center items-center">
          {/* <Link to={pathnames.LOGIN}> */}
          <ButtonPrimary
            title="Student"
            onClick={() => navigate(pathnames.DASHBOARD)}
          >
            Student
          </ButtonPrimary>
          {/* </Link> */}
          {/* <Link to={pathnames.LOGIN_ADMIN}> */}
          <ButtonPrimary
            title="Student"
            onClick={() => navigate(pathnames.ADMIN_DASHBOARD)}
          >
            Admin
          </ButtonPrimary>
          {/* </Link> */}
        </div>
      </main>
    </div>
  );
}
