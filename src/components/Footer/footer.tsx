import { Link } from 'react-router-dom';
import { pathnames } from '../../routes/path-name';

export const Footer = () => {
  return (
    <footer className="flex w-full  gap-[16px] flex-wrap items-center text-[1.2rem] md:text-[1.6rem] bg-lightBlueColor h-[60px] justify-center">
      <p>&copy; Go-RHIBMS | {new Date().getFullYear()}</p>
      <Link to={pathnames.TERMS_TERMS_OF_USE} className="hover:underline">
        <p className="text-blueColor">Terms of Use</p>
      </Link>
    </footer>
  );
};
