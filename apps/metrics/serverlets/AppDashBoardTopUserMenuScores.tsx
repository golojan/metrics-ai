import React, { useEffect, useState } from 'react';
import { userInfoAtom } from '../libs/store';
import Wait from '../components/Wait';
import { useAtom } from 'jotai';
import { authSchoolId, authToken } from '../libs/hocs';
import { AuthUserInfo, GSIRanking } from '../libs/interfaces';
import useSWR from 'swr';

const AppDashBoardTopUserMenuScores = () => {
  const schoolId = authSchoolId();
  const token = authToken();

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

  const [userRank, setUserRank] = useState<GSIRanking>({} as GSIRanking);

  useEffect(() => {
    if (lecturersRanking && token && !busy) {
      setRunning(true);
      if (lecturersRanking.data.length > 0) {
        const thisUserRank: GSIRanking = lecturersRanking.data.find(
          (item: AuthUserInfo) => item._id === token
        );
        setUserRank(thisUserRank);
      }
      setRunning(false);
    }
  }, [token, busy, lecturersRanking]);

  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">
                {busy ? (
                  <Wait />
                ) : userRank.citationsPerCapita ? (
                  userRank.citationsPerCapita?.toFixed(2)
                ) : (
                  '0.0'
                )}
              </span>
              <strong>Citations Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">
                {busy ? (
                  <Wait />
                ) : userRank.hindexPerCapita ? (
                  userRank.hindexPerCapita?.toFixed(2)
                ) : (
                  '0.0'
                )}
              </span>
              <strong>H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">
                {busy ? (
                  <Wait />
                ) : userRank.i10hindexPerCapita ? (
                  userRank.i10hindexPerCapita?.toFixed(2)
                ) : (
                  '0.00'
                )}
              </span>
              <strong>i10-H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1 text-green-500">
                {busy ? (
                  <Wait />
                ) : userRank.total ? (
                  userRank.total.toFixed(2)
                ) : (
                  '0.00'
                )}
              </span>
              <strong>Total</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1 text-green-500">
                {busy ? (
                  <Wait />
                ) : userRank.rank ? (
                  userRank.rank.toFixed(2)
                ) : (
                  '0.00'
                )}
              </span>
              <strong>Ranking</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopUserMenuScores;
