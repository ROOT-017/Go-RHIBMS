import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { VaccineFormProps } from './types';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { UserVaccination } from '../../../../@types';
export const TetanusForm = ({
  issueDate,
  onChange,
  disabled,
  expiryDate,
  vaccineDocumentKey,
  onSubmit,
  loading,
  onSignUrl,
  file,
  originalData,
  goToPrevious,
  handleFormIsUpdated,
  handleFormIsValid,
}: VaccineFormProps & { originalData?: Partial<UserVaccination> }) => {
  useEffect(() => {
    if (issueDate) {
      const newExpiryDate = dayjs(issueDate)
        .add(10, 'years')
        .format('YYYY-MM-DD');
      onChange('expiryDate', newExpiryDate);
    } else {
      onChange('expiryDate', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate]);

  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('tdap', false);
      return;
    }
    //Check if the form is valid
    if (!file || !issueDate || !expiryDate) {
      handleFormIsValid?.('tdap', false);
    } else {
      handleFormIsValid?.('tdap', true);
    }

    // check if form is updated
    if (
      originalData?.issueDate === issueDate &&
      originalData?.expiryDate === expiryDate &&
      originalData?.vaccineDocumentKey === file
    ) {
      handleFormIsUpdated?.('tdap', false);
    } else {
      handleFormIsUpdated?.('tdap', true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, issueDate, expiryDate, loading, originalData]);

  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer labelRequired={false} required label={''}>
          <LabeledDateInputMolecule
            name="issueDate"
            picker="date"
            required
            onDateChange={onChange}
            value={issueDate ?? ''}
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
            value={expiryDate ?? ''}
            minDate={issueDate}
            disabled={!issueDate}
            label="Expiration Date"
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Upload Tetanus Vaccination Card" required>
          <FileInput
            id="tetanusVaccineCard"
            label=""
            onChange={(files) => {
              if (files && files[0]) {
                onChange('file', files[0]);
              }
            }}
            inputText={
              vaccineDocumentKey || 'Select file or drag/drop to upload'
            }
            inputTextStyle={{ maxWidth: 300 }}
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
          onClick={() => (goToPrevious ? goToPrevious('tdap') : null)}
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
