import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const connectionScheme = new mongoose.Schema(
  {
    fromUser: { type: String },
    toUser: { type: String },
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

if (mongoose.models.Connections) {
  delete mongoose.models.Connections;
}
const Connections =  mongoose.model("Connections", connectionScheme);
export default Connections;
