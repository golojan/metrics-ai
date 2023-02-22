import { authSchoolId, withAuth } from '../../libs/hocs';
import LecturerLayout from '../../components/LecturerLayout';
import AppProfileHeader from '../../serverlets/AppProfileHeader';
import AppProfileDrawer from '../../serverlets/AppProfileDrawer';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../../libs/store';
import AppDashBoardTopUserMenuScores from '../../serverlets/AppDashBoardTopUserMenuScores';
import BasegMenu from './BaseMenu';
import { getPositionString, toMonthDayYear } from '../../libs/utils';
import Link from 'next/link';
import ShowChartButton from '../../components/ShowChartButton';
import Wait from '../../components/Wait';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLineChart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { GSIRanking } from '../../libs/interfaces';
import useSWR from 'swr';
import { compose } from 'redux';

export function Index() {
  const [profile] = useAtom(userInfoAtom);

  const schoolId = authSchoolId();
  const [running, setRunning] = useState<boolean>(false);

  const {
    data: lecturersRanking,
    isLoading,
    isValidating,
  } = useSWR<{ status: boolean; data: GSIRanking[] }>(
    `/api/lecturers/${schoolId}/ranking`,
    async (url) => await fetch(url).then((r) => r.json())
  );

  const busy = isLoading || isValidating || running;

  const [lecturersBySchool, setLecturersBySchool] = useState<GSIRanking[]>(
    [] as GSIRanking[]
  );

  useEffect(() => {
    if (lecturersRanking && !busy) {
      setRunning(true);
      const lecturers = lecturersRanking.data.filter(
        (lecturer) => lecturer.schoolId === profile.schoolId
      );
      // // sort the filtered array by total in descending order
      lecturers.sort((a, b) => b.rank - a.rank);
      // // add a rank property to each user object based on their position in the sorted array
      lecturers.forEach((user, index) => {
        const _index = index + 1;
        const _position = getPositionString(_index);
        user.position = _position;
      });
      setLecturersBySchool(lecturers);
      setRunning(false);
    }
  }, [lecturersRanking, profile.schoolId, busy]);

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
                <div className="row">
                  <div className="col-12">
                    <div className="bg-gray-400 mb-1 px-3 py-3 text-black feed-item rounded-2"></div>
                    <div className="bg-white px-3 py-3 feed-item rounded-2">
                      <h3 className="text-body mb-0 text-left">
                        News & Updates
                        <hr className="my-2 border-2 border-gray-600 " />
                      </h3>
                      <BasegMenu page="dashboard" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                <div className="mb-3 row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-12 my-1">
                    <div className="stat-box relative">
                      <ShowChartButton show={true} />
                      <div className="title">
                        <strong className="text-black">Overal Ranking</strong>
                      </div>
                      <h1 className="total mt-2">
                        <FontAwesomeIcon
                          className="text-secondary"
                          icon={faLineChart}
                        />{' '}
                        {busy ? <Wait /> : 0}
                      </h1>
                      <em className="absolute bottom-0 right-5">
                        Your Global ranking
                      </em>
                    </div>
                  </div>

                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-12 my-1">
                    <div className="stat-box relative">
                      <ShowChartButton show={true} />
                      <div className="title">
                        <strong className="text-black">Faculty Ranking</strong>
                      </div>
                      <h1 className="total mt-2">
                        <FontAwesomeIcon
                          className="text-secondary"
                          icon={faLineChart}
                        />{' '}
                        {busy ? <Wait /> : 0}
                      </h1>
                      <em className="absolute bottom-0 right-5">
                        Your Faculty ranking
                      </em>
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-12 my-1">
                    <div className="stat-box relative">
                      <ShowChartButton show={true} />
                      <div className="title">
                        <strong className="text-black">
                          Department Ranking
                        </strong>
                      </div>
                      <h1 className="total mt-2">
                        <FontAwesomeIcon
                          className="text-secondary"
                          icon={faLineChart}
                        />{' '}
                        {busy ? <Wait /> : 0}
                      </h1>
                      <em className="absolute bottom-0 right-5">
                        Your Department ranking
                      </em>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-3 col-xl-3">
                <div className="row">
                  <div className="col-12">
                    <div className="bg-white px-3 mb-1 py-3 feed-item rounded-2">
                      <h3 className="text-body mb-0 text-left my-0 relative">
                        <div className="absolute top-0 right-0 bg-green-800 rounded-[50%] p-1 animate-pulse"></div>
                        Google Schoolar API
                      </h3>
                      <div className="my-0">
                        last updated:{' '}
                        <strong
                          className={
                            profile.googlePresence >= 1
                              ? 'text-green-700'
                              : 'text-red-700'
                          }
                        >
                          {toMonthDayYear(profile.lastScrapped)}
                        </strong>
                      </div>
                      <div className="rounded-2 bg-gray-300 w-full p-1 text-center text-lg">
                        <Link
                          className="text-lg"
                          target="_blank"
                          href={`https://scholar.google.com/citations?user=
                          ${profile.googleScholarId}&hl=en`}
                        >
                          {profile.googleScholarId}
                        </Link>
                      </div>
                      <div className="w-full text-left font-light">
                        Google Scholar Profile
                      </div>
                    </div>

                    <div className="bg-white px-3 my-1 py-3 feed-item rounded-2">
                      <h3 className="text-body mb-0 text-left my-0 relative">
                        NUC Updates
                        <hr className="my-2 border-2 border-gray-600 " />
                      </h3>
                    </div>
                  </div>
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
