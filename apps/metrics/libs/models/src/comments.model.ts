import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const commentsScheme = new mongoose.Schema(
  {
    postFeedId: { type: String },
    fromUser: { type: String },
    toUser: { type: String },
    comment: { type: String },
    image: { type: String },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    onReview: { type: Boolean, default: false },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

if (mongoose.models.PostFeedComments) {
  delete mongoose.models.PostFeedComments;
}
const PostFeedComments = mongoose.model("PostFeedComments", commentsScheme);
export default PostFeedComments;
