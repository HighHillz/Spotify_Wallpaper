const express = require("express");
const axios = require("axios");
const cors = require("cors");
const querystring = require("querystring");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get("/login", (req, res) => {
  const scope = "user-read-playback-state user-read-currently-playing";
  const authURL =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
    });
  res.redirect(authURL);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  const tokenURL = "https://accounts.spotify.com/api/token";

  try {
    const response = await axios.post(
      tokenURL,
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const access_token = response.data.access_token;

    // Send the token to your frontend
    res.redirect(`http://localhost:5500/Public/index.html?access_token=${access_token}`);
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    res.status(500).send("Authentication failed.");
  }
});

app.listen(8888, () => {
  console.log("✅ Auth server running at http://localhost:8888/login");
});
