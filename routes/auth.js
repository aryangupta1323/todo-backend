const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db/login");
const checkToken = require("../jwt");
router.post("/signup", (req, res, next) => {
	console.log(req.body);
	const { email, password } = req.body;
	console.log(email + " " + password);
	User.findOne({ email }).then((data) => {
		if (data) {
			res.json({ error: true, message: "User Already Exists" });
		} else {
			const newUser = new User({
				email: email,
				password: password,
			});
			newUser
				.save()
				.then((success) => {
					res.json({ error: null, message: "Sign up Successful" });
					console.log("user added");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
});

router.post("/login", (req, res, next) => {
	console.log(req.body);
	const { email, password } = req.body;
	console.log(email + " " + password);
	User.findOne({ email }).then((data) => {
		if (data) {
			console.log(data);
			if (data.password === password) {
				const token = jwt.sign(
					{ userId: data._id, email: email },
					process.env.JWT_SECRET,
					{ expiresIn: "1h" }
				);
				data.token = token;
				data.save().then((d) => {
					res.json({
						error: null,
						message: "Login Successful",
						jwt: token,
						items: data.items || null,
					});
				});
			} else {
				res.json({ error: true, message: "Password do not match!" });
			}
		} else {
			res.json({ error: true, message: "Email Id not found!" });
			console.log(" login error: user doesnot exist");
		}
	});
});
router.get("/load", checkToken, async (req, res, next) => {
	const token = req.headers.authorization.split(" ")[1];
	const user = await User.findOne({ token });
	return res.json({ items: user.items || null, error: null });
});
router.post("/add", checkToken, async (req, res, next) => {
	console.log(req.body.items);
	const token = req.headers.authorization.split(" ")[1];
	const user = await User.findOne({ token });
	user.items = req.body.items;
	const x = await user.save();
});
module.exports = router;
