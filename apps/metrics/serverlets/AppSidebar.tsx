import React from 'react';
import {
  faClose,
  faDashboard,
  faDatabase,
  faGear,
  faHome,
  faSave,
  faSchool,
  faSchoolCircleCheck,
  faUserGear,
  faUsersBetweenLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';

import { menuOpenedAtom, userInfoAtom } from '../libs/store';
import { useAtom } from 'jotai';

function AppSidebar() {
  const [menuOpened, setMenuOpened] = useAtom(menuOpenedAtom);
  const [user] = useAtom(userInfoAtom);

  const toggleMenu = async () => {
    setMenuOpened(!menuOpened);
  };

  return (
    <>
      <Modal
        show={menuOpened}
        className="fade panelbox panelbox-left"
        closeButton={true}
        onHide={() => setMenuOpened(false)}
        onBackdropClick={() => setMenuOpened(false)}
        onClose={() => setMenuOpened(false)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body p-0">
              {/* profile box */}
              <div className="profileBox pt-2 pb-2">
                <div className="image-wrapper">
                  <Image
                    src="/avatars/avatar.png"
                    alt="image"
                    className="imaged  w36"
                    width={36}
                    height={36}
                  />
                </div>
                <div className="in">
                  <strong>{`${user.firstname} ${user.lastname}`}</strong>
                  <div className="text-muted">
                    Metrics AI{' '}
                    <span className="text-green-700">({user.role})</span>{' '}
                  </div>
                </div>
                <Link href="#" legacyBehavior>
                  <a
                    className="btn btn-link btn-icon sidebar-close"
                    onClick={toggleMenu}
                  >
                    <FontAwesomeIcon className="" icon={faClose} size={'2x'} />
                  </a>
                </Link>
              </div>
              {/* * profile box */}
              {/* balance */}
              <div className="sidebar-balance">
                <div className="listview-title">Current Plan</div>
                <div className="in">
                  <h2 className="amount">Basic Institution (free)</h2>
                </div>
              </div>
              {/* * balance */}
              {/* action group */}
              <div className="action-group">
                <Link href={'/dashboard/faculties'} legacyBehavior>
                  <a className="action-button">
                    <div className="in">
                      <div className="iconbox">
                        <FontAwesomeIcon icon={faSchool} />
                      </div>
                      Faculties
                    </div>
                  </a>
                </Link>
                <Link href={'/dashboard/departments'} legacyBehavior>
                  <a className="action-button">
                    <div className="in">
                      <div className="iconbox">
                        <FontAwesomeIcon icon={faSchoolCircleCheck} />
                      </div>
                      Departments
                    </div>
                  </a>
                </Link>
                <Link href={'/dashboard/lecturers'} legacyBehavior>
                  <a className="action-button">
                    <div className="in">
                      <div className="iconbox">
                        <FontAwesomeIcon icon={faUserGear} />
                      </div>
                      Lecturers
                    </div>
                  </a>
                </Link>
                <Link href={'/dashboard/students'} legacyBehavior>
                  <a className="action-button">
                    <div className="in">
                      <div className="iconbox">
                        <FontAwesomeIcon icon={faUsersBetweenLines} />
                      </div>
                      Students
                    </div>
                  </a>
                </Link>
              </div>
              {/* * action group */}

              {/* menu */}
              <div className="listview-title mt-1">Menu</div>
              <ul className="listview flush transparent no-line image-listview">
                <li>
                  <Link href={'/dashboard'} legacyBehavior>
                    <a className="item">
                      <div className="icon-box bg-primary">
                        <FontAwesomeIcon icon={faDashboard} />
                      </div>
                      <div className="in">Dashboard</div>
                    </a>
                  </Link>
                </li>
              </ul>
              {/* * menu */}

              {/* others */}
              <div className="listview-title mt-1">Others</div>
              <ul className="listview flush transparent no-line image-listview">
                <li>
                  <Link href={'/dashboard/reports'} legacyBehavior>
                    <a className="item">
                      <div className="icon-box bg-primary">
                        <FontAwesomeIcon icon={faHome} />
                      </div>
                      <div className="in">Status Report</div>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href={'/dashboard/rankings'} legacyBehavior>
                    <a className="item">
                      <div className="icon-box bg-success">
                        <FontAwesomeIcon icon={faDatabase} />
                      </div>
                      <div className="in">Live Ranking</div>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href={'/dashboard/history'} legacyBehavior>
                    <a className="item">
                      <div className="icon-box bg-primary">
                        <FontAwesomeIcon icon={faSave} />
                      </div>
                      <div className="in">Ranking History</div>
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href={'#'} legacyBehavior>
                    <a className="item">
                      <div className="icon-box bg-primary">
                        <FontAwesomeIcon icon={faGear} />
                      </div>
                      <div className="in">Settings</div>
                    </a>
                  </Link>
                </li>
              </ul>
              {/* * others */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AppSidebar;
