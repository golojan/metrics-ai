import { authSchoolId } from '../libs/hocs';
import {
  loadDepartments,
  loadFaculties,
  loadLecturers,
  loadStudents,
} from '../libs/utils';
import useSWR from 'swr';

import ArrowRight from '@material-ui/icons/ArrowRight';

import React from 'react';
import Link from 'next/link';
import { noAction } from '../libs/utils';
import ReportMenuBox from '../components/containers/ReportMenuBox';
import AppSummary from './AppSummary';

function AppAnalytics() {
  const schoolId = authSchoolId();

  const { data: lecturers } = useSWR(
    `/api/lecturers/${schoolId}/list`,
    async () => await loadLecturers(schoolId)
  );

  const { data: students } = useSWR(
    `/api/students/${schoolId}/list`,
    async () => await loadStudents(schoolId)
  );

  const { data: faculties } = useSWR(
    `/api/faculties/${schoolId}/list`,
    async () => await loadFaculties(schoolId)
  );

  const { data: departments } = useSWR(
    `/api/departments/${schoolId}/list`,
    async () => await loadDepartments(schoolId)
  );

  return (
    <>
      <div className="section">
        <div className="row mt-1">
          <div className="col-12 col-md-12 col-xxl-3 col-xl-3 col-lg-3 my-1">
            <div className="stat-box">
              <div className="title">
                <div className="row mt-2 relative border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="/dashboard/reports/lecturers"
                    className="text-primary hover:text-green-800"
                  >
                    <span className="text-lg">
                      <ArrowRight />
                      Rank Lecturers
                    </span>
                  </Link>
                  <Link
                    href="/dashboard/reports/publications"
                    className="text-primary hover:text-green-800"
                  >
                    <span className="text-lg">
                      <ArrowRight />
                      Rank Faculties
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-primary hover:text-green-800"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight />
                      Rank Departments
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <AppSummary />
          </div>
          <div className="col-12 col-md-12 col-xxl-3 col-xl-3 col-lg-3 my-1"></div>
        </div>
      </div>
    </>
  );
}

export default AppAnalytics;
