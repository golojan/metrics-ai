import { withAuth } from '../../../libs/hocs';
import { compose } from 'redux';
import LecturerLayout from '../../../components/LecturerLayout';
import AppProfileHeader from '../../../serverlets/AppProfileHeader';
import AppProfileDrawer from '../../../serverlets/AppProfileDrawer';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../../../libs/store';
import { useState } from 'react';
import AuthPublications from '../../../components/DataTables/AuthPublications';
import { Copyright } from '@material-ui/icons';

export function Index() {
  const [busy] = useState<boolean>(false);
  const [profile] = useAtom(userInfoAtom);

  const publicationsPerCapita = () => {
    const ppcDiff = profile.lastPublicationYear - profile.firstPublicationYear;
    const ppc = profile.totalPublications / ppcDiff;
    return ppc.toFixed(2);
  };
  return (
    <>
      <LecturerLayout>
        <AppProfileHeader />
        <div id="appCapsule">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="wallet-footer flex w-full border-t-0 border-0">
                  <div className="item">
                    <div>
                      <span className="h1">{profile.totalPublications}</span>
                      <strong>PUBLICATIONS</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{profile.firstPublicationYear}</span>
                      <strong>FIRST PUB. YEAR</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{profile.lastPublicationYear}</span>
                      <strong>LAST PUB. YEAR</strong>
                    </div>
                  </div>
                  <div className="item">
                    <div>
                      <span className="h1">{profile.citations}</span>
                      <strong>CITATIONS</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section pt-1 mb-[20px]">
            <div className="row ">
              <div className={`col-12 col-md-12 col-lg-12 min-h-screen`}>
                <AuthPublications
                  title="All Publications"
                  data={profile.publications}
                  loading={busy}
                />
              </div>
            </div>
          </div>
        </div>
        <AppProfileDrawer onchat={false} menuitem="publications" />
      </LecturerLayout>
    </>
  );
}

export default compose(withAuth)(Index);
