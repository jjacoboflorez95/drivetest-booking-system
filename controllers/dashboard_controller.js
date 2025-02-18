class DashboardController {
	static dashboard_controller = (req, res) => {
		console.log("dashboard_controller");
		console.log("req.session: ", req.session);
		if (req.session._id) {
			res.render("dashboard.ejs", {
				username: true,
				usernameHeader: req.session.username,
				usertype: req.session.usertype,
			});
		} else {
			res.render("dashboard.ejs", {
				username: false,
				usernameHeader: "",
			});
		}
	};
}

export default DashboardController;
