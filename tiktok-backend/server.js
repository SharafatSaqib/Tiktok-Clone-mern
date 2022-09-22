import express from "express";
import mongoose from "mongoose";
import Videos from "./dbModel.js";
import cors from "cors";

// app config
const app = express();
const port = 9000;
// middleware
app.use(express.json());
app.use(cors());

//DB Config
const connection_url =
  "mongodb+srv://abc:CnHU20ZqR2aG99Dc@cluster0.itshzct.mongodb.net/?retryWrites=true&w=majority";

//Api Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//Listening
app.listen(port, () => {
  mongoose.connect(
    connection_url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB!!!");
    }
  );
  console.log(`listening on localhost: ${port}`);
});
