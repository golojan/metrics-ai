import { ReactNode } from 'react';
import { Gender, LecturerLevel, LecturerType, StudentType } from './enums';
import { NextApiRequest, NextApiResponse } from 'next/types';

export interface IUserReactions {
  _id?: string;
  postFeedId?: string;
  commentId?: string;
  fromUser?: string;
  toUser?: string;
  like?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PublicationInfo {
  _id?: string;
  title?: string;
  link?: string;
  citation_id?: string;
  authors?: string;
  cited_by?: {
    value?: number;
    link?: string;
    serpapi_link?: string;
    cites_id?: string;
  };
  year?: string;
}
export interface IPostComment {
  _id?: string;
  postFeedId: string;
  fromUser: string;
  toUser: string;
  comment?: string;
  image?: string;
  viewsCount?: number;
  likesCount?: number;
  commentsCount?: number;
  onReview?: boolean;
  approved?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Image {
  id?: string;
  name?: string;
  base64?: string;
}

export interface IPostFeed {
  _id?: string;
  postType?: string;
  accountId?: string;
  schoolId?: string;
  title?: string;
  shortname?: string;
  content?: string;
  image?: string;
  views?: number;
  onReview?: boolean;
  approved?: boolean;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SchoolInfo {
  _id?: string;
  logo?: string;
  name?: string;
  domain?: string;
  shortname?: string;
  state?: string;
  location?: string;
  ownedBy?: string;
  founded?: number;
  enabled?: boolean;
  indicators?: any;
}

export interface UserSnippet {
  status?: boolean;
  _id?: string;
  error?: string;
}

export interface MRCInfo {
  status?: boolean;
  _id?: string;
  mrcId?: string;
  regId?: string;
  schoolId?: string;
  facultyId?: string;
  departmentId?: string;
  accountType?: string;
  membershipType?: string;
  lastname?: string;
  firstname?: string;
  middlename?: string;
  gender?: string;
  lga?: string;
  state?: string;
  country?: string;
  certificate?: string;
  rank?: string;
  mrcUsed?: boolean;
  mrcUsedDate?: Date;
  enabled?: boolean;
}

export interface AuthUserInfo {
  _id?: string;
  id?: string;
  verified?: boolean;
  regNumber?: string;
  facultyId?: string;
  departmentId?: string;
  schoolId?: string;
  accountType?: string;
  membershipType?: string;
  picture?: string;
  fullname?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  aboutMe?: string;
  username?: string;
  staffNumber?: string;
  role?: string;
  email?: string;
  gender?: string;
  mobile?: string;
  birthday?: string;
  street?: string;
  city?: string;
  lga?: string;
  state?: string;
  zip?: string;
  publications?: object[];
  country?: string;
  smsNotification?: boolean;
  emailNotification?: boolean;
  schoolCode?: string;
  googleScholarId?: string;
  lastScrapped?: Date;
  scopusId?: string;
  orcidId?: string;
  googlePresence?: number;
  citationsPerCapita?: number;
  hindexPerCapita?: number;
  i10hindexPerCapita?: number;
  i10indexByWeight?: number;
  hindexByWeight?: number;
  citationByWeight?: number;
  total?: number;
  position?: string;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  isPHD?: boolean;
  isReader?: boolean;
  isFullProfessor?: boolean;
  isPGD?: boolean;
  isAssociateProfessor?: boolean;
  isFellow?: boolean;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ResponseFunctions {
  GET?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  POST?: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
}

export type DataLists = {
  schools?: SchoolInfo[];
  accounts?: AccountInfo[];
  indicators?: IndicatorInfo[];
  memberships?: MembershipsInfo[];
  roles?: RolesInfo[];
};

export type RolesInfo = {
  _id?: string;
  role?: string;
  description?: string;
  enabled?: boolean;
};

export type AccountInfo = {
  schoolId?: string;
  school?: SchoolInfo;
  status?: boolean;
  _id?: string;
  membership?: string;
  accountType?: string;
  role?: string;
  avatar?: string;
  university?: string;
  email?: string;
  mobile?: string;
  passwordKey?: string;
  sex?: string;
  birthday?: string;
  idtype?: string;
  idnumber?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  street?: string;
  city?: string;
  lga?: string;
  state?: string;
  zip?: string;
  country?: string;
  regfee?: number;
  referrer?: string;
  enabled?: boolean;
};

export type MembershipsInfo = {
  _id?: string;
  membership?: string;
  description?: string;
  enabled?: boolean;
};

export type IndicatorCount = {
  schoolsCount?: number;
  indicatorsCount?: number;
  accountsCount?: number;
  rolesCount?: number;
  membershipCount?: number;
};

export type IndicatorInfo = {
  _id?: string;
  shortname?: string;
  indicator?: string;
  criteria?: string;
  weight?: number;
  multiplier?: number;
  enabled?: boolean;
};

export interface IHistory {
  name?: string;
  lecturers?: LecturerInfo[];
  students?: StudentInfo[];
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  allschools?: [object];
  adminId?: string;
}

export type GSIRanking = {
  _id?: string;
  id?: string;
  schoolId?: string;
  facultyId?: string;
  departmentId?: string;
  picture?: string;
  username?: string;
  name?: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  canScrap?: boolean;
  accountId?: string;
  googleScholarId?: string;
  scrap?: boolean;
  scrapper?: string;
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  totalCitations?: number;
  totalHIndex?: number;
  totalI10Index?: number;
  totalAccounts?: number;
  totalStudents?: number;
  totalLecturers?: number;
  totalAlumni?: number;
  citationsPerCapita?: number;
  hindexPerCapita?: number;
  i10hindexPerCapita?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  highestCitations?: number;
  highestHindex?: number;
  highestI10hindex?: number;
  highestTotalPublications?: number;
  highestFirstPublicationYear?: number;
  highestLastPublicationYear?: number;
  lowestCitations?: number;
  lowestHindex?: number;
  lowestI10hindex?: number;
  lowestTotalPublications?: number;
  lowestFirstPublicationYear?: number;
  lowestLastPublicationYear?: number;
  averageCitations?: number;
  averageHindex?: number;
  averageI10hindex?: number;
  averageTotalPublications?: number;
  totalStaff?: number;
  totalGooglePresence?: number;
  totalInternalStaff?: number;
  fullAccreditation?: number;
  totalDepartments?: number;
  lecturerStudentRatio?: number;
  percentageFullProfessors?: number;
  percentageProffessorsAndReaders?: number;
  totalReaders?: number;
  totalPHDs?: number;
  percentagePHDs?: number;
  percentageFemaleLecturers?: number;
  percentageFemaleStudents?: number;
  percentageOfInternationalStaff?: number;
  percentageOfInternationalStudents?: number;
  totalInternationalStudents?: number;
  totalStaffWithOutGooglePresence?: number;
  totalStaffWithGooglePresence?: number;
  percentageOfStaffWithGooglePresence?: number;
  totalFemaleStudents?: number;
  totalFemaleLecturers?: number;
  internationalStaff?: number;
  localStaff?: number;
  totalInternationalColaborations?: number;
  perCapitaAllCitations?: number;
  perCapitaAllHindex?: number;
  perCapitaAllI10hindex?: number;
  total?: number;
  publications?: [];
  searchMetadata?: object;
  authorMetadata?: {
    name?: string;
    affiliations?: string;
    email?: string;
    interests?: {
      title?: string;
      link?: string;
      serpapi_link?: string;
    }[];
    thumbnail?: string;
  };
  rank?: number;
  position?: string;
  highestTotal?: number;
};

export type USERGSIRanking = {
  id?: string;
  username?: string;
  name?: string;
  canScrap?: boolean;
  accountId?: string;
  googleScholarId?: string;
  scrap?: boolean;
  scrapper?: string;
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  highestCitations?: number;
  highestHindex?: number;
  highestI10hindex?: number;
  highestTotalPublications?: number;
  highestFirstPublicationYear?: number;
  highestLastPublicationYear?: number;
  lowestCitations?: number;
  lowestHindex?: number;
  lowestI10hindex?: number;
  lowestTotalPublications?: number;
  lowestFirstPublicationYear?: number;
  lowestLastPublicationYear?: number;
  averageCitations?: number;
  averageHindex?: number;
  averageI10hindex?: number;
  averageTotalPublications?: number;
  totalStaff?: number;
  totalGooglePresence?: number;
  totalStaffWithOutGooglePresence?: number;
  totalStaffWithGooglePresence?: number;
  internationalStaff?: number;
  localStaff?: number;
  totalInternationalColaborations?: number;
  perCapitaAllCitations?: number;
  perCapitaAllHindex?: number;
  perCapitaAllI10hindex?: number;
  total: number;
  publications?: [];
  searchMetadata?: object;
  authorMetadata?: {
    name: string;
    affiliations: string;
    email: string;
    interests: {
      title: string;
      link: string;
      serpapi_link: string;
    }[];
    thumbnail: string;
  };
  rank?: number;
  position?: number;
};

export type GSRanking = {
  id?: string;
  username?: string;
  name?: string;
  canScrap?: boolean;
  accountId?: string;
  googleScholarId?: string;
  scrap?: boolean;
  scrapper?: string;
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  highestCitations?: number;
  highestHindex?: number;
  highestI10hindex?: number;
  highestTotalPublications?: number;
  highestFirstPublicationYear?: number;
  highestLastPublicationYear?: number;
  lowestCitations?: number;
  lowestHindex?: number;
  lowestI10hindex?: number;
  lowestTotalPublications?: number;
  lowestFirstPublicationYear?: number;
  lowestLastPublicationYear?: number;
  averageCitations?: number;
  averageHindex?: number;
  averageI10hindex?: number;
  averageTotalPublications?: number;
  totalStaff?: number;
  totalGooglePresence?: number;
  totalStaffWithOutGooglePresence?: number;
  totalStaffWithGooglePresence?: number;
  internationalStaff?: number;
  localStaff?: number;
  totalInternationalColaborations?: number;
  perCapitaAllCitations?: number;
  perCapitaAllHindex?: number;
  perCapitaAllI10hindex?: number;
  total?: number;
  publications?: [];
  searchMetadata?: object;
  authorMetadata?: {
    name: string;
    affiliations: string;
    email: string;
    interests: {
      title: string;
      link: string;
      serpapi_link: string;
    }[];
    thumbnail: string;
  };
};

export type SchoolRank = {
  status?: boolean;
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  highestCitations?: number;
  highestHindex?: number;
  highestI10hindex?: number;
  highestTotalPublications?: number;
  highestFirstPublicationYear?: number;
  highestLastPublicationYear?: number;
  lowestCitations?: number;
  lowestHindex?: number;
  lowestI10hindex?: number;
  lowestTotalPublications?: number;
  lowestFirstPublicationYear?: number;
  lowestLastPublicationYear?: number;
  averageCitations?: number;
  averageHindex?: number;
  averageI10hindex?: number;
  averageTotalPublications?: number;
  totalStaff?: number;
  totalGooglePresence?: number;
  totalStaffWithOutGooglePresence?: number;
  totalStaffWithGooglePresence?: number;
  internationalStaff?: number;
  localStaff?: number;
  totalInternationalColaborations?: number;
  perCapitaAllCitations?: number;
  perCapitaAllHindex?: number;
  perCapitaAllI10hindex?: number;
};

export type SchoolSettingsType = {
  includeStudentsInMetrics?: boolean;
  includeLecturersInMetrics?: boolean;
  includeAlumniInMetrics?: boolean;
  citationsWeight?: number;
  hindexWeight?: number;
  i10hindexWeight?: number;
  googlePresenceWeight?: number;
  studentsWeight?: number;
  lecturersWeight?: number;
  alumniWeight?: number;
  internationalStaffWeight?: number;
  internationalStudentsWeight?: number;
  internationalCollaborationWeight?: number;
  efficiencyWeight?: number;
  researchOutputWeight?: number;
  researchImpactWeight?: number;
  researchInnovationWeight?: number;
  graduationOutputWeight?: number;
  fullProfessorsWeight?: number;
  phdStudentsWeight?: number;
  phdGraduatesWeight?: number;
  phdLecturersWeight?: number;
  fellowshipWeight?: number;
  accreditationWeight?: number;
  teacherStudentRatioWeight?: number;
  femaleStaffWeight?: number;
  femaleStudentsWeight?: number;
  profsReadersWeight?: number;
  seniorLecturersWeight?: number;
  juniorLecturersWeight?: number;
  associateProfessorsWeight?: number;
  assistantProfessorsWeight?: number;
  otherLecturersWeight?: number;
};

export type SchoolStats = {
  status?: boolean;
  count?: number;
  googlePresence?: number;
  citation?: number;
  hindex?: number;
  i10hindex?: number;
  total?: number;
};

export type IStats = {
  max?: number;
  min: number;
  mid: number;
  dir: string;
  perc: number;
};

export type ScholarsProps = {
  lecturers?: AuthUserInfo[];
  students?: AuthUserInfo[];
};

export type WebWindow = {
  addEventListener(arg0: string, handleResize: () => void): unknown;
  width?: number;
  height?: number;
  size?: string;
};

export type FakerLecturer = {
  sex?: Gender;
  type?: LecturerType;
  isprofessor?: boolean;
  isfullprofessor?: boolean;
  adjunct?: boolean;
  departmentId?: string;
};

export type FakerStudent = {
  sex?: Gender;
  type?: StudentType;
  challanged?: boolean;
  departmentId?: string;
};

export type IndustryProps = {
  indystryType: string;
};

export type SchoolAnalitics = object;

export interface Props {
  children?: ReactNode;
}

export type Logon = {
  domain?: string;
  username: string;
  password: string;
};

export type LecturerInfo = {
  _id?: string;
  staffNumber?: number;
  avatar?: string;
  departmentId?: string;
  staffnumber?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  adjunct?: boolean;
  level?: LecturerLevel;
  withPhd?: boolean;
  professor?: {
    isProfessor?: boolean;
    isFullProfessor?: boolean;
  };
  email?: string;
  mobile?: string;
  gender?: Gender;
  lecturerType?: LecturerType;
  addresses?: {
    contact?: {
      street?: string;
      city?: string;
      lga?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
  };
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex?: number;
  enabled?: boolean;
};

export type AccountsStats = {
  status?: boolean;
  googlePresence?: number;
  cigtations?: number;
  hindex?: number;
  i10hindex?: number;
  totalPublications?: number;
  firstPublicationYear?: number;
  lastPublicationYear?: number;
  highestCitations?: number;
  highestHindex?: number;
  highestI10hindex?: number;
  highestTotalPublications?: number;
  highestFirstPublicationYear?: number;
  highestLastPublicationYear?: number;
  lowestCitations?: number;
  lowestHindex?: number;
  lowestI10hindex?: number;
  lowestTotalPublications?: number;
  lowestFirstPublicationYear?: number;
  lowestLastPublicationYear?: number;
  averageCitations?: number;
  averageHindex?: number;
  averageI10hindex?: number;
  averageTotalPublications?: number;
  totalStaff?: number;
  totalGooglePresence?: number;
  totalStaffWithOutGooglePresence?: number;
  totalStaffWithGooglePresence?: number;
  internationalStaff?: number;
  localStaff?: number;
  totalInternationalColaborations;
};

export type TInternationalCollaboration = {
  projectId: number;
  projectTitle: string;
  projectDescription: string;
  country: string;
  startDate: string;
  endDate: string;
  role: string;
  status: string;
  fundingAgency: string;
  fundingAmount: string;
  fundingCurrency: string;
  fundingDuration: string;
};

export const accountInitialStats = {
  status: false,
  googlePresence: 0,
  cigtations: 0,
  hindex: 0,
  i10hindex: 0,
  totalPublications: 0,
  firstPublicationYear: 0,
  lastPublicationYear: 0,
  highestCitations: 0,
  highestHindex: 0,
  highestI10hindex: 0,
  highestTotalPublications: 0,
  highestFirstPublicationYear: 0,
  highestLastPublicationYear: 0,
  lowestCitations: 0,
  lowestHindex: 0,
  lowestI10hindex: 0,
  lowestTotalPublications: 0,
  lowestFirstPublicationYear: 0,
  lowestLastPublicationYear: 0,
  averageCitations: 0,
  averageHindex: 0,
  averageI10hindex: 0,
  averageTotalPublications: 0,
  totalStaff: 0,
  totalGooglePresence: 0,
  totalStaffWithOutGooglePresence: 0,
  totalStaffWithGooglePresence: 0,
  internationalStaff: 0,
  localStaff: 0,
  totalInternationalColaborations: 0,
};

export type LecturerAnalitics = {
  INTERNATIONAL_LECTURERS?: number;
  FEMALE_LECTURERS?: number;
  MALE_PROFESSORS?: number;
  PHD_LECTURERS?: number;
  ADJUNCT_LECTURERS?: number;
  ADJUNCT_PROFESSORS?: number;
  PROFESSORS?: number;
  FULL_PROFESSORS?: number;
  INTERNATIONAL_PROFESSORS?: number;
  FEMALE_PROFESSORS?: number;
  PERCENTAGE_JUNIOR_LECTURERS?: number;
  PERCENTAGE_SENIOR_LECTURERS?: number;
  JUNIO_SENIOR_LECTURERS_RATIO?: number;
};

export type FacultiesInfo = {
  _id?: string;
  scoolId?: string;
  name?: string;
  facultyName?: string;
  description?: string;
  shortname?: string;
  facultyCode?: string;
  enabled?: boolean;
  citationsPerCapita?: number;
  hindexPerCapita?: number;
  i10hindexPerCapita?: number;
  total?: number;
  rank?: number;
  position?: string;
};

export type DepartmentsInfo = {
  _id?: string;
  scoolId?: string;
  facultyId?: string;
  name?: string;
  departmentName?: string;
  description?: string;
  shortname?: string;
  departmentCode?: string;
  accredited?: boolean;
  enabled?: boolean;
  citationsPerCapita?: number;
  hindexPerCapita?: number;
  i10hindexPerCapita?: number;
  total?: number;
  rank?: number;
  position?: string;
};

export type StudentInfo = {
  _id?: string;
  avatar?: string;
  departmentId?: string;
  regNumber?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  email?: string;
  mobile?: string;
  gender?: Gender;
  studentType: StudentType;
  challanged?: boolean;
  addresses?: {
    contact?: {
      street?: string;
      city?: string;
      lga?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
  };
  googlePresence?: number;
  citations?: number;
  hindex?: number;
  i10hindex: number;
  enabled?: boolean;
};

export type StudentStats = {
  status?: boolean;
  count?: number;
  countLocal?: number;
  countIntl?: number;
  countMale?: number;
  countFemale?: number;
  countLocalMale?: number;
  countLocalFemale?: number;
  countIntlMale?: number;
  countIntlFemale?: number;
  countChallanged?: number;
  countChallangedMale?: number;
  countChallangedFemale?: number;
};

export type StudentAnalitics = {
  STUDENT_TEACHER_RATIO?: number;
  PERCENTAGE_FEMALE?: number;
  INTERNATIONAL_STUDENTS?: number;
  PERCENTAGE_CHALLANGED_STUDENTS?: number;
  CHALLANGED_STUDENTS_RATIO?: number;
};

export type FacultyAnalitics = {
  STUDENT_TEACHER_RATIO?: number;
};

export type FacultyStats = {
  status?: boolean;
  count?: number;
};

export type DepartmentAnalitics = {
  FULL_ACCREDITATION?: number;
};

export type DepartmentStats = {
  status?: boolean;
  count?: number;
  countAccredited?: number;
  countNonAccredited?: number;
};

export type UserInfo = {
  _id?: string;
  avatar?: string;
  accid?: string;
  membership?: string;
  role?: string;
  email?: string;
  mobile?: string;
  password?: string;
  sex?: string;
  birthday?: string;
  idtype?: string;
  idnumber?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  street?: string;
  city?: string;
  lga?: string;
  state?: string;
  zip?: string;
  country?: string;
  regfee?: number;
  referrer?: string;
  admin?: string;
};

export type Token = {
  domain?: string;
  schoolId?: string;
  token?: string;
  url?: string;
};

export type SCHFaculty = {
  _id?: string;
  facultyId?: string;
  schoolId?: string;
  facultyName?: string;
  facultyCode?: string;
  facultyDescription?: string;
};

export type SCHDepartment = {
  _id?: string;
  departmentId?: string;
  facultyId?: string;
  schoolId?: string;
  departmentName?: string;
  departmentCode?: string;
  departmentDescription?: string;
};
