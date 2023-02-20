import React from 'react';
import Link from 'next/link';
import {
  faArrowRight,
  faCamera,
  faClose,
  faDashboard,
  faSchool,
  faSchoolCircleCheck,
  faUsersBetweenLines,
  faUsersGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { noAction } from '../libs/utils';

interface AppHeaderProps {
  onchat?: boolean;
  menuitem?: string;
}

function AppDrawer({ onchat, menuitem = 'dashboard' }: AppHeaderProps) {
  return (
    <>
      {onchat ? (
        <div className="chatFooter">
          <form action="#">
            <Link href="#" className="btn btn-icon btn-text-secondary rounded">
              <FontAwesomeIcon icon={faCamera} size={'2x'} />
            </Link>

            <div className="form-group basic">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                />
                <i className="clear-input">
                  <FontAwesomeIcon icon={faClose} size={'2x'} />
                </i>
              </div>
            </div>
            <button type="button" className="btn btn-icon btn-primary rounded">
              <FontAwesomeIcon icon={faArrowRight} size={'2x'} />
            </button>
          </form>
        </div>
      ) : (
        <div className="appBottomMenu">
          <Link href="/dashboard" className="item">
            {menuitem == 'dashboard' ? (
              <div className="col">
                <div className="action-button large text-white">
                  <FontAwesomeIcon icon={faDashboard} size={'3x'} />
                </div>
              </div>
            ) : (
              <div className="col">
                <FontAwesomeIcon icon={faDashboard} size={'3x'} />
                <strong>Dashboard</strong>
              </div>
            )}
          </Link>
          <Link href="/dashboard/faculties" className="item">
            {menuitem == 'faculties' ? (
              <div className="col">
                <div className="action-button large text-white">
                  <FontAwesomeIcon icon={faSchool} size={'3x'} />
                </div>
              </div>
            ) : (
              <div className="col">
                <FontAwesomeIcon icon={faSchool} size={'3x'} />
                <strong>Faculties</strong>
              </div>
            )}
          </Link>

          <Link href="/dashboard/departments" className="item">
            {menuitem == 'departments' ? (
              <div className="col">
                <div className="action-button large text-white">
                  <FontAwesomeIcon icon={faSchoolCircleCheck} size={'3x'} />
                </div>
              </div>
            ) : (
              <div className="col">
                <FontAwesomeIcon icon={faSchoolCircleCheck} size={'3x'} />
                <strong>Departments</strong>
              </div>
            )}
          </Link>

          <Link href="/dashboard/lecturers" className="item">
            {menuitem == 'lecturers' ? (
              <div className="col">
                <div className="action-button large text-white">
                  <FontAwesomeIcon icon={faUsersGear} size={'3x'} />
                </div>
              </div>
            ) : (
              <div className="col">
                <FontAwesomeIcon icon={faUsersGear} size={'3x'} />
                <strong>Lecturers</strong>
              </div>
            )}
          </Link>

          <Link href="#" onClick={noAction} className="item">
            {menuitem == 'students' ? (
              <div className="col">
                <div className="action-button large text-white">
                  <FontAwesomeIcon icon={faUsersBetweenLines} size={'3x'} />
                </div>
              </div>
            ) : (
              <div className="col">
                <FontAwesomeIcon icon={faUsersBetweenLines} size={'3x'} />
                <strong>Students</strong>
              </div>
            )}
          </Link>
        </div>
      )}
    </>
  );
}

export default AppDrawer;
