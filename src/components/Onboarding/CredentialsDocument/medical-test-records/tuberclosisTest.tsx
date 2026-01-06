import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import { MedicalTestFormProps } from './types';
import { Select } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useOnChangeQueryParams } from '../../../../hooks/common.hooks';

export const TBTestForm = ({
  issueDate,
  testType,
  recordDocumentKey,
  expiryDate,
  onChange,
  disabled,
  onSubmit,
  loading,
  onSignUrl,
  file,
  handleFormIsUpdated,
  handleFormIsValid,
  originalData,
}: MedicalTestFormProps) => {
  const clearForm = (value: string) => {
    onChange('testType', value);
    onChange('issueDate', '');
    onChange('expiryDate', '');
  };
  const changeQueryParams = useOnChangeQueryParams();

  useEffect(() => {
    if (issueDate) {
      if (testType === 'chestxray') {
        const newExpiryDate = dayjs(issueDate)
          .add(5, 'years')
          .format('YYYY-MM-DD');
        onChange('expiryDate', newExpiryDate);
      } else {
        const newExpiryDate = dayjs(issueDate)
          .add(1, 'year')
          .format('YYYY-MM-DD');
        onChange('expiryDate', newExpiryDate);
      }
    } else {
      onChange('expiryDate', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate, testType]);

  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('tuberculosis-test', false);
      return;
    }
    //Check if the form is valid
    if (!file || !issueDate || !expiryDate) {
      handleFormIsValid?.('tuberculosis-test', false);
    } else {
      handleFormIsValid?.('tuberculosis-test', true);
    }
    // check if form is updated
    if (
      originalData?.issueDate === issueDate &&
      originalData?.testType === testType &&
      originalData?.recordDocumentKey === recordDocumentKey &&
      originalData?.expiryDate === expiryDate
    ) {
      handleFormIsUpdated?.('tuberculosis-test', false);
    } else {
      handleFormIsUpdated?.('tuberculosis-test', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    issueDate,
    testType,
    expiryDate,
    loading,
    originalData,
    file,
    recordDocumentKey,
  ]);

  const goToPrevious = (to: string) =>
    changeQueryParams((params) => params.set('todo', to));

  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Type of Tuberculosis Test " required>
          <Select
            defaultValue="ppd"
            onChange={(val) => clearForm(val)}
            value={testType || undefined}
            placeholder="Select Test type"
            placement="bottomLeft"
            options={[
              { value: 'ppd', label: 'PPD' },
              { value: 'chestxray', label: 'Chest X-ray' },
              { value: 'tbgoldtest', label: 'TB Gold Test' },
              { value: '2stepppd', label: '2 Step PPD' },
              { value: 'tspot', label: 'TSpot' },
            ]}
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer labelRequired={false} required label={''}>
          <LabeledDateInputMolecule
            name="issueDate"
            picker="date"
            required
            onDateChange={onChange}
            value={issueDate || ''}
            label="Issue Date"
            maxDate={toFullDateYearMonthDay(new Date())}
          />
        </FlexContainer>
        <FlexContainer labelRequired={false} required label={''}>
          <LabeledDateInputMolecule
            name="expiryDate"
            picker="date"
            required
            onDateChange={onChange}
            value={expiryDate || ''}
            minDate={issueDate}
            disabled={!issueDate}
            label="Expiration Date"
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Upload Tuberculosis Test" required>
          <FileInput
            id="tubercTestRecodFile"
            label=""
            onChange={(files) => {
              if (files && files?.length > 0) {
                onChange('file', files[0]);
              }
            }}
            inputText={
              recordDocumentKey || 'Select file or drag/drop to upload'
            }
            accept=".jpg,.png,.pdf"
            className="text-body text-textColor flex justify-between items-center w-full"
            showSelected
            onSignUrl={(e) => {
              onChange('file', e);
              return onSignUrl ? onSignUrl(e) : new Promise(() => {});
            }}
          >
            <CloudUploadFilled className="text-[24px]" />
          </FileInput>
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button bordered onClick={() => goToPrevious('vaccinations')}>
          <ArrowLeftOutlined /> Previous
        </Button>
        <ButtonPrimary onClick={onSubmit} disabled={disabled} loading={loading}>
          Save <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </>
  );
};
