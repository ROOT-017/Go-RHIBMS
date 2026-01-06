import { Flex, Spin } from 'antd';
import {
  useGetContentDocuments,
  useOnChangeQueryParams,
  usePrincipal,
} from '../../../hooks/common.hooks';
import { Button, ButtonPrimary } from '../../design-system/buttons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import CheckBox from '../../CheckBox';
import { useEffect, useState } from 'react';
import { setAgreementToRequiredPolicies } from '../../../api/user.api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch } from '../../../store';
import { userActions } from '../../../store/features/slices/user';

export const Covid19Agreement = () => {
  const { content, loading: docLoading } =
    useGetContentDocuments('covid-19-agreement');
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isAlreadyCheck, setIsAlreadyCheck] = useState(false);
  const principal = usePrincipal();
  const { t } = useTranslation(); // const navigate = useNavigate();
  const changeQueryParams = useOnChangeQueryParams();
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (!isCheck) return;
    if (isCheck && principal?.userProfile?.covid19AgreementAt) {
      changeQueryParams((params) => params.set('todo', 'hippa-osha-agreement'));
      return;
    }

    setLoading(true);
    setAgreementToRequiredPolicies({ covid19Agreement: true })
      .then(() => {
        dispatch(userActions.getUserInfo()).then(() => {
          changeQueryParams((params) =>
            params.set('todo', 'hippa-osha-agreement'),
          );
        });
      })
      .catch(() => {
        toast.error(t('errors.fail.failed-try-again'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onPrevious = () =>
    changeQueryParams((params) => params.set('todo', 'medical-records'));

  useEffect(() => {
    if (principal?.userProfile?.covid19AgreementAt) {
      setIsCheck(true);
      setIsAlreadyCheck(true);
    }
  }, [principal?.userProfile?.covid19AgreementAt]);

  return (
    <div className="flex flex-col gap-8 rounded-[10px] max-h-[650px] overflow-auto md:p-10 border-none md:border-solid border-[1px] border-borderColor">
      <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
        COVID-19 Agreement
      </h2>
      {docLoading ? (
        <Flex justify="center" align="center" className="h-[60vh]">
          <Spin />
        </Flex>
      ) : (
        <div
          style={{
            maxHeight: isAlreadyCheck ? '50vh' : 'unset',
            overflowY: isAlreadyCheck ? 'auto' : 'unset',
          }}
          dangerouslySetInnerHTML={{ __html: content?.content ?? '' }}
        ></div>
      )}
      <div className="flex gap-4">
        <CheckBox
          checked={isCheck}
          disabled={docLoading}
          onChange={setIsCheck}
        />
        By clicking Continue, you agree to the terms and conditions outlined in
        this document.
      </div>
      <Flex justify="end" gap={4}>
        <Button bordered onClick={onPrevious}>
          <ArrowLeftOutlined />
          Previous
        </Button>{' '}
        <ButtonPrimary disabled={!isCheck} onClick={onSubmit} loading={loading}>
          Continue <ArrowRightOutlined />
        </ButtonPrimary>
      </Flex>
    </div>
  );
};

export default Covid19Agreement;
