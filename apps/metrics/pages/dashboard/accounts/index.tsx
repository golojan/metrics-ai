import { NextPage } from 'next';
import React, { useEffect, useRef } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { compose } from 'redux';
import {
  faFileExcel,
  faFileUpload,
  faHelmetUn,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '../../../libs/hocs';
import AppDrawer from '../../../serverlets/AppDrawer';
import {
  noAction,
  loadFaculties,
  loadFacultyDepartments,
  dumpExcelMRCs,
  generateID,
  loadMRCLecturers,
} from '../../../libs/utils';
import * as XLSX from 'xlsx';
import Wait from '../../../components/Wait';
import {
  AccountTypes,
  DepartmentsInfo,
  FacultiesInfo,
  Gender,
  MRCInfo,
} from '../../../libs/interfaces';
import Select from 'react-select';
import useSWR from 'swr';
import { authSchoolId } from '../../../libs/hocs';
import AuthMRCTable from '../../../components/DataTables/AuthMRCTable';
import PreMRCTable from '../../../components/DataTables/PreMRCTable';

interface ISelectOption {
  value?: string;
  label?: string;
}

interface IEXCELRow {
  [key: string]: string;
}

interface IEXCELRowLecturer {
  MRC_ID?: string;
  REG_ID?: string;
  LAST_NAME?: string;
  FIRST_NAME?: string;
  OTHER_NAMES?: string;
  GENDER?: Gender;
  DATE_EMPLOYED?: string;
  RANK?: string;
  CERTIFICATE?: string;
  COUNTRY?: string;
}

const Accounts: NextPage = () => {
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const schoolId = authSchoolId();
  const fileUploadRef = React.useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = React.useState<boolean>(false);
  const [busy, setBusy] = React.useState<boolean>(false);
  const [xbusy, setXBusy] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState<IEXCELRowLecturer[]>([]);
  const [accountsCount, setAccountsCount] = React.useState<number>(0);
  const [progress, setProgress] = React.useState<number>(0);

  const uploadPadRef = useRef<HTMLDivElement>(null);

  const [facultyId, setFacultyId] = React.useState<string>('');
  const [departmentId, setDepartmentId] = React.useState<string>('');

  const [accountType, setAccountType] = React.useState<AccountTypes>(
    AccountTypes.LECTURER
  );

  const [faculties, setFaculties] = React.useState<FacultiesInfo[]>([]);
  const [facultyOptions, setFacultyOptions] = React.useState<
    {
      value?: string;
      label?: string;
    }[]
  >([]);
  const [departments, setDepartments] = React.useState<DepartmentsInfo[]>([]);
  const [departmentOptions, setDepartmentOptions] = React.useState<
    {
      value?: string;
      label?: string;
    }[]
  >([]);

  const [MRCData, setMRCData] = React.useState<MRCInfo[]>([]);
  const [preMRCData, setPreMRCData] = React.useState<MRCInfo[]>([]);

  useEffect(() => {
    const loadAllMRCs = async () => {
      setBusy(true);
      const MRCs = await loadMRCLecturers(schoolId);
      setMRCData(MRCs);
      setBusy(false);
    };
    loadAllMRCs();
    const loadAllFaculties = async () => {
      const faculties = await loadFaculties(schoolId);
      setFaculties(faculties);
      const facultyOptions = faculties.map((faculty) => {
        return {
          value: faculty._id,
          label: faculty.facultyName,
        };
      });
      setFacultyOptions(facultyOptions);
    };
    loadAllFaculties();
    if (facultyId) {
      const loadAllDepartments = async () => {
        const departments = await loadFacultyDepartments(schoolId, facultyId);
        setDepartments(departments);
        const departmentOptions = departments.map((department) => {
          return {
            value: department._id,
            label: department.departmentName,
          };
        });
        setDepartmentOptions(departmentOptions);
      };
      loadAllDepartments();
    }
  }, [schoolId, facultyId]);

  const triggerFileUpload = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const processUploadedExcelFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (
      fileUploadRef.current &&
      fileUploadRef.current.files &&
      fileUploadRef.current.files.length > 0
    ) {
      setBusy(true);
      const file = fileUploadRef.current.files[0];
      const reader = new FileReader();
      reader.onloadstart = (event) => {
        setProgress(0);
      };
      // reader.onprogress = (event) => {
      //   if (event.lengthComputable) {
      //     const progress = (event.loaded / event.total) * 100;
      //     setTimeout(() => {
      //       // Update the progress bar with the current progress value
      //       setProgress(Number(progress));
      //     }, 5000);
      //     if (uploadPadRef.current) {
      //       uploadPadRef.current.classList.add("border-2");
      //       uploadPadRef.current.classList.add("border-green-600");
      //     }
      //   }
      // };

      reader.onload = (event) => {
        if (event.target) {
          const data: any = event.target.result;
          const workbook = XLSX.readFile(data);
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(sheet);
          if (rows.length > 0) {
            setUploaded(true);
            setAccountsCount(rows.length);
            setRows(rows);
          }
        }
      };

      reader.readAsArrayBuffer(file);
      setBusy(false);
    }
  };

  const handleFacultySelectChange = async (selectedOption: ISelectOption) => {
    setFacultyId(selectedOption.value);
  };

  const handleDepartmentSelectChange = async (
    selectedOption: ISelectOption
  ) => {
    setDepartmentId(selectedOption.value);
  };

  const handleAccountTypeChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountType(event.target.value.toString() as AccountTypes);
  };

  const processExcelJsonToDatabase = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (rows.length > 0) {
      setBusy(true);
      const accounts = rows.map((row: IEXCELRowLecturer): MRCInfo => {
        return {
          mrcId: generateID(
            `${row.REG_ID}${row.FIRST_NAME}${row.LAST_NAME}${row.OTHER_NAMES}${row.GENDER}${row.COUNTRY}`
          ),
          regId: row.REG_ID,
          schoolId: schoolId,
          facultyId: facultyId,
          departmentId: departmentId,
          firstname: row.FIRST_NAME,
          lastname: row.LAST_NAME,
          middlename: row.OTHER_NAMES,
          gender: row.GENDER.toUpperCase(),
          rank: row.RANK,
          certificate: row.CERTIFICATE,
          country: row.COUNTRY,
        };
      });
      const response = await dumpExcelMRCs(schoolId, accounts);
      alert(JSON.stringify(response));
      if (response) {
        setUploaded(false);
        setRows([]);
        setAccountsCount(0);
        if (uploadPadRef.current) {
          uploadPadRef.current.classList.remove('border-2');
          uploadPadRef.current.classList.remove('border-green-600');
        }
      }
      setBusy(false);
    }
  };

  return (
    <>
      <AdminLayout>
        <AppHeader />
        <div id="appCapsule" className="mb-5 relative">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Accounts and Activations</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faHelmetUn} /> Accounts
                  </h1>
                </div>
                <div className="right flex">
                  <Link href="#" className="button" onClick={noAction}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row mt-1">
              <div className="col-12 col-xxl-2 col-xl-2 col-lg-3 col-md-12 my-1">
                <div className="stat-box" ref={uploadPadRef}>
                  <div className="title text-center">
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      fontSize={'30px'}
                      className="my-2"
                    />
                    <h3>
                      UPLOAD EXCEL
                      <hr className="my-1" />
                    </h3>

                    {xbusy ? (
                      <div className="mx-auto mt-[25%] text-gray-300">
                        <Wait />
                      </div>
                    ) : (
                      <>
                        <Link href={'#'} onClick={triggerFileUpload}>
                          <div className="w-[100px] h-[100px] bg-gray-100 hover:bg-emerald-300 rounded-[50%] mx-auto relative text-center">
                            <FontAwesomeIcon
                              icon={faFileUpload}
                              fontSize={'50px'}
                              className="mx-auto mt-[25%] text-gray-300"
                            />
                          </div>
                        </Link>
                      </>
                    )}

                    <input
                      ref={fileUploadRef}
                      type="file"
                      className="m-0"
                      name="excelFile"
                      id="excelFile"
                      hidden={true}
                      onChange={processUploadedExcelFile}
                    />
                    <div className="my-2">
                      <p>Download sample Excel file</p>
                      <Link href={'#'}>Students</Link> |{' '}
                      <Link href={'#'}>Lecturers</Link>
                    </div>
                  </div>
                </div>
              </div>
              {uploaded ? (
                <div className="col-12 col-xxl-3 col-xl-3 col-lg-3 col-md-12 my-1">
                  <div className="stat-box">
                    <form onSubmit={processExcelJsonToDatabase}>
                      <div className="row justify-content-center">
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-12">
                              <span className="text-gray-500 font-light">
                                <strong className="text-green-500">
                                  {accountsCount}
                                </strong>{' '}
                                records has been found on the uploaded excel
                                file.
                              </span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <hr className="my-1 border-green-500 border-solid border-[3px]" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12">
                              <div className="w-full my-1">Select Faculty</div>
                              <div className=" mb-0 d-flex align-items-end">
                                <Select
                                  name="faculty"
                                  placeholder="Select your Faculty"
                                  className="w-full rounded-5 clear-both"
                                  required={true}
                                  options={facultyOptions}
                                  onChange={(e) => handleFacultySelectChange(e)}
                                />
                              </div>
                            </div>
                          </div>
                          {facultyId && departmentOptions ? (
                            <>
                              <div className="row">
                                <div className="col-12">
                                  <div className="w-full my-1">
                                    Enter your Department
                                  </div>
                                  <div className="mb-0 d-flex align-items-end">
                                    <Select
                                      name="department"
                                      placeholder="Select Department"
                                      className="w-full rounded-5 clear-both"
                                      required={true}
                                      options={departmentOptions}
                                      onChange={(e) =>
                                        handleDepartmentSelectChange(e)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          <div className="row mt-1">
                            <div className="col-12">
                              <hr className="my-1 border-green-500 border-solid border-[3px]" />

                              <div className="w-full">
                                {/* Lecturers or students radio selec options */}
                                <div className="row">
                                  <div className="col-12">
                                    <div className="w-full my-1">
                                      Lecturers
                                      <span className="float-right">
                                        <input
                                          type="radio"
                                          name="accountType"
                                          id="LECTURER"
                                          value={AccountTypes.LECTURER}
                                          checked={
                                            accountType ===
                                            AccountTypes.LECTURER
                                          }
                                          onChange={handleAccountTypeChange}
                                        />
                                      </span>
                                    </div>
                                    <div className="w-full my-1">
                                      Students
                                      <span className="float-right">
                                        <input
                                          type="radio"
                                          disabled={true}
                                          name="accountType"
                                          id="STUDENT"
                                          value={AccountTypes.STUDENT}
                                          checked={
                                            accountType === AccountTypes.STUDENT
                                          }
                                          onChange={handleAccountTypeChange}
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <hr className="my-1 border-green-500 border-solid border-[3px]" />
                            </div>
                          </div>
                          <div className="d-grid">
                            <button className="btn btn-primary btn-sm w-100 text-decoration-none fw-bold text-uppercase mt-1">
                              UPLOAD
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* {JSON.stringify(rows)} */}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div
                className={
                  uploaded
                    ? `col-12 col-xxl-7 col-xl-7 col-lg-6 col-md-12 my-1`
                    : `col-12 col-xxl-10 col-xl-10 col-lg-6 col-md-12 my-1`
                }
              >
                {uploaded ? (
                  <PreMRCTable
                    title="Metrics Excel Data"
                    data={MRCData}
                    loading={busy}
                  />
                ) : (
                  <AuthMRCTable
                    title="Metrics Registration Data"
                    data={MRCData}
                    loading={busy}
                  />
                )}
              </div>
            </div>
          </div>
          <Copyright />
        </div>
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Accounts);
