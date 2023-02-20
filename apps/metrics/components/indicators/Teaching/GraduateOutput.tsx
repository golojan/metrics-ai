import { faAreaChart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ShowChartButton from '../../ShowChartButton';

const GraduateOutput = () => {
  return (
    <>
      {/*  */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black">Graduate Output (GO)</strong>
          </div>
          <h1 className="total mt-2">
            <FontAwesomeIcon className="text-secondary" icon={faAreaChart} />{' '}
            {0}
          </h1>
          <em className="absolute bottom-0 right-5">
            <strong className="text-green-600 small">{0}</strong> Graduation
            Output
          </em>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default GraduateOutput;
