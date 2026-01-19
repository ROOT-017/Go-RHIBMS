import { useCallback, useEffect, useState } from 'react';
import {
  Course,
  CreateStudentDTO,
  Department,
  FiltersType,
  Program,
  ProgramLevel,
  School,
  Student,
} from '../@types';
import { AppDispatch, RootState, useDispatch, useSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import {
  checkMatriculeAvailability,
  clearCreationState,
  createStudent,
  fetchPrograms,
} from '../store/features/slices/student.slice';
import toast from 'react-hot-toast';
import { emailValidation } from '../utils';

export const useAdminManageStudents = () => {
  const [filters, setFilters] = useState<FiltersType & { gender?: string }>({
    department: undefined,
    program: undefined,
    searchTerm: undefined,
  });
  const [data] = useState<Student[]>([]);
  const onChangeFilters = (
    //eslint-disable-next-line
    key: keyof typeof filters | (string & {}),
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const [loading, _setLoading] = useState(false);
  return {
    data,
    filters,
    loading,
    onChangeFilters,
  };
};

interface FormData {
  matricule: string;
  email: string;
  password: string;
  full_name: string;
  date_of_birth: string;
  gender: string;
  program_id: string;
  level: ProgramLevel;
  admission_year: number;
  current_semester: number;
  total_fee: number;
  file?: File | null;
}

interface FormErrors {
  matricule?: string;
  email?: string;
  password?: string;
  full_name?: string;
  date_of_birth?: string;
  gender?: string;
  program_id?: string;
  level?: string;
  admission_year?: string;
  current_semester?: string;
  total_fee?: string;
  file?: string;
}

interface UseAddStudentReturn {
  // Form data
  formData: FormData;
  programs: Program[];

  // State
  loading: boolean;
  isCreating: boolean;
  checkingMatricule: boolean;
  matriculeAvailable: boolean | null;
  errors: FormErrors;
  creationSuccess: boolean;

  // Actions
  onChange: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  handleAddSubmit: () => Promise<void>;
  checkMatricule: () => Promise<void>;
  validateField: (field: keyof FormData) => string | undefined;
  clearErrors: () => void;
  resetForm: () => void;

  // Navigation
  goBack: () => void;
}

const initialFormData: FormData = {
  matricule: '',
  email: '',
  password: 'Welcome123', // Default password
  full_name: '',
  date_of_birth: '',
  gender: '',
  program_id: '',
  level: 'hnd',
  admission_year: new Date().getFullYear(),
  current_semester: 1,
  total_fee: 0,
  file: null,
};

export const useAddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get state from Redux store
  const { programs, isLoading, isCreating, creationError, creationSuccess } =
    useSelector((state: RootState) => state.students);

  // Local state
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [matriculeAvailable, setMatriculeAvailable] = useState<boolean | null>(
    null,
  );
  const [checkingMatricule, setCheckingMatricule] = useState(false);
  const [hasValidatedMatricule, setHasValidatedMatricule] = useState(false);

  // Fetch programs on mount
  useEffect(() => {
    dispatch(fetchPrograms());
  }, [dispatch]);

  // Clear success state after timeout
  useEffect(() => {
    if (creationSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearCreationState());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [creationSuccess, dispatch]);

  // Show error toast
  useEffect(() => {
    if (creationError) {
      toast.error(creationError, {
        position: 'top-right',
        // autoClose: 5000,
      });
    }
  }, [creationError]);

  // Validate a single field
  const validateField = useCallback(
    (field: keyof FormData): string | undefined => {
      const value = formData[field];

      switch (field) {
        case 'matricule':
          if (!value) return 'Matricule is required';
          if (typeof value === 'string' && value.length < 3)
            return 'Matricule is too short';
          if (matriculeAvailable === false) return 'Matricule already exists';
          return undefined;

        case 'email':
          if (!value) return 'Email is required';
          if (typeof value === 'string' && !emailValidation.test(value)) {
            return 'Invalid email format';
          }
          return undefined;

        case 'password':
          if (!value) return 'Password is required';
          if (typeof value === 'string' && value.length < 6) {
            return 'Password must be at least 6 characters';
          }
          return undefined;

        case 'full_name':
          if (!value) return 'Full name is required';
          if (typeof value === 'string' && value.length < 2) {
            return 'Full name is too short';
          }
          return undefined;

        case 'gender':
          if (!value) return 'Gender is required';
          return undefined;

        case 'program_id':
          if (!value) return 'Program is required';
          return undefined;

        case 'admission_year': {
          if (!value) return 'Admission year is required';
          const year = Number(value);
          const currentYear = new Date().getFullYear();
          if (year < 2025 || year > currentYear + 1) {
            return `Admission year must be between 2025 and ${currentYear + 1}`;
          }
          return undefined;
        }
        case 'current_semester': {
          if (!value) return 'Current semester is required';
          const semester = Number(value);
          if (semester < 1 || semester > 8) {
            return 'Semester must be between 1 and 8';
          }
          return undefined;
        }
        case 'total_fee': {
          const fee = Number(value);
          if (isNaN(fee)) return 'Fee must be a number';
          if (fee < 0) return 'Fee cannot be negative';
          return undefined;
        }
        default:
          return undefined;
      }
    },
    [formData, matriculeAvailable],
  );

  // Validate all fields
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const fieldsToValidate: (keyof FormData)[] = [
      'matricule',
      'email',
      'password',
      'full_name',
      'gender',
      'program_id',
      'admission_year',
      'current_semester',
      'total_fee',
    ];

    fieldsToValidate.forEach((field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    // Special validation for matricule availability
    if (matriculeAvailable === false) {
      newErrors.matricule = 'Matricule already exists';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [validateField, matriculeAvailable]);

  // Handle field change
  const onChange = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));

      // Clear error for this field
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }

      // Auto-check matricule availability
      // if (
      //   key === 'matricule' &&
      //   typeof value === 'string' &&
      //   value.trim().length >= 3
      // ) {
      //   // Debounce the check
      //   const timer = setTimeout(() => {
      //     checkMatricule(value);
      //   }, 500);
      //   return () => clearTimeout(timer);
      // }

      // // Auto-generate email from name if not provided
      // if (
      //   key === 'full_name' &&
      //   typeof value === 'string' &&
      //   value.trim() &&
      //   !formData.email
      // ) {
      //   const nameParts = value.trim().toLowerCase().split(' ');
      //   const firstName = nameParts[0];
      //   const lastName = nameParts[nameParts.length - 1];
      //   const generatedEmail = `${firstName}.${lastName}@student.school.edu`;
      //   setFormData((prev) => ({ ...prev, email: generatedEmail }));
      // }
    },
    [errors, formData.email],
  );

  // Check matricule availability
  const checkMatricule = useCallback(
    async (matriculeToCheck?: string) => {
      const matricule = matriculeToCheck || formData.matricule.trim();

      if (!matricule || matricule.length < 3) {
        setMatriculeAvailable(null);
        return;
      }

      setCheckingMatricule(true);
      try {
        const isAvailable = await dispatch(
          checkMatriculeAvailability(matricule),
        ).unwrap();
        setMatriculeAvailable(isAvailable);
        setHasValidatedMatricule(true);

        if (isAvailable) {
          setErrors((prev) => ({ ...prev, matricule: undefined }));
        } else {
          setErrors((prev) => ({
            ...prev,
            matricule: 'Matricule already exists',
          }));
        }
      } catch {
        toast.error('Failed to check matricule availability');
      } finally {
        setCheckingMatricule(false);
      }
    },
    [dispatch, formData.matricule],
  );

  // Handle form submission
  const handleAddSubmit = useCallback(async () => {
    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Double-check matricule availability
    if (!hasValidatedMatricule) {
      await checkMatricule();
      if (matriculeAvailable === false) {
        toast.error('Matricule is not available');
        return;
      }
    }

    try {
      // Prepare data for API
      const studentData: CreateStudentDTO = {
        matricule: formData.matricule.trim(),
        email: formData.email.trim(),
        password: formData.password,
        full_name: formData.full_name.trim(),
        date_of_birth: formData.date_of_birth || undefined,
        gender: formData.gender,
        program_id: formData.program_id,
        level: formData.level,
        admission_year: formData.admission_year,
        current_semester: formData.current_semester,
        total_fee: formData.total_fee,
      };

      // Dispatch creation
      const result = await dispatch(createStudent(studentData)).unwrap();

      // // Show success message with credentials
      toast.success(
        `Student created successfully! Matricule: ${result.credentials.matricule}, Password: ${formData.password}`,
      );

      // Reset form on success
      // setTimeout(() => {
      //   resetForm();
      // }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Failed to create student:', error);
      // Error is already handled by Redux and shown via toast
    }
  }, [
    formData,
    validateForm,
    hasValidatedMatricule,
    matriculeAvailable,
    checkMatricule,
    dispatch,
    // resetForm,
  ]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setMatriculeAvailable(null);
    setHasValidatedMatricule(false);
  }, []);

  // Navigation
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    // Form data
    formData,
    programs,

    // State
    loading: isLoading,
    isCreating,
    checkingMatricule,
    matriculeAvailable,
    errors,
    creationSuccess,

    // Actions
    onChange,
    handleAddSubmit,
    checkMatricule: () => checkMatricule(),
    validateField,
    clearErrors,
    resetForm,

    // Navigation
    goBack,
  };
};

export const useAddCourse = () => {
  const [data, setData] = useState<Course[]>([]);
  const [loading, _setLoading] = useState(false);
  const onChange = (
    key: keyof typeof data,
    value: string | File | undefined,
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddSubmit = () => {
    console.log(data);
  };
  return { data, onChange, loading, handleAddSubmit };
};

export const useAdminManageCourses = () => {
  const [filters, setFilters] = useState<FiltersType>({
    department: undefined,
    program: undefined,
    searchTerm: undefined,
  });
  const [data] = useState<Course[]>([]);
  const onChangeFilters = (
    //eslint-disable-next-line
    key: keyof typeof filters | (string & {}),
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const [loading, _setLoading] = useState(false);
  return {
    data,
    filters,
    loading,
    onChangeFilters,
  };
};

export const useAdminManagePrograms = () => {
  const [filters, setFilters] = useState<FiltersType>({
    department: undefined,
    program: undefined,
    searchTerm: undefined,
  });
  const [data] = useState<Program[]>([
    {
      id: '1',
      name: 'Computer Science',
      award: 'BSc',
      department_id: 'Computer Science and Network',
      duration_years: 4,
    },
    {
      id: '1',
      name: 'Computer Science',
      award: 'BSc',
      department_id: 'Computer Science and Network',
      duration_years: 4,
    },
  ]);
  const onChangeFilters = (
    //eslint-disable-next-line
    key: keyof typeof filters | (string & {}),
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const [loading, _setLoading] = useState(false);
  return {
    data,
    filters,
    loading,
    onChangeFilters,
  };
};

export const useAdminManageDepartments = () => {
  const [filters, setFilters] = useState<FiltersType>({
    department: undefined,
    program: undefined,
    searchTerm: undefined,
  });
  const [data] = useState<Department[]>([
    {
      id: '',
      name: 'Computer Science and Network',
      school_id: '',
      created_at: '',
    },
    {
      id: '2',
      name: 'Computer Engineering',
      school_id: 'Biomedical Sciences',
      created_at: '',
    },
    {
      id: '3',
      name: 'Information Technology',
      school_id: 'School of Management Sciences',
    },
  ]);

  const onChangeFilters = (
    //eslint-disable-next-line
    key: keyof typeof filters | (string & {}),
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const [loading, _setLoading] = useState(false);
  return {
    data,
    loading,
    filters,
    onChangeFilters,
  };
};

export const useAdminManageSchools = () => {
  const [filters, setFilters] = useState<FiltersType>({
    department: undefined,
    program: undefined,
    searchTerm: undefined,
  });
  const [data] = useState<School[]>([
    {
      id: '1',
      name: 'School of Engineering',
      description: 'School of Engineering',
      created_at: '',
    },
    {
      id: '2',
      name: 'Biomedical Sciences',
      description: 'Biomedical Sciences School',
      created_at: '',
    },
    {
      id: '3',
      name: 'Biomedical Sciences',
      description: 'Biomedical Sciences School',
      created_at: '',
    },
  ]);

  const onChangeFilters = (
    //eslint-disable-next-line
    key: keyof typeof filters | (string & {}),
    value: string,
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const [loading, _setLoading] = useState(false);
  return {
    data,
    loading,
    filters,
    onChangeFilters,
  };
};
