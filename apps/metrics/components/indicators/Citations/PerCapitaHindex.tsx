import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { authSchoolId } from '../../../libs/hocs';
import { GSIRanking } from '../../../libs/interfaces';
import useSWR from 'swr';
import Wait from '../../Wait';

const PerCapitaHindex = () => {
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

  // get the total hindex per capita for a scghool
  const getTotalHindexPerCapita = () => {
    const _lecturers = lecturersRanking.data;
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.hindexPerCapita;
    });
    return Number(_total).toFixed(2);
  };

  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">H-Index Per Capita</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {busy ? <Wait /> : getTotalHindexPerCapita()}
          </h1>
          <em className="absolute bottom-0 right-5">
            Total{' '}
            <strong className="text-green-600">
              {busy ? <Wait /> : getTotalHindexPerCapita()}
            </strong>{' '}
            H-Index by{' '}
            <strong className="text-green-600">
              {busy ? <Wait /> : lecturersRanking.data.length}
            </strong>{' '}
            staff
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default PerCapitaHindex;
