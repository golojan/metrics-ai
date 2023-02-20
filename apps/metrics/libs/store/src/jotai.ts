import { atom } from 'jotai';
import {
  AuthUserInfo,
  SchoolInfo,
  GSRanking,
  SchoolSettingsType,
  DepartmentsInfo,
  GSIRanking,
  SchoolAnalitics,
  WebWindow,
  FacultiesInfo,
  AccountTypes,
  AccountRoles,
  StateTypes,
  UserInfo,
} from '../../interfaces';

import cookie from 'js-cookie';

export const menuOpenedAtom = atom<boolean>(false);

export const domainAtom = atom<string>('localhost');
export const schoolIdAtom = atom<string>('');
export const schoolAtom = atom<SchoolInfo>({} as SchoolInfo);

export const pageAtom = atom<string>('home');
export const showUserPostFeedDialogAtom = atom<boolean>(false);

export const schoolsAtom = atom<SchoolInfo[]>([]);
export const busyAtom = atom<boolean>(false);

export const tokenAtom = atom<string>(cookie.get('token') || '');

export const profileAtom = atom<AuthUserInfo>({} as AuthUserInfo);
export const userInfoAtom = atom<AuthUserInfo>({} as AuthUserInfo);
export const publicProfileAtom = atom<AuthUserInfo>({} as AuthUserInfo);

export const statistics_schoolAtom = atom<GSIRanking>({} as GSIRanking);
export const analytics_schoolAtom = atom<SchoolAnalitics>(
  {} as SchoolAnalitics
);

export const lecturersRankingAtom = atom<GSIRanking[]>({} as GSIRanking[]);
export const studentsRankingAtom = atom<GSIRanking[]>({} as GSIRanking[]);

export const webWindowAtom = atom<WebWindow>({
  width: 0,
  height: 0,
  size: 'xxl',
} as WebWindow);

export const totalWeightAtom = atom<number>(0);
export const schoolSettingsAtom = atom<SchoolSettingsType>({});
export const statistLecturersAtom = atom<GSIRanking>({});
export const schoolDepartmentsAtom = atom<DepartmentsInfo[]>([]);

export const settingsAtom = atom({
  windows: { width: 0, height: 0, size: 'xxl' } as WebWindow,
  menuOpened: false,
  accid: '',
  token: '',
  domain: '',
  schools: [] as SchoolInfo[],
  faculties: [] as FacultiesInfo[],
  department: [] as DepartmentsInfo[],
  schoolid: '',
  page: 'home',
  school: {} as SchoolInfo,
  loaded: false,
  isLogged: false,
  busy: false,
  user: {} as AuthUserInfo,
  newUser: {
    membership: AccountTypes.STUDENT,
    role: AccountRoles.USER,
    regfee: 0,
    state: StateTypes.ENUGU,
  } as UserInfo,
  imageUrl: '/avatars/uploadholder.png',
  dynamicPages: '',
  uploaded: false,
  idelTime: 0,
  total: 0,
  ranking: {},
  statistics_school: {} as GSIRanking,
  analytics_school: {} as SchoolAnalitics,
});
