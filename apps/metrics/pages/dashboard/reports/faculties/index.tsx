import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import { compose } from 'redux';

import AppHeader from '../../../../serverlets/AppHeader';
import { withAuth } from '../../../../libs/hocs';
import AppDrawer from '../../../../serverlets/AppDrawer';
import { getPositionString } from '../../../../libs/utils';
import ReportsMenu from '../../../../components/ReportsMenu';
import AppDashBoardTopMenuScores from '../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../serverlets/AppDashboardTopMenu';
import { useAtom } from 'jotai';
import { lecturersRankingAtom } from '../../../../libs/store';
import { FacultiesInfo, GSIRanking } from '../../../../libs/interfaces';
import AuthFaculties from 'apps/metrics/components/DataTables/AuthFaculties';
import { loadFaculties } from '../../../../libs/utils';
import { authSchoolId } from '../../../../libs/hocs';

const ReportFaculties: NextPage = () => {
  const [busy, setBusy] = useState(false);
  const [lecturersRanking] = useAtom(lecturersRankingAtom);
  const schoolId = authSchoolId();
  
  const [lecturersBySchool, setLecturersBySchool] = useState<GSIRanking[]>(
    [] as GSIRanking[]
  );

  const [faculties, setFaculties] = useState<FacultiesInfo[]>([]);

  useEffect(() => {
    const loadAllFaculties = async () => {
      setBusy(true);
      const data = await loadFaculties(schoolId);
      setFaculties(data);
      setBusy(false);
    };
    loadAllFaculties();
    if (lecturersRanking) {
      // // sort the filtered array by total in descending order
      lecturersRanking.sort((a, b) => b.rank - a.rank);
      // // add a rank property to each user object based on their position in the sorted array
      lecturersRanking.forEach((user, index) => {
        const _index = index + 1;
        const _position = getPositionString(_index);
        user.position = _position;
      });
      setLecturersBySchool(lecturersRanking);
    }
  }, [lecturersRanking, schoolId]);

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
              <div className="col-12 col-md-12 col-xxl-3 col-xl-3 col-lg-3 my-1">
                <ReportsMenu />
              </div>
              <div className="col-12 col-md-12 col-xxl-9 col-xl-9 col-lg-9 my-1">
                <AuthFaculties
                  title="Ranking of School by Faculties"
                  data={faculties}
                  loading={false}
                />
              </div>
            </div>
          </div>
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(ReportFaculties);
