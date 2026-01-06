import { useEffect, useState } from 'react';
import { InitialInternalSteps } from '../../../../pages/dashboard/profile/worker/internal-definitions';
import { UserVaccination } from '../../../../@types';
import { useDispatch, useSelector } from '../../../../store';
import { useOnChangeQueryParams } from '../../../../hooks/common.hooks';
import { userActions } from '../../../../store/features/slices/user';
import toast from 'react-hot-toast';
import { signDocForDownload } from '../../../../api/user.api';
export type VaccineSubStep =
  keyof typeof InitialInternalSteps.vaccinations.subSteps;
export const useVaccinations = () => {
  const [vaccination, setVaccination] = useState<
    Partial<Record<VaccineSubStep, Partial<UserVaccination>>>
  >({
    'covid-19': {
      completeSeriesReceived: true,
      name: InitialInternalSteps.vaccinations.subSteps['covid-19'].label,
    },
    hepatitis: {
      name: InitialInternalSteps.vaccinations.subSteps['hepatitis'].label,
    },
    influenza: {
      name: InitialInternalSteps.vaccinations.subSteps['influenza'].label,
      currentOnShots: true,
    },
    mmr: {
      name: InitialInternalSteps.vaccinations.subSteps['mmr'].label,
      immunityType: 'MMR',
    },
    tdap: { name: InitialInternalSteps.vaccinations.subSteps['tdap'].label },
    varicella: {
      name: InitialInternalSteps.vaccinations.subSteps['varicella'].label,
    },
  });

  const [formIsUpdated, setFormIsUpdated] = useState<
    Partial<Record<VaccineSubStep, boolean | undefined>>
  >({});
  const [formIsValid, setFormIsValid] = useState<
    Partial<Record<VaccineSubStep, boolean | undefined>>
  >({});

  const [vaccinationData, setVaccinationData] = useState<
    Partial<Record<VaccineSubStep, Partial<UserVaccination>>>
  >({
    'covid-19': {
      completeSeriesReceived: true,
      name: InitialInternalSteps.vaccinations.subSteps['covid-19'].label,
    },
    hepatitis: {
      name: InitialInternalSteps.vaccinations.subSteps['hepatitis'].label,
    },
    influenza: {
      name: InitialInternalSteps.vaccinations.subSteps['influenza'].label,
      currentOnShots: true,
    },
    mmr: {
      name: InitialInternalSteps.vaccinations.subSteps['mmr'].label,
      immunityType: 'MMR',
    },
    tdap: { name: InitialInternalSteps.vaccinations.subSteps['tdap'].label },
    varicella: {
      name: InitialInternalSteps.vaccinations.subSteps['varicella'].label,
    },
  });

  const [active, setActive] = useState<
    Partial<Record<VaccineSubStep, boolean | undefined>>
  >({
    'covid-19': false,
    hepatitis: false,
    influenza: false,
    mmr: false,
    tdap: false,
    varicella: false,
  });

  const [completed, setCompleted] = useState<
    Partial<Record<VaccineSubStep, boolean | undefined>>
  >({});

  const [loading, setLoading] = useState(false);
  const userVacination = useSelector(
    (state) => state.user.payload?.vaccinations,
  );
  const loadingList = useSelector(
    (state) => state.user.payload?.loadingVaccinationData,
  );
  const dispatch = useDispatch();
  const changeQueryParams = useOnChangeQueryParams();

  const toggleActive = (key: keyof typeof vaccinationData) => {
    setActive((prev) => ({
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const covid19 =
      userVacination?.[
        InitialInternalSteps.vaccinations.subSteps['covid-19'].label
      ];
    const hepatitis =
      userVacination?.[
        InitialInternalSteps.vaccinations.subSteps['hepatitis'].label
      ];
    const influenza =
      userVacination?.[
        InitialInternalSteps.vaccinations.subSteps['influenza'].label
      ];
    const mmr =
      userVacination?.[InitialInternalSteps.vaccinations.subSteps['mmr'].label];
    const tdap =
      userVacination?.[
        InitialInternalSteps.vaccinations.subSteps['tdap'].label
      ];
    const varicella =
      userVacination?.[
        InitialInternalSteps.vaccinations.subSteps['varicella'].label
      ];
    setCompleted((prev) => ({
      ...(prev ?? {}),
      'covid-19': covid19 != null,
      hepatitis: hepatitis != null,
      influenza: influenza != null,
      mmr: mmr != null,
      tdap: tdap != null,
      varicella: varicella != null,
    }));

    setVaccinationData((prev) => {
      const original = { ...(prev ?? {}) };
      if (covid19 != null) {
        original['covid-19'] = covid19;
      }
      if (hepatitis != null) {
        original['hepatitis'] = hepatitis;
      }
      if (influenza != null) {
        original['influenza'] = influenza;
      }
      if (mmr != null) {
        original['mmr'] = mmr;
      }
      if (tdap != null) {
        original['tdap'] = tdap;
      }
      if (varicella != null) {
        original['varicella'] = varicella;
      }
      return original;
    });
    setVaccination((prev) => {
      const original = { ...(prev ?? {}) };
      if (covid19 != null) {
        original['covid-19'] = covid19;
      }
      if (hepatitis != null) {
        original['hepatitis'] = hepatitis;
      }
      if (influenza != null) {
        original['influenza'] = influenza;
      }
      if (mmr != null) {
        original['mmr'] = mmr;
      }
      if (tdap != null) {
        original['tdap'] = tdap;
      }
      if (varicella != null) {
        original['varicella'] = varicella;
      }
      return original;
    });
  }, [userVacination]);

  const handleFormIsValid = (key: VaccineSubStep, value: boolean) => {
    setFormIsValid((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleFormIsUpdated = (key: VaccineSubStep, value: boolean) => {
    setFormIsUpdated((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onChange =
    (key: keyof typeof vaccinationData) =>
    (
      // eslint-disable-next-line @typescript-eslint/ban-types
      property: keyof UserVaccination | (string & {}),
      value: string | number | boolean | File | string[],
    ) => {
      setVaccinationData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [property]: value,
        },
      }));
    };
  const onSubmit = (key: VaccineSubStep) => () => {
    if (vaccinationData && vaccinationData?.[key] != null) {
      if (typeof vaccinationData[key]?.file === 'string') {
        delete vaccinationData[key]?.file;
      }

      setLoading(true);
      dispatch(
        userActions.addUserVaccinationData(
          vaccinationData[key] as Partial<UserVaccination>,
        ),
      )
        .unwrap()
        .then(() => {
          toast.success(
            `${InitialInternalSteps.vaccinations.subSteps[key].label} saved.`,
          );
          setLoading(false);
          if (key === 'varicella') {
            changeQueryParams((params) =>
              params.set('todo', 'medical-records'),
            );
          }
        })
        .catch(() => {
          toast.error(
            `Failed to save ${InitialInternalSteps.vaccinations.subSteps[key].label}`,
          );
          setLoading(false);
        });
    }
  };
  const onPrevious = () =>
    changeQueryParams((params) => params.set('todo', 'references'));
  const onNext = () =>
    changeQueryParams((params) => params.set('todo', 'medical-records'));
  const onSignUrl = (key: string) =>
    signDocForDownload(key)
      .then((s) => s.data.url)
      .catch(() => '');

  return {
    vaccinationData,
    completed,
    loading,
    loadingList,
    onChange,
    onSubmit,
    onPrevious,
    onNext,
    onSignUrl,
    toggleActive,
    active,
    vaccination,
    formIsUpdated,
    formIsValid,
    handleFormIsUpdated,
    handleFormIsValid,
  };
};
