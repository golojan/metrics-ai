import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../../components/AdminLayout';
import { compose } from 'redux';
import AppHeader from '../../../../../serverlets/AppHeader';
import { authSchoolId, withAuth } from '../../../../../libs/hocs';
import AppDrawer from '../../../../../serverlets/AppDrawer';
import { getPositionString } from '../../../../../libs/utils';
import ReportsMenu from '../../../../../components/ReportsMenu';
import AppDashBoardTopMenuScores from '../../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../../serverlets/AppDashboardTopMenu';
import { GSIRanking } from '../../../../../libs/interfaces';
import AuthLecturerRanking from '../../../../../components/DataTables/AuthLecturerRanking';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ReportFaculties: NextPage = () => {
  const router = useRouter();

  const { facultyId } = router.query;

  const schoolId = authSchoolId();
  const [running, setRunning] = useState<boolean>(false);

  const {
    data: lecturersRanking,
    isLoading,
    isValidating,
  } = useSWR<{ status: boolean; data: GSIRanking[] }>(
    `/api/lecturers/${schoolId}/ranking`,
    async (url) => await fetch(url).then((r) => r.json())
  );

  const busy = isLoading || isValidating || running;

  const [lecturersByFaculty, setLecturersByFaculty] = useState<GSIRanking[]>(
    [] as GSIRanking[]
  );

  useEffect(() => {
    if (lecturersRanking && facultyId && !running) {
      setRunning(true);
      const lecturers = lecturersRanking.data.filter(
        (lecturer) => lecturer.facultyId === facultyId
      );
      // // sort the filtered array by total in descending order
      lecturers.sort((a, b) => b.rank - a.rank);
      // // add a rank property to each user object based on their position in the sorted array
      lecturers.forEach((user, index) => {
        const _index = index + 1;
        const _position = getPositionString(_index);
        user.position = _position;
      });
      setLecturersByFaculty(lecturers);
      setRunning(false);
    }
  }, [lecturersRanking, facultyId, running]);

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
                <AuthLecturerRanking
                  title="Faculty Ranking"
                  data={lecturersByFaculty}
                  loading={busy}
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
