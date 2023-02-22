import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GSIRanking } from '../../../libs/interfaces';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import useSWR from 'swr';
import { authSchoolId } from '../../../libs/hocs';
import Wait from '../../Wait';

const GoogleScholarPresence = () => {
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

  // get the total google presence
  const getTotalGooglePresence = () => {
    const _lecturers = lecturersRanking.data;
    let _total = 0;
    _lecturers.forEach((lecturer) => {
      _total += lecturer.googlePresence;
    });
    // % google presence
    return Number((_total / lecturersRanking.data.length) * 100).toFixed(2);
  };

  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">% Google Scholar Presence</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {busy ? <Wait /> : getTotalGooglePresence() + '%'}
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">
              {busy ? <Wait /> : getTotalGooglePresence() + '%'}
            </strong>{' '}
            of{' '}
            <strong className="text-green-600">
              {busy ? <Wait /> : lecturersRanking.data.length}
            </strong>{' '}
            are Scholars
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default GoogleScholarPresence;
