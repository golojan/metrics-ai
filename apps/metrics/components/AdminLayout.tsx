import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import {
  busyAtom,
  lecturersRankingAtom,
  schoolAtom,
  schoolsAtom,
  statistics_schoolAtom,
  userInfoAtom,
  webWindowAtom,
} from '../libs/store';
import {
  getWindowDimensions,
  getProfileInfo,
  loadSchoolsStats,
  loadLecturersRanking,
} from '../libs/utils';
import { authSchoolId, authToken, authlogout } from '../libs/hocs';
import { SchoolInfo } from '../libs/interfaces';
import { useAtom } from 'jotai';

interface MyProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: MyProps) => {
  const apiUri = process.env.NEXT_PUBLIC_API_URI;
  const [busy] = useAtom(busyAtom);
  const [school, setSchool] = useAtom(schoolAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);
  const token = authToken();
  const { name, shortname } = school;
  const [, setStatistics] = useAtom(statistics_schoolAtom);
  const [, setWebWindow] = useAtom(webWindowAtom);
  const [, setLecturersRanking] = useAtom(lecturersRankingAtom);

  useEffect(() => {
    const schoolid = authSchoolId();
    if (!schoolid || !token) {
      authlogout('/auth/');
    } else {
      const getSchoolInfo = async () => {
        const schoolInfo = await fetch(`${apiUri}schools/${schoolid}/info`);
        const schoolInfoJson = await schoolInfo.json();
        const schoolData = schoolInfoJson.data as SchoolInfo;
        setSchool(schoolData);
      };
      const getProfile = async () => {
        const profile = await getProfileInfo(token);
        setUserInfo(profile);
      };
      const loadSchoolsStatistics = async () => {
        const data = await loadSchoolsStats(schoolid);
        setStatistics(data);
      };
      const getLecturersRanking = async () => {
        const result = await loadLecturersRanking(schoolid);
        setLecturersRanking(result);
      };
      getSchoolInfo();
      getProfile();
      loadSchoolsStatistics();
      getLecturersRanking();
    }
    setWebWindow(getWindowDimensions());
    const handleResize = () => {
      setWebWindow(getWindowDimensions());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [token, busy]);

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
export default AdminLayout;
