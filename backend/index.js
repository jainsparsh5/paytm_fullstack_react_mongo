const express = require("express");
const mainRrouter = require("./routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRrouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
