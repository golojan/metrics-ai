import { SchoolSettingsType } from '../../libs/interfaces';
import React, { useEffect, useState } from 'react';
import ShowChartButton from '../ShowChartButton';
import { useAtom } from 'jotai';
import { totalWeightAtom } from '../../libs/store';

interface IProps {
  settings: SchoolSettingsType;
}

import { authSchoolId } from '../../libs/hocs';

import mongoose from 'mongoose';
import PerCapitaAllCitations from '../indicators/Citations/PerCapitaAllCitations';

const Weightings = (props: IProps) => {
  const schoolId = authSchoolId();
  const { settings } = props;
  const [setting, setSetting] = useState<SchoolSettingsType>({
    ...settings,
  });

  const [totalWeight, setTotalWeight] = useAtom(totalWeightAtom);
  const [done, setDone] = useState<boolean>(false);

  const sumWeights = () => {
    return (
      setting.citationsWeight +
        setting.hindexWeight +
        setting.i10hindexWeight +
        setting.googlePresenceWeight +
        setting.internationalStaffWeight +
        setting.internationalStudentsWeight +
        setting.internationalCollaborationWeight +
        setting.graduationOutputWeight +
        setting.fullProfessorsWeight +
        setting.phdStudentsWeight +
        setting.accreditationWeight +
        setting.teacherStudentRatioWeight +
        setting.femaleStaffWeight +
        setting.femaleStudentsWeight +
        setting.profsReadersWeight +
        setting.seniorLecturersWeight +
        setting.otherLecturersWeight || 0
    );
  };

  useEffect(() => {
    setSetting({
      ...settings,
    });
    setTotalWeight(sumWeights());
  }, [done, settings]);

  const hanleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const _value = value ? parseInt(value) : 0;
    setSetting({
      ...setting,
      [name]: _value,
    });
    setTotalWeight(sumWeights());
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    evt.preventDefault();
    return;
  };

  const saveSettings = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ((totalWeight as number) > 100) {
      alert('Total weight cannot be greater than 100');
      return;
    }
    const res = await fetch(`/api/schools/${schoolId}/save-settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(setting),
    });
    const data = await res.json();
    if (data?.status) return true;
  };

  return (
    <>
      {/*  */}

      <div className="text-center">
        <h1>
          <span className="text-primary">{totalWeight}%</span> of{' '}
          <span className="text-primary">100%</span>{' '}
          <button className="btn btn-primary btn-sm" onClick={saveSettings}>
            Save Settings
          </button>
        </h1>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              Citation Per Capita
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="citationsWeight">
                    Citation Per Capita Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="citationsWeight"
                    name="citationsWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.citationsWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              H-Index Per Capita
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="hindexWeight">
                    H-Index Per Capita Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="hindexWeight"
                    name="hindexWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.hindexWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              i10-Index Per Capita
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="i10hindexWeight">
                    i10-Index Per Capita Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="i10hindexWeight"
                    name="i10hindexWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.i10hindexWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              Google Scholar Presence
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="googlePresenceWeight">
                    Google Scholar Presence Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="googlePresenceWeight"
                    name="googlePresenceWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.googlePresenceWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              (%) International Staff
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="internationalStaffWeight">
                    (%) International Staff Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="internationalStaffWeight"
                    name="internationalStaffWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.internationalStaffWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              (%) International Students
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label
                    className="label"
                    htmlFor="internationalStudentsWeight"
                  >
                    (%) International Students Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="internationalStudentsWeight"
                    name="internationalStudentsWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.internationalStudentsWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              Int&lsquo;l Colaborated Projects
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label
                    className="label"
                    htmlFor="internationalCollaborationWeight"
                  >
                    Int&lsquo;l Colaborated Projects Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="internationalCollaborationWeight"
                    name="internationalCollaborationWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.internationalCollaborationWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              Graduate Output (GO)
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="graduationOutputWeight">
                    Graduate Output (GO) Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="graduationOutputWeight"
                    name="graduationOutputWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.graduationOutputWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              Full Professors(FP)
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="fullProfessorsWeight">
                    Full Professors(FP) Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="fullProfessorsWeight"
                    name="fullProfessorsWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.fullProfessorsWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              (%) PHDs/Fellowships
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="phdLecturersWeight">
                    (%) PHDs/Fellowships Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="phdLecturersWeight"
                    name="phdLecturersWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.phdLecturersWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              (%) Full Accreditation Status
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="accreditationWeight">
                    (%) Full Accreditation Status Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="accreditationWeight"
                    name="accreditationWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.accreditationWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              Teach-Student Ratio
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="teacherStudentRatioWeight">
                    Teach-Student Ratio Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="teacherStudentRatioWeight"
                    name="teacherStudentRatioWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.teacherStudentRatioWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">(%) Femal Staff</strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="femaleStaffWeight">
                    (%) Femal Staff Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="femaleStaffWeight"
                    name="femaleStaffWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.femaleStaffWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              (%) Professors and Reader
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="profsReadersWeight">
                    (%) Professors and Reader Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="profsReadersWeight"
                    name="profsReadersWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.profsReadersWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              (%) Senior Lecturers
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="seniorLecturersWeight">
                    (%) Senior Lecturers Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="seniorLecturersWeight"
                    name="seniorLecturersWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.seniorLecturersWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 my-1">
        <div className="stat-box relative">
          <ShowChartButton show={true} />
          <div className="title">
            <strong className="text-black text-[24px]">
              (%) Other Lecturers
            </strong>
          </div>
          <h1 className="total mt-2">
            <span>
              <div className="form-group basic">
                <div className="input-wrapper">
                  <label className="label" htmlFor="otherLecturersWeight">
                    (%) Other Lecturers Weight
                  </label>
                  <input
                    type="number"
                    required
                    className="form-control form-control-lg"
                    id="otherLecturersWeight"
                    name="otherLecturersWeight"
                    placeholder="0"
                    max={9}
                    min={1}
                    step={1}
                    value={setting?.otherLecturersWeight as number}
                    onChange={hanleOnChange}
                    onKeyDownCapture={handleKeyDown}
                  />
                  <i className="clear-input"></i>
                </div>
              </div>
            </span>
          </h1>
          <em className="absolute bottom-0 right-5 text-lg">
            <strong className="text-green-600">{0}</strong>% of{' '}
            <strong className="text-green-600">{100}</strong>{' '}
          </em>
        </div>
      </div>
      <div className="text-center">
        <hr className="my-3" />
        <h1>
          <span className="text-primary">{totalWeight}%</span> of{' '}
          <span className="text-primary">100%</span>{' '}
          <button className="btn btn-primary btn-sm" onClick={saveSettings}>
            Save Settings
          </button>
        </h1>
      </div>
      {/*  */}
    </>
  );
};

export default Weightings;
