import { Select } from 'antd';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { ClinicalContact } from '../../@types';
import { PatientPopTypeName } from '../../constants';
import { fetchServiceTypes } from '../../api/jobs.api';
import { MultiSelect } from '../Input/MultiSelect';
import { JobPostDirtyState, JobPostErrors } from './postjob.hooks';
import { ErrorLabel } from '../Input/ErrorLabel';
import { OnBlurEventHandler } from '../../utils/domHelpers';

export type ServiceDetailsProp = {
  typesOfServices: string[];
  setTypesOfServices: Dispatch<SetStateAction<string[]>>;
  clinicalContact?: number;
  setClinicalContact: Dispatch<SetStateAction<number | undefined>>;
  patientPopulation: string;
  setPatientPopulation: Dispatch<SetStateAction<string>>;
  clinicalContactList?: ClinicalContact[];
  errors?: JobPostErrors;
  onBlur?: OnBlurEventHandler,
  isDirty?: JobPostDirtyState
};
export default function ServiceDetails({
  typesOfServices,
  setTypesOfServices,
  clinicalContact,
  setClinicalContact,
  patientPopulation,
  setPatientPopulation,
  clinicalContactList,
  errors,
  isDirty,
  onBlur,
}: ServiceDetailsProp) {
  const [typesofServices, setServices] = useState<string[]>([]);

  const handleClinicalContactChange = (value: number): void => {
    setClinicalContact(value);
  };

  const handlePatientPopulationChange = (value: string): void => {
    setPatientPopulation(value);
  };

  useEffect(() => {
    fetchServiceTypes().then((data: string) => {
      setServices(data.replace(/\r/g, '').split('\n'));
    });
  }, []);

  const contact = useMemo(() => {
    return clinicalContactList?.find(
      (c) => String(c.id) === String(clinicalContact),
    );
  }, [clinicalContact, clinicalContactList]);

  return (
    <div className="flex w-full gap-10 p-2 md:p-8 flex-col mt-[-10px] pb-10">
      <h2 className="text-smallSubHeading font-[600] flex text-textColor">
        Service Information <span className="text-errorColor ">*</span>
      </h2>
      <div className="flex flex-col md:flex-col gap-4 md:gap-12 mt-[-10px]">
        <div className="flex flex-col gap-2 flex-1 relative">
          <label className="require-field text-[1.6rem] text-textColor font-[600]">
            Types of Service
          </label>
          <MultiSelect
            className="min-h-[38px] text-left"
            value={typesOfServices}
            style={{ width: '100%' }}
            onChange={setTypesOfServices}
            placeholder="Please select"
            options={typesofServices?.map((s) => ({ label: s, value: s }))}
            status={isDirty?.serviceTypes && errors?.serviceTypes ? 'error' : ''}
            onBlur={() => onBlur?.({
              target: {
                name: 'serviceTypes',
                value: typesOfServices?.join(','),
                validity: {
                  valid: typesOfServices != null,
                  valueMissing: typesOfServices == null
                }
              }
            })}
          />
          <ErrorLabel error={isDirty?.serviceTypes ? errors?.serviceTypes : undefined} className="absolute" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-12 mt-[-10px]">
          <div className="flex flex-col gap-2 flex-1 relative">
            <label className="text-[1.6rem] text-left text-textColor font-[600]">
              Patient Population
            </label>
            <Select
              className="h-[38px] text-left"
              value={patientPopulation || undefined}
              style={{ width: '100%' }}
              placeholder="Please select Patient Population"
              options={Object.values(PatientPopTypeName).map((n) => ({
                value: n,
                label: n,
              }))}
              onChange={handlePatientPopulationChange}
              status={isDirty?.servicePatientPopulationType && errors?.servicePatientPopulationType ? 'error' : ''}
              onBlur={() => onBlur?.({
                target: {
                  name: 'servicePatientPopulationType',
                  value: patientPopulation,
                  validity: {
                    valid: patientPopulation != null,
                    valueMissing: patientPopulation == null
                  }
                }
              })}
            />
            <ErrorLabel error={isDirty?.servicePatientPopulationType ?  errors?.servicePatientPopulationType : undefined} className="absolute" />
          </div>
          <div className="flex flex-col gap-2 flex-1 relative">
            <label className="text-[1.6rem] text-left text-textColor font-[600]">
              Clinical Contact
            </label>
            <Select
              className="h-[38px] text-left"
              value={contact ? contact?.id : undefined}
              style={{ width: '100%' }}
              placeholder="Please select Clinical Contact"
              options={clinicalContactList?.map((c) => ({
                label: `${c.firstName ?? ''} ${c.lastName ?? ''}`,
                value: c.id,
              }))}
              onChange={handleClinicalContactChange}
              status={errors?.contactInfo ? 'error' : ''}
            />
            <ErrorLabel error={errors?.contactInfo} className="absolute" />
          </div>
        </div>
        <small className="text-left text-textColor">
          You will only be charge if a healthcare professional completes this
          shift
        </small>
      </div>
    </div>
  );
}
