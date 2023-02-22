import mongoose from 'mongoose';
import {
  AccountTypes,
  Gender,
  AccountRank,
  MembershipTypes,
} from '../../interfaces';

mongoose.Promise = global.Promise;

const accountsScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    staffNumber: {
      type: String,
      unique: true,
    },
    mrcId: {
      type: String,
      unique: true,
    },
    verified: {
      type: Boolean,
      unique: false,
    },
    schoolId: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    facultyId: {
      type: String,
    },
    departmentId: {
      type: String,
    },
    accountType: {
      type: String,
      enum: Object.values(AccountTypes),
      required: true,
      default: AccountTypes.GUEST,
    },
    membershipType: {
      type: String,
      enum: Object.values(MembershipTypes),
      required: true,
      default: MembershipTypes.LOCAL,
    },
    accountRank: {
      type: String,
      enum: Object.values(AccountRank),
      required: true,
      default: AccountRank.LECTURER,
    },
    picture: {
      type: String,
      default: '/images/avatar/user.png',
    },
    firstname: { type: String },
    middlename: { type: String, default: '' },
    lastname: { type: String, default: '' },
    aboutMe: { type: String, default: '' },
    email: {
      type: String,
      unique: true,
    },
    mobile: { type: String },
    gender: {
      type: String,
      enum: Object.values(Gender),
      default: Gender.NOTSAY,
    },
    birthday: { type: String },
    street: String,
    city: String,
    lga: String,
    state: String,
    zip: String,
    country: { type: String, default: 'Nigeria' },
    otp: {
      enabled: { type: Boolean, default: true },
      code: String,
    },
    passwordKey: { type: String },
    password: { type: String },
    enabled: {
      type: Boolean,
      default: false,
    },
    smsNotification: { type: Boolean, default: false },
    emailNotification: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    mobileVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
    isPHD: { type: Boolean, default: false },
    isPGD: { type: Boolean, default: false },
    isFullProfessor: { type: Boolean, default: false },
    isAssociateProfessor: { type: Boolean, default: false },
    isReader: { type: Boolean, default: false },
    isFellow: { type: Boolean, default: false },
    schoolCode: { type: String },
    googleScholarId: { type: String },
    lastScrapped: {
      type: Date,
      default: Date.now(),
    },
    scopusId: { type: String },
    orcidId: { type: String },
    googlePresence: { type: Number, default: 0 },
    citations: { type: Number, default: 0 },
    hindex: { type: Number, default: 0 },
    i10hindex: { type: Number, default: 0 },
    totalPublications: { type: Number, default: 0 },
    firstPublicationYear: { type: Number, default: 0 },
    lastPublicationYear: { type: Number, default: 0 },
    publications: [
      {
        title: String,
        link: String,
        citation_id: String,
        authors: String,
        cited_by: {
          value: Number,
          link: String,
          serpapi_link: String,
          cites_id: String,
        },
        year: String,
      },
    ],
    searchMetadata: { type: Object, default: {} },
    authorMetadata: { type: Object, default: {} },
    internationalColaborations: [
      {
        projectId: { type: Number },
        projectTitle: { type: String },
        projectDescription: { type: String },
        country: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        role: { type: String },
        status: { type: String },
        fundingAgency: { type: String },
        fundingAmount: { type: String },
        fundingCurrency: { type: String },
        fundingDuration: { type: String },
        createdAt: { type: Date },
        updatedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

if (mongoose.models.Accounts) {
  delete mongoose.models.Accounts;
}

const Accounts = mongoose.model('Accounts', accountsScheme);
export default Accounts;
