import React from 'react';
import {
  faHome,
  faListUl,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppSidebar from './AppSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { authlogout } from '../libs/hocs';
import Loading from '../components/Loading';
import { useAtom } from 'jotai';
import {
  busyAtom,
  menuOpenedAtom,
  schoolAtom,
  userInfoAtom,
  webWindowAtom,
} from '../libs/store';

const AppHeader: React.FunctionComponent = () => {
  const [menuOpened, setMenuOpened] = useAtom(menuOpenedAtom);
  const [school] = useAtom(schoolAtom);
  const [busy] = useAtom(busyAtom);
  const [webWindow] = useAtom(webWindowAtom);
  const { name, shortname } = school;
  const { size } = webWindow;
  const [user] = useAtom(userInfoAtom);

  const totggleMenu = () => {
    alert(menuOpened);
    setMenuOpened(!menuOpened);
  };
  return (
    <>
      <AppSidebar />
      <div className="appHeader bg-primary text-light relative">
        <div className="left">
          <Link href="#" className="headerButton" onClick={() => totggleMenu}>
            <FontAwesomeIcon icon={faListUl} size={'2x'} />
          </Link>
        </div>
        <div className="pageTitle">
          {size == 'sm' || size == 'xs' ? (
            <h2 className="text-white mt-2">{`${shortname}`}</h2>
          ) : (
            <h2 className="text-white mt-2">{`${name} (${shortname})`}</h2>
          )}
        </div>
        <div className="right">
          <Link href={'/dashboard/reports'} className="headerButton">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link href="#" className="headerButton bg-transparent">
            <Image
              width={32}
              height={32}
              src={user.picture}
              className="imaged w32"
              alt="profile"
            />
          </Link>
          {busy ? (
            <Loading />
          ) : (
            <Link
              href="#"
              className="headerButton text-white"
              onClick={() => authlogout()}
            >
              <FontAwesomeIcon icon={faUserLock} />
              <span className="badge badge-black bg-black p-1">{size}</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default AppHeader;
