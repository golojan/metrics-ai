import React, { useState } from 'react';
import Wait from '../components/Wait';
import useSWR from 'swr';
import { GSIRanking } from '../libs/interfaces';
import { authSchoolId } from '../libs/hocs';

const AppDashBoardTopMenuScores = () => {
  const schoolId = authSchoolId();
  const {
    data: lecturersRanking,
    isLoading,
    isValidating,
  } = useSWR<{ status: boolean; data: GSIRanking[] }>(
    `/api/lecturers/${schoolId}/ranking`,
    async (url) => await fetch(url).then((r) => r.json())
  );

  const busy = isLoading || isValidating;

  // get the total citations per capita
  const getTotalCitiationsPerCapita = () => {
    const _lecturers = lecturersRanking.data;
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.citationsPerCapita;
    });
    return Number(_total).toFixed(2);
  };

  // get the total hindex per capita for a scghool
  const getTotalHindexPerCapita = () => {
    const _lecturers = lecturersRanking.data;
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.hindexPerCapita;
    });
    return Number(_total).toFixed(2);
  };

  // get the total i10hindex per capita
  const getTotalI10indexPerCapita = () => {
    const _lecturers = lecturersRanking.data;
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.i10hindexPerCapita;
    });
    return Number(_total).toFixed(2);
  };

  // get the total
  const getTotal = () => {
    const _lecturers = lecturersRanking.data;
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.total;
    });
    return Number(_total).toFixed(2);
  };

  return (
    <>
      <div className="balance">
        <div className="wallet-footer flex w-full border-t-0 border-0">
          <div className="item">
            <div>
              <span className="h1">
                {busy ? <Wait /> : getTotalCitiationsPerCapita()}
              </span>
              <strong>Citations Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">
                {busy ? <Wait /> : getTotalHindexPerCapita()}
              </span>
              <strong>H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1">
                {busy ? <Wait /> : getTotalI10indexPerCapita()}
              </span>
              <strong>i10-H-Index Per Capita</strong>
            </div>
          </div>
          <div className="item">
            <div>
              <span className="h1 text-green-500">
                {busy ? <Wait /> : getTotal()}
              </span>
              <strong>Total</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashBoardTopMenuScores;
