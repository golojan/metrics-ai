import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../../../components/AdminLayout';
import { compose } from 'redux';

import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../../../serverlets/AppHeader';
import { authSchoolId, authToken, withAuth } from '../../../../../libs/hocs';
import AppDrawer from '../../../../../serverlets/AppDrawer';
import {
  getPositionString,
  loadDepartments,
  noAction,
} from '../../../../../libs/utils';
import ReportsMenu from '../../../../../components/ReportsMenu';
import AppDashBoardTopMenuScores from '../../../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../../../serverlets/AppDashboardTopMenu';
import { DepartmentsInfo, GSIRanking } from '../../../../../libs/interfaces';
import AuthDepartments from '../../../../../components/DataTables/AuthDepartments';
import useSWR from 'swr';

const ReportDepartments: NextPage = () => {
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

  const [departments, setDepartments] = useState<DepartmentsInfo[]>([]);

  // get the total citations per capita for a department
  const getDepartmentTotalCitiationsPerCapita = (departmentId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.departmentId === departmentId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.citationsPerCapita;
    });
    return Number(_total);
  };

  // get the total hindex per capita for a scghool
  const getDepartmentTotalHindexPerCapita = (departmentId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.departmentId === departmentId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.hindexPerCapita;
    });
    return Number(_total);
  };

  // get the total i10hindex per capita for a department
  const getDepartmentTotalI10indexPerCapita = (departmentId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.departmentId === departmentId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.i10hindexPerCapita;
    });
    return Number(_total);
  };

  // get the total for a department
  const getDepartmentTotal = (departmentId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.departmentId === departmentId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.total;
    });
    return Number(_total);
  };

  // get the total ranks for a department
  const getDepartmentTotalRanks = (departmentId: string) => {
    const _lecturers = lecturersRanking.data.filter(
      (lecturer) => lecturer.departmentId === departmentId
    );
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.rank;
    });
    return Number(_total);
  };

  useEffect(() => {
    const loadAllDepartments = async () => {
      setRunning(true);
      const data = await loadDepartments(schoolId);
      setDepartments(data);
      setRunning(false);
    };
    loadAllDepartments();
    if (departments && lecturersRanking && !busy) {
      setRunning(true);
      // // sort the filtered array by total in descending order
      departments.sort((a, b) => {
        return b.total - a.total;
      });
      departments.forEach((department, index) => {
        department.citationsPerCapita = getDepartmentTotalCitiationsPerCapita(
          department._id
        );
        department.hindexPerCapita = getDepartmentTotalHindexPerCapita(
          department._id
        );
        department.i10hindexPerCapita = getDepartmentTotalI10indexPerCapita(
          department._id
        );
        department.total = getDepartmentTotal(department._id);
        department.rank = getDepartmentTotalRanks(department._id);
        const _index = index + 1;
        const _position = getPositionString(_index);
        department.position = _position;
      });
      setRunning(false);
    }
  }, [lecturersRanking, departments, busy]);

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
                <AuthDepartments
                  title="Ranking of School by Departments"
                  data={departments}
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

export default compose(withAuth)(ReportDepartments);
