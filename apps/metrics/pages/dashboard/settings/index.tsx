import { NextPage } from 'next';
import React, { useEffect } from 'react';
import AppDrawer from '../../../serverlets/AppDrawer';
import AdminLayout from '../../../components/AdminLayout';

import {
  faAddressBook,
  faArrowsSpin,
  faBookReader,
  faRainbow,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'redux';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '../../../libs/hocs';
import { authSchoolId } from '../../../libs/hocs';
import AppDashBoardTopMenuScores from '../../../serverlets/AppDashBoardTopMenuScores';
import AppDashboardTopMenu from '../../../serverlets/AppDashboardTopMenu';
import Weightings from '../../../components/Weightings';
import { getSchoolSettings } from '../../../libs/utils';
import useSWR from 'swr';
import { SchoolSettingsType } from '../../../libs/interfaces';
import { useAtom } from 'jotai';
import { totalWeightAtom } from '../../../libs/store';

const Dashboard: NextPage = () => {
  const schoolId = authSchoolId();
  const [totalWeight] = useAtom(totalWeightAtom);
  const {
    data: settings,
    isLoading: isLoadingSettings,
    isValidating: isValidatingSettings,
  } = useSWR<SchoolSettingsType>(
    `/api/schools/${schoolId}/settings`,
    async () => await getSchoolSettings(schoolId),
    {
      revalidateOnFocus: true,
    }
  );

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <AppDashBoardTopMenuScores />
              <AppDashboardTopMenu />
            </div>
          </div>
          <div className="section mb-10">
            <div className="row mt-2">
              <Weightings settings={settings} />
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Dashboard);
