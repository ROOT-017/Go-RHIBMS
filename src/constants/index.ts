import { StatusConfig as StatusConfigType } from '../@types';

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

export enum ShiftStatusName {
  started = 'started',
  ended = 'ended',
  approved = 'approved',
  rejected = 'rejected',
  processing = 'processing',
  processed = 'processed',
  hired = 'hired',
  notstarted = 'notstarted',
  pending = 'pending',
  cancelled = 'cancelled',
}
export enum ProcessStatusName {
  started = 'started',
  ended = 'ended',
  approved = 'approved',
  rejected = 'rejected',
  processing = 'processing',
  processed = 'processed',
  hired = 'hired',
  notstarted = 'notstarted',
  pending = 'pending',
  cancelled = 'cancelled',
  ongoing = 'ongoing',
  expired = 'expired',
  paid = 'paid',
  billed = 'billed',
  unpaid = 'unpaid',
  NO_VALID_STATUS = 'NO_VALID_STATUS',
}
export const StatusConfig: Record<string, StatusConfigType> = {
  [ProcessStatusName.pending]: { color: 'yellow', label: 'Pending' },
  [ProcessStatusName.notstarted]: { color: 'yellow', label: 'Not Started' },
  [ProcessStatusName.approved]: { color: 'success', label: 'Approved' },
  [ProcessStatusName.rejected]: { color: 'red', label: 'Rejected' },
  [ProcessStatusName.cancelled]: { color: 'red', label: 'Cancelled' },
  [ProcessStatusName.started]: { color: 'blue', label: 'Started' },
  [ProcessStatusName.ended]: { color: 'blue', label: 'Ended' },
  [ProcessStatusName.expired]: { color: 'red', label: 'Expired' },
  [ProcessStatusName.ongoing]: { color: 'blue', label: 'Ongoing' },
  [ProcessStatusName.processed]: { color: 'green', label: 'Processed' },
  [ProcessStatusName.processing]: { color: 'yellow', label: 'Processing' },
  [ProcessStatusName.hired]: { color: 'green', label: 'Hired' },
  [ProcessStatusName.paid]: { color: 'green', label: 'Paid' },
  [ProcessStatusName.billed]: { color: 'green', label: 'Billed' },
  [ProcessStatusName.unpaid]: { color: 'red', label: 'Unpaid' },
  [ProcessStatusName.NO_VALID_STATUS]: {
    color: 'default',
    label: 'Invalid Status',
  },
};
