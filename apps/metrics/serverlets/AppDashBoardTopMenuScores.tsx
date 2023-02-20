import React from 'react';
import { busyAtom, statistics_schoolAtom } from '../libs/store';
import Wait from '../components/Wait';
import { useAtom } from 'jotai';

const AppDashBoardTopMenuScores = () => {
  const [busy] = useAtom(busyAtom);
  const [statistics_school] = useAtom(statistics_schoolAtom);
  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">
                {busy ? (
                  <Wait />
                ) : (
                  statistics_school.citationsPerCapita?.toFixed(2)
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
                ) : (
                  statistics_school.hindexPerCapita?.toFixed(2)
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
                ) : (
                  statistics_school.i10hindexPerCapita?.toFixed(2)
                )}
              </span>
              <strong>i10-H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1 text-green-500">{busy ? <Wait /> : '~'}</span>
              <strong>Total</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopMenuScores;
