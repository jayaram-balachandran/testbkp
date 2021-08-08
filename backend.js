var express = require("express");
var app = express();
const port = 3000;
var mongoose = require("mongoose");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var createError = require("http-errors");
var Agent = require("./models/agent");
const bodyParser = require("body-parser");
const fs = require("fs");
var path = require("path");

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//cors

app.use(
  cors({
    origin: ["http://localhost:4200", "http://127.0.0.1:4200"],
    credentials: true,
  })
);

//DB

var mongoose = require("mongoose");
const agent = require("./models/agent");

mongoose
  .connect(
    "mongodb+srv://jayaram:password12345@cluster0-jvxnu.mongodb.net/Admin_Portal?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("connection failed");
  });

//Get All Agent Details from JSON File
app.get("/getagent", function (req, res) {
  const agents = getAgentData();
  // console.log("Available Agents Data", agents);
  return res.send(agents);
});

//Save Agent Details to JSON File
app.post("/saveagent", function (req, res) {
  //get the existing user data
  const existAgents = getAgentData();
  console.log("existing agents", existAgents);

  //get the new user data from post request
  const agentData = req.body;
  console.log("received agent data", req.body);

  //append the user data
  existAgents.push(agentData);

  //save the new user data
  saveAgentData(existAgents);
  return res.send({ success: true, msg: "User data added successfully" });
});

//Update Agent Details to JSON File

app.put("/updateagent", function (req, res) {
  const updateAgentemailId = req.body.emailId;
  console.log("Update Agent id", updateAgentemailId);

  const updateData = req.body;

  //get the existing user data
  const existAgents = getAgentData();

  const updateAgent = existAgents.filter(
    (agent) => agent.emailI !== updateAgentemailId
  );
  updateAgent.push(updateData);

  saveAgentData(updateAgent);
  return res.send({ success: true, msg: "User data updated successfully" });
});

//Delete Agent Details from JSON File
app.post("/deleteagent", function (req, res) {
  console.log("req body", req.body);
  const agentemailId = req.body.emailId;
  console.log("Agent Id to be deleted", agentemailId);

  //get the existing user data
  const existAgents = getAgentData();

  //filter the userdata to remove it
  const filterAgent = existAgents.filter(
    (agent) => agent.emailId !== agentemailId
  );
  console.log("filtered data", filterAgent);

  //save the filtered data
  saveAgentData(filterAgent);
  return res.send({ success: true, msg: "User removed successfully" });
});

//Utils

//read the user data from json file
const saveAgentData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("./agents.json", stringifyData);
};

//get the user data from json file
const getAgentData = () => {
  const jsonData = fs.readFileSync("./agents.json");
  return JSON.parse(jsonData);
};

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
