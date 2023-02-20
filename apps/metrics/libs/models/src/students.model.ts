import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import { Gender, StudentType } from '../../interfaces';

const studentsScheme = new mongoose.Schema(
  {
    schoolId: { type: String },
    departmentId: { type: String },
    regNumber: { type: String },
    studentType: {
      type: String,
      enum: Object.values(StudentType),
      default: StudentType.LOCAL,
    },
    challanged: {
      type: Boolean,
      default: false,
    },
    academics: {
      yearAdmitted: Number, //year admitted//
      yearToGraduated: Number, //year graduated//
      yearGraduated: Number, //year graduated//
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Students) {
  delete mongoose.models.Students;
}

const Students = mongoose.model("Students", studentsScheme);
export default Students;
