import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import { authSchoolId } from '../../../libs/hocs';
import { GSIRanking } from '../../../libs/interfaces';

import useSWR from 'swr';
import Wait from '../../Wait';

const PerCapitaHindex = () => {

  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const schoolId = authSchoolId();
  const { data: statistics, error, isLoading } = useSWR<GSIRanking>(`${apiUri}schools/${schoolId}/stats`, () => fetch(`${apiUri}schools/${schoolId}/stats`).then((res) => res.json()));
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
            {isLoading ? <Wait /> : statistics.hindexPerCapita.toFixed(2)}
          </h1>
          <em className="absolute bottom-0 right-5">
            Total <strong className="text-green-600">{isLoading ? <Wait /> : statistics.hindexPerCapita.toFixed(2)}</strong>{' '}
            H-Index by{' '}
            <strong className="text-green-600">{isLoading ? <Wait /> : statistics.totalLecturers}</strong>{' '}
            staff
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default PerCapitaHindex;
