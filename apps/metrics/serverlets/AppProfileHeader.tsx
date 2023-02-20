import React from 'react';
import { faHome, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppSidebar from './AppSidebar';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { userInfoAtom } from '../libs/store';

const AppProfileHeader = () => {
  const [user] = useAtom(userInfoAtom);
  return (
    <>
      <>
        <AppSidebar />
        <div className="appHeader bg-primary text-light">
          <div className="left">
            <a
              href="#"
              className="headerButton"
              data-toggle="modal"
              data-target="#sidebarPanel"
            >
              <FontAwesomeIcon icon={faListUl} size={'2x'} />
            </a>
          </div>
          <div className="pageTitle">
            <h1 className="text-white mt-2">{`${user?.firstname} ${user?.lastname}`}</h1>
          </div>
          <div className="right">
            <a href="#" className="headerButton">
              <FontAwesomeIcon icon={faHome} />
              <span className="badge badge-danger">0</span>
            </a>
            <a href="#" className="headerButton">
              <Image
                width={32}
                height={32}
                src="/avatars/avatar.png"
                className="imaged w32"
                alt=""
              />
              <span className="badge badge-danger">0</span>
            </a>
          </div>
        </div>
      </>
    </>
  );
};

export default AppProfileHeader;
