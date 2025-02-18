const isValidSession = (req, res, next) => {
	if (req.session._id) {
		next();
	} else {
		req.session.error = "You have to Login First";
		res.redirect("/login");
	}
};

export default isValidSession;
