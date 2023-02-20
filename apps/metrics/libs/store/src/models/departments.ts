import {
  DepartmentStats,
  DepartmentAnalitics,
  DepartmentsInfo,
} from '../../../interfaces';
import { loadDepartments } from '../../../utils';
import { createModel } from '@rematch/core';
import { RootModel } from '.';

export const departments = createModel<RootModel>()({
  state: {
    departmentsCount: 0,
    dBusy: false,
    departments: [] as DepartmentsInfo[],
    loaded: false,
    statistics_departments: {
      count: 0,
      countAccredited: 0,
      countNonAccredited: 0,
    } as DepartmentStats,
    analytics_departments: { FULL_ACCREDITATION: 0 } as DepartmentAnalitics,
  },
  reducers: {
    setBusy(state, payload: boolean) {
      return { ...state, dBusy: payload };
    },
    setStatistics(state, payload: object) {
      return { ...state, statistics_departments: payload };
    },
    setAnalytics(state, payload: object) {
      return { ...state, analytics_departments: payload };
    },
    setDepartments(state, payload: any) {
      return { ...state, departments: payload };
    },
    setDepartmentsCount(state, payload: number) {
      return { ...state, departmentsCount: payload };
    },
  },
  effects: (dispatch) => ({
    async addDepartment(payload: DepartmentsInfo, rootState) {
      this.setBusy(true);
      const domain = rootState.settings.domain;
      const response = await fetch(`/api/departments/${domain}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const { status } = await response.json();
      if (status) {
        loadDepartments(domain)
          .then((faculties) => {
            this.setDepartments(faculties.data);
            this.setDepartmentsCount(faculties.data.length);
          })
          .catch();
      }
      this.setBusy(false);
      return status;
    },
    async loadDepartments(domain: string, rootState) {
      const response = await fetch(`/api/departments/${domain}/list`);
      const departments = await response.json();
      this.setDepartments(departments.data);
      return departments;
    },

    async showDepartment(id: string) {
      const response = await fetch(`/api/departments/info/${id}`);
      const department = await response.json();
      return department;
    },

    async loadDepartmentsStats(domain: string) {
      const response = await fetch(`/api/departments/${domain}/stats`);
      const stats = await response.json();
      this.setStatistics(stats.data);
      return stats;
    },
  }),
});
