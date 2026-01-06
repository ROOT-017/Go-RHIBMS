import { Radio } from 'antd';
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

export const InfluenzaForm = ({
  onChange,
  currentOnShots,
  issueDate,
  expiryDate,
  vaccineDocumentKey,
  loading,
  onSubmit,
  onSignUrl,
  file,
  disabled,
  originalData,
  handleFormIsValid,
  handleFormIsUpdated,
  goToPrevious,
}: VaccineFormProps & { originalData?: Partial<UserVaccination> }) => {
  const clearForm = (e?: string) => {
    if (e) onChange('currentOnShots', e == 'yes' ? true : false);
    onChange('issueDate', '');
    onChange('expiryDate', '');
  };

  useEffect(() => {
    if (issueDate) {
      const newExpiryDate = dayjs(issueDate)
        .add(1, 'year')
        .format('YYYY-MM-DD');
      onChange('expiryDate', newExpiryDate);
    } else {
      onChange('expiryDate', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issueDate]);

  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('influenza', false);
      return;
    }

    if (currentOnShots) {
      if (!issueDate || !expiryDate || (!vaccineDocumentKey && !file)) {
        handleFormIsValid?.('influenza', false);
      } else {
        handleFormIsValid?.('influenza', true);
      }

      //Check If form is updated
      if (
        issueDate === originalData?.issueDate &&
        expiryDate === originalData?.expiryDate &&
        file === originalData?.vaccineDocumentKey
      ) {
        handleFormIsUpdated?.('influenza', false);
      } else {
        handleFormIsUpdated?.('influenza', true);
      }
    } else {
      handleFormIsValid?.('influenza', true);

      //Check If form is updated
      if (originalData?.currentOnShots === currentOnShots) {
        handleFormIsUpdated?.('influenza', false);
      } else {
        handleFormIsUpdated?.('influenza', true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, currentOnShots, issueDate, expiryDate, file, originalData]);

  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Influenza Shots" required>
          <Radio.Group
            value={currentOnShots ? 'yes' : 'no'}
            onChange={(e) => clearForm(e.target.value)}
          >
            <Radio key="yes" value={'yes'}>
              I am current with my Influenza shots, and I would like to provide
              my information
            </Radio>
            <Radio key="no" value={'no'}>
              I am either not current with my Influenza shot, or I do not wish
              to upload my my data at this time
            </Radio>
          </Radio.Group>
        </FlexContainer>
      </div>

      {(currentOnShots === undefined || currentOnShots) && (
        <>
          <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
            <FlexContainer labelRequired={false} required label={''}>
              <LabeledDateInputMolecule
                name="issueDate"
                picker="date"
                required
                onDateChange={onChange}
                value={issueDate ?? ''}
                label="Flu Shot Date"
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
                label="Expiration Date"
                disabled={!issueDate}
                minDate={issueDate}
              />
            </FlexContainer>
          </div>
          <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
            <FlexContainer label="Upload Influenza Vaccination Card" required>
              <FileInput
                id="influenzaVaccineCard"
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
        </>
      )}

      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button
          bordered
          onClick={() => (goToPrevious ? goToPrevious('hepatitis') : null)}
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
