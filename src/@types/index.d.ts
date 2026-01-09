/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyExoticComponent, ReactNode } from 'react';
import { Location } from 'react-router-dom';
import { AppDispatch } from '../store';
import { PostgrestError } from '@supabase/supabase-js';

export type BeforeLogoutCallback = () => Promise<boolean>;
export type BeforeLogoutRegister = (props: BeforeLogoutCallback) => () => void;
declare global {
  interface Window {
    LOGS: string[];
    logger: {
      tag: (
        tag: string,
        color?: string,
      ) => {
        log: (message?: string, ...args: any) => void;
      };
    };
    FB: any;
    fbAsyncInit: () => void;
    setDebug: () => void;
    refreshAuthToken: (token: string) => unknown;
    getCookies: () => unknown;
    withdrawApplication: (issue: any) => unknown;
    searchCreatedJobPosts: (params: any) => unknown;
    sendOTP: () => void;
    updatePassword: (data: any) => void;
    resetResume: () => void;
    beforeLogout: Record<string, BeforeLogoutCallback>;
    beforeLogoutRegister: BeforeLogoutRegister;
    alertApi: {
      onOk?: (props: any) => void;
      onCancel?: () => void;
    };
    listJobsBySentiment: (props: any) => void;
    listMyJobs: (props: any) => void;
    searchMyJobs: (props: any) => void;
    getAvailabilitySchedule: (props: any) => void;
    scheduleOnboardingInterview: (props: any) => void;
    dateWithinBounds: any;
    updateReference: (...props: any) => any;
    remindReference: (id: number) => void;
    DEBUG: any;
  }
  let logger: {
    tag: (
      tag: string,
      color?: string,
    ) => {
      log: (message?: string, ...args: any) => void;
    };
  };
}

export type GuardPropType = {
  dispatch: AppDispatch;
  location: Location;
};
export type GuardFunc = (props: GuardPropType) => string | boolean;
export type LazyType = LazyExoticComponent<() => JSX.Element>;
export type LayoutProps = {
  children: ReactNode | ReactNode[];
  navbar?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
};
export type RouteType = {
  path: string;
  element: LazyExoticComponent<() => JSX.Element>;
  guards?: Array<GuardFunc>;
  layout?: (props?: LayoutProps) => JSX.Element;
  children?: RouteType[];
};

export type ConsumerFunction<T = any> = (args?: T) => void;
export type SupplierFunction<T = any> = () => T;
export type UUID = string;

export interface BaseEntity {
  id: UUID;
  created_at?: string;
}

export type UserRole = 'student' | 'admin';
export type FeeStatus = 'paid' | 'unpaid' | 'partial';
export interface Profile extends BaseEntity {
  id: UUID; // same as auth.users.id
  full_name: string | null;
  email: string;
  role: UserRole;
}

export interface Student extends BaseEntity {
  profile_id: UUID;
  matricule: string;
  placeOfBirth: string;
  date_of_birth: string | null;
  gender: string | null;
  program_id: UUID;
  level: string; // HND 1, HND 2
  email: string;
}
export interface Admin extends BaseEntity {
  profile_id: UUID;
  position: string;
}

export interface Lecturer extends BaseEntity {
  full_name: string;
  email: string;
  department_id: UUID;
}

export interface Result extends BaseEntity {
  student_id: UUID;
  course_id: UUID;
  ca_score: number | null;
  exam_score: number | null;
  total_score: number | null;
  grade: string | null;
}
export interface Registration extends BaseEntity {
  student_id: UUID;
  course_id: UUID;
  academic_year: string;
}
export interface Result extends BaseEntity {
  student_id: UUID;
  course_id: UUID;
  ca_score: number | null;
  exam_score: number | null;
  total_score: number | null;
  grade: string | null;
}
export interface Fee extends BaseEntity {
  student_id: UUID;
  academic_year: string;
  amount: number;
  status: FeeStatus;
}

export interface Registration extends BaseEntity {
  student_id: UUID;
  course_id: UUID;
  academic_year: string;
}
export interface Course extends BaseEntity {
  program_id: UUID;
  lecturer_id: UUID | null;
  code: string;
  title: string;
  credit: number;
  level: string;
  semester: number | null;
}

export type Course = {
  id?: number;
  courseTitle: string;
  courseCode: string;
  creditUnits: number;
  department: string;
  school: string;
  level: string;
  semester: string | null;
  year: string;
};

// export type Program = {
//   id?: number;
//   programName: string;
//   programType: string;
//   department: string;
//   school: string;
// };

// export type Department = {
//   id?: number;
//   departmentName: string;
//   school: string;
// };

export interface Department extends BaseEntity {
  school_id: UUID;
  name: string;
}

export interface Program extends BaseEntity {
  department_id: UUID;
  name: string;
  award: string; // HND, BSc
  duration_years: number;
}

export interface School extends BaseEntity {
  name: string;
  description: string | null;
}

export interface StudentWithProfile {
  student: Student;
  profile: Profile;
  program: Program;
}
export interface CourseWithLecturer {
  course: Course;
  lecturer: Lecturer;
}
export interface SupabaseResponse<T> {
  data: T | null;
  error: PostgrestError | null;
}
export type StatusConfig = {
  color: string;
  label: string;
};
export type PageResponse<T> = {
  data: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
};

export interface ApiError {
  code: string;
  message: string;
}
export interface ApiValidationException extends ApiError {
  field: string;
}
export type ApiErrors = ApiError | ApiException | ApiValidationException;
export type ApiException = Record<'code' | 'message' | 'status', string>;

export type Page<T> = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  sort?: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
};

export type Pageable = {
  page: number;
  size: number;
  sort?: string[];
};

export type PositionSalary = {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  id?: number;
  stateOfficialId?: string;
  natAvg: number;
  costLivingIndex: number;
  clvDelta: number;
  hrRateAdj: number;
  medSyncMargin: number;
  state?: State;
  jobPosition?: JobPosition;
};

export type Field = {
  label: string;
  name: string;
  type: string;
  options?: { label: string; value: string }[];
  placeholder: string;
  required: boolean;
};

export type ListOfRequest<T> = {
  data: T[];
};

// copied from rc-picker
type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;
export type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export type PasswordResetRequest = {
  email: string;
  password: string;
  code: string;
};

export type PasswordUpdateRequest = {
  newPassword: string;
  oldPassword: string;
  code: string;
};

export type UserHasApplicationResponse = {
  hasApplied: boolean;
  hasWithdrawn: boolean;
  canApply: boolean;
  withdrawCount: number;
};

export type JobPostSentiment = {
  id?: number;
  jobPostId: number;
  userId: number;
  sentiment: string;
};

export type MedicalTestRecord = {
  id?: number;
  testName: string;
  testType: string;
  issueDate: string;
  expiryDate?: string;
  recordDocumentSrc?: string;
  recordDocumentKey?: string;
  jsonRepresentation: string;
  file?: File;
};

export type TypedRecord<R, T = unknown> = Record<keyof R, T>;

export type TBQuestionnaire = {
  id?: number;
  fullName: string;
  userId: string;
  date: string;
  completionDate: string;
  signature?: string;
  signature1?: string;
  signature2?: string;
  testPositiveForPPDTest: boolean | undefined;
  testPositiveForTBTest: boolean | undefined;
  hadBCGVaccineAndTestPositive: boolean | undefined;
};

export type TBSymtomsCheck = {
  coughingLasting3Weeks?: boolean;
  coughtingOfBloodOrSputum?: boolean;
  chestPain?: boolean;
  weakenessOrFatigue?: boolean;
  weightLostAndOrNoAppetite?: boolean;
  nightSweats?: boolean;
  chills?: boolean;
  fever?: boolean;
  iHaveNoTBSymtoms?: boolean;
};

export type TBRiskAssessment = {
  residentInCountryWithHighTBRate: boolean | undefined;
  currentlyOrPlanToHaveImmunosppression: boolean | undefined;
  hadContactWithSomeoneWithTBInfection: boolean | undefined;
};

export type MedChangeEventTarget = {
  target: {
    name: string;
    value?: string;
    validity?: Partial<ValidityState>;
    checked?: boolean;
  };
};

export type AvailabilityBookingBare = {
  id: number;
  candidateId: number;
  bookingDate: string;
  bookingStartTime: string | null;
  bookingEndTime: string | null;
  status: string | null;
  title: string | null;
  slotId: number;
  candidate: null;
  availabilitySlot: null;
} & EntityWithTimestampAudits;

export type RecurringAvailability = {
  id: number;
  daysOfWeek: string[] | null;
  startDate: string | null;
  endDate: string | null;
  slotId: number;
} & EntityWithTimestampAudits;

export type AvailabilitySlotResponse = {
  id: number;
  booked: boolean | null;
  notes: string;
  date: string;
  startTime: string;
  endTime: string;
  recurring: boolean | null;
  userId: number;
  recurringAvailability: RecurringAvailability | null;
  availabilityBookings: AvailabilityBookingBare[] | null;
} & EntityWithTimestampAudits;

export type TemporalRequest = {
  date: string; // yyyy-MM-dd
  startTime: string; // HH:mm:ss
  endTime?: string; // HH:mm:ss
};

export type InterviewScheduleRequest = {
  availabilityId: number;
} & TemporalRequest;

export type InterviewRescheduleRequest = {
  bookingId: number;
} & Partial<InterviewScheduleRequest>;

export type LocationData = {
  state: string;
  address: string;
  country: string;
  email: string;
  city: string;
  phone: string;
  zipCode: string;
  phoneType: string;
};

export type AvailabilityBooking = {
  id: number;
  candidate: Candidate;
  bookingDate: string;
  bookingStartTime: string;
  bookingEndTime: string;
  status: string;
  title: string;
  availabilitySlot: AvailabilitySlotResponse;
} & EntityWithTimestampAudits;

type CalendarRange = {
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
};

export type userInfo = Omit<
  PersonalDataType,
  | 'websites'
  | 'summary'
  | 'preferredName'
  | 'state'
  | 'zipCode'
  | 'state'
  | 'street'
> & {
  ssn: string;
};

export type userAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  dateMovedIn: string;
  unit: string;
  country: string;
};

export type MenuProperties = {
  label: React.ReactNode;
  key: React.Key;
  path: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'group';
};
export type MenuItem = Required<MenuProps>['items'][number];

export type StatusConfig = {
  color: string;
  label: string;
};

export type RequestError = {
  code: string;
  message: string;
  status: string;
  details: string;
};

export type FilterMode = 'Month' | 'Week';
export type ProgramTypes = 'HND' | 'BSc' | 'Masters';
/**
 * The type of the status filter
 */
export type FiltersType<
  StatusType = unknown,
  ExtraFilters extends Record<string, any> = {},
> = {
  department?: string;
  status?: StatusType;
  program?: ProgramTypes;
  searchTerm?: string;
} & ExtraFilters;

export type DisplayUser = {
  moreId?: number;
  id: number;
  username: string;
  active: boolean;
  role: string;
  email: string;
  phone?: string;
  specialty: string | string[];
} & EntityWithTimestampAudits;

export type Fn = () => void;
export type defaultMenuItems =
  | 'dashboard'
  | 'profile'
  | 'customer-service'
  | 'settings'
  | 'logout';

export type TemporalUnit = 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
