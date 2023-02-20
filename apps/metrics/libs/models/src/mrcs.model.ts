import mongoose from 'mongoose';
import { AccountTypes, Gender } from '../../interfaces';

mongoose.Promise = global.Promise;
const mrcsScheme = new mongoose.Schema(
  {
    mrcId: {
      type: String,
      unique: true,
      required: true,
    },
    regId: {
      type: String,
      unique: true,
      required: true,
    },
    schoolId: {
      type: String,
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
      default: AccountTypes.LECTURER,
    },
    membershipType: {
      type: String,
      default: 'LOCAL',
    },
    lastname: { type: String },
    firstname: { type: String },
    middlename: { type: String },
    gender: {
      type: String,
      enum: Object.values(Gender),
      required: true,
      default: Gender.NONE,
    },
    lga: String,
    state: String,
    country: { type: String, default: 'Nigeria' },
    rank: { type: String, default: 'Lecturer I' },
    mrcUsed: {
      type: Boolean,
      default: false,
    },
    mrcUsedDate: {
      type: Date,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.MRCS) {
  delete mongoose.models.MRCS;
}

const MRCS = mongoose.model('MRCS', mrcsScheme);
export default MRCS;
