import { Select } from 'antd';
import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import { VaccineFormProps } from './types';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { UserVaccination } from '../../../../@types';
import { useEffect } from 'react';

export const HepatitisForm = ({
  onChange,
  disabled,
  seriesDates,
  vaccineDocumentKey,
  finalDate,
  immunityType,
  loading,
  file,
  onSubmit,
  onSignUrl,
  originalData,
  handleFormIsValid,
  handleFormIsUpdated,
  goToPrevious,
}: VaccineFormProps & { originalData?: Partial<UserVaccination> }) => {
  const clearFormWhenImmunityTypeChanged = (e: string) => {
    onChange('seriesDates', []);
    onChange('immunityType', e);
    onChange('finalDate', '');
  };

  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('hepatitis', false);
      return;
    }
    if (immunityType === 'Titer') {
      if (!finalDate || (!vaccineDocumentKey && !file)) {
        handleFormIsValid?.('hepatitis', false);
      } else {
        handleFormIsValid?.('hepatitis', true);
      }
      ///Check if form is updated
      if (
        originalData?.finalDate === finalDate &&
        originalData?.vaccineDocumentKey === file
      ) {
        handleFormIsUpdated?.('hepatitis', false);
      } else {
        handleFormIsUpdated?.('hepatitis', true);
      }
    } else {
      if (
        (seriesDates && seriesDates.length < 3) ||
        (!file && !vaccineDocumentKey)
      ) {
        handleFormIsValid?.('hepatitis', false);
      } else {
        handleFormIsValid?.('hepatitis', true);
      }

      ///Check if form is updated
      if (
        originalData?.seriesDates?.[0] === seriesDates?.[0] &&
        originalData?.seriesDates?.[1] === seriesDates?.[1] &&
        originalData?.seriesDates?.[2] === seriesDates?.[2] &&
        originalData?.vaccineDocumentKey === file
      ) {
        handleFormIsUpdated?.('hepatitis', false);
      } else {
        handleFormIsUpdated?.('hepatitis', true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    originalData,
    seriesDates,
    vaccineDocumentKey,
    finalDate,
    file,
    immunityType,
    finalDate,
    loading,
  ]);

  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer label="Immunity Type" required>
          <Select
            defaultValue="series"
            onChange={(e: string) => clearFormWhenImmunityTypeChanged(e)}
            placement="bottomLeft"
            placeholder="Select Immunity Type"
            value={immunityType ?? null}
            options={[
              { value: 'Series', label: 'Series' },
              { value: 'Titer', label: 'Titer' },
            ]}
          />
        </FlexContainer>
      </div>
      {immunityType === 'Series' && (
        <>
          <div className="flex w-full gap-8 flex-col md:flex-row mt-[20px]">
            <LabeledDateInputMolecule
              name="seriesDate0"
              picker="date"
              required
              maxDate={toFullDateYearMonthDay(new Date())}
              onDateChange={(_, v) => {
                let dates = [...(seriesDates ?? [])];
                dates = [v];
                onChange('seriesDates', dates);
              }}
              value={
                seriesDates && seriesDates?.length > 0 ? seriesDates?.[0] : ''
              }
              label={`Series 1`}
            />
            <LabeledDateInputMolecule
              name="seriesDate1"
              picker="date"
              required
              maxDate={toFullDateYearMonthDay(new Date())}
              onDateChange={(_, v) => {
                let dates = [...(seriesDates ?? [])];
                if (v === '') {
                  dates = [dates[0]];
                  onChange('seriesDates', dates);
                  return;
                }
                dates = [dates[0], v];
                onChange('seriesDates', dates);
              }}
              disabled={seriesDates == null || !seriesDates[0]}
              minDate={
                seriesDates && seriesDates?.length > 0
                  ? seriesDates?.[0]
                  : undefined
              }
              value={
                seriesDates && seriesDates?.length > 1 ? seriesDates?.[1] : ''
              }
              label={`Series 2`}
            />
          </div>
        </>
      )}
      {immunityType && (
        <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
          {immunityType === 'Series' ? (
            <div className="flex-1 w-full">
              <LabeledDateInputMolecule
                name="seriesDate3"
                picker="date"
                required
                maxDate={toFullDateYearMonthDay(new Date())}
                onDateChange={(_, v) => {
                  let dates = [...(seriesDates ?? [])];
                  if (v === '') {
                    dates = [dates[0], dates[1]];
                    onChange('seriesDates', dates);
                    return;
                  }
                  dates = [dates[0], dates[1], v];
                  onChange('seriesDates', dates);
                }}
                value={
                  seriesDates && seriesDates?.length > 2 ? seriesDates?.[2] : ''
                }
                disabled={seriesDates == null || seriesDates?.length < 2}
                minDate={
                  seriesDates && seriesDates?.length > 1
                    ? seriesDates?.[1]
                    : undefined
                }
                label={`Series 3`}
              />
            </div>
          ) : null}
          <FlexContainer
            label={`Upload Hepatitis ${immunityType ?? ''} Vaccination Card`}
            required
          >
            <FileInput
              id="hepatitisVaccinationCard"
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
          {immunityType === 'Titer' && (
            <FlexContainer labelRequired={false} required label={''}>
              <LabeledDateInputMolecule
                name="finalDate"
                picker="date"
                required
                onDateChange={onChange}
                value={finalDate ?? ''}
                label="Date of Final Vaccination"
                maxDate={toFullDateYearMonthDay(new Date())}
                minDate={
                  seriesDates && seriesDates?.length > 2
                    ? seriesDates?.[2]
                    : undefined
                }
              />
            </FlexContainer>
          )}
        </div>
      )}
      {/* when titer is selected */}

      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button
          bordered
          onClick={() => (goToPrevious ? goToPrevious('covid-19') : null)}
        >
          {' '}
          <ArrowLeftOutlined /> Previous
        </Button>
        <ButtonPrimary onClick={onSubmit} disabled={disabled} loading={loading}>
          Save <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </>
  );
};
