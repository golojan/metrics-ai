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
          <ReportMenuBox>
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-5 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">
                    {lecturers ? lecturers.length : 0}
                  </strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Lecturers
                  </span>
                </div>
                <strong className="text-black h5">LECTURERS</strong> - Analytics
                <div className="row mt-2 relative h-auto border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="/dashboard/reports/lecturers"
                    className="text-primary hover:text-green-800"
                  >
                    <span className="text-lg">
                      <ArrowRight />
                      Google Scholar Metrics
                    </span>
                  </Link>
                  <Link
                    href="/dashboard/reports/publications"
                    className="text-primary hover:text-green-800"
                  >
                    <span className="text-lg">
                      <ArrowRight />
                      Journals & Publications
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight />
                      PHD & Fellowships
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ReportMenuBox>
          <ReportMenuBox>
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-5 text-center right-4 px-3 text-gray-600">
                  <strong className="h6 font-extrabold">
                    {students ? students.length : 0}
                  </strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Students
                  </span>
                </div>
                <strong className="text-black h5">STUDENTS</strong> - Analytics
                <div className="row mt-2 relative h-auto border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Google Scholar Metrics
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Journals & Publications
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ReportMenuBox>
          <ReportMenuBox>
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-5 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">
                    {faculties ? faculties.length : 0}
                  </strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Faculties
                  </span>
                </div>
                <strong className="text-black h5">FACULTIES</strong> - Analytics
                <div className="row mt-2 relative h-auto border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Google Scholar Metrics
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Journals & Publications
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ReportMenuBox>
          <ReportMenuBox>
            <div className="stat-box">
              <div className="title">
                <div className="float-right absolute top-5 text-center right-4  px-3 text-gray-600">
                  <strong className="h6 font-extrabold">
                    {departments ? departments.length : 0}
                  </strong>{' '}
                  <span className="hidden xl:inline xxl:inline lg:inline md:inline">
                    Departments
                  </span>
                </div>
                <strong className="text-black h5">DEPARTMENTS</strong> -
                Analytics
                <div className="row mt-2 relative h-auto border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Google Scholar Metrics
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Journals & Publications
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ReportMenuBox>
          <ReportMenuBox>
            <div className="stat-box">
              <div className="title">
                <strong className="text-black h5">NUC Ratings</strong> -
                Analytics
                <div className="row mt-2 relative h-auto border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Estimated NUC rating
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ReportMenuBox>
          <ReportMenuBox>
            <div className="stat-box">
              <div className="title">
                <strong className="text-black h5">Inter-School Reports</strong>{' '}
                - Analytics
                <div className="row mt-2 relative  h-auto border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Comparative Rating
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ReportMenuBox>
          <ReportMenuBox>
            <div className="stat-box">
              <div className="title">
                <strong className="text-black h5">School Portal</strong> -
                Analytics
                <div className="row mt-2 relative h-auto border-2 border-gray-400 p-2 rounded bg-gradient-to-b from-[#e6d3d3] to-[#ffffff] bg-gray-100">
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Visitors & Page Views
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Schools Page Views
                    </span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-gray-400"
                    onClick={noAction}
                  >
                    <span className="text-lg">
                      <ArrowRight /> Portal Activity Log
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </ReportMenuBox>
        </div>
      </div>
    </>
  );
}

export default AppAnalytics;
