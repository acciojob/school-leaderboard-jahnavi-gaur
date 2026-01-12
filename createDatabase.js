const { db } = require("./app");
const Leaderboard = require("./model");
const { data } = require("./data");

const refreshAll = async () => {
  await Leaderboard.deleteMany({});
  // console.log(connection)
  await Leaderboard.insertMany(data);
  console.log("done!");
};
refreshAll();
