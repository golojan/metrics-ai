import { createModel } from '@rematch/core';
import { RootModel } from '.';
import { SchoolInfo } from '../../../interfaces';

export const schools = createModel<RootModel>()({
  state: {
    loaded: false,
    school: {} as SchoolInfo,
    schools: [] as SchoolInfo[],
  },
  reducers: {
    setLoaded(state, payload: boolean) {
      return { ...state, loaded: payload };
    },
    setSchools(state, payload: SchoolInfo[]) {
      return { ...state, schools: payload };
    },
    setSchool(state, payload: SchoolInfo) {
      return { ...state, school: payload };
    },
  },
  effects: (dispatch) => ({
    async getSchoolAsync(domain: string, RootState) {
      const response = await fetch(`/api/schools/${domain}/info`);
      const schoolinfo = await response.json();
      this.setSchool(schoolinfo.data);
      return schoolinfo;
    },
    async getSchoolsAsync() {
      const response = await fetch(`/api/schools/list`);
      const schools = await response.json();
      this.setSchools(schools);
      return schools;
    },
  }),
});
