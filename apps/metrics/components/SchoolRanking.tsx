import React from 'react';
import { RootState } from '../libs/store';
import { useSelector } from 'react-redux';
import PerCapitaAllCitations from './indicators/Citations/PerCapitaAllCitations';
import PerCapitaHindex from './indicators/Citations/PerCapitaHindex';
import PerCapitaI10Index from './indicators/Citations/PerCapitaI10Index';
import GoogleScholarPresence from './indicators/Citations/GoogleScholarPresence';
import InternationalStaff from './indicators/InternationalOutlook/InternationalStaff';
import InternationalStudents from './indicators/InternationalOutlook/InternationalStudents';
import InternationalColaborations from './indicators/InternationalOutlook/InternationalColaborations';
import GraduateOutput from './indicators/Teaching/GraduateOutput';
import FullProfessors from './indicators/Teaching/FullProfessors';
import PercPHDs from './indicators/Teaching/PercPHDs';
import FullAcreditationStatus from './indicators/Teaching/FullAcreditationStatus';
import TeachStudentRatio from './indicators/Teaching/TeachStudentRatio';
import FemaleStudents from './indicators/Teaching/FemaleStudents';
import ProfessorsAndReader from './indicators/Teaching/ProfessorsAndReader';
import SeniorLecturers from './indicators/Teaching/SeniorLecturers';
import OtherLecturers from './indicators/Teaching/OtherLecturers';
import FemaleLecturers from './indicators/Teaching/FemaleLecturers';
import AllReaders from './indicators/Teaching/AllReaders';

const SchoolRanking = () => {
  return (
    <>
      <div className="section mb-10">
        <div className="row mt-2">
          <PerCapitaAllCitations />
          <PerCapitaHindex />
          <PerCapitaI10Index />
          <GoogleScholarPresence />
          <InternationalStaff />
          <InternationalStudents />
          <InternationalColaborations />
          <GraduateOutput />
          <FullProfessors />
          <PercPHDs />
          <FullAcreditationStatus />
          <TeachStudentRatio />
          <FemaleStudents />
          <FemaleLecturers />
          <ProfessorsAndReader />
          <SeniorLecturers />
          {/* <OtherLecturers /> */}
        </div>
      </div>
    </>
  );
};

export default SchoolRanking;
