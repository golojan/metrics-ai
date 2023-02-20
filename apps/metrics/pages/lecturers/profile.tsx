import { withAuth } from '../../libs/hocs';
import { compose } from 'redux';
import LecturerLayout from '../../components/LecturerLayout';
import AppProfileHeader from '../../serverlets/AppProfileHeader';
import AppProfileDrawer from '../../serverlets/AppProfileDrawer';
import AppDashBoardTopUserMenuScores from '../../serverlets/AppDashBoardTopUserMenuScores';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { pageAtom, schoolsAtom, userInfoAtom } from '../../libs/store';
import { AuthUserInfo, GSRanking, Gender } from '../../libs/interfaces';
import { RefObject, useEffect, useRef, useState } from 'react';
import validator from 'validator';
import { hasSpacialChars, noAction } from '../../libs/utils';
import { authToken } from '../../libs/hocs';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export function Profile() {
  const [busy, setBusy] = useState<boolean>(false);
  const [profile, setProfile] = useAtom(userInfoAtom);
  const token = authToken();
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const [scrapped, setScrapped] = useState<boolean>(false);
  const [gsScrap, setGsScrap] = useState<GSRanking>({});
  const [_, setSchools] = useAtom(schoolsAtom);
  const [bioCount, setBioCount] = useState<number>(0);
  const [unState, setUnState] = useState(false);
  const [unError, setUnError] = useState<string | any>(null);

  const usernameRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const buttonRef: RefObject<HTMLButtonElement> =
    useRef<HTMLButtonElement>(null);
  const aboutMeRef: RefObject<HTMLTextAreaElement> =
    useRef<HTMLTextAreaElement>(null);

  const minUsernameLength: number =
    Number(process.env.NEXT_PUBLIC_MIN_USERNAME_LENGTH) || 5;
  const aboutMeLength = Number(process.env.NEXT_PUBLIC_ABOUT_ME_LENGTH) || 200;

  useEffect(() => {
    if (aboutMeRef) {
      const height = aboutMeRef.current.scrollHeight;
      aboutMeRef.current.style.height = `${height}px`;
    }
  }, [token, aboutMeRef]);

  const busyURef = () => {
    setUnError('Checking...');
    if (usernameRef.current) {
      usernameRef.current.className =
        'form-control bg-blue-100 focus:bg-blue-100';
      usernameRef.current.disabled = true;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };
  const wrongURef = () => {
    setUnError('Username is invalid.');
    if (usernameRef.current) {
      usernameRef.current.className = 'form-control border-red-500  bg-red-200';
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
        'form-control border-green-300  bg-green-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = false;
    }
  };

  const existURef = () => {
    setUnError('Username is already in use.');
    if (usernameRef.current) {
      usernameRef.current.className = 'form-control border-red-300  bg-red-100';
      usernameRef.current.disabled = false;
    }
    if (buttonRef.current) {
      buttonRef.current.disabled = true;
    }
  };

  // check if username is available
  const checkUsername = async () => {
    setUnState(true);
    let newUsername = validator.trim(usernameRef.current?.value as string);
    newUsername = validator.escape(newUsername);
    if (
      validator.isEmpty(newUsername) ||
      newUsername.length < minUsernameLength ||
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

  const handleUsernameUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${apiUri}accounts/${token}/update-profile-username`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: profile.username }),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`Username @${profile.username} updated successfully.`, {
        toastId: 'username-update-success',
      });
    } else {
      toast.error(`Failed to update username @${profile.username}.`, {
        toastId: 'username-update-success',
      });
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${apiUri}accounts/${token}/update-profile-basics`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      }
    );
    const { status } = await response.json();
    if (status) {
      toast.success(`Profile Updated.`, {
        toastId: 'profile-update-success',
      });
    } else {
      toast.error(`Failed to update Profile.`, {
        toastId: 'profile-update-success',
      });
    }
  };

  const aboutMeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (aboutMeRef.current) {
      setBioCount(e.target.value.length);
      if (e.target.value.length <= aboutMeLength) {
        setProfile({ ...profile, aboutMe: e.target.value });
      }
      const height = aboutMeRef.current.scrollHeight;
      aboutMeRef.current.style.height = `${height}px`;
    }
    return;
  };

  const saveGoogleScholarId = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (scrapped) {
      setBusy(true);
      const response = await fetch(
        `${apiUri}accounts/${token}/update-profile-academia-googlescholar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            googleScholarId: profile.googleScholarId,
            scrap: gsScrap,
          }),
        }
      );
      const { status } = await response.json();
      if (status) {
        toast.success(`Google Scholar ID Updated.`, {
          toastId: 'googleScholarId-update-success',
        });
        setScrapped(false);
      } else {
        toast.error(`Failed to update Google Scholar ID.`, {
          toastId: 'googleScholarId-update-success',
        });
      }
      setBusy(false);
    } else {
      setBusy(true);
      const response = await fetch(
        `${apiUri}scrapper/${profile.googleScholarId}/google-scholar`
      );
      const { status, ranking } = await response.json();
      if (status) {
        toast.info(
          'Google Scholar data retrieved. Please save the data to update your profile.',
          {
            toastId: 'scrapped-update-success',
          }
        );
        setScrapped(true);
        setGsScrap(ranking);
      } else {
        toast.error(`Failed to retrieve Google Scholar data.`, {
          toastId: 'scrapped-update-success',
        });
      }
      setBusy(false);
    }
  };

  return (
    <>
      <LecturerLayout>
        <AppProfileHeader />
        <div id="appCapsule" className="my-0">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance">
                <div className="left">
                  <span className="title">Edit Profile</span>
                  <h1 className="total">
                    <FontAwesomeIcon icon={faEdit} />{' '}
                    {`${profile.lastname}, ${profile.firstname} ${profile.middlename}`}
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

          <div className="section mt-1">
            <div className="row">
              <div className="col-12 col-lg-3 col-md-3 col-xl-3 text-center mb-20">
                <div className="stat-box text-center">
                  <Image
                    src={profile.picture}
                    width={100}
                    height={100}
                    className="rounded-4 shadow-lg mx-auto d-block w-full p-4"
                    alt={`${profile.firstname}`}
                  ></Image>
                  <hr className="my-2" />
                  <h5 className="lead fw-bold text-body mb-0">Profile Photo</h5>
                  <p className="mb-0">
                    Profile photo will automatically be pulled from your Google
                    Scholar Account.
                  </p>
                </div>

                <div className="mb-2"></div>
                <div className="stat-box ">
                  <div className="mb-1">
                    <h5 className="lead fw-bold text-body ">Change Username</h5>
                  </div>
                  <form onSubmit={handleUsernameUpdate}>
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <label htmlFor="username" className="text-md ml-1">
                          Enter Unique Username
                        </label>
                        <div className="form-floating d-flex align-items-end mb-1">
                          <input
                            type="text"
                            ref={usernameRef}
                            required={true}
                            className="form-control bg-blue-100 focus:bg-red-100"
                            id="username"
                            placeholder="Username"
                            autoComplete="off"
                            pattern="[0-9a-zA-Z_]*"
                            value={profile.username}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                username: e.target.value,
                              })
                            }
                            onBlur={checkUsername}
                          />
                          <label htmlFor="username">UNIQUE USERNAME</label>
                        </div>
                        {unError ? (
                          <p className="text-sm text-red-500 my-2">{unError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="d-grid">
                      <button
                        disabled={true}
                        name="username"
                        className="btn btn-primary rounded-5 w-100 text-decoration-none py-3 fw-bold text-uppercase m-0"
                        ref={buttonRef}
                      >
                        UPDATE USERNAME
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12 col-lg-9 col-md-9 col-xl-9 mb-10">
                <div className="mb-1"></div>
                <div className="bg-white px-4 py-4 feed-item rounded-4 shadow-sm faq-page">
                  <div className="mb-3">
                    <h5 className="lead fw-bold text-body mb-0">
                      Edit Profile
                    </h5>
                  </div>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="row justify-content-center">
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-12 col-lg-4 col-md-4 col-xl-4">
                            <div className="form-floating mb-3 d-flex align-items-end">
                              <input
                                type="text"
                                required={true}
                                className="form-control form-control-lg"
                                placeholder="Firstname"
                                id="firstname"
                                value={profile.firstname}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    firstname: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="firstname">FIRST NAME</label>
                            </div>
                          </div>
                          <div className="col-12 col-lg-4 col-md-4 col-xl-4">
                            <div className="form-floating mb-3 d-flex align-items-end">
                              <input
                                type="text"
                                required={true}
                                className="form-control form-control-lg"
                                id="middlename"
                                value={profile.middlename}
                                placeholder="Middlename"
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    middlename: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="middlename">MIDDLE NAME</label>
                            </div>
                          </div>
                          <div className="col-12 col-lg-4 col-md-4 col-xl-4">
                            <div className="form-floating mb-3 d-flex align-items-end">
                              <input
                                type="text"
                                required={true}
                                className="form-control form-control-lg"
                                id="lastname"
                                value={profile.lastname}
                                placeholder="Lastname"
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    lastname: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="lastname">LAST NAME</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                            <div className="form-floating mb-3 d-flex align-items-end">
                              <input
                                type="text"
                                required={true}
                                className="form-control form-control-lg bg-green-100"
                                id="emailaddress"
                                readOnly={true}
                                value={profile.email}
                                placeholder="Email Address"
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    email: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="emailaddress">
                                Email Address
                              </label>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                            <div className="form-floating mb-3 d-flex align-items-end">
                              <input
                                type="tel"
                                required={true}
                                maxLength={11}
                                className="form-control form-control-lg"
                                id="mobile"
                                value={profile.mobile}
                                placeholder="Lastname"
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    mobile: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="mobile">Telephone / Mobile</label>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                            <label className="mb-4 text-muted ">GENDER</label>
                            <div className="d-flex align-items-center mb-3 px-0">
                              <div className="form-check mx-3 w-full">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  required={true}
                                  name="gender"
                                  id="male"
                                  value={Gender.MALE}
                                  checked={
                                    profile.gender === Gender.MALE
                                      ? true
                                      : false
                                  }
                                  onChange={(e) =>
                                    setProfile({
                                      ...profile,
                                      gender: e.target.value,
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="male"
                                >
                                  Male
                                </label>
                              </div>
                              <div className="form-check mx-3 w-full">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  required={true}
                                  name="gender"
                                  id="female"
                                  value={Gender.FEMALE}
                                  checked={
                                    profile.gender === Gender.FEMALE
                                      ? true
                                      : false
                                  }
                                  onChange={(e) =>
                                    setProfile({
                                      ...profile,
                                      gender: e.target.value,
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="female"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                            <label className="mb-2 text-muted ">
                              DATE OF BIRTH
                            </label>
                            <div className="form-floating mb-3 d-flex align-items-center">
                              <input
                                type="date"
                                className="form-control form-control-lg"
                                id="birthday"
                                required={true}
                                placeholder="DATE OF BIRTH"
                                pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                                maxLength={10}
                                value={profile.birthday}
                                defaultValue={profile.birthday}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    birthday: e.target.value,
                                  })
                                }
                              />
                              <label htmlFor="birthday">DATE OF BIRTH</label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-12">
                            <label htmlFor="aboutMe" className="text-lg">
                              Write a short public Bio for your profile.
                            </label>
                            <div className="form-floating mb-3 d-flex align-items-end mt-2">
                              <textarea
                                ref={aboutMeRef}
                                required={true}
                                maxLength={aboutMeLength as number}
                                className="form-control form-control-lg text-xl"
                                placeholder="About me"
                                rows={2}
                                id="aboutMe"
                                value={profile.aboutMe}
                                onChange={(e) => aboutMeChange(e)}
                              >
                                {profile.aboutMe}
                              </textarea>
                              <label htmlFor="aboutMe">
                                About Me -{' '}
                                <strong className="text-danger">
                                  {bioCount}
                                </strong>{' '}
                                of {aboutMeLength as number} chars.
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="d-grid">
                          <button className="btn btn-primary rounded-5 w-100 text-decoration-none py-3 fw-bold text-uppercase m-0">
                            SAVE PROFILE
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="mb-1"></div>
                <div className="bg-white px-4 py-4 feed-item  shadow-sm mb-3 faq-page">
                  <div className="mb-3">
                    <h5 className="lead fw-bold text-body mb-0">
                      Google Scholar Profile
                    </h5>
                  </div>
                  <form onSubmit={saveGoogleScholarId}>
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                        <div className="form-floating mb-3 d-flex align-items-end">
                          <input
                            type="text"
                            required={true}
                            className="form-control form-control-lg"
                            id="googleScholarId"
                            value={profile.googleScholarId}
                            placeholder="XXXXXXXXXXXX"
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                googleScholarId: e.target.value,
                              })
                            }
                          />
                          <label htmlFor="googleScholarId">
                            Google Citation ID
                          </label>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6 col-md-6 col-xl-6">
                        <div className="d-grid">
                          {scrapped ? (
                            <button className="btn btn-success w-100 text-decoration-none py-3 fw-bold text-uppercase m-0 ">
                              {busy ? <>Saving Scholar Data...</> : <>Save</>}
                            </button>
                          ) : (
                            <button className="btn btn-primary w-100 text-decoration-non py-4 fw-bold text-uppercase m-0">
                              {busy ? (
                                <>Checking Google Scholar data...</>
                              ) : (
                                <>Check Google Scholar</>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppProfileDrawer onchat={false} menuitem="profile" />
      </LecturerLayout>
    </>
  );
}

export default compose(withAuth)(Profile);
