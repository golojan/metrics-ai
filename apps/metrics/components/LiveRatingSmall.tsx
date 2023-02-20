import React from 'react';
import { LecturerInfo } from '../libs/interfaces';

type SchoolProps = { school: any; mid: any };

const LiveRatingSmall = ({ school, mid }: SchoolProps) => {
  return (
    <>
      <div
        className={`float-right text-right absolute top-2 right-2 flex-row p-1 px-1 rounded sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden ${
          school.points <= mid
            ? ' bg-red-100 hover:bg-red-200 hover:shadow-red-600 h-[90%]'
            : ' bg-green-100 hover:bg-green-200 hover:shadow-green-600 h-[90%]'
        }`}
      >
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">g.s:</strong>
          <strong className="text-md font-extrabold">{0}</strong>
        </h4>
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">cites:</strong>
          <strong className="text-md font-extrabold">{0}</strong>
        </h4>
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">h-i:</strong>
          <strong className="text-md font-extrabold">{0}</strong>
        </h4>
        <h4 className="text-right mx-1 my-1 sm:hidden md:hidden lg:hidden xl:hidden xxl:hidden">
          <strong className="text-md text-gray-600 mr-2">i10:</strong>
          <strong className="text-md font-extrabold">{0}</strong>
        </h4>
      </div>
    </>
  );
};

export default LiveRatingSmall;
