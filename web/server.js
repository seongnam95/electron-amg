import http from "http";
import express from "express";
import path from "path";

const app = express();

const port = 8000;

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use(express.static(path.join(process.cwd(), "dist")));

app.get("/*", (req, res) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Date: Date.now(),
  });
  res.sendFile(path.join(process.cwd(), "dist", "index.html"));
});

http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});
