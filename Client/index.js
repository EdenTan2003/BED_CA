const path = require("path");
const express = require("express");
const app = express();

// Specifies where static files are
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
