
import {
  SchoolAnalitics,
  SchoolInfo,
  AccountTypes,
  AccountRoles,
  StateTypes,
  UserInfo,
  WebWindow,
  AuthUserInfo,
  FacultiesInfo,
  DepartmentsInfo,accountInitialStats, GSIRanking
} from '../../../interfaces';


import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const settings = createModel<RootModel>()({
  state: {
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
  },
  reducers: {
    setWebWindow(state, payload: WebWindow) {
      return { ...state, windows: payload };
    },
    toggleMenu(state, payload: boolean) {
      return { ...state, menuOpened: payload };
    },
    setToken(state, payload: string) {
      return { ...state, token: payload };
    },
    setAccid(state, payload: string) {
      return { ...state, accid: payload };
    },
    setSchoolId(state, payload: string) {
      return { ...state, schoolid: payload };
    },
    setSchools(state, payload: SchoolInfo[]) {
      return { ...state, schools: payload };
    },
    setDepartments(state, payload: DepartmentsInfo[]) {
      return { ...state, schools: payload };
    },
    setFaculties(state, payload: FacultiesInfo[]) {
      return { ...state, schools: payload };
    },
    setSchool(state, payload: SchoolInfo) {
      return { ...state, school: payload };
    },
    setDomain(state, payload: string) {
      return { ...state, domain: payload };
    },
    setLoaded(state, payload: boolean) {
      return { ...state, loaded: payload };
    },
    setPage(state, payload: string) {
      return { ...state, page: payload };
    },
    setIsLogged(state, payload: boolean) {
      return { ...state, isLogged: payload };
    },
    setBusy(state, payload: boolean) {
      return { ...state, busy: payload };
    },
    setStatistics(state, payload: GSIRanking) {
      return { ...state, statistics_school: payload };
    },
    setAnalytics(state, payload: object) {
      return { ...state, analytics_school: payload };
    },
    setRank(state, payload: object) {
      return { ...state, ranking: payload };
    },
    setTotal(state, payload: number) {
      return { ...state, total: payload };
    },
    setNewUser(state, payload: object) {
      return { ...state, newUser: payload };
    },
    setUserInfo(state, payload: AuthUserInfo) {
      return { ...state, user: payload };
    },
    setImageUrl(state, payload: string) {
      return { ...state, imageUrl: payload };
    },
    setDynamicPage(state, payload: string) {
      return { ...state, dynamicPages: payload };
    },
    setUploaded(state, payload: boolean) {
      return { ...state, uploaded: payload };
    },
    setIdelTime(state, payload: number) {
      return { ...state, idelTime: payload };
    },
  },
  effects: (dispatch) => ({
    async getAccountInfo(_token: string, RootState) {
      const response = await fetch(`/api/accounts/${_token}/info`);
      const userinfo = await response.json();
      this.setUserInfo(userinfo.data);
      return userinfo;
    },
    async getSchoolInfo(domain: string, RootState) {
      const response = await fetch(`/api/schools/${domain}/info`);
      const schoolinfo = await response.json();
      this.setSchool(schoolinfo.data);
      return schoolinfo;
    },
  }),
});
