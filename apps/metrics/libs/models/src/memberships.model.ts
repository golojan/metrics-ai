import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const membershipsSchema = new mongoose.Schema(
  {
    membership: { type: String },
    description: String,
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Memberships) {
  delete mongoose.models.Memberships;
}
const Memberships = mongoose.model("Memberships", membershipsSchema);
export default Memberships;
 