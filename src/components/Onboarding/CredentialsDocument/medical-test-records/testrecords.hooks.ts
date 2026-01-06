import { useEffect, useState } from 'react';
import { InitialInternalSteps } from '../../../../pages/dashboard/profile/worker/internal-definitions';
import { MedicalTestRecord, UserVaccination } from '../../../../@types';
import { useDispatch, useSelector } from '../../../../store';
import { useOnChangeQueryParams } from '../../../../hooks/common.hooks';
import { userActions } from '../../../../store/features/slices/user';
import toast from 'react-hot-toast';
import { signDocForDownload } from '../../../../api/user.api';
export type MedicalTestSubStep =
  keyof typeof InitialInternalSteps.medicaltestrecords.subSteps;
export const useMedicalTestRecords = () => {
  const [medicalTestData, setMedicalTestData] = useState<
    Partial<Record<MedicalTestSubStep, Partial<MedicalTestRecord>>>
  >({
    'tuberculosis-test': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['tuberculosis-test']
          .label,
      testType: 'ppd',
    },
    'tuberculosis-questionnaire': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps[
          'tuberculosis-questionnaire'
        ].label,
    },
    'covid-19': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['covid-19'].label,
    },
    'pe-test': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['pe-test'].label,
    },
    'fit-test': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['fit-test'].label,
    },
  });
  const [medicalTest, setMedicalTest] = useState<
    Partial<Record<MedicalTestSubStep, Partial<MedicalTestRecord>>>
  >({
    'tuberculosis-test': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['tuberculosis-test']
          .label,
      testType: 'ppd',
    },
    'tuberculosis-questionnaire': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps[
          'tuberculosis-questionnaire'
        ].label,
    },
    'covid-19': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['covid-19'].label,
    },
    'pe-test': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['pe-test'].label,
    },
    'fit-test': {
      testName:
        InitialInternalSteps.medicaltestrecords.subSteps['fit-test'].label,
    },
  });
  const [formIsUpdated, setFormIsUpdated] = useState<
    Partial<Record<MedicalTestSubStep, boolean | undefined>>
  >({});
  const [formIsValid, setFormIsValid] = useState<
    Partial<Record<MedicalTestSubStep, boolean | undefined>>
  >({});

  const [completed, setCompleted] = useState<
    Partial<Record<MedicalTestSubStep, boolean | undefined>>
  >({});
  const [loading, setLoading] = useState(false);
  const userMedicalTest = useSelector(
    (state) => state.user.payload?.medicalTestRecords,
  );
  const loadingList = useSelector(
    (state) => state.user.payload?.loadingMedicalTestRecords,
  );
  const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  const [active, setActive] = useState<
    Partial<Record<MedicalTestSubStep, boolean | undefined>>
  >({});
  const toggleActive = (key: keyof typeof medicalTest) => {
    setActive((prev) => ({
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const covid19 =
      userMedicalTest?.[
        InitialInternalSteps.medicaltestrecords.subSteps['covid-19'].label
      ];
    const tuberculosisTest =
      userMedicalTest?.[
        InitialInternalSteps.medicaltestrecords.subSteps['tuberculosis-test']
          .label
      ];
    const tuberculosisQuestionnair =
      userMedicalTest?.[
        InitialInternalSteps.medicaltestrecords.subSteps[
          'tuberculosis-questionnaire'
        ].label
      ];
    const peTest =
      userMedicalTest?.[
        InitialInternalSteps.medicaltestrecords.subSteps['pe-test'].label
      ];
    const fitTest =
      userMedicalTest?.[
        InitialInternalSteps.medicaltestrecords.subSteps['fit-test'].label
      ];

    setCompleted((prev) => ({
      ...(prev ?? {}),
      'covid-19': covid19 != null,
      'tuberculosis-test': tuberculosisTest != null,
      'tuberculosis-questionnaire': tuberculosisQuestionnair != null,
      'pe-test': peTest != null,
      'fit-test': fitTest != null,
    }));
    setMedicalTest((prev) => {
      const original = { ...(prev ?? {}) };
      if (covid19 != null) {
        original['covid-19'] = covid19;
      }
      if (tuberculosisTest != null) {
        original['tuberculosis-test'] = tuberculosisTest;
      }
      if (tuberculosisQuestionnair != null) {
        original['tuberculosis-questionnaire'] = tuberculosisQuestionnair;
      }
      if (peTest != null) {
        original['pe-test'] = peTest;
      }
      if (fitTest != null) {
        original['fit-test'] = fitTest;
      }
      return original;
    });
    setMedicalTestData((prev) => {
      const original = { ...(prev ?? {}) };
      if (covid19 != null) {
        original['covid-19'] = covid19;
      }
      if (tuberculosisTest != null) {
        original['tuberculosis-test'] = tuberculosisTest;
      }
      if (tuberculosisQuestionnair != null) {
        original['tuberculosis-questionnaire'] = tuberculosisQuestionnair;
      }
      if (peTest != null) {
        original['pe-test'] = peTest;
      }
      if (fitTest != null) {
        original['fit-test'] = fitTest;
      }
      return original;
    });
  }, [userMedicalTest]);

  const handleFormIsValid = (key: MedicalTestSubStep, value: boolean) => {
    setFormIsValid((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleFormIsUpdated = (key: MedicalTestSubStep, value: boolean) => {
    setFormIsUpdated((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChange =
    (key: keyof typeof medicalTest) =>
    (
      // eslint-disable-next-line @typescript-eslint/ban-types
      property: keyof MedicalTestRecord | (string & {}),
      value: string | number | boolean | File | string[],
    ) => {
      setMedicalTestData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [property]: value,
        },
      }));
    };
  const onSubmit = (key: MedicalTestSubStep) => () => {
    if (medicalTestData && medicalTestData?.[key] != null) {
      if (typeof medicalTestData[key]?.file === 'string') {
        delete medicalTestData[key]?.file;
      }

      // return;
      setLoading(true);
      dispatch(
        userActions.addUserMedicalTestRecord(
          medicalTestData[key] as Partial<UserVaccination>,
        ),
      )
        .unwrap()
        .then(() => {
          toast.success(
            `${InitialInternalSteps.medicaltestrecords.subSteps[key].label} saved.`,
          );
          setLoading(false);
          if (key === 'fit-test') {
            changeQueryParams((params) =>
              params.set('todo', 'covid-agreement'),
            );
          }
        })
        .catch(() => {
          toast.error(
            `Failed to save ${InitialInternalSteps.medicaltestrecords.subSteps[key].label}`,
          );
          setLoading(false);
        });
    }
  };
  const onPrevious = () =>
    changeQueryParams((params) => params.set('todo', 'medical-records'));
  const onNext = () =>
    changeQueryParams((params) => params.set('todo', 'covid-agreement'));
  const onSignUrl = (key: string) =>
    signDocForDownload(key)
      .then((s) => s.data.url)
      .catch(() => '');

  return {
    medicalTest,
    completed,
    loading,
    loadingList,
    steps: InitialInternalSteps.medicaltestrecords.subSteps,
    onChange,
    onSubmit,
    onPrevious,
    onNext,
    onSignUrl,
    active,
    toggleActive,
    handleFormIsUpdated,
    handleFormIsValid,
    formIsUpdated,
    formIsValid,
    medicalTestData,
  };
};
