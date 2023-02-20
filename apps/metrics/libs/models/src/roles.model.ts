import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const rolesSchema = new mongoose.Schema(
  {
    role: { type: String },
    description: String,
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Roles) {
  delete mongoose.models.Roles;
}
const Roles =  mongoose.model("Roles", rolesSchema);
export default Roles;
