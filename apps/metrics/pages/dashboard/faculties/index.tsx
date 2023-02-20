import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import AppDrawer from '../../../serverlets/AppDrawer';

import {
  faDeleteLeft,
  faEdit,
  faPlus,
  faUsersBetweenLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { authSchoolId, withAuth } from '../../../libs/hocs';
import { compose } from 'redux';

import { FacultiesInfo, SCHDepartment, SCHFaculty } from '../../../libs/interfaces';
import { listFaculties, loadFaculties, loadDepartments } from '../../../libs/utils';
import { Virtuoso } from 'react-virtuoso';


import useSWR from 'swr';

const Faculties: NextPage = () => {

  const [done, setDone] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const [list, setList] = useState<FacultiesInfo[]>([]);
  const [schoolFaculties, setSchoolFaculties] = useState<SCHFaculty[]>([]);
  const [schoolDepartments, setSchoolDepartments] = useState<SCHDepartment[]>([]);
  const schoolId = authSchoolId();

  const [errText, setErrText] = useState<string>('');

  const apiUri = process.env.NEXT_PUBLIC_API_URI;

  const { data: faculties, isLoading } = useSWR(
    `${apiUri}faculties/list`,
    async () => await listFaculties()
  );

  const [faculty, setFaculty] = useState<SCHFaculty>({ schoolId: schoolId });

  useEffect(() => {
    if (faculties && !isLoading) {
      setList(faculties);
    }
    loadFaculties(schoolId).then((fres) => {
      setSchoolFaculties(fres);
    });
    loadDepartments(schoolId).then((dres) => {
      setSchoolDepartments(dres);
    });
    setErrText('');
  }, [done, faculties, isLoading, schoolId]);


  // count departments in a faculty from schoolDepartments
  const countDepartments = (facultyId: string): number => {
    const departments = schoolDepartments.filter(
      (department) => department.facultyId === facultyId
    );
    return Number(departments.length);
  };


  const getFacultyInfo = (facultyId: string) => {
    const faculty = faculties.find((faculty) => faculty._id === facultyId);
    return faculty;
  };

  const getSchoolFacultyInfo = (facultyId: string) => {
    const faculty = schoolFaculties.find(
      (faculty) => faculty.facultyId === facultyId
    );
    return faculty;
  };

  const searchFilter = (q: string) => {
    setQuery(q);
    const newData = faculties.filter((faculty: FacultiesInfo) => {
      return (
        faculty.name?.toLowerCase().includes(q.toLowerCase()) ||
        faculty.description?.toLowerCase().includes(q.toLowerCase())
      );
    });
    setList(newData);
  };

  // add to school faculties//
  const removeFromSchoolFaculties = async (
    e: React.SyntheticEvent,
    facultyId: string,
    id: string
  ) => {
    e.preventDefault();
    const _countFacs = countDepartments(id);
    if (_countFacs) {
      setErrText(
        `You cannot remove this faculty because it has ${_countFacs} departments in it. Please remove the departments first`
      );
      return;
    }
    setDone(true);
    const result = await fetch(`${apiUri}faculties/${schoolId}/removeFaculty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        facultyId: facultyId,
      }),
    });
    const { status, data } = await result.json();
    if (status) {
      console.log(data);
    } else {
      console.log(data);
    }
    setDone(false);
  };

  // add to school faculties//
  const addToSchoolFaculties = async (
    e: React.SyntheticEvent,
    facultyId: string
  ) => {
    e.preventDefault();
    setDone(true);
    const result = await fetch(`${apiUri}faculties/${schoolId}/addFaculty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        facultyId: facultyId,
        facultyName: getFacultyInfo(facultyId).name,
        facultyCode: getFacultyInfo(facultyId)?.shortname,
        facultyDescription: getFacultyInfo(facultyId)?.description,
      }),
    });
    const { status, data } = await result.json();
    if (status) {
      console.log(data);
    } else {
      console.log(data);
    }
    setDone(false);
  };

  const isFacultyInSchool = (facultyId: string) => {
    const faculty = schoolFaculties.find(
      (faculty) => faculty.facultyId === facultyId
    );
    return faculty ? true : false;
  };

  const updateFaculty = (facultyId: string) => {
    const xfaculty = getSchoolFacultyInfo(facultyId);
    setFaculty({
      _id: xfaculty?._id,
      facultyId: facultyId,
      schoolId: schoolId,
      facultyName: xfaculty?.facultyName,
      facultyCode: xfaculty?.facultyCode,
      facultyDescription: xfaculty?.facultyDescription
        ? xfaculty?.facultyDescription
        : '',
    });
  };

  const saveFaculty = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDone(true);

    if (faculty._id) {
      //edit faculty
      const result = await fetch(`${apiUri}faculties/${schoolId}/updateFaculty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faculty),
      });
      const { status, data } = await result.json();
      if (status) {
        console.log(data);
      } else {
        console.log(data);
      }
    } else {
      //add faculty
      const result = await fetch(`${apiUri}faculties/${schoolId}/addFaculty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faculty),
      });
      const { status, data } = await result.json();
      if (status) {
        console.log(data);
      } else {
        console.log(data);
      }
    }

    setDone(false);
  };

  const doNewFaculty = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFaculty({ schoolId: schoolId });
  };

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Manage Faculties</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faUsersBetweenLines} /> Faculties
                  </h1>
                </div>
                <div className="right flex">
                  <Link
                    href="#"
                    className="button"
                    onClick={(e) => doNewFaculty(e)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-4 fa-border">
                <div className="card-box border-0">
                  <div className="flex justify-center">
                    <div className="w-full">
                      <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                        <input
                          type="search"
                          className="form-control relative flex-auto min-w-0 block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder={`Search [${list.length}] records...`}
                          aria-label="Search"
                          aria-describedby="button-addon2"
                          onChange={(e) => searchFilter(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="pl-1">
                    Found {list.length} faculties in record for{' '}
                    {query ? query : 'all records'}
                  </p>
                  <hr className="my-2" />
                  <Virtuoso
                    style={{ height: '400px' }}
                    totalCount={list.length}
                    data={list}
                    itemContent={(index, faculty) => (
                      <>
                        {!isFacultyInSchool(faculty._id) ? (
                          <div
                            className="w-full my-1 p-1 bg-gray-300"
                            key={index}
                          >
                            <Link
                              className="float-right btn btn-primary btn-sm"
                              href={`#`}
                              onClick={(e) =>
                                addToSchoolFaculties(e, faculty._id)
                              }
                            >
                              <FontAwesomeIcon className="" icon={faPlus} />
                            </Link>
                            <div className="flex justify-between">
                              <div className="flex">
                                <div className="flex flex-col">
                                  <p className="text-black">
                                    {faculty.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className={`col-12 col-md-12 col-lg-4 fa-border`}>
                <div className="card-box border-1">
                  <div className="mb-2 text-black text-lg">
                    School Faculties <br />
                    <small className='text-gray-500'>All registered faculties.</small>
                    <hr className="my-2" />
                  </div>
                  {errText ? <div className="text-danger alert-sm list-none">{errText}</div> : null}
                  <Virtuoso
                    style={{ height: '400px' }}
                    totalCount={schoolFaculties.length}
                    data={schoolFaculties}
                    itemContent={(index, schFaculty) => (
                      <>
                        <div
                          className="w-full my-1 p-1 bg-gray-300"
                          key={index}
                        >
                          <Link
                            className="float-right mx-2  btn btn-danger btn-sm"
                            href={`#`}
                            onClick={(e) =>
                              removeFromSchoolFaculties(e, schFaculty.facultyId, schFaculty._id)
                            }
                          >
                            <FontAwesomeIcon className="" icon={faDeleteLeft} />
                          </Link>
                          <Link
                            className="float-right mx-2 btn btn-primary btn-sm"
                            href={`#`}
                            onClick={() => updateFaculty(schFaculty?.facultyId)}
                          >
                            <FontAwesomeIcon className="" icon={faEdit} />
                          </Link>
                          <div className="flex justify-between">
                            <div className="flex">
                              <div className="flex flex-col">
                                <p className="text-black">
                                  {schFaculty?.facultyName} <span>({countDepartments(schFaculty?._id)})</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
              <div className={`col-12 col-md-12 col-lg-4 min-h-screen`}>
                <form onSubmit={saveFaculty}>
                  <div className="card-box border-0">
                    {faculty._id ? (
                      <>
                        <div className="mb-2 text-black text-lg">
                          Edit Faculty <br />
                          <small className='text-gray-500'>
                            Edit faculty details.
                            <hr className="my-2" />
                          </small>
                        </div>
                      </>
                    ) : (
                      <>
                          <div className="mb-2 text-black text-lg">
                          Create Faculty <br />
                            <small className='text-gray-500'>
                            New Faculty Details.
                            <hr className="my-2" />
                          </small>
                          </div>
                      </>
                    )}

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label htmlFor="facultyName">
                          Faculty Name
                        </label>
                        <textarea
                          className="form-control"
                          value={faculty.facultyName}
                          onChange={(e) =>
                            setFaculty({
                              ...faculty,
                              facultyName: e.target.value,
                            })
                          }
                        />
                        <i className="clear-input show d-block">
                          <FontAwesomeIcon icon={faEdit} />
                        </i>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label htmlFor="facultyCode">
                          Code/Short Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={faculty.facultyCode}
                          onChange={(e) =>
                            setFaculty({
                              ...faculty,
                              facultyCode: e.target.value,
                            })
                          }
                        />
                        <i className="clear-input show d-block">
                          <FontAwesomeIcon className="" icon={faEdit} />
                        </i>
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label htmlFor="facultyDescription">
                          Description
                        </label>
                        <textarea
                          className="form-control"
                          value={faculty.facultyDescription}
                          onChange={(e) =>
                            setFaculty({
                              ...faculty,
                              facultyDescription: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <button className="btn btn-primary btn-block btn-md">
                          {faculty._id ? (
                            <>
                              <FontAwesomeIcon className="mr-2" icon={faEdit} />{' '}
                              Update Faculty
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon className="mr-2" icon={faPlus} />{' '}
                              Create Faculty
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                {/* <StudentsListBox students={list} /> */}
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="faculties" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Faculties);
