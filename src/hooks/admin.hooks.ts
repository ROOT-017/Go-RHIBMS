import { useState } from 'react';
import { FiltersType, Student } from '../@types';

export const useAdminManageStudents = () => {
  const [filters, setFilters] = useState<FiltersType & { gender?: string }>({
    department: undefined,
    program: undefined,
    searchTerm: undefined,
  });
  const [data] = useState<Student[]>([
    {
      dateOfBirth: '11/11/2006',
      department: 'Computer Science and Network',
      fullName: 'Jane Doe',
      matriculationNumber: '24-CSN-0024',
      placeOfBirth: 'Muea',
      program: 'BSc',
    },
    {
      dateOfBirth: '11/11/2006',
      department: 'Computer Science and Network',
      fullName: 'Jane Doe',
      matriculationNumber: '24-CSN-0024',
      placeOfBirth: 'Muea',
      program: 'BSc',
    },
    {
      dateOfBirth: '11/11/2006',
      department: 'Computer Science and Network',
      fullName: 'Jane Doe',
      matriculationNumber: '24-CSN-0024',
      placeOfBirth: 'Muea',
      program: 'BSc',
    },
    {
      dateOfBirth: '11/11/2006',
      department: 'Computer Science and Network',
      fullName: 'Jane Doe',
      matriculationNumber: '24-CSN-0024',
      placeOfBirth: 'Muea',
      program: 'BSc',
    },
    {
      dateOfBirth: '11/11/2006',
      department: 'Computer Science and Network',
      fullName: 'Jane Doe',
      matriculationNumber: '24-CSN-0024',
      placeOfBirth: 'Muea',
      program: 'BSc',
    },
    {
      dateOfBirth: '11/11/2006',
      department: 'Computer Science and Network',
      fullName: 'Jane Doe',
      matriculationNumber: '24-CSN-0024',
      placeOfBirth: 'Muea',
      program: 'BSc',
    },
    {
      dateOfBirth: '11/11/2006',
      department: 'Computer Science and Network',
      fullName: 'Jane Doe',
      matriculationNumber: '24-CSN-0024',
      placeOfBirth: 'Muea',
      program: 'BSc',
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

export const useAddStudent = () => {
  const [data, setData] = useState<
    Partial<Student & { gender: undefined; file: File | null }>
  >({});
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
  const [data, setData] = useState<{
    courseCode?: string;
    courseTitle?: string;
    creditUnits?: number;
    department?: string;
    level?: string;
    semester?: string;
    school?: string;
  }>({
    courseCode: '',
    courseTitle: '',
    department: '',
    level: '',
    semester: '',
    school: '',
  });
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
