import React, { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import { Token } from '../../interfaces';

const apiUri = process.env.NEXT_PUBLIC_API_URI;

const getUserName = async (token: string) => {
  const response = await fetch(`${apiUri}accounts/${token}/username`);
  const user = await response.json();
  if (user.status) {
    return user.username;
  } else {
    return {};
  }
};

const getUseInfo = async (token: string) => {
  const response = await fetch(`${apiUri}accounts/${token}/profile`);
  const user = await response.json();
  if (user.status) {
    return user.data;
  } else {
    return {};
  }
};

// Login & Create session for Cloud user a given minutes time
export const cloudLogin = (token: string) => {
  const expire_time: any = process.env.NEXT_PUBLIC_COOKIE_TIME_IN_MINS || 10;
  const inMinutes = new Date(new Date().getTime() + expire_time * 60 * 1000);
  getUseInfo(token as string)
    .then((profile) => {
      cookie.set('token', token as string, { expires: inMinutes });
      cookie.set('username', profile.username as string, {
        expires: inMinutes,
      });
      if (profile.accountType === 'ADMIN') {
        Router.push(`/dashboard`);
      } else if (profile.accountType === 'LECTURER') {
        Router.push(`/lecturers`);
      }
    })
    .catch((err) => {
      authlogout();
    });
};

// Login & Create session for Apps user a given minutes time
export const appLogin = ({ token, schoolId }: Token) => {
  const expire_time: any = process.env.NEXT_PUBLIC_COOKIE_TIME_IN_MINS || 10;
  const inMinutes = new Date(new Date().getTime() + expire_time * 60 * 1000);
  getUseInfo(token as string)
    .then((profile) => {
      cookie.set('token', token as string, { expires: inMinutes });
      cookie.set('username', profile.username as string, {
        expires: inMinutes,
      });
      cookie.set('schoolId', schoolId as string, { expires: inMinutes });
      if (profile.accountType === 'ADMIN') {
        Router.push(`/dashboard`);
      } else if (profile.accountType === 'LECTURER') {
        Router.push(`/lecturers`);
      }
    })
    .catch((err) => {
      authlogout();
    });
};

export const auth = (ctx: any) => {
  const { token } = nextCookie(ctx);
  // If there's no token, it means the user is not logged in.
  if (ctx.req && !token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/auth' });
      ctx.res.end();
    } else {
      Router.push('/auth');
    }
  }
  return token;
};

export const hasAuth = () => {
  const token = cookie.get('token');
  if (token) {
    return true;
  }
  return false;
};

export const authToken = () => {
  const token = cookie.get('token');
  if (token) {
    return token;
  }
  return null;
};

export const authUsername = () => {
  const username = cookie.get('username');
  if (username) {
    return username;
  }
  return null;
};

export const authSchoolId = () => {
  const schoolId = cookie.get('schoolId');
  if (schoolId) {
    return schoolId;
  }
  return null;
};

export const authlogout = (url = '/') => {
  if (authToken()) cookie.remove('token');
  if (authUsername()) cookie.remove('username');
  if (authSchoolId()) cookie.remove('schoolId');
  // to support logging out from all windows
  window.localStorage.setItem('logout', `${Date.now()}`);
  Router.push(`${url}`);
};

export const withAuth = (WrappedComponent: any) => {
  const Wrapper = (props: any) => {
    const schoolId = authSchoolId();
    const token = authToken();

    const syncLogout = (event: any) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        if (schoolId && token) {
          Router.push('/');
        } else if (token) {
          Router.push('/auth');
        } else {
          Router.push('/auth');
        }
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);
      if (!token) {
        authlogout('/auth');
      }
      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, [token]);
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: any) => {
    const { token } = nextCookie(ctx);
    if (!token) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        },
      };
    }
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};
