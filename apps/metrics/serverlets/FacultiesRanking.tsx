import { faAreaChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ShowChartButton from "../components/ShowChartButton";

const FacultiesRanking = () => {
  return (
    <>
      <div className="section">
        <div className="row mt-2">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Student-Teacher Ratio</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{" "}
                  {0}
                </h1>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Percentage Female</strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{" "}
                  {0}
                </h1>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">
                  Percentage Full Professors
                </strong>
                <h1 className="total mt-2">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faAreaChart}
                  />{" "}
                  {0}
                </h1>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">
                  Percentage of International Students
                </strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">
                  Percentage Full Accreditation
                </strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Efficiency</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">All Citations Per Capita</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">All h-index Per Capita</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>
        </div>

        <div className="row mt-2">
          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">
                  All i-10-index Per Capita
                </strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Google Scholar Presence</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">
                  Contribution to Knowledge Economy
                </strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>
          {/*  */}

          {/*  */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-1">
            <div className="stat-box">
              <ShowChartButton />
              <div className="title">
                <strong className="text-black">Total score</strong>
              </div>
              <h1 className="total mt-2">
                <FontAwesomeIcon
                  className="text-secondary"
                  icon={faAreaChart}
                />{" "}
                {0}
              </h1>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
};

export default FacultiesRanking;
