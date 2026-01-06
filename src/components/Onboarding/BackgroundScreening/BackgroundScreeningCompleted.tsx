import { ArrowRightOutlined } from '@ant-design/icons';
import { ButtonPrimary } from '../../design-system/buttons';
import { useTranslation } from 'react-i18next';
import { pathnames } from '../../../routes/path-name';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

const BackgroundScreeningCompleted = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <p className="text-body text-textColor">
        {t('healthcare-workers.onboarding.background-screening-completed')}
      </p>
      <Flex justify="center">
        <ButtonPrimary bordered onClick={() => navigate(pathnames.DASHBOARD)}>
          {t('healthcare-workers.onboarding.start-applying-for-jobs')}
          <ArrowRightOutlined /> 
        </ButtonPrimary>
      </Flex>
    </div>
  );
};

export default BackgroundScreeningCompleted;
