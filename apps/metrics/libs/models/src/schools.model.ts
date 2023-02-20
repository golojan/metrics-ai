import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schoolsScheme = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: '/assets/img/logo-icon.png',
    },
    domain: { type: String },
    name: { type: String },
    shortname: { type: String, unique: true },
    state: { type: String },
    location: String,
    ownedBy: { type: String },
    founded: Number,
    website: { type: String },

    googlePresenceCount: { type: Number, default: 0 },
    googlePresence: { type: Number, default: 0 },
    citations: { type: Number, default: 0 },
    hindex: { type: Number, default: 0 },
    i10hindex: { type: Number, default: 0 },

    history: [
      {
        name: String,
        lecturers: [],
        students: [],
        googlePresence: { type: Number, default: 0 },
        citations: { type: Number, default: 0 },
        hindex: { type: Number, default: 0 },
        i10hindex: { type: Number, default: 0 },
        allschools: [],
        adminId: String,
      },
      { timestamps: true },
    ],
    indicators: [
      {
        type: String,
      },
    ],
    settings: {
      includeStudentsInMetrics: { type: Boolean, default: true },
      includeLecturersInMetrics: { type: Boolean, default: true },
      includeAlumniInMetrics: { type: Boolean, default: true },

      citationsWeight: { type: Number, default: 2 },
      hindexWeight: { type: Number, default: 2 },
      i10hindexWeight: { type: Number, default: 2 },
      googlePresenceWeight: { type: Number, default: 2 },
      studentsWeight: { type: Number, default: 2 },
      lecturersWeight: { type: Number, default: 2 },
      alumniWeight: { type: Number, default: 2 },
      internationalStaffWeight: { type: Number, default: 2 },
      internationalStudentsWeight: { type: Number, default: 2 },
      internationalCollaborationWeight: { type: Number, default: 2 },
      efficiencyWeight: { type: Number, default: 2 },
      researchOutputWeight: { type: Number, default: 2 },
      researchImpactWeight: { type: Number, default: 2 },
      researchInnovationWeight: { type: Number, default: 2 },
      graduationOutputWeight: { type: Number, default: 2 },
      fullProfessorsWeight: { type: Number, default: 2 },
      phdStudentsWeight: { type: Number, default: 2 },
      phdGraduatesWeight: { type: Number, default: 2 },
      phdLecturersWeight: { type: Number, default: 2 },
      fellowshipWeight: { type: Number, default: 2 },
      accreditationWeight: { type: Number, default: 2 },
      teacherStudentRatioWeight: { type: Number, default: 2 },
      femaleStaffWeight: { type: Number, default: 2 },
      femaleStudentsWeight: { type: Number, default: 2 },
      profsReadersWeight: { type: Number, default: 2 },
      seniorLecturersWeight: { type: Number, default: 2 },
      juniorLecturersWeight: { type: Number, default: 2 },
      associateProfessorsWeight: { type: Number, default: 2 },
      assistantProfessorsWeight: { type: Number, default: 2 },
      otherLecturersWeight: { type: Number, default: 2 },
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Schools) {
  delete mongoose.models.Schools;
}
const Schools = mongoose.model('Schools', schoolsScheme);
export default Schools;
