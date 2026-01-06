import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import { Link } from 'react-router-dom';
import { MedicalTestFormProps } from './types';
import { pathnames } from '../../../../routes/path-name';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export const PETestForm = ({
  issueDate,
  recordDocumentKey,
  expiryDate,
  onChange,
  disabled,
  loading,
  onSubmit,
  onSignUrl,
  goToPrevious,
  handleFormIsUpdated,
  handleFormIsValid,
  originalData,
  file,
}: MedicalTestFormProps) => {
  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('pe-test', false);
      return;
    }
    //Check if the form is valid
    if (!file || !issueDate || !expiryDate) {
      handleFormIsValid?.('pe-test', false);
    } else {
      handleFormIsValid?.('pe-test', true);
    }
    // check if form is updated
    if (
      originalData?.issueDate === issueDate &&
      originalData.expiryDate === expiryDate &&
      originalData?.recordDocumentKey === recordDocumentKey
    ) {
      handleFormIsUpdated?.('pe-test', false);
    } else {
      handleFormIsUpdated?.('pe-test', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate, recordDocumentKey, loading, originalData, expiryDate, file]);
  return (
    <>
      <p className="text-textColor font-[500] text-body">
        To complete the Physical Examination form, please{' '}
        <span className="text-errorColor absolute bottom-[-2px] text-ellipsis max-w-full overflow-hidden text-nowrap">
          *
        </span>{' '}
        <Link
          className="text-tealColor"
          to={`${pathnames.WORKER_PHYSICAL_EXAMINATION_FORM}`}
          target="_blank"
        >
          Click here{' '}
        </Link>
      </p>
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
            label="Expiration Date"
            minDate={issueDate}
            disabled={!issueDate}
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Upload Tuberculosis Test" required>
          <FileInput
            id="peTestRecordFile"
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
        <Button
          bordered
          onClick={() => (goToPrevious ? goToPrevious('pe-test') : null)}
        >
          <ArrowLeftOutlined /> Previous
        </Button>
        <ButtonPrimary onClick={onSubmit} disabled={disabled} loading={loading}>
          Save <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </>
  );
};
