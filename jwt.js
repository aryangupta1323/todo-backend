const { User } = require("./db/login");
const jwt = require("jsonwebtoken");
async function checkToken(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		console.log("Token not provided");
		return res.status(401).json({ error: "Token not provided" });
	}
	try {
		const t = token.split(" ")[1];
		const decoded = jwt.verify(token.split(" ")[1], "secret_key"); // Verify token
		console.log(decoded);
		const user = await User.findOne({ _id: decoded.userId, token: t }); // Check if token exists in MongoDB
		if (!user) {
			console.log("Invalid Token user not found");
			return res.status(401).json({ error: "Invalid token" });
		}
		req.userId = decoded.userId;
		console.log("Token checked successfully");
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
}

module.exports = checkToken;
