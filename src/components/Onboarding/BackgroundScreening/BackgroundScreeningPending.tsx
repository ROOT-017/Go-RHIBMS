import { useTranslation } from 'react-i18next';

const BackgroundScreeningPending = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-body text-textColor">
        {t('healthcare-workers.onboarding.background-screening-pending')}
      </p>
    </div>
  );
};

export default BackgroundScreeningPending;
