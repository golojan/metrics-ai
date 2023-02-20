import React from "react";

import { Virtuoso } from "react-virtuoso";

type LRProps = {
  history: any;
};

const RankingHostoryTable = ({ history }: LRProps) => {
  return (
    <>
      <Virtuoso
        data={history}
        totalCount={history.length}
        itemContent={(index, histo) => (
          <>
            <div
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2 row-auto text-left stat-box"
              key={index}
            >
              <span className="h3 my-1">
                <strong className="">{histo.name}</strong>
              </span>
              <div className="text-md mt-0">
                <span>DATE:</span> <span className="text-black">{index}</span>
              </div>
              {/*
              <LiveRatingLarge
                school={ischool}
                mid={getLiveStats(allschools, ischool.points)?.mid}
              />
              <LiveRatingSmall
                school={ischool}
                mid={getLiveStats(allschools, ischool.points)?.mid}
              /> */}
            </div>
          </>
        )}
      />
    </>
  );
};

export default RankingHostoryTable;
