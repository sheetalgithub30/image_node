import express from "express";
import 'dotenv/config'

const app = express();
let api_key = process.env.API_KEY;

const getRandomImage = async () => {
  let data = await fetch(
    `https://api.unsplash.com/photos/random/?client_id=${api_key}&count=1`
  );
  let res = await data.json();
  return res[0].urls;
};

app.get("/api/image/random", async (req, res) => {
  try {
    const data = await getRandomImage();
    // console.log(data);
    if (data.error) {
      res.status(500).json(data);
    } else {
      res.send(`
        <html>
        <head></head>
        <body>
        <img style="width: 630px;" src=${data.thumb}/>
        </body>
        </html>
      `);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.listen(1000, () => {
  console.log("server is running on port 1000");
});