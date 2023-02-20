import { withAuth } from '../../libs/hocs';
import { compose } from 'redux';
import LecturerLayout from '../../components/LecturerLayout';
import AppProfileHeader from '../../serverlets/AppProfileHeader';
import AppProfileDrawer from '../../serverlets/AppProfileDrawer';
import AppDashBoardTopUserMenuScores from '../../serverlets/AppDashBoardTopUserMenuScores';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../../libs/store';
import { useState } from 'react';
import { authToken } from '../../libs/hocs';
import Wait from 'apps/metrics/components/Wait';
import ShowChartButton from 'apps/metrics/components/ShowChartButton';
import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function GoogleScholar() {
  const [busy, setBusy] = useState<boolean>(false);
  const [profile, setProfile] = useAtom(userInfoAtom);
  const token = authToken();
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  return (
    <>
      <LecturerLayout>
        <AppProfileHeader />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <AppDashBoardTopUserMenuScores />
            </div>
          </div>
          <div className="section  pt-1">
            <div className="row">
              <div className="col-12 col-lg-9 col-md-9 col-xl-9 mb-10">
                <div className="mb-1"></div>
                <div className="mb-3">
                  {/*  */}
                  <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
                    <div className="stat-box relative">
                      <ShowChartButton show={true} />
                      <div className="title">
                        <strong className="text-black">
                          H-Index Per Capita
                        </strong>
                      </div>
                      <h1 className="total mt-2">
                        <FontAwesomeIcon
                          className="text-secondary"
                          icon={faAreaChart}
                        />{' '}
                        {busy ? <Wait /> : 0}
                      </h1>
                      <em className="absolute bottom-0 right-5">
                        Total{' '}
                        <strong className="text-green-600">
                          {busy ? <Wait /> : 0}
                        </strong>{' '}
                        H-Index by{' '}
                        <strong className="text-green-600">
                          {busy ? <Wait /> : 0}
                        </strong>{' '}
                        staff
                      </em>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <AppProfileDrawer onchat={false} menuitem="google-scholar" />
      </LecturerLayout>
    </>
  );
}

export default compose(withAuth)(GoogleScholar);
