import React from 'react';
import ShowChartButton from '../components/ShowChartButton';
import Image from 'next/image';

import { Virtuoso } from 'react-virtuoso';
import LiveRatingLarge from './LiveRatingLarge';
import LiveRatingSmall from './LiveRatingSmall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faDownLong,
  faUpLong,
} from '@fortawesome/free-solid-svg-icons';
import { getLiveStats } from '../libs/utils';

type LRProps = {
  allschools?: any;
};

const LiveRankingTable = ({ allschools }: LRProps) => {
  return (
    <>
      <Virtuoso
        data={allschools}
        totalCount={allschools.length}
        itemContent={(index, ischool) => (
          <>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 row-auto text-left stat-box"
              key={index}
            >
              <Image
                src={`/assets/img/nuc.png`}
                alt={`${ischool?.name}`}
                width={80}
                height={80}
                className="float-left mr-2"
              />
              <div className="title my-0">
                <span className="text-black">
                  Ranking Total :{' '}
                  <span
                    className={`font-extrabold text-lg ${
                      ischool?.points <= 266
                        ? ' text-red-600 hover:text-red-200 hover:shadow-red-600 h-[90%]'
                        : ' text-green-600 hover:text-green-200 hover:shadow-green-600 h-[90%]'
                    }`}
                  >
                    {ischool.points}
                  </span>{' '}
                  points
                </span>
              </div>
              <span className="h5 my-1">
                <strong className="">{ischool.name}</strong>
              </span>
              <div className="text-md mt-0">
                <span>ID:</span>{' '}
                <span className="text-black">NUC/2021/0{index}</span>
                <span className="text-gray-400"> | </span>
                <span>
                  {getLiveStats(allschools, ischool.points)?.dir === 'up' ? (
                    <>
                      <FontAwesomeIcon
                        className="text-green-600"
                        icon={faUpLong}
                      />{' '}
                      Up by{' '}
                      <span className="text-green-600">
                        {getLiveStats(allschools, ischool.points)?.perc}
                      </span>
                      %
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        className="text-red-600"
                        icon={faDownLong}
                      />{' '}
                      Down by{' '}
                      <span className="text-red-600">
                        {getLiveStats(allschools, ischool.points)?.perc}
                      </span>
                      %
                    </>
                  )}
                </span>
              </div>
              <LiveRatingLarge
                school={ischool}
                mid={getLiveStats(allschools, ischool.points)?.mid}
              />
              <LiveRatingSmall
                school={ischool}
                mid={getLiveStats(allschools, ischool.points)?.mid}
              />
            </div>
          </>
        )}
      />
    </>
  );
};

export default LiveRankingTable;
