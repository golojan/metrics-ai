import { ArrowRight } from '@material-ui/icons';
import React from 'react';
import AppSummary from '../serverlets/AppSummary';
import { noAction } from '../libs/utils';
import Link from 'next/link';

function ReportsMenu() {
  return (
    <>
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
              href="#"
              onClick={noAction}
              className="text-primary hover:text-green-800"
            >
              <span className="text-lg">
                <ArrowRight />
                Rank Students
              </span>
            </Link>
            <Link
              href="/dashboard/reports/faculties"
              className="text-primary hover:text-green-800"
            >
              <span className="text-lg">
                <ArrowRight />
                Rank Faculties
              </span>
            </Link>
            <Link
              href="/dashboard/reports/departments"
              className="text-primary hover:text-green-800"
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
    </>
  );
}

export default ReportsMenu;
