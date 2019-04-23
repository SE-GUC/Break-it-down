const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var connection = mongoose.createConnection(
  "mongodb+srv://user:1234@break-it-down-8hjy6.mongodb.net/data?retryWrites=true"
);

// Create the schema
const PostsSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, required: true },
  userID: {},
  likedBy: { type: Array }
});

module.exports = Post = connection.model("posts", PostsSchema);
