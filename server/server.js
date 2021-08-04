const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

let rawdata = fs.readFileSync(path.resolve(__dirname, "movies_metadata.json"));
let student = JSON.parse(rawdata);

// A test route to make sure the server is up.
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// A mock route to return some data.
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");
  response.json({
    data: student,
  });
});

app.get("/api/list", (request, response) => {
  console.log("❇️ Received GET request to /api/list");
  var list = [];
  student.forEach((element) => {
    list.push({
      id: element.id,
      title: element.title,
      tagline: element.tagline,
      vote_average: element.vote_average,
    });
  });
  response.json(list);
});

app.get("/api/list/:id", (request, response) => {
  console.log("❇️ Received GET request to /api/list");
  student.forEach((obj) => {
    intId = parseInt(request.params.id);
    if (obj.id === intId) {
      response.json(obj);
    }
  });
});

// Express port-switching logic
let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});
