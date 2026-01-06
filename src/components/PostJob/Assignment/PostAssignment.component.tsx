import { useEffect, useState } from 'react';
import { JobTypeName } from '../../../constants';
import { ButtonPrimary } from '../../design-system/buttons';
import AdditionalDetailsForm from '../AdditionalDetails.form';
import AvailabilityScheduleForm from '../AvailabilitySchedule.form';
import ConfirmPositionForm from '../ConfirmPosition.form';
import MedicalCenterNameForm from '../MedicalCenterName.form';
import PositionTitleForm from '../PositionTitle.form';
import ServiceDetails from '../ServiceDetails.form';
import { usePostJob } from '../postjob.hooks';

export default function PostAssignment() {
  const {
    startTime,
    endTime, 
    startDate, 
    repeatShift, 
    numberOfShift, 
    endDate, 
    minEndTime, 
    medicalPosition, 
    specialistsPositions, 
    positionSuggestions, 
    typesOfServices, 
    clinicalContact, 
    patientPopulation, 
    additionalDetails, 
    oneTimeBonus, 
    hourlyRate, 
    shiftsPerWeek,
    schedule,
    loading, 
    disableSubmit,
    errors,
    isDirty,
    postMedicalCenter,
    medicalCenters,
    isEditMode,
    maxEndDate,
    setPostCenter,
    handleSubmitJobPost, 
    setHourlyRate, 
    setOneTimeBonus, 
    setAdditionalDetails, 
    setPatientPopulation, 
    setClinicalContact, 
    setTypesOfServices, 
    handleSearchPosition, 
    setSpecialistPositions, 
    setMedicalPosition, 
    setMinEndTime, 
    setEndDate, 
    setNumberOfShift, 
    setRepeatShift, 
    setStartDate, 
    setEndTime, 
    setStartTime,
    setShiftsPerWeek,
    setSchedule,
    onBlur,
    setMaxEndDate
   } = usePostJob(JobTypeName.ASSIGNMENT);

    const [duration, setDuration] = useState<{ hours: number, mins: number }>();
    useEffect(() => {
        if (endTime && startTime) {
          const hours = endTime?.diff(startTime, 'hour') ?? 0;
          const mins = (endTime?.diff(startTime, 'minute') ?? 0) % 60;
          setDuration({ hours, mins });
        } else {
          setDuration(undefined);
        }
         
      }, [startTime, endTime]);

  return (
    <div className="flex md:flex-row relative m-auto w-full gap-4 pb-[20px] flex-col justify-start">
      <div className="flex basis-3/5 flex-col gap-4 mb-[10px]">
        <div className="flex text-left pt-6 bg-[#fff] rounded-[10px] border-solid border-[1px] border-borderColor justify-center items-center">
          <MedicalCenterNameForm
            medicalCenters={medicalCenters?.list}
            active={medicalCenters?.active}
            onChange={(val) => setPostCenter(medicalCenters?.list[val])}
            value={postMedicalCenter?.id ? String(postMedicalCenter?.id) : undefined}
          />
        </div>
        <div className="flex text-left bg-[#fff] pt-6 rounded-[10px] border-solid border-[1px] border-borderColor justify-center items-center">
          <AvailabilityScheduleForm
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            startDate={startDate}
            setStartDate={setStartDate}
            repeatShift={repeatShift}
            setRepeatShift={setRepeatShift}
            numberOfShift={numberOfShift}
            setNumberOfShift={setNumberOfShift}
            endDate={endDate}
            setEndDate={setEndDate}
            minEndTime={minEndTime}
            setMinEndTime={setMinEndTime}
            jobType={JobTypeName.ASSIGNMENT}
            setShiftsPerWeek={setShiftsPerWeek}
            shiftsPerWeek={shiftsPerWeek}
            schedule={schedule}
            setSchedule={setSchedule}
            errors={errors}
            isDirty={isDirty}
            onBlur={onBlur}
            maxEndDate={maxEndDate}
            setmaxEndDate={setMaxEndDate}
          />
        </div>
        <div className="flex text-left pt-6 bg-[#fff] rounded-[10px] border-solid border-[1px] border-borderColor justify-center items-center">
          <PositionTitleForm
            medicalPosition={medicalPosition}
            setMedicalPosition={setMedicalPosition}
            specialistsPositions={specialistsPositions}
            setSpecialistPositions={setSpecialistPositions}
            positionSuggestions={positionSuggestions}
            onSearch={handleSearchPosition}
            errors={errors}
            isDirty={isDirty}
            onBlur={onBlur}
          />
        </div>
        <div className="flex text-left pt-6 rounded-[10px] bg-[#fff] border-solid border-[1px] border-borderColor justify-center items-center">
          <ServiceDetails
            typesOfServices={typesOfServices}
            setTypesOfServices={setTypesOfServices}
            clinicalContact={clinicalContact}
            setClinicalContact={setClinicalContact}
            patientPopulation={patientPopulation}
            setPatientPopulation={setPatientPopulation}
            clinicalContactList={postMedicalCenter?.clinicalContacts}
            errors={errors}
            isDirty={isDirty}
            onBlur={onBlur}
          />
        </div>
        <div className="flex text-left w-full pt-6 bg-[#fff] rounded-[10px] border-solid border-[1px] border-borderColor justify-center items-center">
          <AdditionalDetailsForm
            value={additionalDetails}
            setValue={setAdditionalDetails}
            errors={errors}
            isDirty={isDirty}
            onBlur={onBlur}
          />
        </div>
      </div>
      <div className="flex h-full flex-col text-left basis-2/5 gap-8 py-[25px] bg-whiteColor rounded-[10px] border-solid border-[1px] border-borderColor justify-start items-center sticky top-0">
        <ConfirmPositionForm
          oneTimeBonus={oneTimeBonus}
          setOneTimeBonus={setOneTimeBonus}
          hourlyRate={hourlyRate}
          setHourlyRate={setHourlyRate}
          jobType={JobTypeName.ASSIGNMENT}
          errors={errors}
          isDirty={isDirty}
          isEditMode={isEditMode}
          onBlur={onBlur}
        />
        <div>
          <ButtonPrimary
            onClick={handleSubmitJobPost}
            loading={loading}
            disabled={loading || disableSubmit}
          >
            Post Assignment
          </ButtonPrimary>
        </div>
        {
          duration?.hours ? (
            <div>
              Guaranteed Hours: { (duration?.hours > 1 ? (duration?.hours - 1) : 1) * (shiftsPerWeek ?? 0) } hrs/week
            </div>
          ) : null
        }
      </div>
    </div>
  );
}
