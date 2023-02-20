import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import { LecturerType, LecturerLevel } from '../../interfaces';

const lecturersScheme = new mongoose.Schema(
  {
    schoolId: { type: String },
    accid: { type: String, unique: true },
    staffNumber: { type: String, unique: true },
    adjunct: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      enum: Object.values(LecturerLevel),
      default: LecturerLevel.JUNIOR,
    },
    withPhd: {
      type: Boolean,
      default: false,
    },
    professor: {
      isProfessor: { type: Boolean, default: false },
      isFullProfessor: { type: Boolean, default: false },
    },
    lecturerType: {
      type: String,
      enum: Object.values(LecturerType),
      default: LecturerType.LOCAL,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Lecturers) {
  delete mongoose.models.Lecturers;
}
const Lecturers =  mongoose.model("Lecturers", lecturersScheme);
export default Lecturers;
