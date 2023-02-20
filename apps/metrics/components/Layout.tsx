import React, { ReactNode } from "react";
import Head from "next/head";
import Script from "next/script";

interface MyProps {
  children: ReactNode;
}
const Layout = ({ children }: MyProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Schools | Metics AI Ranking Engine</title>
      </Head>
      {children}
      <Script src="/assets/js/base.js" strategy="lazyOnload" />
    </>
  );
};
export default Layout;
