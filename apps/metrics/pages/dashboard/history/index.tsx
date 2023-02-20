import { NextPage } from 'next';
import React from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { compose } from 'redux';

import {
  faDownLong,
  faPlus,
  faSchoolCircleCheck,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '../../../libs/hocs';
import AppDrawer from '../../../serverlets/AppDrawer';

import { useSelector } from 'react-redux';
import { RootState } from '../../../libs/store';

import RankingHostoryTable from '../../../components/RankingHostoryTable';

const RankingsHistory: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="wallet-footer">
                <div className="item">
                  <div>
                    <span className="h1">{0}</span>
                    <strong>Googgle Presence</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <span className="h1">{0}</span>
                    <strong>Citations</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <span className="h1">{0}</span>
                    <strong>H-Index</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <span className="h1">{0}</span>
                    <strong>i10-H-Index</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-12 min-h-screen">
                {/* <RankingHostoryTable history={school?.history} /> */}
                {/* <LiveRankingTable  allschools={allschools} /> */}
              </div>
            </div>
          </div>

          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(RankingsHistory);
