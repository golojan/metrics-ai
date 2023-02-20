import { MRCInfo } from '../../interfaces';
import { createHash } from 'crypto';

type WebWindow = {
  addEventListener(arg0: string, handleResize: () => void): unknown;
  width?: number;
  height?: number;
  size?: string;
};

type DepartmentsInfo = {
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
};

export const getPositionString = (rank: number): string => {
  const lastDigit = rank % 10;
  const lastTwoDigits = rank % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return rank + 'th';
  } else if (lastDigit === 1) {
    return rank + 'st';
  } else if (lastDigit === 2) {
    return rank + 'nd';
  } else if (lastDigit === 3) {
    return rank + 'rd';
  } else {
    return rank + 'th';
  }
};

export const generateID = (userTag: string): string => {
  const hash = createHash('sha256');
  const timestamp = Date.now();
  const data = `${userTag}`;
  hash.update(data);
  const uniqueID = hash.digest('base64');
  return uniqueID;
};

export const shortenedMRC = (generateDiD: string) => {
  const first3 = generateDiD.substring(0, 5);
  const last3 = generateDiD.substring(
    generateDiD.length - 5,
    generateDiD.length
  );
  const shorted = `${first3}...${last3}`;
  return shorted;
};

export const fetcher = async (url: string) =>
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

export const fetcherGet = async (url: string) =>
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

export const ApiPost = async (url: string, state: object) =>
  await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

export const fetcherPost = async (url: string, state: object) =>
  await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

export const dumpExcelMRCs = async (schoolId: string, data: MRCInfo[]) =>
  await fetch(`/api/schools/${schoolId}/dump-mrcs`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mrcsData: data }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  let size = 'lg';
  if ((innerWidth as number) >= 1400) {
    // Size is XXL
    size = 'xxl';
  } else if ((innerWidth as number) >= 1200) {
    // Size is XL
    size = 'xl';
  } else if ((innerWidth as number) >= 992) {
    // Size is LG
    size = 'lg';
  } else if ((innerWidth as number) >= 768) {
    // Size is MD
    size = 'md';
  } else if ((innerWidth as number) >= 576) {
    // Size is SM
    size = 'sm';
  } else if ((innerWidth as number) < 576) {
    // Size is xs
    size = 'xs';
  } else {
    // Size is xs
    size = 'xxs';
  }
  return {
    width: width,
    height: height,
    size: size,
  } as WebWindow;
};

export const add = (a: number, b: number) => {
  return (a + b).toFixed(2);
};
export const sub = (a: number, b: number) => {
  return (a - b).toFixed(2);
};
export const mul = (a: number, b: number) => {
  return (a * b).toFixed(2);
};
export const div = (a: number, b: number) => {
  return (a / b).toFixed(2);
};

export const divide = (a: number, b: number) => {
  return (a / b).toFixed(0);
};
export const perc = (num: number, total: number) => {
  return ((num / total) * 100).toFixed(1);
};

export const getConnections = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/connections`);
  const connections = await response.json();
  if (connections.status) {
    return connections.data;
  } else {
    return {};
  }
};

export const getUsersConnections = async (fromUser: string, toUse: string) => {
  const response = await fetch(
    `/api/accounts/${fromUser}/connections?fromUser=${fromUser}&toUser=${toUse}`
  );
  const userinfo = await response.json();
  return userinfo;
};

export const genPassword = (length: number) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomInt = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomInt);
  }
  return password;
};

export const getRoleInfo = async (id: string) => {
  const response = await fetch(`/api/roles/${id}/info`);
  const role = await response.json();
  if (role.status) {
    return role.data;
  } else {
    return {};
  }
};

export const getMembershipInfo = async (id: string) => {
  const response = await fetch(`/api/memberships/${id}/info`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

export const getDataLists = async () => {
  const response = await fetch(`/api/lists`);
  const data = await response.json();
  return data;
};

export const getMemberships = async () => {
  const response = await fetch(`/api/memberships/list`);
  const data = await response.json();
  return data.indicators;
};

export const getIndicators = async () => {
  const response = await fetch(`/api/indicators/list`);
  const data = await response.json();
  return data.indicators;
};

export const getAccountInfo = async (_token: string) => {
  const response = await fetch(`/api/accounts/${_token}/info`);
  const userinfo = await response.json();
  return userinfo;
};

export const getSchools = async () => {
  const response = await fetch(`/api/schools/list`);
  const schools = await response.json();
  if (schools.status) {
    return schools.schools;
  } else {
    return {};
  }
};

export const getSchoolInfoById = async (id: string) => {
  const response = await fetch(`/api/schools/${id}/info`);
  const userinfo = await response.json();
  if (userinfo.status) {
    alert(userinfo.data.firstname);
    return userinfo.data;
  } else {
    return {};
  }
};

export const getIndicatorInfo = async (id: string) => {
  const response = await fetch(`/api/indicators/${id}/info`);
  const indicator = await response.json();
  if (indicator.status) {
    return indicator.data;
  } else {
    return {};
  }
};

export const getSchoolInfoByDomain = async (domain: string) => {
  const response = await fetch(`/api/schools/domains/${domain}/info`);
  const result = await response.json();
  if (result.status) {
    return result.data;
  }
  return {};
};

export const getSchoolInfo = async (domain: string) => {
  const response = await fetch(`/api/schools/${domain}/info`);
  const userinfo = await response.json();
  return userinfo;
};

export const getDomain = (host: string) => {
  const _domain: any = host?.split(':', 1).pop();
  const domain = _domain.replace('www.', '');
  return domain;
};

export const getDepartment = (arrData: Array<DepartmentsInfo>, id: string) => {
  return arrData.find((e) => e._id === id);
};

export const getLiveStats = (arrData: any, statVal: any) => {
  const max = Math.max(...arrData.map((o: any) => o.points));
  const min = Math.min(...arrData.map((o: any) => o.points));
  const mid = parseFloat(div(max, 2));
  const ndif = parseFloat(sub(statVal, mid));
  const _perc = perc(ndif, mid);
  if (statVal > mid) {
    return { max: max, min: min, mid: mid, dir: 'up', perc: _perc };
  }
  if (statVal <= mid) {
    return { max: max, min: min, mid: mid, dir: 'down', perc: _perc };
  }
  return { max: max, min: min, mid: mid, dir: 'down', perc: _perc };
};

export const loadSchoolsStats = async (schoolId: string) => {
  const response = await fetch(`/api/schools/${schoolId}/stats`);
  const stats = await response.json();
  if (stats.status) {
    return stats;
  }
  return {};
};

export const loadUsers: any = async () => {
  const response = await fetch(`/api/accounts/listusers`);
  const users = await response.json();
  if (users.status) {
    return users.data;
  }
  return {};
};

export const getUserProfile: any = async (accid: string) => {
  const response = await fetch(`/api/accounts/${accid}/profile`);
  const user = await response.json();
  if (user.status) {
    return user.data;
  }
  return {};
};

export const fetchUserInfo = (token: string) => {
  return fetch(`/api/accounts/${token}/info`)
    .then((response) => response.json())
    .then((data) => data.data);
};

export const getUserName = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/username`);
  const user = await response.json();
  if (user.status) {
    return user.username;
  } else {
    return {};
  }
};

export const getProfileInfo = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/profile`);
  const membership = await response.json();
  if (membership.status) {
    return membership.data;
  } else {
    return {};
  }
};

export const getUserInfo = async (token: string) => {
  const response = await fetch(`/api/accounts/${token}/info`);
  const user = await response.json();
  if (user.status) {
    return user.data;
  } else {
    return {};
  }
};

export const getProfile = async (username: string) => {
  const response = await fetch(`/api/${username}/profile`);
  const user = await response.json();
  if (user.status) {
    return user.data;
  } else {
    return {};
  }
};

export const loadSchoolAccounts = async (schoolId: string) => {
  const response = await fetch(`/api/schools/${schoolId}/accounts`);
  const accounts = await response.json();
  if (accounts.status) {
    return accounts.data;
  }
  return [];
};

export const loadLecturers = async (schoolId: string) => {
  const response = await fetch(`/api/lecturers/${schoolId}/list`);
  const lecturers = await response.json();
  if (lecturers.status) {
    return lecturers.data;
  }
  return [];
};

export const loadMRCLecturers = async (schoolId: string) => {
  const response = await fetch(`/api/schools/${schoolId}/mrcs`);
  const lecturers = await response.json();
  if (lecturers.status) {
    return lecturers.data;
  }
  return [];
};

export const loadStudents = async (schoolId: string) => {
  const response = await fetch(`/api/students/${schoolId}/list`);
  const students = await response.json();
  if (students.status) {
    return students.data;
  }
  return [];
};

export const loadStudentsStats = async (schoolId: string) => {
  const response = await fetch(`/api/students/${schoolId}/stats`);
  const stats = await response.json();
  return stats;
};

export const loadStudentsRanking = async (schoolId: string) => {
  const response = await fetch(`/api/students/${schoolId}/ranking`);
  const students = await response.json();
  if (students.status) {
    return students.data;
  }
  return [];
};

export const loadLecturersStats = async (schoolId: string) => {
  const response = await fetch(`/api/lecturers/${schoolId}/stats`);
  const stats = await response.json();
  return stats;
};

export const loadLecturersRanking = async (schoolId: string) => {
  const response = await fetch(`/api/lecturers/${schoolId}/ranking`);
  const lecturers = await response.json();
  if (lecturers.status) {
    return lecturers.data;
  }
  return [];
};

export const listFaculties = async () => {
  const response = await fetch(`/api/faculties/list`);
  const faculties = await response.json();
  if (faculties.status) {
    return faculties.data;
  }
  return [];
};

export const loadFaculties = async (schoolId: string) => {
  const response = await fetch(`/api/faculties/${schoolId}/list`);
  const faculties = await response.json();
  if (faculties.status) {
    return faculties.data;
  }
  return [];
};
export const loadFacultiesStats = async (domain: string) => {
  const response = await fetch(`/api/faculties/${domain}/stats`);
  const stats = await response.json();
  return stats;
};

export const listDepartments = async () => {
  const response = await fetch(`/api/departments/list`);
  const departments = await response.json();
  if (departments.status) {
    return departments.data;
  }
  return [];
};
export const loadDepartments = async (schoolId: string) => {
  const response = await fetch(`/api/departments/${schoolId}/list`);
  const departments = await response.json();
  if (departments.status) {
    return departments.data;
  }
  return [];
};

export const loadSchoolDepartmentsByFacultyId = async (
  schoolId: string,
  facultyId: string
) => {
  const response = await fetch(
    `/api/departments/${schoolId}/${facultyId}/list`
  );
  const departments = await response.json();
  if (departments.status) {
    return departments.data;
  }
  return [];
};

export const loadFacultyDepartments = async (
  schoolId: string,
  facultyId: string
) => {
  const response = await fetch(
    `/api/departments/${schoolId}/faculties/${facultyId}/list`
  );
  const departments = await response.json();
  if (departments.status) {
    return departments.data;
  }
  return [];
};

//Convert mondoDB date to month and year
export const toMonthYear = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'long' });
  const year = d.getFullYear();
  return `${month} ${year}`;
};

//Convert mondoDB date to month, day and year
export const toMonthDayYear = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'short' });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
};

//Convert mondoDB date to month, day and year
export const toTime = (date: Date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

// Convert mondoDB date to day Month

export const toDayMonth = (date: Date) => {
  const d = new Date(date);
  const month = d.toLocaleString('default', { month: 'short' });
  const day = d.getDate();
  return `${day} ${month}`;
};

// Convert mondoDB date to second, mins, hours, days, weeks, month, years ago
export const timeAgo = (date: Date) => {
  const d = new Date(date);
  const seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

  if (seconds < 60) {
    return 'Just now';
  }

  let interval;

  // convert to minutes
  interval = Math.floor(seconds / 60);
  if (interval < 60) {
    return `${interval} minutes ago`;
  }

  // convert to hours
  interval = Math.floor(seconds / 3600);
  if (interval < 24) {
    return `${interval} hours ago`;
  }

  // convert to days
  interval = Math.floor(seconds / 86400);
  if (interval < 7) {
    return `${interval} days ago`;
  }

  // convert to weeks
  interval = Math.floor(seconds / 604800);
  if (interval < 4) {
    return `${interval} weeks ago`;
  }

  // convert to months
  interval = Math.floor(seconds / 2592000);
  if (interval < 12) {
    return `${interval} months ago`;
  }

  // convert to years
  interval = Math.floor(seconds / 31536000);
  return `${interval} years ago`;
};

export const hasSpacialChars = (str: string) => {
  const regex = /[ !@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;
  return regex.test(str);
};

export const noAction = (e: React.SyntheticEvent) => {
  e.preventDefault();
};

export const hashedRef = (e: React.SyntheticEvent) => {
  e.preventDefault();
};
