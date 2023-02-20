import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import AppDrawer from '../../../../serverlets/AppDrawer';

import AppHeader from '../../../../serverlets/AppHeader';
import Copyright from '../../../../serverlets/Copyright';

import { withAuth } from '../../../../libs/hocs';
import { compose } from 'redux';

import {
  AuthUserInfo,
  GSRanking,
  SchoolSettingsType,
} from '../../../../libs/interfaces';

import { authSchoolId } from '../../../../libs/hocs';
import {
  loadLecturersRanking
} from '../../../../libs/utils';

import useSWR from 'swr';
import AppDashBoardTopMenuScores from '../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../serverlets/AppDashboardTopMenu';
import AuthUserPublication from '../../../../components/DataTables/AuthUserPublication';

type lFilters = {
  male: boolean;
  female: boolean;
  withPhd: boolean;
  isProfessor: boolean;
};

const ReportPublications: NextPage = () => {

  const schoolId = authSchoolId();

  // use SWR to fetch data from the API
  const { data: lecturers, isLoading, isValidating } = useSWR<{ status: boolean, data: AuthUserInfo[] }>(
    `/api/lecturers/${schoolId}/list`,
    async () => fetch(`/api/lecturers/${schoolId}/list`).then((res) => res.json())
  );

  const busy = isValidating || isLoading || !lecturers;

  const [filter, setFilter] = useState<lFilters>({
    male: false,
    female: false,
    withPhd: false,
    isProfessor: false,
  });

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <AppDashBoardTopMenuScores />
              <AppDashboardTopMenu />
            </div>
          </div>
          <div className="section pt-1">
            <div className="row ">

              <div className={`col-12 col-md-12 col-lg-12 min-h-screen`}>
                <AuthUserPublication title='Lecturers' data={lecturers ? lecturers?.data : []} loading={busy} />
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="lecturers" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(ReportPublications);
