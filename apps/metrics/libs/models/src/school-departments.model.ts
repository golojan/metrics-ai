import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const schoolDepartmentsScheme = new mongoose.Schema(
  {
    schoolId: { type: String, required: true },
    facultyId: { type: String, required: true },
    departmentId: { type: String, required: true, unique: true },
    departmentName: { type: String, required: true },
    departmentCode: { type: String, required: true },
    fullAccreditation: { type: Boolean, default: false },
    departmentDescription: String,
    headOfDepartment: String,
  },
  { timestamps: true }
);

if (mongoose.models.SchoolDepartments) {
  delete mongoose.models.SchoolDepartments;
}

const SchoolDepartments = mongoose.model("SchoolDepartments", schoolDepartmentsScheme);
export default SchoolDepartments;
