import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';
import { faPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '../../../libs/hocs';
import { compose } from 'redux';
import { authSchoolId } from '../../../libs/hocs';
import AuthLecturersTable from '../../../components/DataTables/AuthLecturersTable';
import { AuthUserInfo } from '../../../libs/interfaces';
import { loadLecturersRanking, noAction } from '../../../libs/utils';
import { useAtom } from 'jotai';
import { lecturersRankingAtom } from '../../../libs/store';

const Lecturers: NextPage = () => {
  const schoolId = authSchoolId();
  const [busy, setBusy] = useState(false);
  const [lecturersRanking] = useAtom(lecturersRankingAtom);
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Manage Lecturers</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faUsersCog} /> Lecturers
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
              <div className={`col-12 col-md-12 col-lg-12 min-h-screen`}>
                <AuthLecturersTable
                  title="Manage Lecturers"
                  data={busy ? [] : lecturersRanking}
                  loading={busy}
                />
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

export default compose(withAuth)(Lecturers);
