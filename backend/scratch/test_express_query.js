import express from "express";
import hpp from "hpp";
import request from "supertest";

const app = express();
app.use(hpp());

app.get("/test", (req, res) => {
  res.json({
    query: req.query
  });
});

const run = async () => {
  const response = await request(app).get("/test?price[lte]=5000");
  console.log("Parsed req.query:", response.body.query);
  process.exit(0);
};

run();
