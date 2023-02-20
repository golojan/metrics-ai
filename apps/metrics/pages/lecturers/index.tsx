import { withAuth } from '../../libs/hocs';
import { compose } from 'redux';
import LecturerLayout from '../../components/LecturerLayout';
import AppProfileHeader from '../../serverlets/AppProfileHeader';
import AppProfileDrawer from '../../serverlets/AppProfileDrawer';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../../libs/store';
import { authToken } from '../../libs/hocs';
import AppDashBoardTopUserMenuScores from '../../serverlets/AppDashBoardTopUserMenuScores';

export function Index() {
  const [profile, setProfile] = useAtom(userInfoAtom);
  const token = authToken();
  return (
    <>
      <LecturerLayout>
        <AppProfileHeader />
        <div id="appCapsule" className="my-0">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <AppDashBoardTopUserMenuScores />
            </div>
          </div>

          <div className="section mt-1">
            <div className="row">
              <div className="col-12 col-lg-12 col-md-12 col-xl-12 text-center">
                <div className="bg-green-400 px-5 py-3 feed-item rounded-2">
                  <h3 className=" fw-bold text-body mb-0">
                    General Announcement
                    <hr className="my-2 border-2 border-white " />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppProfileDrawer onchat={false} menuitem="dashboard" />
      </LecturerLayout>
    </>
  );
}

export default compose(withAuth)(Index);
