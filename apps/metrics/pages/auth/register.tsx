import React, { RefObject, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { AccountTypes, Logon, Token } from '../../libs/interfaces';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import SiteBusy from '../../components/SiteBusy';
import { domainAtom, schoolIdAtom, busyAtom } from '../../libs/store';
import { appLogin, cloudLogin, hasAuth } from '../../libs/hocs';
import Link from 'next/link';
import validator from 'validator';

import { useRouter } from 'next/router';

import { getDomain, hasSpacialChars } from '../../libs/utils';
import { useAtom } from 'jotai';
import { toast } from 'react-toastify';

const Home: NextPage = () => {
  //||
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const [busy, setBusy] = useAtom(busyAtom);
  const [domain, setDomain] = useAtom(domainAtom);
  const [schoolId, setSchoolId] = useState(schoolIdAtom);
  const isloggedin: boolean = hasAuth();
  const [mrcId, setMrcId] = React.useState('');
  const [, setMRCState] = useState(false);
  const [, setUnState] = useState(false);
  const [, setEmState] = useState(false);

  const [mrError, setMrError] = useState<string>('');
  const [unError, setUnError] = useState<string>('');
  const [emError, setEmError] = useState<string>('');
  const [pwError, setPwError] = useState<string>('');
  //
  const mrcidRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const usernameRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buttonRef: RefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);
  const emailRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const minUsernameLength = process.env.NEXT_PUBLIC_MIN_USERNAME_LENGTH || 5;

  const passwordRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const confirmpasswordRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const [register, setRegister] = useState({
    status: false,
    domain: '',
    mrcId: '',
    regId: '',
    username: '',
    accountType: AccountTypes.GUEST as string,
    firstname: '',
    lastname: '',
    middlename: '',
    gender: '',
    birthday: '',
    email: '',
    password: '',
    confirmpassword: '',
    schoolId: '',
    facultyId: '',
    departmentId: '',
    country: '',
  });

  const [school, setSchool] = useState({
    name: '',
    shortname: '',
    domain: '',
    logo: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const _domain: string = getDomain(window.location.host);
    if (_domain) {
      setBusy(true);
      setDomain(_domain);
      setRegister({ ...register, domain: _domain });
      const domainInfo = async () => {
        const result = await fetch(`/api/schools/domains/${_domain}/info`);
        const { status, data } = await result.json();
        if (status) {
          setSchool(data);
          setDomain(domain);
          setSchoolId(data.schoolId);
        }
      };
      domainInfo();
      setBusy(false);
    }
  }, [busy, domain]);

  const busyMRCRef = () => {
    setMrError('Checking...');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control form-control-lg text-blue-100 focus:text-blue-100';
      mrcidRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const wrongMRCRef = () => {
    setMrError('Code is invalid.');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control form-control-lg border-red-500 bg-red-200';
      mrcidRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const rightMRCRef = () => {
    setMrError('');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control form-control-lg border-green-300 bg-green-100';
      mrcidRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existMRCRef = () => {
    setMrError('Code is already activated.');
    if (mrcidRef.current) {
      mrcidRef.current.className =
        'form-control form-control-lg border-red-300  bg-red-100';
      mrcidRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const busyURef = () => {
    setUnError('Checking...');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control form-control-lg text-blue-100 focus:text-blue-100';
      usernameRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const wrongURef = () => {
    setUnError('Username is invalid.');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control form-control-lg border-red-500  bg-red-200';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const rightURef = () => {
    setUnError('');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control form-control-lg border-green-300  bg-green-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existURef = () => {
    setUnError('Username is already in use.');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control form-control-lg border-red-300  bg-red-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const busyERef = () => {
    setEmError('Checking email...');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control form-control-lg text-blue-100 focus:text-blue-100';
      emailRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const wrongERef = () => {
    setEmError('Email is invalid.');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control form-control-lg border-red-500  bg-red-200';
      emailRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const rightERef = () => {
    setEmError('');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control form-control-lg border-green-300  bg-green-100';
      emailRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existERef = () => {
    setEmError('Email is already in use.');
    if (emailRef.current) {
      emailRef.current.className =
        'form-control form-control-lg border-red-300  bg-red-100';
      emailRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${apiUri}accounts/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(register),
    });
    const { status, token } = await response.json();
    if (status) {
      toast.success(`Account created successfully, logging you in...`, {
        toastId: 'register-account-success',
      });
      cloudLogin(token);
    } else {
      toast.error(
        `Account registration failed. Server may be having issues, try again after some time.`,
        {
          toastId: 'register-account-success',
        }
      );
    }
  };

  const checkMRCID = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setMRCState(true);
    let newMRCID = validator.trim(mrcidRef.current?.value as string);
    newMRCID = validator.escape(newMRCID);
    if (validator.isEmpty(newMRCID)) {
      wrongMRCRef();
      return;
    }
    busyMRCRef();
    const response = await fetch(`${apiUri}accounts/checkmrcid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mrcId: newMRCID }),
    });
    const { status, data } = await response.json();
    if (status) {
      if (data.mrcUsed) {
        setRegister({
          ...register,
          status: false,
        });
        existMRCRef();
      } else {
        rightMRCRef();
        setRegister({
          ...register,
          status: true,
          mrcId: data.mrcId,
          regId: data.regId,
          schoolId: data.schoolId,
          facultyId: data.facultyId,
          departmentId: data.departmentId,
          accountType: data.accountType,
          lastname: data.lastname,
          firstname: data.firstname,
          middlename: data.middlename,
          gender: data.gender,
          country: data.country,
        });
      }
    } else {
      wrongMRCRef();
    }
    setMRCState(false);
  };

  // check if username is available
  const checkUsername = async () => {
    setUnState(true);
    let newUsername: string = validator.trim(
      usernameRef.current?.value as string
    );
    newUsername = validator.escape(newUsername);
    if (
      validator.isEmpty(newUsername) ||
      Number(newUsername.length) < Number(minUsernameLength) ||
      validator.isEmail(newUsername) ||
      validator.contains(newUsername, '@') ||
      hasSpacialChars(newUsername)
    ) {
      wrongURef();
      return;
    }
    busyURef();
    const response = await fetch(`${apiUri}accounts/checkusername`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newUsername }),
    });
    const { status } = await response.json();
    if (!status) {
      rightURef();
    } else {
      existURef();
    }
    setUnState(false);
  };

  // check if email is available
  const checkEmail = async () => {
    setEmState(true);
    let newEmail = validator.trim(emailRef.current?.value as string);
    newEmail = validator.escape(newEmail);
    if (!validator.isEmail(newEmail) || validator.isEmpty(newEmail)) {
      wrongERef();
      return;
    }
    busyERef();
    const response = await fetch(`${apiUri}accounts/checkemail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail }),
    });
    const { status } = await response.json();
    if (!status) {
      rightERef();
    } else {
      existERef();
    }
    setEmState(false);
  };

  const handlePasswordMatchCheck = async () => {
    const password = validator.trim(passwordRef.current?.value as string);
    const confirmpassword = validator.trim(
      confirmpasswordRef.current?.value as string
    );
    if (password != confirmpassword) {
      setPwError('Password mismatch');
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
      }
      return false;
    }
    setPwError('');
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
    return true;
  };

  return (
    <Layout>
      <SiteBusy />
      <div className="p-10">
        <div className="section mt-[30px] text-center">
          <h1 className="mt-0">
            <Image
              className="img-responsive"
              width={150}
              height={150}
              src="/assets/img/esut-logo.png"
              alt="/"
              style={{ margin: '0 auto' }}
            />
            <br />
            <div className="">Lecturer Signup</div>
            <div className="text-md text-gray-600 small">Dashboard</div>
          </h1>
          <h4>{school.name}</h4>
        </div>

        <div className="section mb-5 p-2">
          <div className="text-red-600 text-center">{errorMsg}</div>
          <form autoComplete="off" onSubmit={handleRegister} method="POST">
            <Card>
              <Card.Body className="pb-1">
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <div className="float-right">
                      <strong className="text-md text-red-500">
                        {mrError}
                      </strong>
                    </div>
                    <label className="label" htmlFor="mrcid">
                      Enter School Code
                    </label>
                    <input
                      type="text"
                      ref={mrcidRef}
                      readOnly={register.mrcId ? true : false}
                      autoComplete="off"
                      required={true}
                      className="form-control form-control-lg"
                      id="mrcid"
                      name="mrcid"
                      placeholder="School Code"
                      value={mrcId}
                      onChange={(e) => {
                        setMrcId(e.target.value);
                      }}
                    />
                    <i className="clear-input"></i>
                  </div>
                </div>
                {register.status ? (
                  <>
                    <div className="form-group basic">
                      <div className="input-wrapper">
                        <label className=" text-success" htmlFor="mrcid">
                          Account Found
                        </label>
                        <div className="form-control form-control-lg mt-1">
                          <h1>
                            <strong>{register.lastname}</strong>,{' '}
                            {`${register.firstname} ${register.lastname} `}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <div className="float-right">
                              <strong className="text-md text-red-500">
                                {unError}
                              </strong>
                            </div>
                            <label className="" htmlFor="username">
                              Create Username
                            </label>
                            <input
                              type="text"
                              required
                              ref={usernameRef}
                              className="form-control form-control-lg"
                              id="username"
                              name="username"
                              autoComplete="off"
                              placeholder="Username"
                              value={register.username}
                              onChange={(e) =>
                                setRegister({
                                  ...register,
                                  username: e.target.value,
                                })
                              }
                              onBlur={checkUsername}
                            />
                            <i className="clear-input"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <div className="float-right">
                              <strong className="text-md text-red-500">
                                {emError}
                              </strong>
                            </div>
                            <label className="" htmlFor="email">
                              Email Address
                            </label>
                            <input
                              type="email"
                              required
                              ref={emailRef}
                              className="form-control form-control-lg"
                              id="email"
                              name="email"
                              autoComplete="off"
                              placeholder="Your Email Address"
                              value={register.email}
                              onChange={(e) =>
                                setRegister({
                                  ...register,
                                  email: e.target.value as string,
                                })
                              }
                              onBlur={checkEmail}
                            />
                            <i className="clear-input"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <div className="float-right">
                              <strong className="text-md text-red-500">
                                {pwError}
                              </strong>
                            </div>
                            <label className="" htmlFor="password">
                              Create Password
                            </label>
                            <input
                              type="password"
                              required={true}
                              ref={passwordRef}
                              autoComplete="off"
                              className="form-control form-control-lg"
                              id="password"
                              name="password"
                              placeholder="* * * * * * * *"
                              value={register.password}
                              onChange={(e) =>
                                setRegister({
                                  ...register,
                                  password: String(e.target.value),
                                })
                              }
                              onKeyUp={handlePasswordMatchCheck}
                            />
                            <i className="clear-input"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group basic">
                          <div className="input-wrapper">
                            <div className="float-right">
                              <strong className="text-md text-red-500">
                                {pwError}
                              </strong>
                            </div>
                            <label className="" htmlFor="password">
                              Comfirm Password
                            </label>
                            <input
                              type="password"
                              required={true}
                              ref={confirmpasswordRef}
                              autoComplete="off"
                              className="form-control form-control-lg"
                              id="password"
                              name="password"
                              placeholder="* * * * * * * *"
                              value={register.confirmpassword}
                              onChange={(e) =>
                                setRegister({
                                  ...register,
                                  confirmpassword: String(e.target.value),
                                })
                              }
                              onKeyUp={handlePasswordMatchCheck}
                            />
                            <i className="clear-input"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
            <div className="form-links mt-2">
              <div className="text-muted">
                <span className="text-black">
                  Powered by <Link href={'#'}>Golojan.net</Link>
                </span>
              </div>
              <div>
                <Link href="/auth" className="text-muted">
                  Registerd: Login
                </Link>
              </div>
            </div>
            <div className="form-button-group  transparent">
              {!register.status ? (
                <button
                  onClick={checkMRCID}
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Verify School Code
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success btn-block btn-lg"
                  ref={buttonRef}
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
