import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { userActions } from '../../store/features/slices/user';
import { useDispatch, useSelector } from '../../store';
import toast from 'react-hot-toast';
import {
  useOnChangeQueryParams,
  useQueryParams,
} from '../../hooks/common.hooks';
import {
  AvailabilityBookingBare,
  AvailabilitySlotResponse,
  CalendarRange,
  Covid19Vaccination,
  EmergencyContact,
  InterviewScheduleRequest,
  Reference,
  Test,
  TypedRecord,
  Vaccination,
} from '../../@types';
import {
  calendarView,
  documentRequirements,
  ValidationPattern,
} from '../../constants';
import { isValidFileSize } from '../../utils';
import { signDocForDownload } from '../../api/user.api';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs, OpUnitType } from 'dayjs';
import { getAvailabilitySchedule } from '../../api/scheduling.api';
import {
  rescheduleOnboardingInterview,
  scheduleOnboardingInterview,
} from '../../api/onboarding.api';
import { AvailabilityService } from '../../service/scheduling';
import { dateInRange } from '../../utils/date-time';
import { formatData } from '../Calendar/CalendarWrapper';
import { OnboardingContext } from '../../pages/dashboard/onboarding/context/onboarding.context';

/**
 * This module exports several custom React hooks for managing user data related to various documents.
 * These hooks handle form state, validation, and submission for user profile identification,
 * social security number, emergency contact, references, vaccinations, and medical test records.
 */

/**
 * useProfileIdDocument hook handles the state and validation for user profile identification document.
 * @returns An object containing form state, validation errors, and a submit function.
 */
export const useProfileIdDocument = () => {
  const user = useSelector((state) => state.user.payload);
  const [identificationType, setIdentificationType] = useState('');
  const [additionalIdentificationType, setAdditionalIdentificationType] =
    useState('');
  const [additionalSelectedFile, setAdditionalSelectedFile] = useState<
    FileList[number] | null
  >(null);
  const [requireAdditionalDoc, setRequireAdditionalDoc] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileList[number] | null>(
    null,
  );
  type userPersonalDataType = {
    issueDate: string;
    expiryDate: string;
    identificationType: string;
    addDocIssueDate: string;
    addDocExpiryDate: string;
    additionalIdentificationType: string;
  };

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [userPersonalData, setUserPersonalData] =
    useState<userPersonalDataType>({} as userPersonalDataType);
  const [currUserPersonalData, setCurrUserPersonalData] =
    useState<userPersonalDataType>({} as userPersonalDataType);
  const [fileName, setFileName] = useState('');
  const [additionalFileName, setAdditionalFileName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  const [updatedData, setUpdatedData] = useState<
    Partial<
      Record<
        keyof (userPersonalDataType & {
          selectedFile: string | File;
          additionalSelectedFile: string | File;
        }),
        string | File
      >
    >
  >({});

  const onChange = (key: keyof typeof userPersonalData, value: string) => {
    setUserPersonalData((state) => ({
      ...state,
      [key]: value,
    }));
    setUpdatedData((state) => {
      const target = currUserPersonalData[key];
      if (target === value) {
        const { [key]: _, ...res } = state;
        return res;
      }
      return {
        ...state,
        [key]: value,
      };
    });
  };
  const onSubmit = () => {
    if (selectedFile || additionalSelectedFile) {
      setLoading(true);

      setErrors({});

      dispatch(
        userActions.postProfileIdDocument({
          file: {
            idDoc: selectedFile as File,
            additionalIdDoc: additionalSelectedFile as File,
          },
          data: {
            docType: userPersonalData.identificationType,
            docType2: userPersonalData.additionalIdentificationType,
            docExpiryDate: userPersonalData.expiryDate,
            docIssueDate: userPersonalData.issueDate,
            ...(user?.userProfile?.id
              ? {
                  id: String(user?.userProfile?.id),
                }
              : {}),
          },
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Identity document saved');
          setLoading(false);
          changeQueryParams((params) =>
            params.set('todo', 'social-security-number'),
          );
        })
        .catch(() => {
          toast.error('Failed to save Identity document');
          setLoading(false);
        });
    }
  };

  const onPrevious = () => {
    changeQueryParams((params) => {
      params.set('selectedStep', 'account-creation');
    });
  };
  const onSignUrl = (key: string) =>
    signDocForDownload(key)
      .then((s) => s.data.url)
      .catch(() => '');

  useEffect(() => {
    if (user?.userProfile?.id) {
      const {
        idDocumentKey,
        idDocument2Key,
        idDocumentIssueDate,
        idDocumentExpiryDate,
        idDocumentType,
      } = user.userProfile;
      setFileName(idDocumentKey);
      setAdditionalFileName(idDocument2Key);
      setIdentificationType(idDocumentType);
      setUserPersonalData({
        identificationType: idDocumentType,
        expiryDate: idDocumentExpiryDate,
        issueDate: idDocumentIssueDate,
        additionalIdentificationType: '',
        addDocExpiryDate: '',
        addDocIssueDate: '',
      });
      setCurrUserPersonalData({
        identificationType: idDocumentType,
        expiryDate: idDocumentExpiryDate,
        issueDate: idDocumentIssueDate,
        additionalIdentificationType: '',
        addDocExpiryDate: '',
        addDocIssueDate: '',
      });
    }
    const additionalRequirements: string[] =
      documentRequirements[userPersonalData.identificationType];
    if (additionalRequirements?.length > 0) {
      // Prompt user to also upload additional documents
      setRequireAdditionalDoc(true);
    } else if (additionalRequirements?.length === 0) {
      setRequireAdditionalDoc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const additionalRequirements: string[] =
      documentRequirements[userPersonalData.identificationType];
    if (additionalRequirements?.length > 0) {
      // Prompt user to also upload additional documents
      setRequireAdditionalDoc(true);
    } else if (additionalRequirements?.length === 0) {
      setRequireAdditionalDoc(false);
    }
  }, [userPersonalData.identificationType]);

  useEffect(() => {
    const supportedDocTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (selectedFile)
      if (!isValidFileSize(selectedFile)) {
        // console.error('Selected file greater than 10MB');
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['Identification Document']:
            'File size exceeds the maximum limit (10mb)',
        }));
        setLoading(false);
      } else if (!supportedDocTypes.includes(selectedFile.type)) {
        // console.error('Selected file type not supported');
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['Identification Document']: `${selectedFile.type}: File type not supported, please choose either a .jpg, .png, or .pdf file`,
        }));
        setLoading(false);
      } else {
        setUpdatedData((state) => {
          let currState = state;
          currState = {
            ...state,
            selectedFile,
          };
          return currState;
        });
      }
    if (additionalSelectedFile)
      if (!isValidFileSize(additionalSelectedFile)) {
        console.error('Additional file greater than 10MB');
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['Additional Identification Document']:
            'File size exceeds the maximum limit (10mb)',
        }));
        setLoading(false);
      } else if (!supportedDocTypes.includes(additionalSelectedFile.type)) {
        console.error('Selected file type not supported');
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['Additional Identification Document']: `${additionalSelectedFile.type}: File type not supported, please choose either a .jpg, .png, or .pdf file`,
        }));
        setLoading(false);
      } else {
        setErrors({});
        setUpdatedData((state) => {
          let currState = state;
          currState = {
            ...state,
            additionalSelectedFile,
          };
          return currState;
        });
      }
  }, [additionalSelectedFile, selectedFile]);

  useEffect(() => {
    if (!requireAdditionalDoc) {
      setAdditionalSelectedFile(null);
      setUserPersonalData((state) => {
        return {
          ...state,
          additionalIdentificationType: '',
          addDocIssueDate: '',
          addDocExpiryDate: '',
        };
      });
      setUpdatedData((state) => {
        const {
          additionalIdentificationType: _,
          addDocExpiryDate: __,
          addDocIssueDate: ___,
          ...res
        } = state;
        return res;
      });
    }
  }, [requireAdditionalDoc]);

  const validity = useCallback((): boolean => {
    if (
      userPersonalData.expiryDate &&
      userPersonalData.issueDate &&
      userPersonalData.identificationType &&
      fileName
    ) {
      if (requireAdditionalDoc) {
        if (
          userPersonalData.addDocExpiryDate &&
          userPersonalData.addDocIssueDate &&
          userPersonalData.additionalIdentificationType &&
          additionalFileName
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    return false;
  }, [userPersonalData, fileName, additionalFileName, requireAdditionalDoc]);

  return {
    identificationType,
    selectedFileName: selectedFile?.name || fileName || '',
    additionalSelectedFileName:
      additionalSelectedFile?.name || additionalFileName || '',
    setAdditionalIdentificationType,
    additionalIdentificationType,
    requireAdditionalDoc,
    setIdentificationType,
    setSelectedFile,
    setAdditionalSelectedFile,
    onPrevious,
    errors,
    onSubmit,
    onSignUrl,
    onChange,
    isLoading,
    setFileName,
    setAdditionalFileName,
    userPersonalData,
    formIsUpdated: Object.keys(updatedData).length ? true : false,
    formIsValid: validity(),
  };
};

/**
 * useSocialSecurityNumberDocument hook handles the state and validation for user's social security number document.
 * @returns An object containing form state, validation errors, and a submit function.
 */
export const useSocialSecurityNumberDocument = () => {
  const user = useSelector((state) => state.user.payload);
  const [ssn, setSSN] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileList[number] | null>(
    null,
  );
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [updatedData, setUpdatedData] = useState<
    Partial<Record<keyof { ssn: string; selectedFile: string }, string>>
  >({});
  const [fileName, setFileName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  const isValidSSN = (ssn: string): boolean =>
    ValidationPattern.ssnRegex.test(ssn);

  useEffect(() => {
    const supportedDocTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (selectedFile)
      if (!isValidFileSize(selectedFile)) {
        // console.error('SSN Document file greater than 10MB');
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['SSN document']: 'File size exceeds the maximum limit (10mb)',
        }));
        setLoading(false);
      } else if (!supportedDocTypes.includes(selectedFile.type)) {
        // console.error('SSN document file type not supported');
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['SSN document']: `${selectedFile.type}: File type not supported, please choose either a .jpg, .png, or .pdf file`,
        }));
        setLoading(false);
      } else {
        setUpdatedData((state) => {
          if (selectedFile) {
            return { ...state, selectedFile: 'selectedFile' };
          }
          return state;
        });
      }
  }, [selectedFile]);

  useEffect(() => {
    if (user?.userProfile?.id) {
      const { ssDocumentKey, ssn: ssNumber } = user.userProfile;
      setFileName(ssDocumentKey);
      setSSN(ssNumber);
    }
  }, [user]);

  const onChange = (value: string) => {
    setSSN(value);
    setUpdatedData((state) => {
      if (user?.userProfile?.id) {
        const { ssn: ssNumber } = user.userProfile;
        if (value === ssNumber) {
          const { ssn: _, ...rest } = state;
          return rest;
        }
        return { ...state, ssn: value };
      }
      return state;
    });
  };

  useEffect(() => {
    console.log(updatedData);
  }, [updatedData]);

  const onSubmit = () => {
    if (selectedFile != null || fileName != null) {
      setLoading(true);
      // Validate SSN
      if (!isValidSSN(ssn)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ssn: 'Invalid SSN format',
        }));
        setLoading(false);
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ssn: null,
        }));
      }
      // Validate file size
      if (!isValidFileSize(selectedFile)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: 'File size exceeds the maximum limit(10mb)',
        }));
        setLoading(false);
        return;
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: null,
        }));
      }
      setErrors({ ssn: null, file: null });
      dispatch(
        userActions.postSSNDocument({
          file: selectedFile,
          data: {
            ssn: ssn,
            ...(user?.userProfile?.id
              ? {
                  id: String(user?.userProfile?.id),
                }
              : {}),
          },
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Social Security info saved');
          setLoading(false);
          changeQueryParams((params) => {
            params.set('selectedStep', 'credentials-document');
            params.set('todo', 'emergency-contact');
          });
        })
        .catch(() => {
          toast.error('Failed to save Social Security info');
          setLoading(false);
        });
    }
  };

  const onPrevious = () => {
    changeQueryParams((params) => {
      params.set('todo', 'identification-document');
    });
  };

  const onSignUrl = (key: string) =>
    signDocForDownload(key)
      .then((s) => s.data.url)
      .catch(() => '');

  return {
    selectedFileName: selectedFile?.name || fileName || '',
    isLoading,
    selectedFile,
    setSelectedFile,
    ssn,
    onChange,
    isValidSSN,
    isValidFileSize,
    onSubmit,
    onPrevious,
    errors,
    onSignUrl,
    formUpdated: Object.keys(updatedData).length ? true : false,
  };
};

/**
 * useEmergencyContactDocument hook handles the state and validation for user's emergency contact document.
 * @returns An object containing form state, validation errors, and a submit function.
 */
export const useEmergencyContactDocument = () => {
  const user = useSelector((state) => state.user.payload);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(true);
  const [formIsUpdated, setFormIsUpdated] = useState<boolean>(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [updatedData, setUpdatedData] = useState<Partial<EmergencyContact>>({});
  const [validity, setValidity] = useState<Record<string, boolean | undefined>>(
    {},
  );
  const [data, setData] = useState<Partial<EmergencyContact>>({});
  const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  const onSubmit = () => {
    if (formIsValid) {
      setLoading(true);
      dispatch(
        userActions.postEmergencyContactDocument({
          data: {
            email: updatedData?.email ?? '',
            firstName: updatedData?.firstName ?? '',
            lastName: updatedData.lastName ?? '',
            phone: updatedData.phone ?? '',
            relationship: updatedData.relationship ?? '',
          },
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Emergency Contact document saved');
          setLoading(false);
          changeQueryParams((params) => params.set('todo', 'references'));
        })
        .catch(() => {
          toast.error('Failed to save Emergency Contact document');
          setLoading(false);
        });
    }
  };

  const onPrevious = () => {
    changeQueryParams((params) => {
      params.set('selectedStep', 'profile-information');
      params.set('todo', 'social-security-number');
    });
  };

  const onChange = (key: keyof EmergencyContact, value: string) => {
    setUpdatedData((state) => ({ ...state, [key]: value }));
    setValidity({ ...validity, [key]: true });
  };

  useEffect(() => {
    const isValid = Object.keys(updatedData).every((key) => {
      const value = updatedData[key as keyof EmergencyContact];
      if (key === 'email') {
        return ValidationPattern.emailReg.test(
          updatedData[key as keyof EmergencyContact] ?? '',
        );
      }
      if (key === 'phone') {
        return validity.phone;
      }
      return typeof value === 'string'
        ? value.trim().length > 0
        : Boolean(value);
    });

    setFormIsValid(isValid);

    const isUpdated = Object.entries(updatedData).some(
      ([key, value]) => value !== data[key as keyof EmergencyContact],
    );
    setFormIsUpdated(isUpdated);
  }, [updatedData, validity.phone, data]);

  useEffect(() => {
    if (user?.emergencyContacts && user?.emergencyContacts?.length > 0) {
      const { email, firstName, lastName, phone, relationship } =
        user.emergencyContacts[0];
      setUpdatedData({ email, firstName, lastName, phone, relationship });
      setData({
        email,
        firstName,
        lastName,
        phone,
        relationship,
      });
      if (email && firstName && lastName && phone && relationship) {
        setCompleted(true);
      }
    }
  }, [user]);

  return {
    isLoading,

    updatedData,
    validity,
    onSubmit,
    setValidity,
    onPrevious,
    completed,
    onChange,
    formIsValid,
    formIsUpdated,
  };
};

export type ReferenceValidState = Record<
  string,
  Partial<
    TypedRecord<Reference, { valid: boolean | undefined; message?: string }>
  >
>;

export type ReferenceDirtyState = Record<
  string,
  Partial<TypedRecord<Reference, boolean>>
>;

export const initialReferenceRecord: Reference = {
  firstName: '',
  lastName: '',
  // facility: '',
  unit: '',
  title: '',
  startDate: '',
  endDate: '',
  phone: '',
  email: '',
  company: '',
  relationshipWithCandidate: '',
};
/**
 * useReferencesDocument hook handles the state and validation for user's references document.
 * @returns An object containing form state, validation errors, and a submit function.
 */
export const useReferencesDocument = () => {
  const user = useSelector((state) => state.user.payload);
  const [references, setReferences] = useState<Reference[]>([
    {
      ...initialReferenceRecord,
      generatedId: String(window.crypto?.randomUUID() ?? new Date().getTime()),
    },
  ]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [validity, setValidity] = useState<ReferenceValidState>({});
  const [isDirty, setDirty] = useState<ReferenceDirtyState>({});
  const [deletingIndex, setDeletingIndex] = useState(-1);
  const [markedForDelete, setMarkedForDelete] = useState<Reference | null>(
    null,
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  useEffect(() => {
    if (user?.candidateReferences) {
      const referencesData = user.candidateReferences || [];
      setReferences(
        referencesData?.map((r) => {
          return r as unknown as Reference;
        }),
      );
    }
  }, [user?.candidateReferences]);

  // Only validate references WITHOUT an ID (new references)
  const hasMissingFields = (reference: Reference) => {
    if (reference.id) {
      // Saved references are already valid
      return false;
    }

    return (
      !reference.firstName ||
      !reference.lastName ||
      !reference.email ||
      !reference.startDate ||
      !reference.endDate ||
      !isRelationshipValid(reference) ||
      !reference.phone
    );
  };

  // Update relationship validation to handle saved references
  const isRelationshipValid = (reference: Reference) => {
    if (reference.id) return true; // Saved refs are always valid
    if (reference.relationshipWithCandidate === 'Other') {
      return Boolean(reference.otherRelationshipWithCandidate);
    }
    return Boolean(reference.relationshipWithCandidate);
  };

  const onSubmit = () => {
    const data = references?.filter((ref) => ref?.id == null);
    // return;
    if (data?.length > 0) {
      setLoading(true);
      dispatch(
        userActions.postReferencesDocument({
          data: {
            references: data,
            ...(user?.userProfile?.id
              ? {
                  id: String(user?.userProfile?.id),
                }
              : {}),
          },
        }),
      )
        .unwrap()
        .then(() => {
          toast.success('Reference saved');
          setLoading(false);
          changeQueryParams((params) => params.set('todo', 'vaccinations'));
        })
        .catch(() => {
          toast.error('Failed to save Reference Information');
          setLoading(false);
        });
    } else {
      changeQueryParams((params) => params.set('todo', 'vaccinations'));
    }
  };

  const onDelete = (index: number, id: string) => {
    const updatedReferences = [...references];
    const markForDeletion = updatedReferences[index];
    if (markForDeletion?.id != null) {
      // If the reference has an ID, delete from db
      if (markForDeletion?.jsonRepresentation == null) {
        setMarkedForDelete(markForDeletion);
        dispatch(
          userActions.deleteCandidateReference(Number(markForDeletion.id)),
        )
          .unwrap()
          .then(() => {
            updatedReferences.splice(index, 1);
            setReferences(() => updatedReferences);
            toast.success('Reference deleted');
            setMarkedForDelete(null);
          })
          .catch(() => {
            toast.error('Failed to delete reference');
            setMarkedForDelete(null);
          });
      } else {
        toast.error(
          'Cannot delete this reference because it has responses from referee',
        );
      }
      setMarkedForDelete(null);
    } else if (updatedReferences?.length > 1) {
      updatedReferences.splice(index, 1);
      setReferences(updatedReferences);
      setMarkedForDelete(null);
    } else {
      setReferences([initialReferenceRecord]);
      setMarkedForDelete(null);
    }
    setValidity((prev) => {
      const original = { ...(prev ?? {}) };
      delete original[id];
      return original;
    });
  };

  const isDisAllowedEmail = (index: number, email: string) => {
    return references
      .filter((_, i) => i !== index)
      .some(
        (r) => String(r.email).toLowerCase() === String(email).toLowerCase(),
      );
  };

  const disableSubmit = useMemo(() => {
    // Saved references are always valid
    const savedReferences = references.filter((ref) => ref.id != null);

    // Only validate NEW references (without IDs)
    const newReferences = references.filter((ref) => !ref.id);
    // Check validity of new references
    const invalidNewReferences = newReferences.some((ref) => {
      const hasMissing = hasMissingFields(ref);
      const refKey = String(ref.generatedId);
      const validityErrors = validity[refKey]
        ? Object.values(validity[refKey]).some((v) => !v?.valid)
        : false;
      return hasMissing || validityErrors;
    });

    const validNewReferences = newReferences.filter(
      (ref) => !hasMissingFields(ref),
      // && !validity[String(ref.generatedId)],
    );
    // Total valid references = saved + valid new references
    const totalValidReferences =
      savedReferences.length + validNewReferences.length;

    return (
      isLoading || invalidNewReferences || totalValidReferences < 2 // Require at least 2 valid (saved + new)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [references, validity, isLoading]);
  return {
    isLoading,
    references,
    markedForDelete,
    disableSubmit,
    validity,
    isDirty,
    deleteModal,
    deletingIndex,
    setReferences,
    onSubmit,
    onDelete,
    onPrevious: () => {
      changeQueryParams((params) => params.set('todo', 'emergency-contact'));
    },
    setValidity,
    isDisAllowedEmail,
    setDirty,
    setDeleteModal,
    setMarkedForDelete,
    setDeletingIndex,
  };
};

/**
 * useVaccinationsDocument hook handles the state and validation for user's vaccinations document.
 * @returns An object containing form state, validation errors, and a submit function.
 */
export const useVaccinationsDocument = () => {
  // const user = useSelector((state) => state.user.payload);
  const [vaccinationsData, setVaccinationsData] = useState<{
    [key: string]: Covid19Vaccination;
  }>({});
  const [selectedFiles, setSelectedFiles] = useState<{
    [key: string]: File | null;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [vaccinationConfig, setVaccinationConfig] = useState<Vaccination[]>([]);
  const [activeKey, setActiveKey] = useState<number | undefined>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [displayNextBtn, setDisplayNextBtn] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/config.json');
        const data = await response.json();
        setVaccinationConfig(data.vaccinations);
        initializeVaccinationsData(data.vaccinations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setDisplayNextBtn(false);
  }, []);

  const initializeVaccinationsData = (vaccinations: Vaccination[]) => {
    const initialData: { [key: string]: Covid19Vaccination } = {};
    const initialFiles: { [key: string]: File | null } = {};
    const initialErrors: { [key: string]: string | null } = {};
    vaccinations.forEach((vaccination) => {
      const vaccinationName = vaccination.name
        .replace(/\s+/g, '')
        .toLowerCase();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initialData: { [key: string]: any } = {};
      const initialFiles: { [key: string]: File | null } = {};
      const initialErrors: { [key: string]: string | null } = {};

      switch (vaccinationName) {
        case 'covid19':
          initialData[vaccinationName] = {
            completedVaccSeries: 'No',
            DateOfFinalVacc: '',
            manufacturer: 'JhonsonJhonson',
          };
          break;
        case 'hepatitisb':
          initialData[vaccinationName] = {
            immunityType: 'Passive',
            finalVaccinationDate: '',
            seriesDate1: '',
            seriesDate2: '',
            seriesDate3: '',
          };
          break;
        case 'influenza':
          initialData[vaccinationName] = {
            currentWithShots: 'No',
            fluShotDate: '',
            expirationDate: '',
          };
          break;
        case 'mmr':
        case 'tdap':
        case 'varicella':
          initialData[vaccinationName] = {
            vaccinationDate: '',
          };
          break;
        default:
          // Handle other vaccination types if needed
          break;
      }

      // Initialize files and errors
      initialFiles[vaccinationName] = null;
      initialErrors[vaccinationName] = null;

      setVaccinationsData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
      setSelectedFiles((prevFiles) => ({
        ...prevFiles,
        ...initialFiles,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...initialErrors,
      }));
    });

    setVaccinationsData(initialData);
    setSelectedFiles(initialFiles);
    setErrors(initialErrors);
  };

  const onSubmit = (_vaccination_name: string) => {
    setLoading(true);
    changeQueryParams((params) => params.set('todo', 'medical-records'));

    // Other validations and dispatch logic for submitting the selected file

    // Clear errors and setLoading(false) after dispatch logic
    setErrors({});
    setLoading(false);
  };
  const handleSaveAndOpenNext = (vaccination_name: string) => {
    // onSubmit(vaccinationName); // Call the onSubmit function
    const vaccinationName = vaccination_name.replace(/\s+/g, '').toLowerCase();
    const selectedFile = selectedFiles[vaccinationName];
    const errorKey = `${vaccinationName}-file`;
    const supportedDocTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!selectedFile) {
      console.error('No file selected');
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorKey]: 'No file selected',
      }));
      return;
    }
    if (!isValidFileSize(selectedFile)) {
      console.error(`${errorKey} greater than 10MB`);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorKey]: `${errorKey} size exceeds the maximum limit (10mb)`,
      }));
      setLoading(false);
      return;
    } else if (!supportedDocTypes.includes(selectedFile.type)) {
      console.error(`${errorKey} type not supported`);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorKey]: `${selectedFile.type}: File type not supported, please choose either a .jpg, .png, or .pdf file`,
      }));
      setLoading(false);
      return;
    }
    setLoading(true);

    const currentIndex = vaccinationConfig.findIndex(
      (v) => v.name === vaccinationName,
    );
    const nextIndex = currentIndex + 1;
    if (activeKey === vaccinationConfig.length - 1) {
      setActiveKey(undefined);
      setDisplayNextBtn(true); // Set displayNextBtn to true at the last panel
    } else if (nextIndex < vaccinationConfig.length) {
      setActiveKey((prevActivekey) => prevActivekey! + 1); // Set the next panel as active
    }

    // Set isLoading to false after all necessary operations are completed
    setLoading(false);
  };
  const isValidFileSize = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
    return file.size <= maxSize;
  };

  const handleChange = (
    vaccinationName: string,
    key: string,
    value: string | boolean,
  ) => {
    setVaccinationsData((prevData) => {
      const updatedVaccinationsData = { ...prevData };
      const vaccinationData = { ...updatedVaccinationsData[vaccinationName] };

      switch (key) {
        case 'completedVaccSeries':
        case 'manufacturer':
        case 'DateOfFinalVacc':
          vaccinationData[key] = value as string;
          break;
        case 'ImmunityType':
        case 'FinalVaccinationDate':
        case 'seriesDate1':
        case 'seriesDate2':
        case 'seriesDate3':
          vaccinationData[key] = value as string;
          break;
        case 'VaccinationDate':
          vaccinationData[key] = value as string;
          break;

        default:
          vaccinationData[key] = value as string;
          // Handle other types of keys if needed
          break;
      }
      updatedVaccinationsData[vaccinationName] = vaccinationData;
      return updatedVaccinationsData;
    });
  };

  return {
    isLoading,
    vaccinationConfig,
    selectedFiles,
    setSelectedFiles,
    errors,
    vaccinationsData,
    onSubmit,
    handleChange,
    activeKey,
    displayNextBtn,
    setActiveKey,
    handleSaveAndOpenNext,
  };
};

/**
 * useMedTestDocument hook handles the state and validation for user's medical test records document.
 * @returns An object containing form state, validation errors, and a submit function.
 */
export const useMedTestDocument = () => {
  // const user = useSelector((state) => state.user.payload);

  const [selectedFiles, setSelectedFiles] = useState<{
    [key: string]: File | null;
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [medTestRecordsConfig, setMedTestRecordsConfig] = useState<string>('');
  const [medTestRecordsDefinition, setMedTestRecordsDefinition] = useState<
    Test[]
  >([]);
  const [activeKey, setActiveKey] = useState<number | undefined>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [displayNextBtn, setDisplayNextBtn] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  // Create Initial medRecords with the object shape that is desired!
  const initialMedRecords = medTestRecordsDefinition.reduce(
    (acc, test) => {
      acc[test.name] = {};
      test.requiredFields.forEach((field) => {
        acc[test.name][field] = '';
      });
      return acc;
    },
    {} as { [key: string]: { [key: string]: string } },
  );

  const [medRecords, setMedRecords] = useState(initialMedRecords);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/medicalTests.txt');
        const data = await response.text();
        setMedTestRecordsConfig(data);
        // initializeVaccinationsData(data.vaccinations)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const testSections = medTestRecordsConfig.trim().split('\r\n');
    const sections = testSections.filter((section) => section.trim() !== '');
    setMedTestRecordsDefinition(transformData(splitTests(sections)));
    setMedRecords(initialMedRecords);
    setDisplayNextBtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medTestRecordsConfig]);

  const splitTests = (arr: string[]): Test[] => {
    const tests: Test[] = [];
    let currentTest: Test | undefined;

    // Regular expression to match test types
    const testTypeRegex = /^(.*?):$/;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const match = item.match(testTypeRegex);
      if (match) {
        // Found a new test type
        if (currentTest) {
          tests.push(currentTest);
        }
        const testName = match[1]; // Extract the test type
        currentTest = { name: testName, requiredFields: [] };
      } else if (currentTest) {
        // Found a required field for the current test
        currentTest.requiredFields.push(item);
      }
    }

    // Push the last test
    if (currentTest) {
      tests.push(currentTest);
    }

    return tests;
  };

  function transformData(tests: Test[]): Test[] {
    const result: Test[] = [];
    for (let i = 0; i < tests.length; i++) {
      if (tests[i].name !== 'Required Fields') {
        const currentItem = tests[i];
        const requiredFields = tests[i + 1] ? tests[i + 1].requiredFields : [];
        currentItem.requiredFields =
          currentItem.requiredFields.concat(requiredFields);
        result.push(currentItem);
      }
    }
    return result;
  }

  const onSubmit = () => {
    // const selectedFile = selectedFiles[testName];
    // const medTestData = medRecords[testName];
    // const errorKey = `${testName}-file`;

    setLoading(true);
    changeQueryParams((params) => params.set('todo', 'covid-agreement'));

    // Other validations and dispatch logic for submitting the selected file

    // Clear errors and setLoading(false) after dispatch logic
    setErrors({});
    setLoading(false);
  };
  const handleSaveAndOpenNext = (testName: string) => {
    const selectedFile = selectedFiles[testName];
    // const medTestData = medRecords[testName];
    const errorKey = `${testName}-file`;
    if (!selectedFile) {
      console.error('No file selected');
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorKey]: 'No file selected',
      }));
      return;
    }

    setLoading(true);
    // Validate file size
    if (!isValidFileSize(selectedFile)) {
      console.error('Selected file greater than 10MB');
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorKey]: 'File size exceeds the maximum limit (10mb)',
      }));
      return;
    }
    const currentIndex = medTestRecordsDefinition.findIndex(
      (v) => v.name === testName,
    );
    const nextIndex = currentIndex + 1;
    if (activeKey === medTestRecordsDefinition.length - 1) {
      setActiveKey(undefined);
      setDisplayNextBtn(true); // Set displayNextBtn to true at the last panel
    } else if (nextIndex < medTestRecordsDefinition.length) {
      setActiveKey((prevActivekey) => prevActivekey! + 1); // Set the next panel as active
    }

    // Set isLoading to false after all necessary operations are completed
    setLoading(false);
  };

  const isFormValid = (testName: string) => {
    const testData = medRecords[testName];
    if (testData) {
      return Object.values(testData).every(
        (value) => value !== null && value !== '',
      );
    }
  };
  const handleChange = (
    testName: string,
    key: string,
    value: string | boolean,
  ) => {
    setMedRecords((prevData) => {
      const updatedMedTestsData = { ...prevData };
      const medTestData = { ...updatedMedTestsData[testName] };
      medTestData[key] = value as string;

      updatedMedTestsData[testName] = medTestData;
      return updatedMedTestsData;
    });
  };

  return {
    isLoading,
    isFormValid,
    medTestRecordsDefinition,
    selectedFiles,
    setSelectedFiles,
    errors,
    medRecords,
    onSubmit,
    handleChange,
    activeKey,
    displayNextBtn,
    setActiveKey,
    handleSaveAndOpenNext,
  };
};

export const useOnboardingInterview = () => {
  const [mode, setMode] = useState<keyof typeof calendarView>('Week');
  const [availability, setAvailability] = useState<AvailabilitySlotResponse[]>(
    [],
  );
  const [pickerFormat, setPickerFormat] = useState<string | undefined>(
    formatData.Month,
  );
  const { t } = useTranslation();
  const [activeRange, setActiveRange] = useState<CalendarRange>({
    start_date: dayjs().startOf('week').format('YYYY-MM-DD'),
    end_date: dayjs().endOf('week').format('YYYY-MM-DD'),
  });
  const [scheduleDate, setScheduleDate] = useState<InterviewScheduleRequest>();
  const [loading, setLoading] = useState(false);
  const [calendarValue, setCalendarValue] = useState<Dayjs>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [chosenSlot, setChosenSlot] = useState<Dayjs | null>(null);
  const params = useQueryParams();
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const context = useContext(OnboardingContext);
  const {
    onBoardingStatus,
    bookedDate,
    completed,
    interviewBooked,
    setCompleted,
    setBookedDate,
    setInterviewBooked,
    interviewLoading,
  } = context;

  const changeQueryParams = useOnChangeQueryParams();
  const q = useQueryParams();
  const doGetAvailabilitySchedule = useCallback(() => {
    setAvailabilityLoading(true);
    if (activeRange?.start_date == null || activeRange?.end_date == null)
      return;
    getAvailabilitySchedule({
      start_date: activeRange.start_date,
      end_date: activeRange.end_date,
      start_time: activeRange.start_time,
      end_time: activeRange.end_time,
    })
      .then((res) => {
        setAvailability(res.data);
        setAvailabilityLoading(false);
        return;
      })
      .catch(() => {
        toast.error(
          t('errors.onboarding-interview.fail-to-load-availability-schedule'),
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeRange.end_date,
    activeRange.start_date,
    activeRange.end_time,
    activeRange.start_time,
    activeRange,
  ]);

  const onSubmit = async () => {
    if (!scheduleDate) {
      return;
    }
    setLoading(true);
    if (!interviewBooked) {
      scheduleOnboardingInterview({
        availabilityId: scheduleDate.availabilityId,
        date: scheduleDate.date,
        startTime: scheduleDate.startTime,
        endTime: scheduleDate.endTime,
      })
        .then(({ data: booking }) => {
          const n: AvailabilityBookingBare = {
            ...booking,
            availabilitySlot: null,
            slotId: NaN,
            candidateId: booking.candidate.id,
            candidate: null,
          };
          doGetAvailabilitySchedule();
          setInterviewBooked(true);
          setCompleted(true);
          setLoading(false);
          setBookedDate(n);
        })
        .catch(() => {
          setLoading(false);
          toast.error(t('errors.something-went-wrong'));
        });
    } else {
      if (
        bookedDate?.bookingDate === scheduleDate.date &&
        bookedDate.bookingStartTime === scheduleDate.startTime
      ) {
        setCompleted(true);
        return;
      }
      rescheduleOnboardingInterview({
        bookingId: bookedDate?.id ?? 0,
        availabilityId: scheduleDate.availabilityId,
        date: scheduleDate.date,
        startTime: scheduleDate.startTime,
        endTime: scheduleDate.endTime,
      })
        .then(({ data: booking }) => {
          const n: AvailabilityBookingBare = {
            ...booking,
            availabilitySlot: null,
            slotId: NaN,
            candidateId: booking.candidate.id,
            candidate: null,
          };
          setBookedDate(n);
          doGetAvailabilitySchedule();
          setInterviewBooked(true);
          setCompleted(true);
          setLoading(false);
          toast.success(
            t(
              'healthcare-workers.onboarding.onboarding-interview-rescheduled-successfully',
            ),
          );
        })
        .catch(() => {
          setLoading(false);
          toast.error(t('errors.something-went-wrong'));
        });
    }
  };

  const handleComplete = () => {
    changeQueryParams((params) =>
      params.set('selectedStep', 'background-screening'),
    );
  };
  const handleReschedule = () => {
    const date = dayjs().add(1, 'day');
    setCalendarValue(date);
    doGetAvailabilitySchedule();
    setCompleted(false);
    return;
  };

  useEffect(() => {
    doGetAvailabilitySchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!onBoardingStatus) return;
    onBoardingStatus === 'approved' &&
      changeQueryParams((params) => params.set('todo', 'background-screening'));

    if (onBoardingStatus === 'pending') {
      setCompleted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onBoardingStatus]);

  useEffect(() => {
    if (q?.end_date != null && q?.start_date != null) {
      setActiveRange({
        end_date: q.end_date,
        start_date: q.start_date,
        start_time: q.start_time,
        end_time: q.end_time,
      });
    }
  }, [q.end_date, q.end_time, q.start_date, q.start_time]);

  useEffect(() => {
    const { start_date, start_time, end_date, end_time } = q;
    if (
      (start_date != null &&
        end_date != null &&
        !dateInRange(
          calendarValue,
          { start_date, start_time, end_date, end_time },
          mode as OpUnitType,
        )) ||
      start_date == null ||
      end_date == null
    ) {
      changeQueryParams((params) => {
        params.set(
          'start_date',
          calendarValue
            ?.startOf((mode.toLowerCase() as OpUnitType) ?? 'week')
            .format('YYYY-MM-DD'),
        );
        params.set(
          'end_date',
          calendarValue
            ?.endOf((mode.toLowerCase() as OpUnitType) ?? 'week')
            .format('YYYY-MM-DD'),
        );
        params.set('calendarView', mode);
      });
    } else {
      changeQueryParams((params) => {
        params.set(
          'start_date',
          calendarValue
            ?.startOf((mode.toLowerCase() as OpUnitType) ?? 'week')
            .format('YYYY-MM-DD'),
        );
        params.set(
          'end_date',
          calendarValue
            ?.endOf((mode.toLowerCase() as OpUnitType) ?? 'week')
            .format('YYYY-MM-DD'),
        );
        params.set('calendarView', mode);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, calendarValue]);

  useEffect(() => {
    if (!params.calendarView) return;
    if (
      params.calendarView &&
      params.calendarView !== 'Month' &&
      params.calendarView !== 'Week' &&
      params.calendarView !== 'Day'
    ) {
      setMode('Week');
      changeQueryParams((params) => params.set('calendarView', 'Week'));
      setPickerFormat(formatData['Week']);
      return;
    }
    setMode(params.calendarView as keyof typeof calendarView);
    changeQueryParams((p) => p.set('calendarView', params.calendarView));
    setPickerFormat(formatData[params.calendarView as calendarView]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.calendarView]);

  const handlePickerNextPrev =
    (intent: 'next' | 'prev' = 'next') =>
    () => {
      setCalendarValue((prev) => {
        let unit: 'month' | 'day' | 'week' = 'month';
        if (mode === calendarView.Day) {
          unit = 'day';
        } else if (mode === calendarView.Week) {
          unit = 'week';
        }
        if (prev) {
          const prevValue = prev;
          if (
            intent === 'prev' &&
            !(
              prevValue.clone().add(-1, unit).toDate().getTime() >=
              dayjs().toDate().getTime()
            )
          ) {
            return dayjs();
          }
          const newValue = prev.clone().add(intent == 'next' ? 1 : -1, unit);

          return newValue;
        }
        const newValue = dayjs().add(intent == 'next' ? 1 : -1, unit);
        return newValue;
      });
    };

  return {
    mode,
    setMode,
    loading,
    onSubmit,
    startTime,
    completed,
    chosenSlot,
    bookedDate,
    scheduleDate,
    availability,
    setStartTime,
    pickerFormat,
    setChosenSlot,
    calendarValue,
    handleComplete,
    setScheduleDate,
    interviewBooked,
    interviewLoading,
    handleReschedule,
    onBoardingStatus,
    setCalendarValue,
    availabilityLoading,
    handlePickerNextPrev,
    availabilityService: new AvailabilityService(availability),
  };
};
