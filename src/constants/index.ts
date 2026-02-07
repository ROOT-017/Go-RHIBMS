export const Programs = [
  {
    label: 'Higher National Diploma(HND)',
    value: 'HND',
  },
  {
    label: 'Bachelor of Science(BSc)',
    value: 'BSc',
  },
  {
    label: 'Masters of Science(MSc)',
    value: 'MSc',
  },
  {
    label: 'Doctor of Philosophy',
    value: 'PhD',
  },
];

// Level options
export const levelOptions = [
  { value: 'hnd', label: 'HND' },
  { value: 'bsc', label: 'BSc' },
  { value: 'msc', label: 'MSc' },
  { value: 'phd', label: 'PhD' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'certificate', label: 'Certificate' },
];

// Semester options (1-8)
export const semesterOptions = Array.from({ length: 8 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `Semester ${i + 1}`,
}));

// Current year and range for admission year
const currentYear = new Date().getFullYear();
export const admissionYearOptions = Array.from({ length: 6 }, (_, i) => ({
  value: (currentYear - 2 + i).toString(),
  label: (currentYear - 2 + i).toString(),
}));

// Gender options
export const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];
export const Gender = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

export const Semester = [
  {
    label: 'First Semester',
    value: 'firstSemester',
  },
  {
    label: 'Second Semester',
    value: 'secondSemester',
  },
];

export const academicLevel = [
  {
    label: '200',
    value: '200',
  },
  {
    label: '300',
    value: '300',
  },
  {
    label: '400',
    value: '400',
  },
  {
    label: '500',
    value: '500',
  },
  {
    label: '600',
    value: '600',
  },
];

export const ImageExtensions = [
  '.jpg',
  '.png',
  '.jpeg',
  '.svg',
  '.gif',
  '.jfif',
  '.pjpeg',
  '.pjp',
  '.avif',
  '.apng',
  '.webp',
];
