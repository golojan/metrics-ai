import React from 'react';
import Link from 'next/link';
import {
  faGlobe,
  faPaperclip,
  faSatelliteDish,
  faTableCells,
  faUserLarge,
  faUserLock,
  faUsersGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AppHeaderProps {
  onchat?: boolean;
  menuitem?: string;
}

function AppProfileDrawer({ onchat, menuitem = 'dashboard' }: AppHeaderProps) {
  return (
    <>
      <div className="appBottomMenu">
        <Link href="/lecturers" className="item">
          {menuitem == 'dashboard' ? (
            <div className="col">
              <div className="action-button large text-white">
                <FontAwesomeIcon icon={faTableCells} size={'3x'} />
              </div>
            </div>
          ) : (
            <div className="col">
              <FontAwesomeIcon icon={faTableCells} size={'3x'} />
              <strong>Dashboard</strong>
            </div>
          )}
        </Link>
        <Link href={`/lecturers/profile`} className="item">
          {menuitem == 'profile' ? (
            <div className="col">
              <div className="action-button large text-white">
                <FontAwesomeIcon icon={faUserLarge} size={'3x'} />
              </div>
            </div>
          ) : (
            <div className="col">
              <FontAwesomeIcon icon={faUserLarge} size={'3x'} />
              <strong>Public Profile</strong>
            </div>
          )}
        </Link>

        <Link href="/lecturers/google-scholar" className="item">
          {menuitem == 'google-scholar' ? (
            <div className="col">
              <div className="action-button large text-white">
                <FontAwesomeIcon icon={faGlobe} size={'3x'} />
              </div>
            </div>
          ) : (
            <div className="col">
              <FontAwesomeIcon icon={faUserLock} size={'3x'} />
              <strong>Google Scholar</strong>
            </div>
          )}
        </Link>

        <Link href="/lecturers/rankings" className="item">
          {menuitem == 'rankings' ? (
            <div className="col">
              <div className="action-button large text-white">
                <FontAwesomeIcon icon={faUsersGear} size={'3x'} />
              </div>
            </div>
          ) : (
            <div className="col">
              <FontAwesomeIcon icon={faUsersGear} size={'3x'} />
              <strong>Positions & Rankings</strong>
            </div>
          )}
        </Link>

        <Link href="/lecturers/publications" className="item">
          {menuitem == 'publications' ? (
            <div className="col">
              <div className="action-button large text-white">
                <FontAwesomeIcon icon={faPaperclip} size={'3x'} />
              </div>
            </div>
          ) : (
            <div className="col">
              <FontAwesomeIcon icon={faPaperclip} size={'3x'} />
              <strong>Publications</strong>
            </div>
          )}
        </Link>
      </div>
    </>
  );
}

export default AppProfileDrawer;
