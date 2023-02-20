import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { busyAtom } from '../libs/store';
import { useAtom } from 'jotai';

function SiteBusy() {
  const [busy] = useAtom(busyAtom);
  return (
    <>
      {busy && (
        <BarLoader
          color="#66789c"
          loading={busy}
          width="100%"
          height={5}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </>
  );
}

export default SiteBusy;
