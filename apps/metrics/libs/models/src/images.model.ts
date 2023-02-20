import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const imagesScheme = new mongoose.Schema(
  {
    name: { type: String },
    base64: { type: String },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Images) {
  delete mongoose.models.Images;
}
const Images = mongoose.model("Images", imagesScheme);
export default Images;
