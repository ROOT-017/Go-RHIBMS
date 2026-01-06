import { useTranslation } from 'react-i18next';
import {
  useOnChangeQueryParams,
  useQueryParams,
} from '../../hooks/common.hooks';
import { useDispatch, useSelector } from '../../store';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import toast from 'react-hot-toast';
import {
  TypedRecord,
  JobPosition,
  JobPostRequest,
  MedicalCenter,
  JobTemplate,
  JobPosting,
} from '../../@types';
import {
  findJobPostById,
  findPositionsByTitle,
  findSalaryByStateAndPosition,
  findTemplateById,
} from '../../api/jobs.api';
import { JobTypeName } from '../../constants';
import { jobsActions } from '../../store/features/slices/jobs';
import { padZero } from '../../utils/date-time';
import { CamelCase } from '../../utils/strings';

export type JobPostErrors = Partial<TypedRecord<JobPostRequest, string>>;
export type JobPostDirtyState = Partial<TypedRecord<JobPostRequest, boolean>>;
import { getNextStartTime, getStartTimeInterval, XArrays } from '../../utils';
import { queryDict, queryNames } from '../../routes/query-definitions';
import { jobTemplateActions } from '../../store/features/slices/jobs/templates';

export const usePostJob = (jobType: JobTypeName) => {
  const { payload: user } = useSelector((state) => state.user);
  const medicalCenters = useSelector((state) => state.medicalCenters.payload);
  const templates = useSelector((state) => state.jobTemplates?.payload);
  const q = useQueryParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [canSaveAsTemplate, setCanSaveAsTemplate] = useState(true);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [jobTemplate, setJobTemplate] = useState<JobTemplate>();
  const [startTime, setStartTime] = useState<Dayjs | null>(getNextStartTime());
  const [endTime, setEndTime] = useState<Dayjs | null>(getStartTimeInterval());
  const [minEndTime, setMinEndTime] = useState<Dayjs | null>(
    dayjs().add(4, 'hour').minute(0).second(0),
  );

  const [startDate, setStartDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [numberOfShift, setNumberOfShift] = useState<number | undefined>(1);
  const [shiftsPerWeek, setShiftsPerWeek] = useState<number | undefined>(1);
  const [schedule, setSchedule] = useState<string[] | undefined>();

  const [repeatShift, setRepeatShift] = useState(false);

  // position title
  const [medicalPosition, setMedicalPosition] = useState<JobPosition>();
  const [specialistsPositions, setSpecialistPositions] = useState<string[]>([]);
  const [positionSuggestions, setPositionSuggestions] = useState<JobPosition[]>(
    [],
  );

  // service details
  const [typesOfServices, setTypesOfServices] = useState<string[]>([]);
  const [clinicalContact, setClinicalContact] = useState<number>();
  const [patientPopulation, setPatientPopulation] = useState('');

  // job description
  const [description, setDescription] = useState('');
  // additional details
  const [additionalDetails, setAdditionalDetails] = useState('');

  // rates
  const [hourlyRate, setHourlyRate] = useState<number>();
  const [oneTimeBonus, setOneTimeBonus] = useState<number>();
  const [daysBetween, setDaysBetween] = useState<number>();
  const [maxEndDate, setMaxEndDate] = useState<string>(
    dayjs().format('YYYY-MM-DD'),
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<JobPostErrors>({});
  const [isDirty, setIsDirty] = useState<
    Partial<Record<keyof JobPostErrors, boolean>>
  >({});

  const [postMedicalCenter, setPostCenter] = useState<MedicalCenter>();

  const [isEditMode, setEditMode] = useState(false);
  const [jobPost, setJobPost] = useState<JobPosting>();

  const debounceRef = useRef(-1);

  useEffect(() => {
    if (
      medicalCenters?.active?.clinicalContacts &&
      medicalCenters?.active?.clinicalContacts?.length === 1
    ) {
      setClinicalContact(medicalCenters?.active?.clinicalContacts?.[0].id);
    }
  }, [medicalCenters?.active?.clinicalContacts]);

  useEffect(() => {
    if (medicalCenters?.active?.id != null) {
      setPostCenter(medicalCenters?.active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalCenters?.active?.id]);

  useEffect(() => {
    findPositionsByTitle('', {
      page: 0,
      size: 500,
    }).then((res) => {
      if (res.data) {
        setPositionSuggestions(() => res.data.content);
      }
    });
  }, []);

  useEffect(() => {
    if (medicalPosition) {
      findSalaryByStateAndPosition(
        String(postMedicalCenter?.state),
        medicalPosition?.title,
      ).then((res) => {
        if (res.data && res.data.length > 0) {
          const rate = res.data[0].hrRateAdj;
          const hrRate = Math.round(rate * 100) / 100;
          setHourlyRate(hrRate);
        }
      });
    }
  }, [medicalPosition, postMedicalCenter?.state]);

  useEffect(() => {
    if (q.startDate) {
      setStartDate(String(q.startDate));
      if (q.startTime) {
        setStartTime(dayjs(`${q.startDate} ${q.startTime}`));
        setEndTime(dayjs(`${q.startDate} ${q.startTime}`).add(15, 'minutes'));
      }
    }
  }, [q.startDate, q.startTime]);

  useEffect(() => {
    if (
      q?.[queryNames.TEMPLATE] != null &&
      q?.[queryNames.TEMPLATE]?.trim?.() != ''
    ) {
      const templateId = String(q?.[queryNames.TEMPLATE]);
      if (
        templates?.latest?.id != null &&
        String(templates?.latest?.id) == templateId
      ) {
        setJobTemplate(templates?.latest);
      } else {
        const index = templates?.records?.[jobType]?.content?.findIndex(
          (temp) => String(temp.id) == templateId,
        );
        if (index != null && index > -1) {
          setJobTemplate(templates?.records?.[jobType]?.content[index]);
        } else {
          // load template by id
          findTemplateById(templateId)
            .then((res) => {
              if (res.data != null) {
                setJobTemplate(res.data);
              }
            })
            .catch(() => {
              toast.error(
                'Could not apply template: ' +
                  templateId +
                  '. Please continue!',
              );
            });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.[queryNames.TEMPLATE], templates?.latest, templates?.records]);

  useEffect(() => {
    if (jobTemplate?.additionalDetails != null) {
      setAdditionalDetails(jobTemplate.additionalDetails?.join(', '));
      // setErrors(err => ({ ...(err), additionalDetails: undefined }));
    }
    if (
      jobTemplate?.positionId &&
      positionSuggestions != null &&
      positionSuggestions?.length > 0
    ) {
      const pIndex = positionSuggestions.findIndex(
        (p) => String(p.id) == String(jobTemplate?.positionId),
      );
      if (pIndex > -1) {
        const position = positionSuggestions[pIndex];
        setMedicalPosition(position);
      }
    }
    if (jobTemplate?.specialties != null) {
      setSpecialistPositions(jobTemplate?.specialties);
    }
    if (jobTemplate?.serviceTypes != null) {
      setTypesOfServices(jobTemplate?.serviceTypes);
    }
    if (jobTemplate?.servicePatientPopulationType != null) {
      setPatientPopulation(jobTemplate?.servicePatientPopulationType);
    }
  }, [
    jobTemplate?.additionalDetails,
    jobTemplate?.id,
    jobTemplate?.positionId,
    jobTemplate?.specialties,
    jobTemplate?.serviceTypes,
    jobTemplate?.servicePatientPopulationType,
    positionSuggestions,
  ]);

  useEffect(() => {
    if (q?.[queryNames.ACTION] == queryDict.Default[queryNames.ACTION].Edit) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.[queryNames.ACTION]]);

  useEffect(() => {
    const postId = Number(q?.[queryNames.JOB]);
    if (isEditMode && !Number.isNaN(postId)) {
      findJobPostById(postId).then((res) => {
        if (res.data) {
          setJobPost(res.data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, q?.[queryNames.JOB]]);

  useEffect(() => {
    if (jobPost?.startTime != null) {
      setStartTime(dayjs(jobPost.startTime, 'HH:mm:ss'));
    }
    if (jobPost?.endTime != null) {
      setEndTime(dayjs(jobPost.endTime, 'HH:mm:ss'));
    }
    if (jobPost?.startDate != null) {
      setStartDate(jobPost.startDate);
    }
    if (jobPost?.endDate != null) {
      setEndDate(jobPost.endDate);
    }
    if (jobPost?.additionalDetails != null) {
      setAdditionalDetails(jobPost.additionalDetails?.join(', '));
      // setErrors(err => ({ ...(err), additionalDetails: undefined }));
    }
    if (
      jobPost?.listedPosition?.id &&
      positionSuggestions != null &&
      positionSuggestions?.length > 0
    ) {
      const pIndex = positionSuggestions.findIndex(
        (p) => String(p.id) == String(jobPost?.listedPosition?.id),
      );
      if (pIndex > -1) {
        const position = positionSuggestions[pIndex];
        setMedicalPosition(position);
      }
    }
    if (jobPost?.specialties != null) {
      setSpecialistPositions(jobPost?.specialties);
    }
    if (jobPost?.serviceTypes != null) {
      setTypesOfServices(jobPost?.serviceTypes);
    }
    if (jobPost?.servicePatientPopulationType != null) {
      setPatientPopulation(jobPost?.servicePatientPopulationType);
    }
    if (jobPost?.repeatShift != null) {
      setRepeatShift(jobPost?.repeatShift);
    }
    if (jobPost?.hourlyRate != null) {
      setHourlyRate(jobPost?.hourlyRate);
    }
    if (jobPost?.oneTimeBonus != null) {
      setOneTimeBonus(jobPost.oneTimeBonus);
    }
    const contactInfo = Number(jobPost?.contactInfo);
    if (!Number.isNaN(contactInfo)) {
      setClinicalContact(contactInfo);
    }
    if (jobPost?.medicalCenter != null) {
      setPostCenter(jobPost?.medicalCenter);
    }
    const numShifts = Number(jobPost?.numberOfShifts);
    if (!Number.isNaN(numShifts)) {
      setNumberOfShift(numShifts);
    }
    const shiftPWeek = Number(jobPost?.shiftsPerWeek);
    if (!Number.isNaN(shiftPWeek)) {
      setShiftsPerWeek(shiftPWeek);
    }

    if (jobPost?.schedule != null) {
      setSchedule(jobPost?.schedule);
    }
  }, [
    jobPost?.startTime,
    jobPost?.endTime,
    jobPost?.startDate,
    jobPost?.endDate,
    jobPost?.additionalDetails,
    jobPost?.id,
    jobPost?.listedPosition?.id,
    jobPost?.specialties,
    jobPost?.serviceTypes,
    jobPost?.servicePatientPopulationType,
    jobPost?.repeatShift,
    jobPost?.hourlyRate,
    jobPost?.oneTimeBonus,
    jobPost?.contactInfo,
    jobPost?.medicalCenter,
    jobPost?.numberOfShifts,
    jobPost?.shiftsPerWeek,
    jobPost?.schedule,
    positionSuggestions,
  ]);

  useEffect(() => {
    if (
      endTime != null &&
      startTime != null &&
      startDate == endDate &&
      startDate != null
    ) {
      // check if there is a difference in days
      const daysDiff = endTime.get('day') - startTime.get('day');
      setEndDate(dayjs(startDate).add(daysDiff, 'day').format('YYYY-MM-DD'));
    }
  }, [startTime, endTime, startDate, endDate]);

  const parseDateTime = (date?: Date) => (pick: 'time' | 'year' | 'date') => {
    if (date) {
      switch (pick) {
        case 'date':
          return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
        case 'time':
          return `${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
      }
    }
  };

  const initializeInputs = () => {
    setDescription('');
    setAdditionalDetails('');
    setMedicalPosition(undefined);
    setSpecialistPositions([]);
    setIsDirty({});
  };

  const changeQueryParams = useOnChangeQueryParams();

  const handleSubmitJobPost = () => {
    setLoading(true);
    const request: Partial<JobPostRequest> = {
      jobType:
        q?.selectedView === 'perdiem'
          ? JobTypeName.PER_DIEM
          : JobTypeName.ASSIGNMENT,
      startTime: parseDateTime(startTime?.toDate())('time'),
      endTime: parseDateTime(endTime?.toDate())('time'),
      startDate: parseDateTime(new Date(startDate))('date'),
      endDate: parseDateTime(new Date(endDate))('date'),
      description,
      additionalDetails: additionalDetails ? [additionalDetails] : [],
      hourlyRate,
      oneTimeBonus,
      position: medicalPosition?.title ?? '',
      contactInfo: clinicalContact,
      servicePatientPopulationType: patientPopulation,
      serviceTypes: typesOfServices,
      specialties: specialistsPositions,
      numberOfShift,
      repeatShift,
      title: postMedicalCenter?.centerName,
      positionId: medicalPosition?.id,
      schedule,
      shiftsPerWeek: shiftsPerWeek,
      medicalCenterId: postMedicalCenter?.id,
    };

    // return;
    (isEditMode && jobPost?.id != null
      ? dispatch(jobsActions.updateJobPost({ data: request, id: jobPost?.id }))
      : dispatch(jobsActions.createJobPost(request))
    )
      .unwrap()
      .then((res) => {
        setLoading(false);
        toast.success(t('job-post-create-success'));
        initializeInputs();
        changeQueryParams((params) => params.delete('workspace'));
        if (saveAsTemplate) {
          dispatch(
            jobTemplateActions.createJobTemplate({
              title: res.title,
              positionId: request.positionId,
              jobType: res.jobType,
              medicalCenterId: request.medicalCenterId,
              position: res.position,
              additionalDetails: res.additionalDetails,
              specialties: res.specialties,
              servicePatientPopulationType: res.servicePatientPopulationType,
              jobId: res.id,
              serviceTypes: res.serviceTypes,
            }),
          );
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSearchPosition = (title: string) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      findPositionsByTitle(title, {
        page: 0,
        size: 500,
      }).then((res) => {
        if (res.data) {
          setPositionSuggestions(() => res.data.content);
        }
      });
    }, 500);
  };

  useEffect(() => {
    const CommonInputs: Partial<Record<keyof JobPostRequest, unknown>> = {
      startTime,
      endTime,
      startDate,
      endDate,
      position: medicalPosition,
      specialties: specialistsPositions,
      serviceTypes: typesOfServices,
      contactInfo: clinicalContact,
      servicePatientPopulationType: patientPopulation,
      additionalDetails,
      hourlyRate,
    };
    Object.entries(CommonInputs).forEach(([key, val]) => {
      if (
        val == null ||
        (Array.isArray(val) && val.length < 1) ||
        (typeof val != 'boolean' && !val)
      ) {
        setErrors((prev) => ({
          ...prev,
          [key]: `${CamelCase.toSentenceCase(key)} is required`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    });
    if (jobType == JobTypeName.PER_DIEM) {
      if ((repeatShift && endDate == null) || !endDate) {
        setErrors((prev) => ({
          ...prev,
          endDate: `${CamelCase.toSentenceCase('endDate')} is required`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, endDate: undefined }));
      }
      if (numberOfShift == null || !numberOfShift) {
        setErrors((prev) => ({
          ...prev,
          numberOfShift: `${CamelCase.toSentenceCase('numberOfShift')} is required`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, numberOfShift: undefined }));
      }
      if (
        repeatShift &&
        (!schedule || (Array.isArray(schedule) && schedule.length == 0))
      ) {
        setErrors((prev) => ({ ...prev, schedule: `Schedule is required` }));
      } else {
        setErrors((prev) => ({ ...prev, schedule: undefined }));
      }
    }
    if (jobType == JobTypeName.ASSIGNMENT) {
      if (!numberOfShift) {
        setErrors((prev) => ({
          ...prev,
          numberOfShift: `${CamelCase.toSentenceCase('numberOfShifts')} is required`,
        }));
      } else {
        setErrors((prev) => ({ ...prev, numberOfShift: undefined }));
      }
      if (numberOfShift && numberOfShift > 0) {
        if (!shiftsPerWeek) {
          setErrors((prev) => ({
            ...prev,
            shiftsPerWeek: `${CamelCase.toSentenceCase('shiftsPerWeek')} is required`,
          }));
        } else {
          setErrors((prev) => ({ ...prev, shiftsPerWeek: undefined }));
        }
        if (
          shiftsPerWeek &&
          (!schedule || (Array.isArray(schedule) && schedule.length == 0))
        ) {
          setErrors((prev) => ({ ...prev, schedule: `Schedule is required` }));
        } else if (
          schedule &&
          shiftsPerWeek &&
          (shiftsPerWeek > 7 || shiftsPerWeek < 1)
        ) {
          setErrors((prev) => ({
            ...prev,
            shiftsPerWeek: `Shifts per week should be between. 1 and 7`,
            schedule: undefined,
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            shiftsPerWeek: undefined,
            schedule: undefined,
          }));
        }
      } else {
        setErrors((prev) => ({ ...prev, schedule: undefined }));
      }
    }
    if (jobTemplate != null) {
      let isEqual = true;
      if (additionalDetails !== jobTemplate.additionalDetails.join(', ')) {
        isEqual = false;
      } else if (
        String(medicalPosition?.id) != String(jobTemplate.positionId)
      ) {
        isEqual = false;
      } else if (
        !XArrays.equals(specialistsPositions, jobTemplate.specialties)
      ) {
        isEqual = false;
      } else if (!XArrays.equals(typesOfServices, jobTemplate.serviceTypes)) {
        isEqual = false;
      } else if (
        patientPopulation != jobTemplate.servicePatientPopulationType
      ) {
        isEqual = false;
      }
      setCanSaveAsTemplate(!isEqual);
    }
  }, [
    additionalDetails,
    clinicalContact,
    endDate,
    endTime,
    hourlyRate,
    jobType,
    medicalPosition,
    numberOfShift,
    patientPopulation,
    repeatShift,
    schedule,
    shiftsPerWeek,
    specialistsPositions,
    startDate,
    startTime,
    typesOfServices,
    jobTemplate,
  ]);

  const disableSubmit = useMemo(() => {
    return Object.values(errors).some((v) => v != null);
  }, [errors]);

  const onBlur = (
    e:
      | ChangeEvent<HTMLInputElement>
      | {
          target: {
            name: string;
            value?: string;
            validity?: Partial<ValidityState>;
            checked?: boolean;
          };
        },
  ) => {
    setIsDirty((prev) => ({ ...prev, [e?.target?.name]: true }));
  };

  return {
    startTime,
    endTime,
    minEndTime,
    startDate,
    endDate,
    numberOfShift,
    repeatShift,
    medicalPosition,
    specialistsPositions,
    positionSuggestions,
    typesOfServices,
    clinicalContact,
    patientPopulation,
    description,
    additionalDetails,
    hourlyRate,
    oneTimeBonus,
    loading,
    user,
    daysBetween,
    maxEndDate,
    t,
    disableSubmit,
    shiftsPerWeek,
    schedule,
    postMedicalCenter,
    medicalCenters,
    canSaveAsTemplate,
    saveAsTemplate,
    isEditMode,
    setSaveAsTemplate,
    setMaxEndDate,
    setDaysBetween,
    setStartTime,
    setEndTime,
    setMinEndTime,
    setStartDate,
    setEndDate,
    setNumberOfShift,
    setRepeatShift,
    setMedicalPosition,
    setSpecialistPositions,
    setPositionSuggestions,
    setTypesOfServices,
    setClinicalContact,
    setPatientPopulation,
    setDescription,
    setOneTimeBonus,
    setAdditionalDetails,
    setHourlyRate,
    changeQueryParams,
    handleSubmitJobPost,
    handleSearchPosition,
    setShiftsPerWeek,
    setSchedule,
    onBlur,
    setPostCenter,
    errors,
    isDirty,
  };
};
