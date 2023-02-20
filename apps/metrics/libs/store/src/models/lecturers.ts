import { GSIRanking , LecturerAnalitics, AuthUserInfo, AccountsStats, accountInitialStats } from '../../../interfaces';
import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const lecturers = createModel<RootModel>()({
  state: {
    updated: 0,
    lecturerId: '',
    lecturersCount: 0,
    lBusy: false,
    lecturers: [] as AuthUserInfo[],
    list: [] as AuthUserInfo[],
    loaded: false,
    statistics_lecturers: {} as GSIRanking,
    analytics_lecturers: {} as LecturerAnalitics,
  },
  reducers: {
    rankUp(state) {
      return { ...state, updated: ++state.updated };
    },
    setBusy(state, payload: boolean) {
      return { ...state, lBusy: payload };
    },
    setStatistics(state, payload: object) {
      return { ...state, statistics_lecturers: payload };
    },
    setAnalytics(state, payload: object) {
      return { ...state, analytics_lecturers: payload };
    },
    setLecturers(state, payload: any) {
      return { ...state, lecturers: payload };
    },
    setLecturerId(state, payload: any) {
      return { ...state, lecturerId: payload };
    },
    setList(state, payload: any) {
      return { ...state, list: payload };
    },
    setLecturersCount(state, payload: number) {
      return { ...state, lecturersCount: payload };
    },
  },
  effects: (dispatch) => ({
    async loadLecturers(domain: string) {
      const response = await fetch(`/api/lecturers/${domain}/list`);
      const lecturers = await response.json();
      this.setLecturers(lecturers.data);
      return lecturers;
    },
    async loadLecturersStats(domain: string) {
      const response = await fetch(`/api/lecturers/${domain}/stats`);
      const stats = await response.json();
      this.setStatistics(stats.data);
      return stats;
    },
  }),
});
