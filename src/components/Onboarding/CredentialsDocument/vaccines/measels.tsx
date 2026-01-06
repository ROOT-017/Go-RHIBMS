import { Select } from 'antd';
import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { VaccineFormProps } from './types';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { UserVaccination } from '../../../../@types';

export const MMRForm = ({
  issueDate,
  onChange,
  onSubmit,
  disabled,
  vaccineDocumentKey,
  immunityType,
  loading,
  file,
  onSignUrl,
  goToPrevious,
  handleFormIsUpdated,
  handleFormIsValid,
  originalData,
}: VaccineFormProps & { originalData?: Partial<UserVaccination> }) => {
  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('mmr', false);
      return;
    }
    //Check if the form is valid
    if (!file || !issueDate || !immunityType) {
      handleFormIsValid?.('mmr', false);
    } else {
      handleFormIsValid?.('mmr', true);
    }

    // check if form is updated
    if (
      originalData?.issueDate === issueDate &&
      originalData?.immunityType === immunityType &&
      originalData?.vaccineDocumentKey === file
    ) {
      handleFormIsUpdated?.('mmr', false);
    } else {
      handleFormIsUpdated?.('mmr', true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    file,
    issueDate,
    immunityType,
    loading,
    originalData,
    vaccineDocumentKey,
  ]);

  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="MMR Type" required>
          <Select
            defaultValue="MMR"
            onChange={(e) => {
              onChange('immunityType', e);
              onChange('issueDate', '');
            }}
            placeholder="Select Type"
            placement="bottomLeft"
            options={[
              { value: 'MMR', label: 'MMR' },
              { value: 'Titer', label: 'Titer' },
            ]}
            value={immunityType}
          />
        </FlexContainer>
        <FlexContainer labelRequired={false} required label={''}>
          <LabeledDateInputMolecule
            name="issueDate"
            picker="date"
            required
            onDateChange={(_, e) => {
              onChange('issueDate', e);
            }}
            value={issueDate ?? ''}
            label="Issue Date"
            maxDate={toFullDateYearMonthDay(new Date())}
          />
        </FlexContainer>
      </div>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer
          label={`Upload ${immunityType} Vaccination Card`}
          required
        >
          <FileInput
            id="mmrVaccineCard"
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
          onClick={() => (goToPrevious ? goToPrevious('influenza') : null)}
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
