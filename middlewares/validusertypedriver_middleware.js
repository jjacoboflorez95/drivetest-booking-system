const isValidUserTypeDriver = (req, res, next) => {
	if (req.session.usertype == "driver") {
		next();
	} else {
		res.redirect("/dashboard");
	}
};

export default isValidUserTypeDriver;
