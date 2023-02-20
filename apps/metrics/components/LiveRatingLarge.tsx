import React from "react";

type SchoolProps = { school: any; mid: any };

const LiveRatingLarge = ({ school, mid }: SchoolProps) => {
  return (
    <>
      <div className="float-right text-center absolute top-9 right-5 flex">
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong
            className={`h2 ${
              school.points <= mid ? "text-red-600" : "text-green-600"
            }`}
          >
            {0}
          </strong>
          <br />
          <small>g.scholar</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong
            className={`h2 ${
              school.points <= mid ? "text-red-600" : "text-green-600"
            }`}
          >
            {0}
          </strong>
          <br />
          <small>citations</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong
            className={`h2 ${
              school.points <= mid ? "text-red-600" : "text-green-600"
            }`}
          >
            {0}
          </strong>
          <br />
          <small>h-index</small>
        </h4>
        <h4 className="text-center mx-1 hidden sm:inline-block md:inline-block lg:inline-block xl:inline-block xxl:inline-block">
          <strong
            className={`h2 ${
              school.points <= mid ? "text-red-600" : "text-green-600"
            }`}
          >
            {0}
          </strong>
          <br />
          <small>i10-h-index</small>
        </h4>
      </div>
    </>
  );
};

export default LiveRatingLarge;
