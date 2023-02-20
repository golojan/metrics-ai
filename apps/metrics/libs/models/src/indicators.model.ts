import mongoose from 'mongoose';
import { ICriteria } from "../../interfaces";

mongoose.Promise = global.Promise;

const indicatorsSchema = new mongoose.Schema(
  {
    shortname: { type: String, unique: true },
    indicator: String,
    criteria: {
      type: String,
      enum: Object.values(ICriteria),
      default: ICriteria.GENERAL,
    },
    weight: { type: Number, default: 0 },
    multiplier: { type: Number, default: 0 },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Indicators) {
  delete mongoose.models.Indicators;
}
const Indicators = mongoose.model("Indicators", indicatorsSchema);
export default Indicators;
