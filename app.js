const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const AuthRouter = require("./routes/auth");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/auth", AuthRouter);

mongoose
	.connect("mongodb://localhost:27017/DNS")
	.then((res) => {
		app.listen(5000, () => {
			console.log("server connected");
		});
		console.log("database connected");
	})
	.catch((err) => {
		console.log(err);
	});
