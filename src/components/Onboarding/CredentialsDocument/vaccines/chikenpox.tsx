import { Select } from 'antd';
import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { VaccineFormProps } from './types';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { UserVaccination } from '../../../../@types';
import { useEffect } from 'react';
export const ChikenpoxForm = ({
  issueDate,
  onChange,
  disabled,
  seriesDates,
  immunityType,
  vaccineDocumentKey,
  onSubmit,
  file,
  loading,
  onSignUrl,
  originalData,
  goToPrevious,
  handleFormIsUpdated,
  handleFormIsValid,
}: VaccineFormProps & { originalData?: Partial<UserVaccination> }) => {
  const clearForm = (e?: string) => {
    if (e) onChange('immunityType', e);
    onChange('issueDate', '');
    onChange('expiryDate', '');
    onChange('seriesDates', []);
  };

  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('varicella', false);
      return;
    }

    if (immunityType === 'Titer') {
      if (!file || !issueDate) {
        handleFormIsValid?.('varicella', false);
      } else {
        handleFormIsValid?.('varicella', true);
      }

      if (
        originalData?.issueDate === issueDate &&
        originalData?.vaccineDocumentKey === file
      ) {
        handleFormIsUpdated?.('varicella', false);
      } else {
        handleFormIsUpdated?.('varicella', true);
      }
    } else if (immunityType === 'Natural Immunity') {
      if (!file || !issueDate) {
        handleFormIsValid?.('varicella', false);
      } else {
        handleFormIsValid?.('varicella', true);
      }
      ///Check if form is updated

      if (
        originalData?.issueDate === issueDate &&
        originalData?.vaccineDocumentKey === file
      ) {
        handleFormIsUpdated?.('varicella', false);
      } else {
        handleFormIsUpdated?.('varicella', true);
      }
    } else {
      if (!file || !(seriesDates && seriesDates.length === 2)) {
        handleFormIsValid?.('varicella', false);
      } else {
        handleFormIsValid?.('varicella', true);
      }

      ///Check if form is updated
      if (
        originalData?.seriesDates?.[0] === seriesDates?.[0] &&
        originalData?.seriesDates?.[1] === seriesDates?.[1] &&
        originalData?.vaccineDocumentKey === file
      ) {
        handleFormIsUpdated?.('varicella', false);
      } else {
        handleFormIsUpdated?.('varicella', true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesDates, immunityType, issueDate, loading, file]);

  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Immunity Type" required>
          <Select
            defaultValue="Natural Immunity"
            onChange={(e: string) => clearForm(e)}
            placement="bottomLeft"
            placeholder="Select Immunity Type"
            value={immunityType || null}
            options={[
              { value: 'Natural Immunity', label: 'Natural Immunity' },
              { value: 'Titer', label: 'Titer' },
              { value: 'Vaccination', label: 'Vaccination' },
            ]}
          />
        </FlexContainer>
        {immunityType !== 'Vaccination' ? (
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
        ) : (
          <FlexContainer labelRequired={false} required label={''}>
            <LabeledDateInputMolecule
              name="seriesDate0"
              picker="date"
              required
              onDateChange={(_, v) => {
                let dates = [...(seriesDates ?? [])];
                if (v === '') {
                  dates = [];
                  onChange('seriesDates', dates);
                  return;
                }
                dates = [v];
                onChange('seriesDates', dates);
              }}
              value={
                seriesDates && seriesDates?.length > 0 ? seriesDates?.[0] : ''
              }
              label={`Series 1`}
              maxDate={toFullDateYearMonthDay(new Date())}
            />
          </FlexContainer>
        )}
      </div>
      {/* for option vaccination */}
      {immunityType === 'Vaccination' ? (
        <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
          <FlexContainer labelRequired={false} required label={''}>
            <LabeledDateInputMolecule
              name="seriesDate1"
              picker="date"
              required
              onDateChange={(_, v) => {
                let dates = [...(seriesDates ?? [])];
                dates = [dates[0], v];
                onChange('seriesDates', dates);
              }}
              disabled={seriesDates == null || seriesDates?.length < 1}
              minDate={
                seriesDates && seriesDates?.length > 0
                  ? seriesDates?.[0]
                  : undefined
              }
              maxDate={toFullDateYearMonthDay(new Date())}
              value={
                seriesDates && seriesDates?.length > 1 ? seriesDates?.[1] : ''
              }
              label={`Series 2`}
            />
          </FlexContainer>
          <FlexContainer label="Upload Varicella Vaccination Card" required>
            <FileInput
              id="chickenPoxVaccineCard"
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
              showSelected
              accept=".jpg,.png,.pdf"
              className="text-body text-textColor flex justify-between items-center w-full"
              onSignUrl={onSignUrl}
            >
              <CloudUploadFilled className="text-[24px]" />
            </FileInput>
          </FlexContainer>
        </div>
      ) : null}
      {immunityType !== 'Vaccination' && (
        <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
          <FlexContainer label="Upload Varicella Vaccination Card" required>
            <FileInput
              id="chickenPoxVaccineCard"
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
              showSelected
              accept=".jpg,.png,.pdf"
              className="text-body text-textColor flex justify-between items-center w-full"
              onSignUrl={(e) => {
                onChange('file', e);
                return onSignUrl ? onSignUrl(e) : new Promise(() => {});
              }}
            >
              <CloudUploadFilled className="text-[24px]" />
            </FileInput>
          </FlexContainer>
        </div>
      )}
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
