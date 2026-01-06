import { Link, useLocation, useNavigate } from 'react-router-dom';

import styles from './navbar.module.css';

import { pathnames } from '../../routes/path-name';
import { UseScrollPosition } from '../../utils/getScrollPosition';
import logo from '../../assets/logos/logo.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { ButtonPrimary, Button } from '../design-system/buttons';
import { usePrincipal } from '../../hooks/common.hooks';
const urls = [
  pathnames.HEALTHCARE_WORKERS,
  pathnames.MEDICAL_CENTERS,
  pathnames.CONTACT_US,
  pathnames.OUR_STORY,
];
const NavbarOrganism = () => {
  const { t } = useTranslation();
  const position = UseScrollPosition();
  const principal = usePrincipal();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);

  const getActiveClass = (path: string) => {
    if (location.pathname === path) {
      return styles.active;
    } else return;
  };

  return (
    <nav
      aria-label={t('main')}
      className={`${styles.navbar} ${position > (urls.includes(location.pathname) ? 50 : 100) ? styles.active : ''}`}
    >
      <div className={`${styles.logo}`}>
        <Link to={pathnames.HOME}>
          <img src={logo} alt="" className="w-full" />
        </Link>
      </div>
      <ul className={`${styles.links} ${menuActive ? styles.active : ''}`}>
        <li>
          <Link
            className={getActiveClass(pathnames.HEALTHCARE_WORKERS)}
            to={pathnames.HEALTHCARE_WORKERS}
          >
            {t('navbar-organism.healthcare-workers')}
          </Link>
        </li>
        <li>
          <Link
            className={getActiveClass(pathnames.MEDICAL_CENTERS)}
            to={pathnames.MEDICAL_CENTERS}
          >
            {t('navbar-organism.medical-centers')}
          </Link>
        </li>
        <li>
          <Link
            className={getActiveClass(pathnames.CONTACT_US)}
            to={pathnames.CONTACT_US}
          >
            {t('navbar-organism.contact-us')}
          </Link>
        </li>
        <li>
          <Link
            className={getActiveClass(pathnames.OUR_STORY)}
            to={pathnames.OUR_STORY}
          >
            {t('navbar-organism.our-story')}
          </Link>
        </li>
        <div className={`${styles.menu__buttons}`}></div>
      </ul>
      <div className="flex gap-4 lg:gap-8">
        {principal?.user ? (
          <>
            <ButtonPrimary
              aria-label={t('home.dashboard')}
              onClick={() => navigate('/dashboard')}
            >
              {t('home.dashboard')}
            </ButtonPrimary>
          </>
        ) : (
          <>
            {' '}
            <Link to={pathnames.ACCOUNT_SELECTION}>
              <Button
                bordered
                aria-label={t('navbar-organism.aria-label-register')}
              >
                {t('navbar-organism.register')}
              </Button>
            </Link>
            <Link to={pathnames.LOGIN}>
              <ButtonPrimary aria-label={t('navbar-organism.aria-label-login')}>
                {t('navbar-organism.login')}
              </ButtonPrimary>
            </Link>
          </>
        )}
        <span
          onClick={() => setMenuActive(!menuActive)}
          aria-label={t('navbar-organism.aria-label-menu')}
          className={`${styles.menu}`}
          tabIndex={0}
        >
          {menuActive ? (
            <span>
              <CloseOutlined />
            </span>
          ) : (
            <span>
              <MenuOutlined />
            </span>
          )}
        </span>
      </div>
    </nav>
  );
};

export default NavbarOrganism;
