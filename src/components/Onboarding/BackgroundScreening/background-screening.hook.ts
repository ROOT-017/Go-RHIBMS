import { useEffect, useState } from 'react';
import { userAddress, userInfo, userPreviousAddress } from '../../../@types';
import { usePrincipal, useQueryParams } from '../../../hooks/common.hooks';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {
  saveBackgroundScreeningInfo,
  signDocForDownload,
  uploadBackgroundScreeningReport,
} from '../../../api/user.api';
import { useDispatch } from '../../../store';
import { userActions } from '../../../store/features/slices/user';

dayjs.extend(isSameOrBefore);
export const useBackGroundScreening = () => {
  const [userInfo, setUserInfo] = useState<userInfo>({
    city: '',
    country: '',
    dateOfBirth: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    ssn: '',
  });
  const [status, setStatus] = useState<'approved' | 'pending' | null>(null);
  const [currentAddress, setCurrentAddress] = useState<userAddress>({
    city: '',
    dateMovedIn: '',
    state: '',
    street: '',
    unit: '',
    zipCode: '',
    country: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [previousAddress, setPreviousAddress] = useState<{
    [key: string]: userPreviousAddress;
  }>({
    '1': {
      city: '',
      country: '',
      dateMovedIn: '',
      dateMovedOut: '',
      street: '',
      state: '',
      unit: '',
      zipCode: '',
    },
  });
  const q = useQueryParams();
  const [action, setAction] = useState<string | null>(null);
  const [
    atleastSevenYearsAgoInCurrentAddress,
    setAtleastSevenYearsAgoInCurrentAddress,
  ] = useState<boolean | null>(false);
  const [beingInCurrentAddress7Plus, setBeingInCurrentAddress7Plus] =
    useState(false);
  const { t } = useTranslation();
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    currentAddressForm: '',
  });
  const [documentKey, setDocumentKey] = useState('');
  const [totalYears, setTotalYears] = useState(0);
  const [showPrevAddressSect, setShowPrevAddressSect] = useState(false);
  const [prevAddressFormIsValid, setPrevAddressFormIsValid] = useState(false);
  const [currentAddressFormIsValid, setCurrentAddressFormIsValid] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [checkBox, setCheckBox] = useState<{
    agreeTerms?: boolean;
    sendCopyOfResult?: boolean;
  }>();
  const user = usePrincipal();
  const principal = usePrincipal();
  const dispatch = useDispatch();

  const handleCheckBoxChange = (
    key: 'agreeTerms' | 'sendCopyOfResult',
    value: boolean,
  ) => {
    setCheckBox((prev) => {
      if (!prev) {
        return { [key]: value };
      } else {
        return {
          ...prev,
          [key]: value,
        };
      }
    });
  };

  const handleCurrentAddressChange = (
    field: keyof userAddress,
    value: string,
  ) => {
    setCurrentAddress((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };
  const handlePreviousAddressChange = (
    field: keyof userPreviousAddress,
    value: string,
    key: string,
  ) => {
    setPreviousAddress((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key],
          [field]: value,
        },
      };
    });
  };

  const handlePersonalInfoChange = (field: keyof userInfo, value: string) => {
    setUserInfo((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleAddAddress = (formKey: string) => {
    //Check if the current address form is valid
    if (!currentAddressFormIsValid) {
      return;
    }
    setAtleastSevenYearsAgoInCurrentAddress(null);

    if (!prevAddressFormIsValid) {
      return;
    } else {
      setErrors((prev) => {
        const newObj = {} as { [key: string]: string };
        Object.entries(prev).forEach(([key, value]) => {
          if (key !== formKey) {
            newObj[key] = value;
          }
        });
        return newObj;
      });
    }
    setPreviousAddress({
      ...previousAddress,
      [(+formKey + 1).toString()]: {
        city: '',
        country: '',
        dateMovedIn: '',
        dateMovedOut: '',
        state: '',
        street: '',
        unit: '',
        zipCode: '',
      },
    });
  };
  const handleDeleteAddress = (formKey: string) => {
    // if (Object.keys(previousAddress).length === 1) return;
    if (formKey === '1' && beingInCurrentAddress7Plus) {
      setPrevAddressFormIsValid(true);
    }
    setPreviousAddress(() => {
      const newObj = {} as { [key: string]: userPreviousAddress };
      Object.entries(previousAddress).forEach(([key, value]) => {
        if (key !== formKey) {
          newObj[key] = value;
        }
      });
      return newObj;
    });

    setErrors(() => {
      const newObj = {} as { [key: string]: string };
      Object.entries(errors).forEach(([key, value]) => {
        if (key !== formKey) {
          newObj[key] = value;
        }
      });
      return newObj;
    });
  };

  const onSubmit = async () => {
    const formatedData = Object.keys(previousAddress).map((key) => ({
      ...previousAddress[key],
      sortOrder: +key + 1,
      current: false,
    }));

    const newAddressArray = [
      {
        ...currentAddress,
        current: true,
        dateMovedOut: '',
        sortOrder: 1,
      },
    ].concat(formatedData);

    setLoading(true);
    await saveBackgroundScreeningInfo({
      consentGiven: false,
      resultCopyRequested: false,
      residentialAddresses: newAddressArray,
    })
      .then(() => {
        dispatch(userActions.getUserInfo()).then(() => {
          setLoading(false);
          toast.success(t('healthcare-workers.background-screening'));
        });
      })
      .catch(() => {
        setLoading(false);
        toast.error(
          t(
            'healthcare-workers.onboarding.failed-to-save-background-check-info',
          ),
        );
      });
  };

  useEffect(() => {
    // Validation
    if (!checkBox?.['agreeTerms']) {
      setErrors((prev) => {
        return {
          agreeTerms: 'Agreement is required',
          ...prev,
        };
      });
    } else {
      setErrors((prev) => {
        const newObj = {} as { [key: string]: string };
        Object.entries(prev).forEach(([key, value]) => {
          if (key !== 'agreeTerms') {
            newObj[key] = value;
          }
        });
        return newObj;
      });
    }

    if (showPrevAddressSect) {
      Object.keys(previousAddress).forEach((key) => {
        const address = previousAddress[key];
        const {
          city,
          country,
          dateMovedIn,
          dateMovedOut,
          street,
          state,
          unit,
          zipCode,
        } = address;
        if (
          !city ||
          !country ||
          !dateMovedIn ||
          !dateMovedOut ||
          !street ||
          !state ||
          !unit ||
          !zipCode
        ) {
          setPrevAddressFormIsValid(false);
          setErrors((prev) => {
            return {
              ...prev,
              [key]: 'Fill all required fields',
            };
          });
        } else {
          setPrevAddressFormIsValid(true);
          setErrors((prev) => {
            const newObj = {} as { [key: string]: string };
            Object.entries(prev).forEach(([k, value]) => {
              if (k !== key) {
                newObj[k] = value;
              }
            });
            return newObj;
          });
        }
      });
    } else {
      setErrors((prev) => {
        const newObj = {} as { [key: string]: string };
        Object.entries(prev).forEach(([key, value]) => {
          if (key === 'currentAddressForm' || key === 'agreeTerms') {
            newObj[key] = value;
          }
        });
        return newObj;
      });
      setPrevAddressFormIsValid(true);
    }
    const { city, country, dateMovedIn, state, street, unit, zipCode } =
      currentAddress;
    if (
      !city ||
      !state ||
      !country ||
      !dateMovedIn ||
      !state ||
      !country ||
      !unit ||
      !street ||
      !zipCode
    ) {
      setCurrentAddressFormIsValid(false);
      setErrors((prev) => {
        return {
          ...prev,
          currentAddressForm: 'Fill all required fields',
        };
      });
    } else {
      setCurrentAddressFormIsValid(true);
      setErrors((prev) => {
        const newObj = {} as { [key: string]: string };
        Object.entries(prev).forEach(([key, value]) => {
          if (key !== 'currentAddressForm') {
            newObj[key] = value;
          }
        });
        return newObj;
      });
    }
  }, [checkBox, previousAddress, currentAddress, showPrevAddressSect]);

  useEffect(() => {
    setUserInfo({
      city: user?.candidate?.city ?? '',
      country: user?.candidate?.country ?? '',
      dateOfBirth: user?.candidate?.dateOfBirth ?? '',
      email: user?.candidate?.email ?? '',
      firstName: user?.candidate?.firstName ?? '',
      lastName: user?.candidate?.lastName ?? '',
      phoneNumber: user?.candidate?.phone ?? '',
      ssn: user?.userProfile?.ssn ?? '',
    });
  }, [user]);
  useEffect(() => {
    if (!currentAddress.dateMovedIn) return;

    // Get the date that is exactly 7 years ago from today
    const sevenYearsAgo = dayjs().subtract(7, 'years');

    // Convert dateMovedIn to a Dayjs object
    const movedInDate = dayjs(currentAddress.dateMovedIn);

    // Check if movedInDate is before or equal to seven years ago
    const isAtLeastSevenYearsAgo = movedInDate.isSameOrBefore(sevenYearsAgo);
    setTotalYears(dayjs().diff(movedInDate, 'years', true));
    setBeingInCurrentAddress7Plus(isAtLeastSevenYearsAgo);
    setAtleastSevenYearsAgoInCurrentAddress(isAtLeastSevenYearsAgo); // true if 7+ years ago, false otherwise
  }, [currentAddress.dateMovedIn]);

  const onSignUrl = (key: string) =>
    signDocForDownload(key, 'certifications')
      .then((s) => s.data.url)
      .catch(() => '');

  const onFileChange = (_key: string, file: File | null) => setFile(file);
  const handleUploadBackgroundFile = async () => {
    if (!file) return;
    setLoading(true);
    uploadBackgroundScreeningReport(file)
      .then(() => {
        setLoading(false);
        setStatus('pending');
        toast.success(
          t('healthcare-workers.background-screening-report-uploaded'),
        );
      })
      .catch(() => {
        setLoading(false);
        toast.error(
          t('healthcare-workers.failed-to-upload-background-screening-report'),
        );
      });
  };

  useEffect(() => {
    const value =
      (currentAddressFormIsValid && !atleastSevenYearsAgoInCurrentAddress) ||
      atleastSevenYearsAgoInCurrentAddress === null;
    setShowPrevAddressSect(value);
  }, [currentAddressFormIsValid, atleastSevenYearsAgoInCurrentAddress]);

  useEffect(() => {
    setPreviousAddress({
      '1': {
        city: '',
        country: '',
        dateMovedIn: '',
        dateMovedOut: '',
        street: '',
        state: '',
        unit: '',
        zipCode: '',
      },
    });
  }, [showPrevAddressSect]);

  useEffect(() => {
    let years = 0;
    Object.keys(previousAddress).map((key) => {
      const address = previousAddress[key];
      const { dateMovedIn, dateMovedOut } = address;
      if (dateMovedIn && dateMovedOut) {
        const moveInDate = dayjs(dateMovedIn);
        const moveOutDate = dayjs(dateMovedOut);
        // Calculate the number of years between moveInDate and moveOutDate
        const yearsDiff = moveOutDate.diff(moveInDate, 'years', true); // 'true' for a floating-point result
        years = years + yearsDiff;
      }
    });

    setTotalYears(years);
    if (currentAddress.dateMovedIn) {
      const movedInDate = dayjs(currentAddress.dateMovedIn);
      years = years + dayjs().diff(movedInDate, 'years', true);
    }
    setTotalYears(years);
  }, [previousAddress, currentAddress.dateMovedIn]);

  useEffect(() => {
    setAction(q.action ?? null);
    if (
      principal?.backgroundScreening &&
      principal?.backgroundScreening?.approvedAt === null
    ) {
      setStatus('pending');
    } else if (
      principal?.backgroundScreening &&
      principal?.backgroundScreening?.approvedAt != null
    ) {
      setStatus('approved');
    } else {
      setStatus(null);
    }
    setDocumentKey(principal?.backgroundScreening?.reportFileKey ?? '');
  }, [principal?.backgroundScreening, q.action]);

  return {
    action,
    status,
    errors,
    loading,
    checkBox,
    onSubmit,
    userInfo,
    onSignUrl,
    totalYears,
    formIsValid:
      action === 'upload-background' && file
        ? true
        : currentAddressFormIsValid &&
            checkBox?.agreeTerms &&
            prevAddressFormIsValid &&
            totalYears >= 7
          ? true
          : false,
    documentKey,
    onFileChange,
    currentAddress,
    previousAddress,
    handleAddAddress,
    showPrevAddressSect,
    handleDeleteAddress,
    handleCheckBoxChange,
    handlePersonalInfoChange,
    currentAddressFormIsValid,
    handleCurrentAddressChange,
    beingInCurrentAddress7Plus,
    handleUploadBackgroundFile,
    handlePreviousAddressChange,
  };
};
