import {
  FacultiesInfo,
  FacultyAnalitics,
  FacultyStats,
} from '../../../interfaces';

import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { loadFaculties } from '../../../utils';

export const faculties = createModel<RootModel>()({
  state: {
    facultiesCount: 0,
    fBusy: false,
    faculties: [] as FacultiesInfo[],
    loaded: false,
    statistics_faculties: {} as FacultyStats,
    analytics_faculties: {} as FacultyAnalitics,
  },
  reducers: {
    setBusy(state, payload: boolean) {
      return { ...state, fBusy: payload };
    },
    setStatistics(state, payload: object) {
      return { ...state, statistics_faculties: payload };
    },
    setAnalytics(state, payload: object) {
      return { ...state, analytics_faculties: payload };
    },
    setFaculties(state, payload: any) {
      return { ...state, faculties: payload };
    },
    setFacultiesCount(state, payload: number) {
      return { ...state, facultiesCount: payload };
    },
  },
  effects: (dispatch) => ({
    async addFaculty(payload: FacultiesInfo, rootState) {
      this.setBusy(true);
      const domain = rootState.settings.domain;
      const response = await fetch(`/api/faculties/${domain}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const { status } = await response.json();
      if (status) {
        loadFaculties(domain)
          .then((faculties) => {
            this.setFaculties(faculties.data);
            this.setFacultiesCount(faculties.data.length);
          })
          .catch();
      }
      this.setBusy(false);
      return status;
    },
    async loadFaculties(domain: string, rootState) {
      const response = await fetch(`/api/faculties/${domain}/list`);
      const faculties = await response.json();
      this.setFaculties(faculties.data);
      return faculties;
    },
    async loadFacultiesStats(domain: string, rootState) {
      const response = await fetch(`/api/faculties/${domain}/stats`);
      const stats = await response.json();
      this.setStatistics(stats.data);
      return stats;
    },
  }),
});
