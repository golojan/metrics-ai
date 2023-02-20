import React, { useRef, useState } from 'react';
import ShowChartButton from './ShowChartButton';
import Image from 'next/image';

import { Virtuoso } from 'react-virtuoso';

import ScholarRatingSmall from './ScholarRatingSmall';
import { ScholarsProps } from '../libs/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '../libs/store';
import { getDepartment } from '../libs/utils';
import { Gender } from '../libs/interfaces';
import Link from 'next/link';
import cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const LecturersListBox = ({ lecturers }: ScholarsProps) => {
  //
  const domain = cookie.get('domain');
  const dispatch = useDispatch<Dispatch>();
  const { departments } = useSelector((state: RootState) => state.departments);
  const { lecturerId } = useSelector((state: RootState) => state.lecturers);
  const hasLecturerID: boolean = lecturerId.length > 0 ? true : false;

  return (
    <>
      <Virtuoso
        data={lecturers}
        totalCount={lecturers.length}
        itemContent={(index, lecturer) => (
          <>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 row-auto text-left stat-box"
              key={index}
            >
              <Image
                src={`${lecturer.picture}`}
                alt={`${lecturer.firstname}`}
                width={90}
                height={90}
                className="float-left mr-2 imaged"
              />
              <ShowChartButton show={false} />
              <div className="title my-0">
                <strong className="text-black">
                  {
                    getDepartment(departments, lecturer.departmentId as string)
                      ?.name
                  }
                </strong>
              </div>
              <h4 className="h3 my-1">
                <Link href={`/dashboard/lecturers/${lecturer._id}/profile`}>
                  <strong className="text-green-700">
                    {lecturer.lastname}
                  </strong>
                  , {lecturer.firstname} {lecturer.middlename}
                </Link>
                <small>
                  <Link href={'#'}>
                    <FontAwesomeIcon icon={faList} />
                  </Link>
                </small>
              </h4>
              <div className="text-md mt-0">
                <span>ID:</span>{' '}
                <span className="text-black">{lecturer.username}</span>
                <span className="text-gray-400"> | </span>
                <span>
                  {lecturer.gender === Gender.MALE ? 'Male' : 'Female'}
                </span>
              </div>
              <ScholarRatingSmall lecturer={lecturer} />
            </div>
          </>
        )}
      />
    </>
  );
};

export default LecturersListBox;
