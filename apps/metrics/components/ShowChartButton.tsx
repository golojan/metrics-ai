import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import { noAction } from '../libs/utils';

type ShowChatProps = {
  show?: boolean;
};

const ShowChartButton = ({ show = false }: ShowChatProps) => {
  const [showChart, setShowChart] = React.useState<boolean>(show);
  const toggleShowChart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowChart(!showChart);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '0px',
        fontWeight: 'bolder',
        width: '40px',
        height: '40px',
        display: show ? 'block' : 'none',
      }}
    >
      <Link
        href="#"
        className="button text-primary"
        onClick={toggleShowChart}
      >
        <FontAwesomeIcon icon={faChartPie} fontSize={25} />
      </Link>
    </div>
  );
};

export default ShowChartButton;
