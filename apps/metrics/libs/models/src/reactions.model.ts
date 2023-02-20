import mongoose from 'mongoose';
import { PostFeedTypes } from '../../interfaces';

mongoose.Promise = global.Promise;

const reactionsScheme = new mongoose.Schema(
  {
    feedType: { type: String, enum: Object.values(PostFeedTypes) },
    postFeedId: { type: String },
    commentId: { type: String },
    fromUser: { type: String },
    like: { type: Boolean, default: false },
    toUser: { type: String },
  },
  { timestamps: true }
);

if (mongoose.models.UserReactions) {
  delete mongoose.models.UserReactions;
}
const UserReactions = mongoose.model("UserReactions", reactionsScheme);
export default UserReactions;
