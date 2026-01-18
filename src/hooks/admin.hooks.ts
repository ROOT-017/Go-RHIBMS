import { useState } from 'react';
import {
  Course,
  Department,
  FiltersType,
  Program,
  School,
  Student,
} from '../@types';

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

export const useAddStudent = () => {
  const [data, setData] = useState<Partial<Student> & { file: File | null }>({
    file: null,
  });
  const [loading, _setLoading] = useState(true);
  const onChange = (
    key: keyof typeof data,
    value: string | File | undefined,
  ) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };
  const handleAddSubmit = () => {
    console.log(data);
    console.log(new Date(data.file?.lastModified ?? ''));
  };
  return { data, onChange, loading, handleAddSubmit };
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
