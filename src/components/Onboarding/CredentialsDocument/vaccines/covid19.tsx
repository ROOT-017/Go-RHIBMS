import { Radio, RadioChangeEvent, Select } from 'antd';
import { FlexContainer } from '../../../flex-container';
import { Button, ButtonPrimary } from '../../../design-system/buttons';
import LabeledDateInputMolecule from '../../../LabeledDateInput/LabeledDateInput.molecule';
import { CloudUploadFilled } from '../../../Icons/svg';
import FileInput from '../../../Icons/svg/file-input';
import { VaccineFormProps } from './types';
import { toFullDateYearMonthDay } from '../../../../utils/date-time';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useOnChangeQueryParams } from '../../../../hooks/common.hooks';
import { UserVaccination } from '../../../../@types';
import { useEffect } from 'react';

export const CovidForm = ({
  completeSeriesReceived,
  finalDate,
  manufacturer,
  onChange,
  loading,
  onSubmit,
  vaccineDocumentKey,
  onSignUrl,
  file,
  disabled,
  originalData,
  reasonNotVaccinated,
  handleFormIsValid,
  handleFormIsUpdated,
}: VaccineFormProps & { originalData?: Partial<UserVaccination> }) => {
  const changeQueryParams = useOnChangeQueryParams();
  const clearForm = (e?: RadioChangeEvent) => {
    if (e)
      onChange(
        'completeSeriesReceived',
        e.target.value == 'yes' ? true : false,
      );
    onChange('file', '');
    onChange('finalDate', '');
    onChange('manufacturer', 'Johnson & Johnson');
    onChange('reasonNotVaccinated', '');
  };

  const goToPrevious = (to: string) =>
    changeQueryParams((params) => params.set('todo', to));

  useEffect(() => {
    if (loading) {
      handleFormIsValid?.('covid-19', false);
      return;
    }
    if (completeSeriesReceived) {
      handleFormIsValid?.(
        'covid-19',
        !manufacturer || !finalDate || (!file && !vaccineDocumentKey)
          ? false
          : true,
      );
    } else if (!reasonNotVaccinated) {
      handleFormIsValid?.('covid-19', false);
    } else {
      handleFormIsValid?.('covid-19', true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    completeSeriesReceived,
    originalData,
    reasonNotVaccinated,
    vaccineDocumentKey,
    manufacturer,
    file,
    finalDate,
    loading,
  ]);

  useEffect(() => {
    if (originalData && originalData.completeSeriesReceived) {
      if (
        originalData.manufacturer === manufacturer &&
        originalData.finalDate === finalDate &&
        originalData.vaccineDocumentKey === file
      ) {
        handleFormIsUpdated?.('covid-19', false);
      } else {
        handleFormIsUpdated?.('covid-19', true);
      }
    } else {
      if (originalData?.reasonNotVaccinated === reasonNotVaccinated) {
        handleFormIsUpdated?.('covid-19', false);
      } else {
        handleFormIsUpdated?.('covid-19', true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    originalData,
    completeSeriesReceived,
    originalData,
    reasonNotVaccinated,
    vaccineDocumentKey,
    manufacturer,
    file,
    finalDate,
  ]);

  return (
    <>
      <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
        <FlexContainer
          label="Have you received the complete covid-19 vaccination series?"
          required
        >
          <Radio.Group
            value={completeSeriesReceived ? 'yes' : 'no'}
            onChange={(e) => clearForm(e)}
          >
            <Radio key="yes" value={'yes'}>
              Yes
            </Radio>
            <Radio key="no" value={'no'}>
              No
            </Radio>
          </Radio.Group>
        </FlexContainer>
      </div>
      {completeSeriesReceived ? (
        <>
          {' '}
          <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
            <FlexContainer label="Manufacturer" required>
              <Select
                defaultValue="Johnson & Johnson"
                onChange={(e: string) => onChange('manufacturer', e)}
                placement="bottomLeft"
                placeholder="Select Manufacturer"
                options={[
                  { value: 'Johnson & Johnson', label: 'Johnson & Johnson' },
                  { value: 'Moderna', label: 'Moderna' },
                  { value: 'Phizer', label: 'Phizer' },
                  { value: 'Other', label: 'Other' },
                ]}
                value={manufacturer || null}
              />
            </FlexContainer>
            <FlexContainer labelRequired={false} required label={''}>
              <LabeledDateInputMolecule
                name="finalDate"
                picker="date"
                required
                onDateChange={onChange}
                value={finalDate ?? ''}
                label="Date of Final Vaccination"
                maxDate={toFullDateYearMonthDay(new Date())}
              />
            </FlexContainer>
          </div>
          <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
            <FlexContainer label="Upload COVID-19 Vaccination Card" required>
              <FileInput
                id="covidVaccineCard"
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
      ) : (
        <div className="flex w-full gap-8 mt-[20px] flex-col md:flex-row flex-wrap">
          <FlexContainer label="Reason for Unvaccinated" required>
            <Select
              defaultValue="Medical"
              onChange={(e: string) => onChange('reasonNotVaccinated', e)}
              placement="bottomLeft"
              allowClear
              placeholder="Reason for Unvaccinated"
              options={[
                { value: 'Medical', label: 'Medical' },
                { value: 'Religous', label: 'Religous' },
                { value: 'Other', label: 'Other' },
              ]}
              value={reasonNotVaccinated || null}
            />
          </FlexContainer>
        </div>
      )}

      <div className="flex w-full gap-8 justify-center md:justify-end flex-wrap mt-[40px]">
        <Button bordered onClick={() => goToPrevious('references')}>
          <ArrowLeftOutlined />
          Previous
        </Button>
        <ButtonPrimary onClick={onSubmit} disabled={disabled} loading={loading}>
          Save <ArrowRightOutlined />
        </ButtonPrimary>
      </div>
    </>
  );
};
