import React, { useEffect, useState } from 'react';
import { lecturersRankingAtom, userInfoAtom } from '../libs/store';
import Wait from '../components/Wait';
import { useAtom } from 'jotai';
import { authSchoolId, authToken } from '../libs/hocs';
import { AuthUserInfo, GSIRanking } from '../libs/interfaces';

const AppDashBoardTopUserMenuScores = () => {
  const schoolId = authSchoolId();
  const token = authToken();

  const [busy, setBusy] = useState<boolean>(false);
  const [user] = useAtom(userInfoAtom);

  const [lecturersRanking] = useAtom(lecturersRankingAtom);

  const [userRank, setUserRank] = useState<GSIRanking>({} as GSIRanking);

  useEffect(() => {
    if (schoolId && token) {
      if (lecturersRanking.length > 0) {
        const thisUserRank: GSIRanking = lecturersRanking.find(
          (item: AuthUserInfo) => item._id === token
        );
        setUserRank(thisUserRank);
      }
    }
  }, [schoolId, user._id, token]);

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
