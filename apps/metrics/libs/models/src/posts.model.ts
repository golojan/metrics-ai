import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import { PostFeedTypes } from '../../interfaces';

const postScheme = new mongoose.Schema(
  {
    postType: { type: String, enum: Object.values(PostFeedTypes) },
    accountId: { type: String },
    schoolId: { type: String },
    title: { type: String },
    shortname: { type: String },
    content: { type: String },
    image: { type: String },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    onReview: { type: Boolean, default: false },
    approved: { type: Boolean, default: true },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.PostFeeds) {
  delete mongoose.models.PostFeeds;
}

const PostFeeds = mongoose.model("PostFeeds", postScheme);
export default PostFeeds;
