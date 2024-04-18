const mongoose = require("mongoose");
// mongodb://localhost:27017
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
	items: [String],
});

module.exports.User = new mongoose.model("User", userSchema);
