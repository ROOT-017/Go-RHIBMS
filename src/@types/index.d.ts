/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyExoticComponent, ReactNode } from 'react';
import { Location } from 'react-router-dom';
import { AppDispatch } from '../store';
import { PostgrestError } from '@supabase/supabase-js';
import { MenuProps } from 'antd';

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

// ========== DATABASE SCHEMA TYPES ==========

export type UserRole = 'admin' | 'student' | 'lecturer';
export type FeeStatus = 'unpaid' | 'partially_paid' | 'paid';
export type ProgramLevel = 'certificate' | 'diploma' | 'hnd' | 'bsc' | 'msc' | 'phd';

// User Types (from profiles table)
export interface Profile extends BaseEntity {
  id: string; // Same as auth.users.id
  full_name: string | null;
  email: string;
  role: UserRole;
}

// School Structure Types
export interface School extends BaseEntity {
  name: string;
  description?: string;
}

export interface Department extends BaseEntity {
  school_id: string;
  name: string;
  school?: School;
}

export interface Program extends BaseEntity {
  department_id: string;
  name: string;
  award: string; // HND, BSc, MSc, PhD, etc.
  duration_years: number;
  department?: Department;
}

// Academic Structure Types
export interface Semester extends BaseEntity {
  name: string;
  code: string;
  order_number: number;
  description?: string;
}

export interface AcademicYear extends BaseEntity {
  year: string;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
}

// Lecturer Types
export interface Lecturer extends BaseEntity {
  full_name: string;
  email: string;
  department_id: string;
  department?: Department;
}

// Course Types (Single definition - matches database schema)
export interface Course extends BaseEntity {
  program_id: string;
  lecturer_id?: string | null; // Optional, can be null
  code: string;
  title: string;
  credit: number;
  semester_id?: string; // Changed from 'semester' (number) to 'semester_id' (uuid)
  department_id?: string;
  program_level?: ProgramLevel;
  is_elective?: boolean;
  program?: Program;
  lecturer?: Lecturer;
  semester?: Semester;
  department?: Department;
}

// Student Types (Updated to match database schema)
export interface Student extends BaseEntity {
  profile_id: string;
  matricule: string;
  date_of_birth?: string;
  gender?: string;
  program_id: string;
  level: ProgramLevel; // Changed from string to ProgramLevel
  admission_year?: number;
  current_semester: number;
  fee_status: FeeStatus;
  fee_balance: number;
  total_fee: number;
  is_active?: boolean;
  profile?: Profile;
  program?: Program;
  department?: Department;
}

// Admin Types
export interface Admin extends BaseEntity {
  profile_id: string;
  position: string;
  profile?: Profile;
}

// Registration Types (Form B)
export interface Registration extends BaseEntity {
  student_id: string;
  course_id: string;
  academic_year: string;
  semester_id?: string;
  status: 'registered' | 'in_progress' | 'completed' | 'failed' | 'dropped';
  grade?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'I';
  score?: number;
  student?: Student;
  course?: Course;
  semester?: Semester;
}

// Fee Types
export interface Fee extends BaseEntity {
  student_id: string;
  academic_year: string;
  amount: number;
  status: FeeStatus;
  student?: Student;
}

export interface FeeTransaction extends BaseEntity {
  student_id: string;
  amount: number;
  transaction_type: 'payment' | 'adjustment' | 'refund';
  payment_method?: string;
  reference_number?: string;
  description?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  academic_year_id?: string;
  processed_by?: string;
  student?: Student;
  academic_year?: AcademicYear;
}

// Result Types
export interface Result extends BaseEntity {
  student_id: string;
  course_id: string;
  ca_score?: number;
  exam_score?: number;
  total_score?: number;
  grade?: string;
  student?: Student;
  course?: Course;
}

// Organigramme Types
export interface Organigramme extends BaseEntity {
  title: string;
  description?: string;
  image_url: string;
  school_id: string;
  is_active: boolean;
  uploaded_by?: string;
  school?: School;
}

// Academic Structure Types
export interface AcademicStructure extends BaseEntity {
  program_id: string;
  semester_id: string;
  course_id: string;
  is_mandatory: boolean;
  program?: Program;
  semester?: Semester;
  course?: Course;
}

// System Settings Types
export interface SystemSetting extends BaseEntity {
  key: string;
  value: any;
  description?: string;
  updated_by?: string;
  updated_at: string;
}

// ========== DTO TYPES ==========

// Student Creation DTO (for admin)
export interface CreateStudentDTO {
  matricule: string;
  email: string;
  password: string;
  full_name: string;
  date_of_birth?: string;
  gender?: string;
  program_id: string;
  level: ProgramLevel;
  admission_year?: number;
  current_semester?: number;
  total_fee?: number;
}

// Student Update DTO
export interface UpdateStudentDTO {
  matricule?: string;
  full_name?: string;
  date_of_birth?: string;
  gender?: string;
  program_id?: string;
  level?: ProgramLevel;
  current_semester?: number;
  fee_status?: FeeStatus;
  fee_balance?: number;
  total_fee?: number;
}

// Course Creation DTO
export interface CreateCourseDTO {
  program_id: string;
  lecturer_id?: string | null;
  code: string;
  title: string;
  credit: number;
  semester_id?: string;
  department_id?: string;
  program_level?: ProgramLevel;
  is_elective?: boolean;
}

// Course Update DTO
export interface UpdateCourseDTO {
  lecturer_id?: string | null;
  code?: string;
  title?: string;
  credit?: number;
  semester_id?: string;
  department_id?: string;
  program_level?: ProgramLevel;
  is_elective?: boolean;
}

export interface StudentLoginData {
  student_id: string;
  profile_id: string;
  matricule: string;
  program_id: string;
  level: ProgramLevel;
  profile_email: string;
  profile_full_name: string;
}

// ========== VIEW/COMPOSITE TYPES ==========

// Student with related data (for student dashboard)
export interface StudentWithProfile {
  student: Student;
  profile: Profile;
  program: Program;
  department?: Department;
  school?: School;
}

// Course with lecturer (for course listings)
export interface CourseWithLecturer {
  course: Course;
  lecturer?: Lecturer;
  program?: Program;
  semester?: Semester;
}

// Form B View (Student's registered courses)
export interface FormBView {
  student_id: string;
  matricule: string;
  full_name: string;
  program_name: string;
  award: string;
  academic_year: string;
  semester_name: string;
  semester_order: number;
  course_code: string;
  course_title: string;
  course_credit: number;
  lecturer_name?: string;
  registration_status: string;
  grade?: string;
  score?: number;
}

// Dashboard Stats
export interface DashboardStats {
  total_students: number;
  total_lecturers: number;
  total_courses: number;
  total_programs: number;
  pending_fees: number;
  active_academic_year?: string;
}

// ========== AUTH TYPES ==========

export interface LoginCredentials {
  matricule: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  profile: Profile;
  student?: Student;
  admin?: Admin;
  lecturer?: Lecturer;
  session: {
    access_token: string;
    refresh_token: string;
  };
}

// ========== RESPONSE TYPES ==========

// Supabase Response (generic)
export interface SupabaseResponse<T> {
  data: T | null;
  error: PostgrestError | null;
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ========== FORM TYPES ==========

// Student Form Data (for admin interface)
export interface StudentFormData {
  matricule: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  programId: string;
  level: ProgramLevel;
  admissionYear: number;
  currentSemester: number;
  totalFee: number;
}

// Course Form Data
export interface CourseFormData {
  program_id: string;
  lecturer_id?: string;
  code: string;
  title: string;
  credit: number;
  semester_id?: string;
  department_id?: string;
  program_level?: ProgramLevel;
  is_elective?: boolean;
}

// ========== YOUR EXISTING TYPES (UNCHANGED) ==========

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

export type TypedRecord<R, T = unknown> = Record<keyof R, T>;

export type MenuProperties = {
  label: React.ReactNode;
  key: React.Key;
  path: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'group';
};
export type MenuItem = Required<MenuProps>['items'][number];

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

// Add this if EntityWithTimestampAudits is missing
export interface EntityWithTimestampAudits {
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
}