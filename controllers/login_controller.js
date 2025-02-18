import userModel from "../models/UserModel.js";
import appointmentModel from "../models/AppointmentModel.js";
import bcrypt from "bcrypt";

class LoginController {
	static login_controller = (req, res) => {
		console.log("login_controller");
		// This will validate if the signup query param has a "true" value and will return true if it does
		const signup = req.query.signup === "true";
		// If statement to validates if the user is logging in or signing up
		if (!signup) {
			res.render("login.ejs", {
				noUserFound: false,
				usernameLogIn: null,
				signup: false,
				orButtontext: "Sign Up",
				signupToSend: "true",
				principalButtontext: "Log In",
				username: false,
				usernameHeader: "",
			});
		} else {
			res.render("login.ejs", {
				noUserFound: false,
				usernameLogIn: null,
				signup: true,
				orButtontext: "Log In",
				signupToSend: "false",
				principalButtontext: "Sign Up",
				username: false,
				usernameHeader: "",
			});
		}
	};

	static login_singup_controller = async (req, res) => {
		try {
			// This will validate if the signup query param has a "true" value and will return true if it does
			const signup = req.query.signup === "true";
			const form_data = req.body;

			if (signup) {
				if (
					!form_data.username.trim() ||
					!form_data.password.trim() ||
					!form_data.repeated_password.trim()
				) {
					res.render("login.ejs", {
						noUserFound: true,
						noUserFoundText: "You must enter a username and password.",
						usernameLogIn: form_data.username,
						signup: true,
						orButtontext: "Log In",
						signupToSend: "false",
						principalButtontext: "Sign Up",
						username: false,
						usernameHeader: "",
					});
				} else if (
					form_data.password.trim() !== form_data.repeated_password.trim()
				) {
					res.render("login.ejs", {
						noUserFound: true,
						noUserFoundText: "Passwords do not match.",
						usernameLogIn: form_data.username,
						signup: true,
						orButtontext: "Log In",
						signupToSend: "false",
						principalButtontext: "Sign Up",
						username: false,
						usernameHeader: "",
					});
				} else {
					const user_from_db = await userModel.findOne({
						$or: [{ username: form_data.username }],
					});
					if (user_from_db) {
						res.render("login.ejs", {
							noUserFound: true,
							noUserFoundText: "Username already exist. Please choose another.",
							usernameLogIn: form_data.username,
							signup: true,
							orButtontext: "Log In",
							signupToSend: "false",
							principalButtontext: "Sign Up",
							username: false,
							usernameHeader: "",
						});
					} else {
						// This is for hash/encode license number
						const hashed_password = await bcrypt.hash(form_data.password, 10);

						const sign_up_to_save = new userModel({
							username: form_data.username,
							password: hashed_password,
							usertype: form_data.usertype,
						});

						// If we don't use await it will return an empty object.
						const sign_up_to_save_saved_in_db = await sign_up_to_save.save();

						res.redirect("/login");
					}
				}
			} else {
				const user_from_db = await userModel.findOne({
					$or: [{ username: form_data.username }],
				});
				if (user_from_db) {
					bcrypt.compare(
						form_data.password,
						user_from_db.password,
						async (err, result) => {
							if (err) {
								console.log("Error at log in: ", err);
								res.send(err);
							}
							if (result) {
								req.session._id = user_from_db._id;
								req.session.username = user_from_db.username;
								req.session.usertype = user_from_db.usertype;								
								if (user_from_db.licenseno == "default") {
									req.session.defaultData = true;
								} else {
									req.session.defaultData = false;
								}
								res.redirect("/dashboard");
							} else {
								res.render("login.ejs", {
									noUserFound: true,
									noUserFoundText: "Password incorrect. Please try again.",
									usernameLogIn: user_from_db.username,
									signup: false,
									orButtontext: "Sign Up",
									signupToSend: "true",
									principalButtontext: "Log In",
									username: false,
									usernameHeader: "",
								});
							}
						}
					);
				} else {
					res.render("login.ejs", {
						noUserFound: true,
						noUserFoundText:
							"User doesn't exist. Please sign up before log in.",
						usernameLogIn: null,
						signup: false,
						orButtontext: "Sign Up",
						signupToSend: "true",
						principalButtontext: "Log In",
						username: false,
						usernameHeader: "",
					});
				}
			}
		} catch (error) {
			console.log("Error: ", error);
			res.send(error);
		}
	};
}

export default LoginController;
