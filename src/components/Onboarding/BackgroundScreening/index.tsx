import CurrentAddress from './CurrentAddress';
import { useBackGroundScreening } from './background-screening.hook';
import PersonalInformation from './PersonalInformation';
import PreviousAddress from './previousAddress';
import { Button, ButtonPrimary } from '../../design-system/buttons';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import {
  useOnChangeQueryParams,
  useQueryParams,
} from '../../../hooks/common.hooks';
import { Flex, Modal, Tooltip } from 'antd';
import { CheckedBoxIcon, UncheckedBoxIcon } from '../../Icons/svg';
import BackgroundScreeningPending from './BackgroundScreeningPending';
import BackgroundScreeningCompleted from './BackgroundScreeningCompleted';
import UploadBackgroundResults from './UploadBackgroundResults';
import LearnMore from '../../LearnMore/LearnMore';
import { useEffect, useState } from 'react';

const BackgroundScreening = () => {
  const {
    status,
    errors,
    loading,
    userInfo,
    onSubmit,
    checkBox,
    onSignUrl,
    totalYears,
    documentKey,
    formIsValid,
    onFileChange,
    currentAddress,
    previousAddress,
    handleAddAddress,
    handleDeleteAddress,
    showPrevAddressSect,
    handleCheckBoxChange,
    handlePersonalInfoChange,
    currentAddressFormIsValid,
    beingInCurrentAddress7Plus,
    handleCurrentAddressChange,
    handlePreviousAddressChange,
    handleUploadBackgroundFile,
  } = useBackGroundScreening();
  const onChangeParams = useOnChangeQueryParams();
  const [isOpen, setIsOpen] = useState(false);
  const q = useQueryParams();

  useEffect(() => {
    if (status == null && q.action !== 'upload-background') {
      setIsOpen(true);
    }
    if (status === 'pending') {
      setIsOpen(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <div>
      <div className="border-b border-gray-300 py-8 mb-8 text-4xl lg:text-6xl flex justify-between">
        <h1> Background Screening</h1>{' '}
        <span>
          {!status ? (
            <Tooltip
              placement="top"
              title={'Upload background check if you have any.'}
              color="#241773"
            >
              <Button
                onClick={() =>
                  onChangeParams((params) =>
                    params.set('action', 'upload-background'),
                  )
                }
                style={{
                  display:
                    q.action === 'upload-background' ? 'none' : 'inline-flex',
                }}
              >
                Background Check Result <CloudUploadOutlined />
              </Button>
            </Tooltip>
          ) : null}
        </span>
      </div>
      {status === 'pending' ? (
        <BackgroundScreeningPending />
      ) : status === 'approved' ? (
        <BackgroundScreeningCompleted />
      ) : q.action === 'upload-background' ? (
        <UploadBackgroundResults
          documentKey={documentKey}
          formIsValid={formIsValid}
          loading={loading}
          onFileChange={onFileChange}
          onSignUrl={onSignUrl}
          onSubmit={handleUploadBackgroundFile}
        />
      ) : (
        <>
          <div>
            <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap"></div>
            <PersonalInformation
              handlePersonalInfoChange={handlePersonalInfoChange}
              userInfo={userInfo}
            />
            <CurrentAddress
              currentAddress={currentAddress}
              handleCurrentAddressChange={handleCurrentAddressChange}
              error={errors['currentAddressForm']}
            />
            {showPrevAddressSect &&
              Object.keys(previousAddress).map((key) => (
                <PreviousAddress
                  key={key}
                  index={key}
                  allAddresses={previousAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  previousAddress={previousAddress[key]}
                  handlePreviousAddressChange={handlePreviousAddressChange}
                  beingInCurrentAddress7Plus={beingInCurrentAddress7Plus}
                  currentAddress={currentAddress}
                  error={errors[key]}
                />
              ))}
            {currentAddressFormIsValid && (
              <Flex className="justify-end my-6">
                <Button
                  onClick={() =>
                    handleAddAddress(
                      Object.keys(previousAddress).length.toString(),
                    )
                  }
                >
                  Add Address
                </Button>
              </Flex>
            )}
            {totalYears < 7 && (
              <p className="text-errorColor">
                Make sure you have added your addresses for the past 7 years.{' '}
              </p>
            )}
            <Flex className="flex-col gap-5 my-8">
              <p className="flex gap-2">
                {checkBox?.agreeTerms ? (
                  <CheckedBoxIcon
                    fill="#241773"
                    onClick={() => handleCheckBoxChange('agreeTerms', false)}
                  />
                ) : (
                  <UncheckedBoxIcon
                    fill="#241773"
                    onClick={() => handleCheckBoxChange('agreeTerms', true)}
                  />
                )}
                <span>
                  I consent to the background check and agree to the terms
                  outlined in the
                </span>
                <LearnMore p={{ text: 'Consent Document' }} />
              </p>
              <p className="flex gap-2">
                {checkBox?.sendCopyOfResult ? (
                  <CheckedBoxIcon
                    fill="#241773"
                    onClick={() =>
                      handleCheckBoxChange('sendCopyOfResult', false)
                    }
                  />
                ) : (
                  <UncheckedBoxIcon
                    fill="#241773"
                    onClick={() =>
                      handleCheckBoxChange('sendCopyOfResult', true)
                    }
                  />
                )}
                <span> Send me a copy of my background check result.</span>
              </p>
            </Flex>
          </div>
          <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
            <Button
              bordered
              onClick={() =>
                onChangeParams((params) =>
                  params.set('selectedStep', 'onboarding-interview'),
                )
              }
            >
              <ArrowLeftOutlined /> Previous
            </Button>
            <ButtonPrimary
              onClick={onSubmit}
              disabled={!formIsValid}
              loading={loading}
            >
              Submit <ArrowRightOutlined />
            </ButtonPrimary>
          </div>
        </>
      )}
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        centered
        closeIcon={<></>}
        footer={() => (
          <Flex justify="end" gap={8}>
            <Button
              onClick={() => {
                setIsOpen(false);
                onChangeParams((params) => params.delete('action'));
              }}
            >
              No
            </Button>
            <ButtonPrimary
              onClick={() => {
                onChangeParams((param) =>
                  param.set('action', 'upload-background'),
                );
                setIsOpen(false);
                // handleComplete();
              }}
            >
              Yes
            </ButtonPrimary>
          </Flex>
        )}
      >
        <p className="text-center text-[16px] text-textColor my-8">
          Have you completed a background check within the last 12 months?
        </p>
      </Modal>
    </div>
  );
};

export default BackgroundScreening;
