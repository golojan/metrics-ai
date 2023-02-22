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

import { FacultiesInfo, GSIRanking } from '../../../../libs/interfaces';
import AuthFaculties from '../../../../components/DataTables/AuthFaculties';
import { loadFaculties } from '../../../../libs/utils';
import { authSchoolId } from '../../../../libs/hocs';
import useSWR from 'swr';

const ReportFaculties: NextPage = () => {
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

  const [faculties, setFaculties] = useState<FacultiesInfo[]>([]);

  // get the total citations per capita for a faculty
  const getFacultyTotalCitiationsPerCapita = (facultyId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.facultyId === facultyId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.citationsPerCapita;
    });
    return Number(_total);
  };

  // get the total hindex per capita for a faculty
  const getFacultyTotalHindexPerCapita = (facultyId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.facultyId === facultyId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.hindexPerCapita;
    });
    return Number(_total);
  };

  // get the total i10index per capita for a faculty
  const getFacultyTotalI10indexPerCapita = (facultyId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.facultyId === facultyId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.i10hindexPerCapita;
    });
    return Number(_total);
  };

  // get the total for a faculty
  const getFacultyTotal = (facultyId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.facultyId === facultyId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.total;
    });
    return Number(_total);
  };

  // get the total ranks for a faculty
  const getFacultyTotalRanks = (facultyId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.facultyId === facultyId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.rank;
    });
    return Number(_total);
  };

  useEffect(() => {
    const loadAllFaculties = async () => {
      setRunning(true);
      const data = await loadFaculties(schoolId);
      setFaculties(data);
      setRunning(false);
    };
    loadAllFaculties();
    if (faculties && lecturersRanking && !busy) {
      setRunning(true);
      // // sort the filtered array by total in descending order
      faculties.sort((a, b) => {
        return b.total - a.total;
      });
      faculties.forEach((faculty, index) => {
        faculty.citationsPerCapita = getFacultyTotalCitiationsPerCapita(
          faculty._id
        );
        faculty.hindexPerCapita = getFacultyTotalHindexPerCapita(faculty._id);
        faculty.i10hindexPerCapita = getFacultyTotalI10indexPerCapita(
          faculty._id
        );
        faculty.total = getFacultyTotal(faculty._id);
        faculty.rank = getFacultyTotalRanks(faculty._id);
        const _index = index + 1;
        const _position = getPositionString(_index);
        faculty.position = _position;
      });
      setRunning(false);
    }
  }, [faculties, lecturersRanking, busy]);

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
