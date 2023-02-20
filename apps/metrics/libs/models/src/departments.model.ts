import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const departmentsScheme = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    shortname: { type: String, required: true },
    description: { type: String },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Departments) {
  delete mongoose.models.Departments;
}
const Departments = mongoose.model("Departments", departmentsScheme);
export default Departments;
