import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { authSchoolId } from '../libs/hocs';

import {
  loadDepartments,
  loadFaculties,
  loadLecturers,
  loadStudents,
} from '../libs/utils';

function AppSummary() {
  const apiUri = process.env.NEXT_PUBLIC_API_URI;

  const schoolId = authSchoolId();

  const { data: lecturers } = useSWR(
    `${apiUri}lecturers/${schoolId}/list`,
    async () => await loadLecturers(schoolId)
  );

  const { data: students } = useSWR(
    `${apiUri}students/${schoolId}/list`,
    async () => await loadStudents(schoolId)
  );

  const { data: faculties } = useSWR(
    `${apiUri}faculties/${schoolId}/list`,
    async () => await loadFaculties(schoolId)
  );

  const { data: departments } = useSWR(
    `${apiUri}departments/${schoolId}/list`,
    async () => await loadDepartments(schoolId)
  );

  return (
    <>
      <div className="mt-2">
        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Lecturers{' '}
              <span className="text-muted">
                ({lecturers ? lecturers.length : 0})
              </span>
            </h3>
            <Link href="/dashboard/lecturers" className="text-lg">
              View All
            </Link>
          </div>
        </div>
        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Students{' '}
              <span className="text-muted">
                ({students ? students.length : 0})
              </span>
            </h3>
            <Link href="/dashboard/students" className="text-lg">
              View All
            </Link>
          </div>
        </div>
        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Faculties{' '}
              <span className="text-muted">
                ({faculties ? faculties.length : 0})
              </span>
            </h3>
            <Link href="/dashboard/faculties" className="text-lg">
              View All
            </Link>
          </div>
        </div>

        <div className="section full">
          <div className="section-heading padding">
            <h3 className="title">
              Departments{' '}
              <span className="text-muted">
                ({departments ? departments.length : 0})
              </span>
            </h3>
            <Link href="/dashboard/departments" className="text-lg">
              View All
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSummary;
