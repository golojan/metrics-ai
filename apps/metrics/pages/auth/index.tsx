import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { Logon, Token } from '../../libs/interfaces';
import { NextPage } from 'next';
import Layout from '../../components/Layout';
import SiteBusy from '../../components/SiteBusy';
import { domainAtom, schoolIdAtom, busyAtom } from '../../libs/store';
import { appLogin, hasAuth } from '../../libs/hocs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDomain } from '../../libs/utils';
import { useAtom } from 'jotai';

const Home: NextPage = () => {
  const [busy, setBusy] = useAtom(busyAtom);
  const [domain, setDomain] = useAtom(domainAtom);
  const [schoolId, setSchoolId] = useState(schoolIdAtom);
  const isloggedin: boolean = hasAuth();

  const [school, setSchool] = useState({
    name: '',
    shortname: '',
    domain: '',
    logo: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [logon, setLogon] = useState<Logon>({
    username: '',
    password: '',
  });

  useEffect(() => {
    const _domain: string = getDomain(window.location.host);
    if (_domain) {
      setBusy(true);
      setDomain(_domain);
      setLogon({ ...logon, domain: _domain });
      const domainInfo = async () => {
        const result = await fetch(`/api/schools/domains/${_domain}/info`);
        const { status, data } = await result.json();
        if (status) {
          setSchool(data);
          setDomain(domain);
          setSchoolId(data.schoolId);
        }
      };
      domainInfo();
      setBusy(false);
    }
  }, [busy, domain]);

  const adminLogon = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrorMsg('');
    const response = await fetch(`/api/accounts/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logon),
    });
    const { status, token, schoolId } = await response.json();
    if (status) {
      appLogin({ token, schoolId } as Token);
    } else {
      setErrorMsg('Invalid Username and Password.');
    }
    setBusy(false);
  };
  return (
    <Layout>
      <SiteBusy />
      <div className="p-10">
        <div className="section mt-[50px] text-center">
          <h1 className="mt-0">
            <Image
              className="img-responsive"
              width={150}
              height={150}
              src="/assets/img/esut-logo.png"
              alt="/"
              style={{ margin: '0 auto' }}
            />
            <br />
            <div className="text-md text-gray-600 small">School Admin</div>
            <div className="">{school.name}</div>
          </h1>
          <h4>University AI Ranking Engine</h4>
        </div>

        <div className="section mb-5 p-2">
          <div className="text-red-600 text-center">{errorMsg}</div>
          <form autoComplete="off" onSubmit={adminLogon} method="POST">
            <Card>
              <Card.Body className="pb-1">
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="username">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control form-control-lg"
                      id="username"
                      name="username"
                      placeholder="Your Email Address"
                      value={logon.username}
                      onChange={(e) =>
                        setLogon({ ...logon, username: e.target.value })
                      }
                    />
                    <i className="clear-input"></i>
                  </div>
                </div>
                <div className="form-group basic">
                  <div className="input-wrapper">
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      placeholder="Your password"
                      value={logon.password}
                      onChange={(e) =>
                        setLogon({ ...logon, password: e.target.value })
                      }
                    />
                    <i className="clear-input"></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="form-links mt-2">
              <div className="text-muted">
                <span className="text-black">
                  Powered by <Link href={'#'}>Golojan.net</Link>
                </span>
              </div>
              <div>
                <Link href="/auth/register" className="text-muted">
                  Register New
                </Link>
              </div>
            </div>
            <div className="form-button-group  transparent">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
