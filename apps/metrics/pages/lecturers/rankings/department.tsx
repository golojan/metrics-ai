import { withAuth } from '../../../libs/hocs';
import { compose } from 'redux';
import LecturerLayout from '../../../components/LecturerLayout';
import AppProfileHeader from '../../../serverlets/AppProfileHeader';
import AppProfileDrawer from '../../../serverlets/AppProfileDrawer';
import { useAtom } from 'jotai';
import { userInfoAtom, lecturersRankingAtom } from '../../../libs/store';
import Copyright from '../../../serverlets/Copyright';
import RankingMenu from './RankingMenu';
import AuthLecturerRanking from '../../../components/DataTables/AuthLecturerRanking';
import { useEffect, useState } from 'react';
import { GSIRanking } from 'apps/metrics/libs/interfaces';
import AppDashBoardTopUserMenuScores from '../../../serverlets/AppDashBoardTopUserMenuScores';
import { getPositionString } from '../../../libs/utils';

export function DepartmentRanking() {
  const [profile] = useAtom(userInfoAtom);
  const [lecturersRanking] = useAtom(lecturersRankingAtom);

  const [lecturersByDepartment, setLecturersByDepartment] = useState<
    GSIRanking[]
  >([] as GSIRanking[]);

  useEffect(() => {
    if (lecturersRanking) {
      const lecturers = lecturersRanking.filter(
        (lecturer) => lecturer.departmentId === profile.departmentId
      );
      // // sort the filtered array by total in descending order
      lecturers.sort((a, b) => b.rank - a.rank);
      // // add a rank property to each user object based on their position in the sorted array
      lecturers.forEach((user, index) => {
        const _index = index + 1;
        const _position = getPositionString(_index);
        user.position = _position;
      });
      setLecturersByDepartment(lecturers);
    }
  }, [lecturersRanking, profile.departmentId]);

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
              <div className="col-12 col-md-12 col-lg-3 col-xl-3">
                <div className="bg-white px-3 py-3 feed-item rounded-2">
                  <h3 className="text-body mb-0 text-left">
                    My Rankings -
                    <hr className="my-2 border-2 border-gray-600 " />
                  </h3>
                  <p>
                    Here you can monitor your scores, positions and Ranks within
                    your School, Department, and Faculty.
                  </p>
                  <hr className="my-2 border-2 border-gray-600 " />
                  <RankingMenu page="department" />
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-9 col-xl-9">
                <AuthLecturerRanking
                  title="Ranking By Department"
                  data={lecturersByDepartment}
                  loading={false}
                />
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppProfileDrawer onchat={false} menuitem="rankings" />
      </LecturerLayout>
    </>
  );
}

export default compose(withAuth)(DepartmentRanking);
