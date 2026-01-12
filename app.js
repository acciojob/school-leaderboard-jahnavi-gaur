// ===== Cypress polyfill for Jest =====
if (process.env.NODE_ENV !== "production") {
  const axios = require("axios");

  global.cy = {
    request: async ({ url, method = "GET" }) => {
      const response = await axios({
        method,
        url,
        validateStatus: () => true,
      });

      return {
        status: response.status,
        body: response.data,
      };
    },
  };
}



const express = require("express");
const app = express();

const config = require("./config.json");

//== connect to database
const mongoURI =
  config.MONGODB_URI || "mongodb://localhost:27017" + "/newsFeed";

let mongoose = require("mongoose");
const Leaderboard = require("./model");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("connected to database"));

const onePageArticleCount = 20;

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world!");
});

// your code here!

const data = require("./data");

// insert data into DB only once
const insertDataIfEmpty = async () => {
  const count = await Leaderboard.countDocuments();
  if (count === 0) {
    await Leaderboard.insertMany(data);
    console.log("Leaderboard data inserted");
  }
};

insertDataIfEmpty();

/**
 * GET /topRankings
 * Query params:
 * limit (default 20)
 * offset (default 0)
 */
app.get("/topRankings", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const data = await Leaderboard.find()
      .sort({ global_rank: 1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}



// ==end==

module.exports = { app, db };
