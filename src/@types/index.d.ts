/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyExoticComponent, ReactNode } from 'react';
import { Location } from 'react-router-dom';
import { AppDispatch } from '../store';
import { TimeSheetStatusName } from '../constants';

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

export type UserSignUpRequest = {
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  picture?: string;
  emailVerificationId?: string;
  roleName?: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type SocialAuthRequest = {
  credential: string;
};

export type User = {
  id?: number;
  email: string;
  password?: string;
  roleId?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  emailVerifiedAt?: string;
  active?: boolean;
};

export type Role = {
  id?: number;
  name: string;
  description?: string;
  authorities?: Authority[];
} & EntityWithTimestampAudits;

export type CompanyRequest = {
  name: string;
  contactEmail: string;
  contactPhone?: string;
  picture?: string;
};

export type Company = {
  id?: number;
  name: string;
  contactEmail?: string;
  contactPhone?: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
};

export type Student = {
  id?: number;
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  matriculationNumber: string;
  department: department;
  program: string;
};

export type EmployeeInfo = {
  id?: number;
  nationality: string;
  dateOfBirth?: string;
  address?: string;
  picture?: string;
  countryOfResidence?: string;
  city?: string;
  zipCode?: string;
  position?: string;
  department?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
};

export type EmployeeCompliance = {
  id?: number;
  passports?: string;
  visas?: string;
  documents?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: number;
};

export type EmployeeResponse = {
  employee?: User;
  info?: EmployeeInfo;
  compliance?: EmployeeCompliance;
};

export type EmployeeCreateRequest = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  picture?: string;
  department?: string;
  position?: string;
  nationality: string;
  dateOfBirth?: string;
  address?: string;
  countryOfResidence?: string;
  city?: string;
  zipCode?: string;
  passports?: string;
  visas?: string;
  documents?: string;
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

export type GoogleDriveFileCapabilities = {
  canChangeViewersCanCopyContent: boolean;
  canMoveChildrenOutOfDrive: boolean;
  canReadDrive: boolean;
  canEdit: boolean;
  canCopy: boolean;
  canComment: boolean;
  canAddChildren: boolean;
  canDelete: boolean;
  canDownload: boolean;
  canListChildren: boolean;
  canRemoveChildren: boolean;
  canRename: boolean;
  canTrash: boolean;
  canReadRevisions: boolean;
  canReadTeamDrive: boolean;
  canMoveTeamDriveItem: boolean;
  canChangeCopyRequiresWriterPermission: boolean;
  canMoveItemIntoTeamDrive: boolean;
  canUntrash: boolean;
  canModifyContent: boolean;
  canMoveItemWithinTeamDrive: boolean;
  canMoveItemOutOfTeamDrive: boolean;
  canDeleteChildren: boolean;
  canMoveChildrenOutOfTeamDrive: boolean;
  canMoveChildrenWithinTeamDrive: boolean;
  canTrashChildren: boolean;
  canMoveItemOutOfDrive: boolean;
  canAddMyDriveParent: boolean;
  canRemoveMyDriveParent: boolean;
  canMoveItemWithinDrive: boolean;
  canShare: boolean;
  canMoveChildrenWithinDrive: boolean;
  canModifyContentRestriction: boolean;
  canAddFolderFromAnotherDrive: boolean;
  canChangeSecurityUpdateEnabled: boolean;
  canAcceptOwnership: boolean;
  canReadLabels: boolean;
  canModifyLabels: boolean;
  canModifyEditorContentRestriction: boolean;
  canModifyOwnerContentRestriction: boolean;
  canRemoveContentRestriction: boolean;
};

export type GoogleDriveFileMetaData = {
  kind: string;
  driveId: string;
  fileExtension: string;
  copyRequiresWriterPermission: boolean;
  md5Checksum: string;
  contentHints: {
    indexableText: string;
    thumbnail: {
      image: string;
      mimeType: string;
    };
  };
  writersCanShare: boolean;
  viewedByMe: boolean;
  mimeType: string;
  exportLinks: {
    string: string;
  };
  parents: [string];
  thumbnailLink: string;
  iconLink: string;
  shared: boolean;
  lastModifyingUser: {
    [key]: string;
  };
  owners: [
    {
      [key]: string;
    },
  ];
  headRevisionId: string;
  sharingUser: {
    [key]: string;
  };
  webViewLink: string;
  webContentLink: string;
  size: string;
  viewersCanCopyContent: boolean;
  permissions: [
    {
      [key]: string;
    },
  ];
  hasThumbnail: boolean;
  spaces: [string];
  folderColorRgb: string;
  id: string;
  name: string;
  description: string;
  starred: boolean;
  trashed: boolean;
  explicitlyTrashed: boolean;
  createdTime: string;
  modifiedTime: string;
  modifiedByMeTime: string;
  viewedByMeTime: string;
  sharedWithMeTime: string;
  quotaBytesUsed: string;
  version: string;
  originalFilename: string;
  ownedByMe: boolean;
  fullFileExtension: string;
  properties: {
    [key]: string;
  };
  appProperties: {
    [key]: string;
  };
  isAppAuthorized: boolean;
  teamDriveId: string;
  capabilities: GoogleDriveFileCapabilities;
  hasAugmentedPermissions: boolean;
  trashingUser: {
    [key]: string;
  };
  thumbnailVersion: string;
  trashedTime: string;
  modifiedByMe: boolean;
  permissionIds: [string];
  imageMediaMetadata: {
    flashUsed: boolean;
    meteringMode: string;
    sensor: string;
    exposureMode: string;
    colorSpace: string;
    whiteBalance: string;
    width: integer;
    height: integer;
    location: {
      latitude: number;
      longitude: number;
      altitude: number;
    };
    rotation: integer;
    time: string;
    cameraMake: string;
    cameraModel: string;
    exposureTime: number;
    aperture: number;
    focalLength: number;
    isoSpeed: integer;
    exposureBias: number;
    maxApertureValue: number;
    subjectDistance: integer;
    lens: string;
  };
  videoMediaMetadata: {
    width: integer;
    height: integer;
    durationMillis: string;
  };
  shortcutDetails: {
    targetId: string;
    targetMimeType: string;
    targetResourceKey: string;
  };
  contentRestrictions: [
    {
      [key]: string;
    },
  ];
  resourceKey: string;
  linkShareMetadata: {
    securityUpdateEligible: boolean;
    securityUpdateEnabled: boolean;
  };
  labelInfo: {
    labels: [
      {
        [key]: string;
      },
    ];
  };
  sha1Checksum: string;
  sha256Checksum: string;
};

type GoogleDriveFileDownloadResponse = {
  result: boolean;
  body: string;
  headers: {
    'cache-control': string;
    'content-encoding': string;
    'content-type': string;
    date: string;
    expires: string;
    server: string;
    vary: string;
    'x-guploader-uploadid': string;
    'Content-Type': string;
  };
  status: number;
  statusText: string;
};

export type Place = {
  id?: number;
  country: string;
  locality: string;
  route: string;
  postalCode: string;
  streetNumber: string;
  administrativeAreaLevel1: string;
  administrativeAreaLevel2: string;
  formattedAddress: string;
  longitude: number;
  latitude: number;
  placeId?: string;
};

export type CVAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type CVEducation = {
  id?: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  institutionLocation: string;
  currentlyEnrolled?: boolean;
  createdAt?: string;
};

export type CVWorkExperience = {
  id?: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  workLocation: string;
  employersName: string;
  currentlyEmployed?: boolean;
  responsibilities?: string[];
  createdAt?: string;
};

export type CVLicense = {
  id?: number;
  licenseNumber: string;
  lState: string;
  compactState?: boolean;
  licensingBody: string;
  lExpirationDate: string;
  createdAt?: string;
};

export type CVSkills = {
  sname: string;
};

export type CertificationFile = {
  createdAt: string;
  deletedAt: string;
  fileName: string;
  id: number;
  jsonRepresentation: string;
  updatedAt: string;
  url: string;
  key: string;
};

export type CVCertification = {
  id?: number;
  cname: string;
  issuer: string;
  expires?: boolean;
  cExpirationDate: string;
  file?: string;
  certificationFile?: CertificationFile;
  createdAt?: string;
} & { cert?: File | null | boolean };

export type PersonalDataType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  preferredName: string;
  zipCode: string;
  summary: string;
  dateOfBirth: string;
  websites: string;
  city: string;
  state: string;
  country: string;
  street: string;
};

export type CV = {
  name: string;
  phoneNumbers: string[];
  websites: string[];
  emails: string[];
  dateOfBirth: string;
  addresses: Array<CVAddress>;
  summary: string;
  education: Array<CVEducation>;
  workExperience: Array<CVWorkExperience>;
  license: Array<CVLicense>;
  skills: Array<CVSkills>;
  certifications: Array<CVCertification>;
};
export type EntityWithTimestampAudits = {
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  zoneId?: string;
};

export type ResumeFile = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: number;
  fileName: string;
  url: string;
  jsonRepresentation: string;
  processedAt: string;
  key: string;
};

export type JobSpecialty = {
  id?: number;
  name: string;
};

export type JobPosition = {
  id?: number;
  title: string;
  specialties: Array<JobSpecialty>;
};

export type UserJobPosition = {
  id: number;
  jobPosition: JobPosition;
};

export type ResumeInfo = {
  id: number;
  name: string;
  phoneNumbers: string[];
  websites: string[];
  emails: string[];
  dateOfBirth: string;
  summary: string;
  street: string;
  city: string;
  state: string;
  country: string;
  workExperiences: CVWorkExperience[];
  educations: CVEducation[];
  licenses: CVLicense[];
  certifications: CVCertification[];
  workPreference: WorkPreference;
  completedAt?: string;
  approvedAt?: string;
  skills?: string[];
  resumeFile?: ResumeFile;
  jobPositions?: UserJobPosition;
  candidate?: CandidateResponse;
} & EntityWithTimestampAudits;

export type ResumeFlags = {
  completedAt?: string;
  approvedAt?: string;
};

export type User = {
  id: number;
  email: string;
  roleId: string;
  emailVerifiedAt: string;
} & EntityWithTimestampAudits;

export type Candidate = {
  id: number;
  firstName: string;
  lastName: string;
  preferredName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: string;
} & EntityWithTimestampAudits;
export type CreateCVRequest = {
  firstName: string;
  lastName: string;
  preferredName: string;
  summary: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: string;
  phoneNumbers: string[];
  websites: string[];
  emails: string[];
  email?: string;
  otp?: string;
};
export type ResumeCandidateResponse = {
  user: Partial<User>;
  candidate: Partial<Candidate>;
  resume: Partial<ResumeInfo>;
  jobPositions: {
    id: number;
    jobPosition: JobPosition;
  }[];
};

export type AssignmentsType = {
  perDiem: boolean;
  preLocalAssignment: boolean;
  travelAssignment: boolean;
};

export type SpecialtyType = Record<
  'certifiedNurseAssistant' | 'preOpRN' | 'telemetryRN',
  boolean
>;

export type WorkPreference = {
  locations: string[];
  distanceWillingToTravel: string;
  specialty: SpecialtyType;
  moreSpecialty: string[];
  assignment: AssignmentsType;
  letMedSyncAiEnhanceResume: boolean;
  rate: string;
  places?: Partial<Place>[];
};

export type Validity<T> = {
  valid: boolean;
  errors?: Partial<Record<keyof T, string>>;
};

export type MediaSlot = {
  id: number;
  mediaType: string;
  role: string;
  src: string;
  fileName: string;
  thumbnailSrc: string;
  fileSize: string;
  bitRate: string;
  externalKey: string;
};

export type AuthIntent = 'signup' | 'medical-center' | 'login' | 'join-team';

export type MedicalCenterProfile = {
  methodOfParking: string;
  parkingReimbursementAvailable: boolean;
  dailyCost: string;
  parkingInstructions: string;
  agreeToTerms?: boolean;
  scrubPreference?: string;
  billingGroupId?: number;
  validatedParking?: boolean;
};

export type ClinicalContact = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: string;
  dial?: string;
};

export type IdDocumentRequest = {
  id?: string;
  docSrc?: string;
  docType: string;
  docType2: string;
  docIssueDate: string;
  docExpiryDate: string;
};

export type SSNDocumentRequest = {
  id?: string;
  ssDocSrc?: string;
  ssn: string;
};

export type EmergencyContact = {
  id?: string;
  firstName: string;
  lastName: string;
  relationship: string;
  phone: string;
  email: string;
  dial?: string;
};
export type Covid19Vaccination = {
  completedVaccSeries: string;
  manufacturer: string;
  DateOfFinalVacc: string;
  [key: string]: string;
};
export type MedRecords = {
  [key: string]: string;
};
export type ReferencesDocumentRequest = {
  id?: string;
  references: Reference[];
};

export type BusinessCustomer = {
  id: number;
  email?: string;
  balance?: number;
  currency?: string;
  paymentProvider?: string;
  paymentProcessingId?: string;
  clientSecret?: string;
  sessionClientSecret?: string;
} & EntityWithTimestampAudits;

export type BillingGroup = {
  id: number;
  name: string;
  description: string;
  cardNumber: string;
  cardExpiryDate: string;
  cardCVV: string;
  createdBy?: User;
  isDefault?: boolean;
  paymentMethod?: string | null;
  businessCustomer?: BusinessCustomer;
} & EntityWithTimestampAudits;

export type MedicalCenter = {
  id?: number;
  centerName: string;
  facilityType: string;
  department: string;
  address: string;
  unit: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  phoneType: string;
  profile?: MedicalCenterProfile;
  clinicalContacts?: ClinicalContact[];
  dial?: string;
  billingGroups?: BillingGroup[];
  user?: User;
  longitude?: number;
  latitude?: number;
};

export type vaccData = {
  covid19: Covid19Vaccination;
};
export type UserProfile = {
  id: number;
  user: User;
  idDocumentSrc: string;
  idDocumentType: string;
  idDocumentKey: string;
  idDocument2Key: string;
  idDocumentIssueDate: string;
  idDocumentExpiryDate: string;
  ssDocumentSrc: string;
  ssDocumentKey: string;
  ssn: string;
  covid19AgreementAt?: string | null;
  hippaOshaAgreementAt?: string | null;
  arbitrationAgreementAt?: string | null;
  healthCareWorkersAgreementAt?: string | null;

  // local properties not on Server
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyRelationship: string;
  emergencyPhoneNumber: string;
  emergencyEmail: string;
  references: Reference[];
  referencesFirstName: string;
  referencesLastName: string;
  referencesFacilityName: string;
  referencesPhoneNumber: string;
  referencesEmail: string;
  referencesTitleName: string;
  referencesStartDate: string;
  referencesStartDate: string;
  referencesUnit: string;
  vaccData: vaccData;
};
export type Reference = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  unit: string;
  title: string;
  startDate: string;
  endDate: string;
  phone: string;
  dial?: string;
  generatedId?: string;
  relationshipWithCandidate: string;
  otherRelationshipWithCandidate?: string;
  [key: string]: string | number | undefined;
};

// id: number;
// firstName: string;
// lastName: string;
// company: string;
// unit: string;
// title: string;
// phone: string;
// startDate: string;
// endDate: string;
// email: string;
// jsonRepresentation?: string;
// country: string;
// state: string;
// city: string;
// zipCode: string;
// street: string;
// streetLine2: string;
// status: string;
// code: string;
// candidate?: Candidate;
// respondedAt?: string;
// dial?: string;

export type City = {
  id?: number;
  name: string;
  officialId: string;
  longitude: number;
  latitude: number;
  zipCodes: string;
};

export type State = {
  id?: number;
  name: string;
  officialId: string;
  cities?: Array<City>;
};

export type Country = {
  id?: number;
  iso2Code: string;
  name: string;
  dial: string;
  flag: string;
  states?: Array<State>;
};

export type JobPostRequest = {
  title: string;
  position: string;
  description: string;

  // per diem or assignments
  category: string;
  tags: string;
  jobType: string;
  startDate: string;
  endDate: string;
  location: string;
  additionalDetails: string[];
  specialties: string[];
  hourlyRate: number;
  oneTimeBonus: number;
  serviceTypes: string[];
  servicePatientPopulationType: string;
  contactInfo: number;
  startTime: string;
  endTime: string;
  numberOfShift: number;
  repeatShift: boolean;
  additionalDetails: string;
  positionId: number;
  shiftsPerWeek?: number;
  schedule?: string[];
  medicalCenterId?: string | number;
  zoneId?: string;
};

export type JobPosting = {
  id?: number;
  title: string;
  position: string;
  description: string;
  category: string;
  tags: string;
  jobType: string;
  startDate: string;
  endDate: string;
  location: string;
  additionalDetails: string[];
  specialties: string[];
  hourlyRate: number;
  oneTimeBonus: number;
  serviceTypes: string[];
  servicePatientPopulationType: string;
  contractDurationInMonths: string;
  requiredHoursPerWeek: string;
  benefits: string;
  housingProvided: string;
  travelReimbursement: string;
  startTime: string;
  endTime: string;
  perDiemRate: string;
  maxHoursPerDay: string;
  numberOfShifts: number;
  repeatShift: boolean;
  status: string;
  user: User;
  medicalCenter: MedicalCenter;
  place?: Place;
  clinicalContacts?: ClinicalContact[];
  listedPosition?: JobPosition;
  medicalCenterId: number;
  applicantsCount: number;
  contactInfo?: string;
  shiftsPerWeek?: number;
  schedule?: string[];
  lastPostedAt?: string;
} & EntityWithTimestampAudits;

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

export type Vaccination = {
  name: string;
  fields: Field[];
};
export interface Test {
  name: string;
  requiredFields: string[];
}
export type Country = {
  name: string;
  id: number;
  flag: string;
  iso2Code: string;
  dial: string;
};

export type RefDetails = {
  firstName: string;
  lastName: string;
};

export type RefereeDetails = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  state: string;
  postal: string;
  streetAddress1: string;
  streetAddress2: string;
  relationship: string;
};

export type empDetails = {
  dateEmployedFrom: string;
  dateEmployedTo: string;
  candidatesJobTitle: string;
  reasonForLeaving: string;
  reEmploy: boolean;
  comments: string;
};

// export type empInfo = {
//   generalConduct: 'Excellent' | 'Satisfactory' | 'Good' | 'Poor' | undefined;
//   timeKeeping: 'Excellent' | 'Satisfactory' | 'Good' | 'Poor' | undefined;
//   communicationSkills:
//     | 'Excellent'
//     | 'Satisfactory'
//     | 'Good'
//     | 'Poor'
//     | undefined;
//   relWithColleague: 'Excellent' | 'Satisfactory' | 'Good' | 'Poor' | undefined;
//   relWithPatients: 'Excellent' | 'Satisfactory' | 'Good' | 'Poor' | undefined;
//   levelOfPerformance:
//     | 'Excellent'
//     | 'Satisfactory'
//     | 'Good'
//     | 'Poor'
//     | undefined;
//   honestyAndIntegrityComment: string;
//   needClinicalDevelopment: string;
//   awareOfSuspiciousProceedings: string;
//   additionalComments: string;
//   agreeToCorrectness: boolean;
// };
export type empInfo = {
  generalConduct: IntRange<1, 20> | undefined;
  timeKeeping: IntRange<1, 20> | undefined;
  communicationSkills: IntRange<1, 20> | undefined;
  relWithColleague: IntRange<1, 20> | undefined;
  relWithPatients: IntRange<1, 20> | undefined;
  levelOfPerformance: IntRange<1, 20> | undefined;
  honestyAndIntegrityComment: string;
  needClinicalDevelopment: string;
  // awareOfSuspiciousProceedings: string;
  additionalComments: string;
  agreeToCorrectness: boolean;
};

export type ResumeScore = {
  candidateId: number;
  jobPostId: number;
  score?: number;
  rank?: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type JobApplicationRequest = {
  coverLetterSrc?: string;
  source?: string;
  jobId: number;
};

export type InAppNotification = {
  id?: number;
  readAt: string;
  notifiableType: string;
  notificationActionType: string;
  notificationActionId: string;
  notifiableId: string;
  notifiableSenderId: string;
  data: string;
};

export type Notification = InAppNotification & {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type SignedUrl = {
  url: string;
  validitySeconds: number;
  expiresAt: string;
};

export type CandidateReference = {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  unit: string;
  title: string;
  phone: string;
  startDate: string;
  endDate: string;
  email: string;
  jsonRepresentation?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
  streetLine2: string;
  status: string;
  code: string;
  candidate?: Candidate;
  respondedAt?: string;
  dial?: string;
};
export type Authority = {
  id: number;
  name: string;
  description: string;
} & EntityWithTimestampAudits;

export type JobApplicationResponse = {
  id: number;
  status: string;
  coverLetterSrc: string;
  notes: string;
  rating: number;
  source: string;
  jobPostId: number;
  approvedAt: string;
  rejectedAt: string;
  candidate?: Candidate;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  candidateId: number;
  jobPost?: JobPosting;
  resumeScore?: ResumeScore;
  resume?: ResumeInfo;
  candidateReferences?: CandidateReference[];
  resumeProfile?: string | null | ResumeProfile;
};

export type ListOfRequest<T> = {
  data: T[];
};

export type ResumeProfile = {
  'Top 3 Relevant Certifications': string[] | string;
  'Top 3 Strengths': string[] | string;
  'Top 3 Weaknesses': string[] | string;
  'Overall Total Years of Experience': number;
  'Top 3 Skills': string[] | string;
  Overview: string;
  'Work Experience Score': number;
  'Skills Score': number;
  'Education Score': number;
  'Certification Score': number;
  Name: string;
  'Phone Number': string;
  'Email Address': string;
  'Overall Sentiment': number;
  'Total Relevant Years of Experience': number;
};

export type CandidateReferenceScore = {
  id?: number;
  candidateId: number;
  score: string;
};
export type CandidateReferenceScoreIntValue = {
  'General Conduct': number;
  'Time Keeping': number;
  'Communication Skills': number;
  'Relationship with Colleague': number;
  'Relationship with Patients': number;
  'Honesty and Integrity': number;
};
export type CandidateReferenceScoreValue = {
  references: {
    CandidateID: number;
    Reference: string;
    Sentiment: 'negative' | 'positive' | 'neutral';
    ReferenceID: number;
  }[];
  total_scores: CandidateReferenceScoreIntValue;
  average_scores: CandidateReferenceScoreIntValue;
  overall_scores?: number;
};

export type UserVaccination = {
  id?: number;
  name: string;
  completeSeriesReceived?: boolean;
  finalDate?: string;
  manufacturer: string;
  vaccineDocumentSrc?: string;
  vaccineDocumentKey?: string;
  immunityType?: string;
  issueDate?: string;
  seriesDates?: string[];
  expiryDate?: string;
  currentOnShots?: boolean;
  jsonRepresentation: string;
  file?: File;
  reasonNotVaccinated?: string;
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

export type userPreviousAddress = userAddress & {
  dateMovedOut: string;
};

export type UserJobPositionRequest = {
  position: number;
  specialties: number[];
};

export type CandidateResponse = Candidate & {
  user: User;
};

export type ResidentialAddressRequest = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  unit: string;
  dateMovedIn: string;
  dateMovedOut: string;
  sortOrder: number;
  current: boolean;
};

export type BackgroundScreeningRequest = {
  resultCopyRequested: boolean;
  consentGiven: boolean;
  residentialAddresses: ResidentialAddressRequest[];
};

export type ResidentialAddress = ResidentialAddressRequest & {
  id: number;
  checkedAt: string | null;
  user: User;
  checkedBy: User | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type BackgroundScreening = {
  id: number;
  approvedAt: string | null;
  resultCopyRequested: boolean;
  consentGiven: boolean;
  residentialAddresses: ResidentialAddress[];
  user: User;
  candidate: CandidateResponse;
  approvedBy: User | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  selfReported?: boolean;
  reportSrc?: string;
  reportFileKey?: string;
};

export type SysAdminProfileResponse = {
  id: number;
  firstName: string;
  lastName: string;
  picture: string;
  userId: number;
  createdById: number;
  user?: User;
} & EntityWithTimestampAudits;

export type AvailabilitySlot = {
  id: number;
  booked: boolean;
  notes: string;
  date: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  userId: boolean;
} & EntityWithTimestampAudits;

export type AvailabilityBookingResponse = {
  id: number;
  candidateId: number;
  bookingDate: string;
  bookingStartTime: string;
  bookingEndTime: string;
  status: string;
  title: string;
  slotId: number;
  candidate: CandidateResponse;
  availabilitySlot: AvailabilitySlot;
  admin?: SysAdminProfileResponse;
} & EntityWithTimestampAudits;

export type InterviewBookingDetails = {
  booking: AvailabilityBookingResponse;
  resume: ResumeInfo;
  userProfile?: UserProfile;
  emergencyContacts?: EmergencyContact[];
  candidateReferences?: CandidateReference[];
};

export type NotificationPreference = {
  id: number;
  channel: string;
  topic: string;
  description: string;
  frequency: string;
} & Partial<EntityWithTimestampAudits>;

export type PrincipalResponse = {
  user?: User;
  role?: Role;
  candidate?: Candidate;
  medicalCenters?: MedicalCenter[];
  flags?: ResumeFlags;
  userProfile?: UserProfile;
  emergencyContacts?: EmergencyContact[];
  candidateReferences?: CandidateReference[];
  authorities?: Authority[];
  interviewBookings?: InterviewBookingDetails[];
  backgroundScreening?: BackgroundScreening;
  sysAdminProfile?: SysAdminProfileResponse;
  centerRoles?: Role[];
  clinicalContact?: ClinicalContact;
  notificationPreferences?: NotificationPreference[];
  preferredJobPositions?: UserJobPosition[];
  resume?: ResumeInfo;
};

export type AnswerData = {
  id: number;
  content: string;
  questionId: number;
} & EntityWithTimestampAudits;

export type RatingAnswerData = {
  id: number;
  maxLabel: string;
  minLabel: string;
  description: string;
  createdBy: number | null;
  labels: string[];
} & EntityWithTimestampAudits;

export type QuestionData = {
  id: number;
  stem: string;
  questionType: string;
  answers: AnswerData[] | null;
  ratingAnswers: RatingAnswerData[] | null;
} & EntityWithTimestampAudits;

export type AssessmentAttempt = {
  id: number;
  score: number | null;
  completedAt: string | null;
} & EntityWithTimestampAudits;

export type AssessmentResponse = {
  id: number;
  title: string;
  description: string;
  graded: boolean;
  score: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  questions?: QuestionData[] | null;
  attempt?: AssessmentAttempt | null;
};
export type PositionResponse = {
  id: number;
  title: string;
};
export type SkillAssessmentResponse = {
  id: number;
  position: PositionResponse;
  assessment: Omit<AssessmentResponse, 'attempt'> & {
    attempts?: AssessmentAttempt[] | null;
  };
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type QuestionResponseRequest = {
  content?: string;
  questionId: number;
  answerId?: number;
  attemptId: number;
};

export type QuestionResponseData = {
  id: number;
  content: string;
  questionId: number;
  answerId: number;
  attemptId: number;
  submittedAt: string;
} & EntityWithTimestampAudits;

export type BillingGroupRequest = {
  name: string;
  description?: string;
  cardNumber?: string;
  cardExpiryDate?: string;
  cardCVV?: string;
  medicalCenterId?: number;
};

export type JobTemplate = {
  id: number;
  title: string;
  position: string;
  jobType: string;
  additionalDetails: string[];
  specialties: string[];
  serviceTypes: string[];
  servicePatientPopulationType: string;
  positionId: number;
  jobId: number;
  createdById: number;
  medicalCenterId: number | string;
};

export type AccountInvitationSuggestionRecord = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
} & EntityWithTimestampAudits;

export type AccountInvitationSuggetionReponse = {
  suggestions: Page<AccountInvitationSuggestionRecord>;
};

export type MedicalCenterInvitationRequest = {
  email: string;
  billingGroups?: number[];
  centers: number[];
  roles: string[];
};

export type MedicalCenterInvitation = {
  id: number;
  roles: Role[];
  medicalCenters: MedicalCenter[];
  expiresAt: string;
  username: string;
  invitedBy: User;
  billingGroups?: BillingGroup[];
  clinicalContact?: ClinicalContact;
  approvedAt?: string | null;
} & EntityWithTimestampAudits;

export type MenuProperties = {
  label: React.ReactNode;
  key: React.Key;
  path: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: 'group';
};
export type MenuItem = Required<MenuProps>['items'][number];

export type InfoCategory = {
  id: number;
  name: string;
  description: string;
} & EntityWithTimestampAudits;

export type FAQResponse = {
  id: number;
  title: string;
  question: string;
  answer: string;
  categories: InfoCategory[];
} & EntityWithTimestampAudits;

export type InfoCategoryResponse = InfoCategory & {
  faqs?: [];
};

export type CreateInfoDocRequest = {
  title?: string;
  content: string;
};

export type InfoDocumentResponse = {
  id: number;
  title?: string | null;
  content: string;
  documentType: string;
  version: number;
  active: boolean;
  category: InfoCategory;
  author: User;
} & EntityWithTimestampAudits;

export type ContentManagementDocuments =
  | 'terms-and-conditions'
  | 'privacy-policy'
  | 'hipaa-osha-agreement'
  | 'arbitration-agreement'
  | 'healthcare-workers-agreement'
  | 'healthcare-centers-agreement'
  | 'covid-19-agreement'
  | 'cancellation-policy-msai';

export type AgreeToReqiredPolicies = {
  covid19Agreement?: boolean;
  hippaOshaAgreement?: boolean;
  arbitrationAgreement?: boolean;
  healthCareWorkersAgreement?: boolean;
  medsyncAIHandbookAgreement?: boolean;
};

export type BaseLatLong = {
  latitude: number;
  longitude: number;
};

export type UserFormData = {
  formTitle: string;
  response: string;
};

export type UserFormResponse = {
  id: number;
  formId: string;
  formTitle: string;
  response: string;
  user: User;
} & EntityWithTimestampAudits;

export type UserFormId =
  | 'worker-physical-examination-form'
  | 'worker-turberculosis-questionare'
  | (string & {});

export type WorkerShiftRequest = {
  jobId: number;
  latitude?: number;
  longitude?: number;
  comments?: string;
  hours?: number;
  extraHours?: number;
};

export type WorkerShiftStatusLog = {
  id: number;
  statusFrom: string;
  statusTo: string;
  reason: string;
  comments: string;
  maker: User;
  hasCancellationPolicyBreaches: boolean;
} & EntityWithTimestampAudits;

export type RejectShiftRequest = {
  reason: string;
  comments: string;
};

export type EditShiftTimeRequest = {
  startTime?: string;
  endTime?: string;
};

export type WorkerShift = {
  id: number;
  startedAt: string;
  endedAt: string;
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
  comments: string;
  approvedAt?: string | null;
  startProofOfLocationImageUrl?: string | null;
  endProofOfLocationImageUrl?: string | null;
  user: User;
  candidate: CandidateResponse;
  job: JobPosting;
  jobApplication: JobApplicationResponse;
  approvedBy: User;
  status: string;
  estimatedPay: number;
  statusLogs?: WorkerShiftStatusLog[];
  workLogs?: BillableWorkLogData[];
} & EntityWithTimestampAudits;

export type WorkerShiftResponse = Omit<WorkerShift, 'user' | 'approvedBy'> & {
  userId: number;
  candidateId: number;
  jobPostId: number;
  jobApplicationId: number;
  approvedById: number;
};

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

export type ContractorPayment = {
  id: number;
  uuid: string;
  contractorUuid: string;
  bonus: number;
  hours: number;
  hourlyRate: number;
  mayCancel: true;
  paymentMethod: string;
  reimbursement: number;
  status: string;
  wage: number;
  wageType: string;
  wageTotal: number;
  checkDate: string;
} & EntityWithTimestampAudits;

export type BillableWorkLogData = {
  id: number;
  status: string;
  approvedBy?: User;
  approvedHours?: number;
  hours: number;
  hourlyRate: number;
  extraHours: number | null;
  approvedExtraHours: number | null;
  totalAmount: number;
  billedToCenterAt?: string;
  billedAt?: string;
  workerShift: WorkerShift;
  job: JobPosting;
  worker: User;
} & EntityWithTimestampAudits;

export type WorkerInvoiceData = {
  id: number;
  invoiceNumber: string;
  externalPaymentProcessingId: string;
  externalPaymentProcessingVersion: string;
  externalProviderName: string;
  status: string;
  amount: number;
  sentAt: string;
  paidAt: string;
  billingCycle?: string;
  billableWorkLogs?: BillableWorkLogData[];
  contractorPayments?: ContractorPayment[];
  tags: string[];
} & EntityWithTimestampAudits;

export type CenterInvoiceData = WorkerInvoiceData;

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

export type TimeSheetStatus = keyof typeof TimeSheetStatusName;

export type BillableJobData = {
  name: string;
  id: number;
  position: string;
  serviceTypes: string[];
  dateSubmitted: string;
  status: string;
  job?: Omit<JobPosting, 'medicalCenter'>;
  user: User;
  candidate: CandidateResponse;
  shifts: WorkerShift[];
};

export type BankAccountRequest = {
  name: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  isDefault?: boolean;
  centerId?: number;
  default: boolean;
};

export type BankAccount = {
  id: number;
  name: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  externalPaymentProcessingId: string;
  isActive: boolean;
  isDefault: boolean;
  realm: string;
} & EntityWithTimestampAudits;

export type JobType = 'ASSIGNMENT' | 'PER_DIEM';

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

export type WorkerDetails = {
  resume?: ResumeInfo;
  emergencyContacts?: EmergencyContact[];
  candidateReferences?: CandidateReference[];
  userProfile?: UserProfile;
};

export type Fn = () => void;
export type CenterInvoicePayment = {
  id: number;
  invoiceNumber: string;
  amount: number;
  cancelledAt: string | null;
  cancellationReason: string | null;
  paymentProvider: string;
  currency: string;
  clientSecret: string | null;
  sessionClientSecret?: string | null;
  paymentProcessingId: string | null;
  status: string;
} & EntityWithTimestampAudits;

export type defaultMenuItems =
  | 'dashboard'
  | 'profile'
  | 'customer-service'
  | 'settings'
  | 'logout';

export type TemporalUnit = 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
