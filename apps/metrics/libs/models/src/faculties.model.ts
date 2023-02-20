import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const facultiesScheme = new mongoose.Schema(
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

if (mongoose.models.Faculties) {
  delete mongoose.models.Faculties;
}

const Faculties = mongoose.model("Faculties", facultiesScheme);
export default Faculties;
