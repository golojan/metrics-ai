import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import cookie from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { RootState,Dispatch } from '../libs/store';
import { getWindowDimensions } from '../libs/utils';

interface MyProps {
  children: ReactNode;
}

const OwnerLayout = ({ children }: MyProps) => {
  const { school } = useSelector((state: RootState) => state.settings);
  const { name, shortname } = school;
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    const token = cookie.get('token');
    const domain = cookie.get('domain');
    dispatch.settings.setWebWindow(getWindowDimensions());
    const handleResize = () => {
      dispatch.settings.setWebWindow(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch.settings]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>{`${shortname} | ${name}`}</title>
      </Head>
      {children}
    </>
  );
};
export default OwnerLayout;
