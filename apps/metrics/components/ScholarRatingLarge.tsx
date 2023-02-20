import React from 'react';
import { AuthUserInfo } from '../libs/interfaces';

type ScholarProps = { lecturer: AuthUserInfo };

const ScholarRatingLarge = ({ lecturer }: ScholarProps) => {
  return (
    <>
      <div className="float-right text-center absolute top-9 right-5 flex">
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">
            {lecturer.googlePresence}
          </strong>
          <br />
          <small>g.scholar</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{lecturer.citations}</strong>
          <br />
          <small>citations</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{lecturer.hindex}</strong>
          <br />
          <small>h-index</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong className="text-green-900 h2">{lecturer.i10hindex}</strong>
          <br />
          <small>i10-h-index</small>
        </h4>
      </div>
    </>
  );
};

export default ScholarRatingLarge;
