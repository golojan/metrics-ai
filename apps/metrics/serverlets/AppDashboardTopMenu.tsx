import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Link from 'next/link';
import {
  faAddressBook,
  faAddressCard,
  faArrowsSpin,
  faBookReader,
  faRainbow,
} from '@fortawesome/free-solid-svg-icons';

const AppDashboardTopMenu = () => {
  return (
    <>
      <div className="wallet-footer">
        <div className="item">
          <div>
            <Link href="/dashboard/reports" className="button mb-1">
              <FontAwesomeIcon icon={faBookReader} size={'4x'} />
            </Link>
            <strong>Reports & Metrics</strong>
          </div>
        </div>
        <div className="item">
          <div>
            <Link href="/dashboard" className="button mb-1">
              <FontAwesomeIcon icon={faRainbow} size={'4x'} />
            </Link>
            <strong>AI Metrics</strong>
          </div>
        </div>
        <div className="item">
          <div>
            <Link href="/dashboard/accounts" className="button mb-1">
              <FontAwesomeIcon icon={faAddressCard} size={'4x'} />
            </Link>
            <strong>Accounts & Activations</strong>
          </div>
        </div>
        <div className="item">
          <div>
            <Link href="/dashboard" className="button mb-1">
              <FontAwesomeIcon icon={faAddressBook} size={'4x'} />
            </Link>
            <strong>Verifications</strong>
          </div>
        </div>
        <div className="item">
          <div>
            <Link href="/dashboard/settings" className="button mb-1">
              <FontAwesomeIcon icon={faArrowsSpin} size={'4x'} />
            </Link>
            <strong>API & Settings</strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDashboardTopMenu;
