import { Flex, Spin } from 'antd';
import {
  useGetContentDocuments,
  useOnChangeQueryParams,
  usePrincipal,
} from '../../../hooks/common.hooks';
import { useEffect, useState } from 'react';
import { Button, ButtonPrimary } from '../../design-system/buttons';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import CheckBox from '../../CheckBox';
import { useTranslation } from 'react-i18next';
import { setAgreementToRequiredPolicies } from '../../../api/user.api';
import toast from 'react-hot-toast';
import { userActions } from '../../../store/features/slices/user';
import { useDispatch } from '../../../store';

export const HippaAndOshaAgreement = () => {
  const { content, loading: docLoading } = useGetContentDocuments(
    'hipaa-osha-agreement',
  );
  const [isCheck, setIsCheck] = useState(false);
  const principal = usePrincipal();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation(); // const navigate = useNavigate();
  const changeQueryParams = useOnChangeQueryParams();
  const [isAlreadyCheck, setIsAlreadyCheck] = useState(false);
  const onSubmit = () => {
    if (!isCheck) return;
    if (isCheck && principal?.userProfile?.hippaOshaAgreementAt) {
      changeQueryParams((params) =>
        params.set('todo', 'arbitration-agreement'),
      );
      return;
    }

    setLoading(true);
    setAgreementToRequiredPolicies({ hippaOshaAgreement: true })
      .then(() => {
        dispatch(userActions.getUserInfo()).then(() => {
          changeQueryParams((params) =>
            params.set('todo', 'arbitration-agreement'),
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
    changeQueryParams((params) => params.set('todo', 'covid-agreement'));

  useEffect(() => {
    if (principal?.userProfile?.hippaOshaAgreementAt) {
      setIsCheck(true);
      setIsAlreadyCheck(true);
    }
  }, [principal?.userProfile?.hippaOshaAgreementAt]);

  return (
    <div className="flex flex-col gap-8 rounded-[10px] max-h-[650px] overflow-auto md:p-10 border-none md:border-solid border-[1px] border-borderColor">
      <h2 className="md:text-subHeading text-smallSubHeading font-[600] flex text-textColor">
        HIPPA & OSHA Agreement
      </h2>{' '}
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
      {
        <>
          <div>
            <p className="flex gap-4">
              <CheckBox
                checked={isCheck}
                disabled={docLoading}
                onChange={setIsCheck}
              />
              By clicking Continue, you agree to the terms and conditions outlined in
              this document.
            </p>
          </div>{' '}
          <Flex justify="end" gap={4}>
            <Button bordered onClick={onPrevious}>
              <ArrowLeftOutlined />
              Previous
            </Button>{' '}
            <ButtonPrimary
              disabled={!isCheck}
              onClick={onSubmit}
              loading={loading}
            >
              Continue <ArrowRightOutlined />
            </ButtonPrimary>
          </Flex>
        </>
      }
    </div>
  );
};

export default HippaAndOshaAgreement;
