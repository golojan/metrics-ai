import {
  StudentAnalitics,
  AuthUserInfo,
  AccountsStats,
  accountInitialStats,
} from '../../../interfaces';

import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const students = createModel<RootModel>()({
  state: {
    studentId: '',
    studentsCount: 0,
    sBusy: false,
    students: [] as AuthUserInfo[],
    list: [] as AuthUserInfo[],
    loaded: false,
    maleStudents: 0,
    femaleStudents: 0,
    statistics_students: accountInitialStats as AccountsStats,
    analytics_students: {
      STUDENT_TEACHER_RATIO: 0,
      PERCENTAGE_FEMALE: 0,
      INTERNATIONAL_STUDENTS: 0,
      PERCENTAGE_CHALLANGED_STUDENTS: 0,
      CHALLANGED_STUDENTS_RATIO: 0,
    } as StudentAnalitics,
  },
  reducers: {
    setBusy(state, payload: boolean) {
      return { ...state, sBusy: payload };
    },
    setStatistics(state, payload: AccountsStats) {
      return { ...state, statistics_students: payload };
    },
    setAnalytics(state, payload: object) {
      return { ...state, analytics_students: payload };
    },
    setStudents(state, payload: any) {
      return { ...state, students: payload };
    },
    setStudentId(state, payload: any) {
      return { ...state, studentId: payload };
    },
    setList(state, payload: AuthUserInfo[]) {
      return { ...state, list: payload };
    },
    setStudentsCount(state, payload: number) {
      return { ...state, studentsCount: payload };
    },
  },
  effects: (dispatch) => ({
    async loadStudents(domain: string, rootState) {
      const response = await fetch(`/api/students/${domain}/list`);
      const students = await response.json();
      this.setStudents(students.data);
      return students;
    },
    async loadStudentsStats(domain: string, rootState) {
      const response = await fetch(`/api/students/${domain}/stats`);
      const stats = await response.json();
      this.setStatistics(stats.data);
      return stats;
    },
  }),
});
