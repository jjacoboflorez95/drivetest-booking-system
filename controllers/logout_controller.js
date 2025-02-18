class LogoutController {
	static logut_controller = (req, res) => {
		req.session.destroy((err) => {
			if (err) {
				console.log("Error destroying the session: ", err);
				res.send(err);
			}

			res.redirect("login");
		});
	};
}

export default LogoutController;
