import React from 'react';
import { AuthUserInfo } from '../libs/interfaces';

type ScholarProps = { lecturer: AuthUserInfo };

const ScholarRatingSmall = ({ lecturer }: ScholarProps) => {
  return (
    <>
      <div className="float-right text-right absolute top-2 right-2 flex-row p-1 px-1 rounded sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden bg-sky-100 hover:bg-sky-200 hover:shadow-slate-600">
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">g.s:</strong>
          <strong className="text-md font-extrabold">
            {lecturer.googlePresence}
          </strong>
        </h4>
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">cites:</strong>
          <strong className="text-md font-extrabold">
            {lecturer.citations}
          </strong>
        </h4>
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">h-i:</strong>
          <strong className="text-md font-extrabold">{lecturer.hindex}</strong>
        </h4>
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">i10:</strong>
          <strong className="text-md font-extrabold">
            {lecturer.i10hindex}
          </strong>
        </h4>
      </div>
    </>
  );
};

export default ScholarRatingSmall;
