import { NextPage } from 'next';
import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { compose } from 'redux';

import {
  faDownLong,
  faSave,
  faSchoolCircleCheck,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import AppHeader from '../../../serverlets/AppHeader';
import Copyright from '../../../serverlets/Copyright';
import { withAuth } from '../../../libs/hocs';
import AppDrawer from '../../../serverlets/AppDrawer';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../../libs/store';
import LiveRankingTable from '../../../components/LiveRankingTable';

import { getLiveStats } from '../../../libs/utils';
import Loading from '../../../components/Loading';
import cookie from 'js-cookie';
import { Button, Modal } from 'react-bootstrap';

const Rankings: NextPage = () => {
  const dispatch = useDispatch<Dispatch>();
  const { lecturers } = useSelector((state: RootState) => state.lecturers);
  const { students } = useSelector((state: RootState) => state.students);
  const { school, ranking, busy, user } = useSelector(
    (state: RootState) => state.settings
  );

  const [fileName, setFileName] = useState(Date.now());
  const [toggle, setToggle] = useState(false);

  // const saveRankingHistory = async () => {
  //   dispatch.settings.setBusy(true);
  //   const _domain = cookie.get('domain');
  //   const response: any = await fetch(`/api/schools/${_domain}/save`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: fileName,
  //       lecturers: lecturers,
  //       students: students,
  //       school: {
  //         googlePresence: ranking.googlePresence,
  //         citations: ranking.citations,
  //         hindex: ranking.hindex,
  //         i10hindex: ranking.i10hindex,
  //       },
  //       allschools: allschools,
  //     }),
  //   });
  //   const { status } = await response.json();
  //   setToggle(false);
  //   dispatch.settings.setBusy(false);
  // };

  return (
    <>
      <AdminLayout>
        <AppHeader />
        {/* <div id="appCapsule" className="mb-5">
          <div className="section wallet-card-section pt-1">
            <div className="wallet-card">
              <div className="balance row">
                <div className="left">
                  <span className="title">Global Comparative Ranking</span>
                  <h1 className="total m-0 p-0">
                    <FontAwesomeIcon icon={faSchoolCircleCheck} />{' '}
                    <span
                      className={`${
                        800 <= 266
                          ? ' text-red-600 hover:text-red-200 hover:shadow-red-600 h-[90%]'
                          : ' text-green-600 hover:text-green-200 hover:shadow-green-600 h-[90%]'
                      }`}
                    >
                      800
                    </span>
                  </h1>
                  <span>
                    {getLiveStats(allschools, 900)?.dir === 'up' ? (
                      <>
                        <FontAwesomeIcon
                          className="text-green-600"
                          icon={faUpLong}
                        />{' '}
                        Up by{' '}
                        <span className="text-green-600">
                          {getLiveStats(allschools, 900)?.perc}
                        </span>
                        %
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          className="text-red-600"
                          icon={faDownLong}
                        />{' '}
                        Down by{' '}
                        <span className="text-red-600">
                          {getLiveStats(allschools, 900)?.perc}
                        </span>
                        %
                      </>
                    )}
                  </span>
                </div>

                <div className="right flex">
                  {busy ? (
                    <Loading />
                  ) : (
                    <>
                      <Link href="#" legacyBehavior>
                        <a className="button" onClick={() => setToggle(true)}>
                          <FontAwesomeIcon icon={faSave} />
                        </a>
                      </Link>
                      <Modal show={toggle}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Save Ranking History {busy ? <Loading /> : ''}
                          </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                            <input
                              type="text"
                              className="form-control relative flex-auto min-w-0 block text-md w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              placeholder={`Name this track...`}
                              value={`${fileName}`}
                              onChange={(e: any) => setFileName(e.target.value)}
                            />
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={() => setToggle(false)}
                          >
                            Close
                          </Button>
                          <Button
                            variant="primary"
                            onClick={saveRankingHistory}
                          >
                            Save History
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}
                </div>
              </div>
              <div className="wallet-footer">
                <div className="item">
                  <div>
                    <span className="h1">{ranking.googlePresence}</span>
                    <strong>Googgle Presence</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <span className="h1">{ranking.citations}</span>
                    <strong>Citations</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <span className="h1">{ranking.hindex}</span>
                    <strong>H-Index</strong>
                  </div>
                </div>
                <div className="item">
                  <div>
                    <span className="h1">{ranking.i10hindex}</span>
                    <strong>i10-H-Index</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section pt-1">
            <div className="row ">
              <div className="col-12 col-md-12 col-lg-12 min-h-screen">
                <LiveRankingTable allschools={allschools} />
              </div>
            </div>
          </div>

          <Copyright />
        </div> */}
        <AppDrawer onchat={false} menuitem="dashboard" />
      </AdminLayout>
    </>
  );
};

export default compose(withAuth)(Rankings);
