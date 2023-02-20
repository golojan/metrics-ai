import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { compose } from 'redux';

import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import { withAuth } from '../../../libs/hocs';
import AppDrawer from '../../../serverlets/AppDrawer';
import { getPositionString, noAction } from '../../../libs/utils';
import ReportsMenu from '../../../components/ReportsMenu';
import { useAtom } from 'jotai';
import { GSIRanking } from '../../../libs/interfaces';
import { lecturersRankingAtom } from '../../../libs/store';
import AuthLecturerRanking from '../../../components/DataTables/AuthLecturerRanking';

const Reports: NextPage = () => {
  const [lecturersRanking] = useAtom(lecturersRankingAtom);

  const [lecturersBySchool, setLecturersBySchool] = useState<GSIRanking[]>(
    [] as GSIRanking[]
  );
  useEffect(() => {
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
  }, [lecturersRanking]);
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Ranking Reports & Statistics</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faHome} /> Reports
                  </h1>
                </div>
                <div className="right flex">
                  <Link href="#" className="button" onClick={noAction}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-xxl-3 col-xl-3 col-lg-3 my-1">
                <ReportsMenu />
              </div>
              <div className="col-12 col-md-12 col-xxl-9 col-xl-9 col-lg-9 my-1">
                <AuthLecturerRanking
                  title="General Ranking"
                  data={lecturersBySchool}
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

export default compose(withAuth)(Reports);