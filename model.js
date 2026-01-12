const { Schema } = require("mongoose");
let mongoose = require("mongoose");

const LeaderboardSchema = new Schema({
  name: Schema.Types.String,
  username: Schema.Types.String,
  global_rank: Schema.Types.Number,
  rating: Schema.Types.Number,
  country: Schema.Types.String,
  country_rank: Schema.Types.Number,
  country_code: Schema.Types.String,
  rating: Schema.Types.Number,
  diff: Schema.Types.Number,
  institution: Schema.Types.String,
  institution_type: Schema.Types.String,
  all_rating: Schema.Types.String,
  user_gender: Schema.Types.String,
});

const Leaderboard = mongoose.model("Leaderboard", LeaderboardSchema);
module.exports = Leaderboard;
