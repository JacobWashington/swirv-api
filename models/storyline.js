const mongoose = require("mongoose");
const { Schema } = mongoose;

const storylineSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  authId: {
    type: String,
    require: true,
  },
  episodes: {
    type: Array,
  },
  genre: {
    type: String,
  },
  branchedFromStorylineId: String,
  branchedFromEpisodeId: String,
  branches: {
    type: Array,
    require: false,
  },
  comments: {
    type: Array,
    require: false,
  },
  isOffering: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
}
});

const Storyline = mongoose.model("Storyline", storylineSchema);
module.exports = Storyline;
