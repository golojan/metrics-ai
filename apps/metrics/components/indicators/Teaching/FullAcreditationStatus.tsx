import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';
import useSWR from 'swr';
import { GSIRanking } from '../../../libs/interfaces';
import { authSchoolId } from '../../../libs/hocs';
import Wait from '../../Wait';

const FullAcreditationStatus = () => {
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const schoolId = authSchoolId();
  const {
    data: statistics,
    error,
    isLoading,
  } = useSWR<GSIRanking>(`${apiUri}departments/${schoolId}/stats`, () =>
    fetch(`${apiUri}departments/${schoolId}/stats`).then((res) => res.json())
  );

  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">(%) Full Accreditation</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {isLoading ? (
              <Wait />
            ) : (
              statistics?.fullAccreditation.toFixed(1) + '%'
            )}
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">
              {isLoading ? (
                <Wait />
              ) : (
                statistics?.fullAccreditation.toFixed(1) + '%'
              )}
            </strong>{' '}
            of{' '}
            <strong className="text-green-600 small">
              {isLoading ? <Wait /> : statistics?.totalDepartments}
            </strong>{' '}
            fully accredited
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default FullAcreditationStatus;
