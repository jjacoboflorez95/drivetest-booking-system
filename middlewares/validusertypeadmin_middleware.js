const isValidUserTypeAdmin = (req, res, next) => {
	if (req.session.usertype == "admin") {
		next();
	} else {
		res.redirect("/dashboard");
	}
};

export default isValidUserTypeAdmin;
