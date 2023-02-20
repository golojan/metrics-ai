import React, { useRef, useState } from 'react';
import ShowChartButton from '../components/ShowChartButton';
import Image from 'next/image';

import { Virtuoso } from 'react-virtuoso';

import ScholarRatingLarge from './ScholarRatingLarge';
import ScholarRatingSmall from './ScholarRatingSmall';
import {
  GSRanking,
  ScholarsProps,
  Gender,
  SCHDepartment,
  AuthUserInfo,
} from '../libs/interfaces';
import { getDepartment, getProfileInfo } from '../libs/utils';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { authSchoolId } from '../libs/hocs';

const StudentsListBox = ({ students }: ScholarsProps) => {
  //
  const [busy, setBusy] = useState<boolean>(false);
  const schoolId = authSchoolId();
  const [departments, setDepartments] = useState<SCHDepartment[]>([]);
  const [studentId, setStudentId] = useState<string>('');
  const [studentInfo, setStudentInfo] = useState<AuthUserInfo>(
    {} as AuthUserInfo
  );

  const hasStudentID: boolean = studentId.length > 0 ? true : false;

  const [ranking, setRanking] = useState<GSRanking>({
    accountId: studentId ? studentId : '',
    scrap: false,
  });

  const saveButtonRef = useRef<HTMLButtonElement | null>(null);
  const scrapeButtonRef = useRef<HTMLButtonElement | null>(null);

  const resetLecturerId = (e: React.SyntheticEvent, student_id: string) => {
    setStudentId(student_id as string);
    getProfileInfo(student_id).then((user: AuthUserInfo) => {
      setStudentInfo(user);
      setRanking({
        scrap: false,
        googleScholarId: user.googleScholarId,
        canScrap: user.googleScholarId ? true : false,
      });
    });
  };

  const startScrapper = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch('/api/scrape', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: `https://scholar.google.com/citations?user=${studentInfo.googleScholarId}&hl=en&cstart=0&pagesize=100&sortby=pubdate`,
      }),
    })
      .then((res) => res.json())
      .then(({ status, ranking }) => {
        if (status) {
          setRanking({ ...ranking });
        }
      });
  };

  const saveRanking = (e: React.SyntheticEvent, lecturer_id: string) => {
    e.preventDefault();
    setBusy(true);
    fetch(`/api/lecturers/update/${lecturer_id}/ranking`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ranking),
    })
      .then((res) => res.json())
      .then(({ status, data }) => {
        console.log('data', data);
      });
    setBusy(false);
  };

  return (
    <>
      <Virtuoso
        data={students}
        totalCount={students.length}
        itemContent={(index, student) => (
          <>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 row-auto text-left stat-box h-auto border-fuchsia-500 shadow bg-gray-400"
              key={index}
            >
              <Image
                src={`${student.picture}`}
                alt={`${student.firstname}`}
                width={70}
                height={70}
                className="float-left mr-2 imaged"
              />
              <ShowChartButton show={false} />
              <div className="title my-0">
                <strong className="text-black">
                  {
                    getDepartment(departments, student.departmentId as string)
                      ?.name
                  }
                </strong>
              </div>
              <h4 className="h3 my-1">
                <Link href={`/dashboard/lecturers/${student._id}/profile`}>
                  <strong className="text-green-700">{student.lastname}</strong>
                  , {student.firstname} {student.middlename}
                </Link>
                <small>
                  <Link
                    href={'#'}
                    onClick={(e) => resetLecturerId(e, student._id as string)}
                  >
                    <FontAwesomeIcon icon={faList} />
                  </Link>
                </small>
              </h4>
              <div className="text-md mt-0">
                <span>ID:</span>{' '}
                <span className="text-black">{student.username}</span>
                <span className="text-gray-400"> | </span>
                <span>
                  {student.gender === Gender.MALE ? 'Male' : 'Female'}
                </span>
              </div>
              <ScholarRatingLarge lecturer={student} />
              <ScholarRatingSmall lecturer={student} />
              {hasStudentID && studentId === student._id ? (
                <>
                  <div className="stat-box mt-2 min-h-[100px] w-full border-fuchsia-500 shadow bg-gray-400">
                    <div className="row">
                      <div className="col-12 mb-1">
                        <span className="text-lg">
                          Scrap International Ranking Data{' '}
                        </span>
                      </div>
                      <div className="col-7">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                          <input
                            type="text"
                            disabled={
                              student.googleScholarId?.length > 0 ? false : true
                            }
                            className="form-control relative flex-auto min-w-0 block text-md w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder={`GoogleScholar ID`}
                            value={student.googleScholarId}
                            onChange={(e) =>
                              setRanking({
                                ...ranking,
                                googleScholarId: e.target.value,
                              })
                            }
                          />
                          <div className="input-group-append ">
                            <button
                              disabled={
                                student.googleScholarId?.length > 0
                                  ? false
                                  : true
                              }
                              ref={scrapeButtonRef}
                              onClick={startScrapper}
                              className="btn btn-primary h-full relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:outline-none"
                            >
                              Scrape
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                          <input
                            type="number"
                            className="form-control  text-center relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder={'citations'}
                            value={ranking.citations}
                            readOnly={true}
                            onChange={(e) =>
                              setRanking({
                                ...ranking,
                                citations: parseInt(e.target.value),
                              })
                            }
                          />
                          <input
                            type="number"
                            className="form-control text-center relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder={'hindex'}
                            value={ranking.hindex}
                            readOnly={true}
                            onChange={(e) =>
                              setRanking({
                                ...ranking,
                                hindex: parseInt(e.target.value),
                              })
                            }
                          />
                          <input
                            type="number"
                            className="form-control text-center relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder={'i10-h'}
                            value={ranking.i10hindex}
                            readOnly={true}
                            onChange={(e) =>
                              setRanking({
                                ...ranking,
                                i10hindex: parseInt(e.target.value),
                              })
                            }
                          />
                          <div className="input-group-append ">
                            <button
                              ref={saveButtonRef}
                              disabled={
                                student.googleScholarId?.length > 0
                                  ? false
                                  : true
                              }
                              onClick={(e) => saveRanking(e, studentId)}
                              className="btn btn-primary h-full relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:outline-none"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      />
    </>
  );
};

export default StudentsListBox;
