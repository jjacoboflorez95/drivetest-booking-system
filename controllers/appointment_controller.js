import appointmentModel from "../models/AppointmentModel.js";

class AppointmentController {
	static appointment_get = (req, res) => {
		console.log("appointment_get");

		res.render("appointment.ejs", {
			dateNotPicked: false,
			selectingDate: true,
			username: true,
			usernameHeader: req.session.username,
			usertype: req.session.usertype,
		});
	};

	static appointment_post_date = async (req, res) => {
		console.log("appointment_post_date");
		try {
			const form_data = req.body;
			if (!form_data.date) {
				console.log(
					"----------------------------------------------------------"
				);
				console.log("");
				return res.render("appointment.ejs", {
					dateNotPicked: true,
					selectingDate: true,
					username: true,
					usernameHeader: req.session.username,
					usertype: req.session.usertype,
				});
			} else {
				// Validates if the date picked by the admin is already in BD with some times
				let currentTimesArray = [];
				const slotsBd = await appointmentModel.find({
					date: form_data.date,
				});
				if (slotsBd) {
					for (let slot of slotsBd) {
						currentTimesArray.push(slot.time);
					}
					req.session.currentTimesArray = Array.from(currentTimesArray);
				}
				req.session.datepicked = form_data.date;
				console.log(
					"----------------------------------------------------------"
				);
				console.log("");
				return res.render("appointment.ejs", {
					selectingDate: false,
					slotNotPicked: false,
					datePicked: req.session.datepicked,
					currentTimesArray,
					username: true,
					usernameHeader: req.session.username,
					usertype: req.session.usertype,
				});
			}
		} catch (error) {
			console.log("Error: ", error.message);
		}
	};

	static appointment_post = async (req, res) => {
		console.log("appointment_post");
		try {
			const form_data = req.body;
			//const currentURL = req.url;
			// Store the current times picked for the current date picked.
			let currentTimesArray = [];
			// Store new times picked by the admin.
			let newTimesArray = [];
			// Manage if the alert message for no slot picked ahs to appear or not.
			let slotNotPicked = false;

			if (form_data.change_date) {
				// In this section we redirect to appointment so the admin can choose a new date.
				console.log("Change date button");
				delete req.session.newTimesArray;
				delete req.session.currentTimesArray;
				res.redirect("/appointment");
			} else if (form_data.save_slots) {
				// In this section we validates if the admin picked any new slot and if so, we save them in BD.
				console.log("Save slots button");
				if (req.session.newTimesArray) {
					newTimesArray = Array.from(req.session.newTimesArray);
					for (const slot of newTimesArray) {
						console.log("slot: ", slot);
						const appointment_to_save = new appointmentModel({
							date: req.session.datepicked,
							time: slot,
						});

						// If we don't use await it will return an empty object.
						const appointment_saved_in_db = await appointment_to_save.save();
						console.log("appointment_saved_in_db: ", appointment_saved_in_db);
					}
					delete req.session.newTimesArray;
					delete req.session.currentTimesArray;
					res.redirect("/dashboard");
				} else {
					currentTimesArray = Array.from(req.session.currentTimesArray);
					slotNotPicked = true;
				}
			} else {
				// In this section we are controlling the slots that the admin is selecting.
				console.log("Admin selecting times");
				const timeSelected = form_data.slot_button;

				if (req.session.currentTimesArray) {
					currentTimesArray = Array.from(req.session.currentTimesArray);
				}
				if (req.session.newTimesArray) {
					newTimesArray = Array.from(req.session.newTimesArray);
				}
				currentTimesArray.push(timeSelected);
				newTimesArray.push(timeSelected);
				req.session.currentTimesArray = Array.from(currentTimesArray);
				req.session.newTimesArray = Array.from(newTimesArray);
				console.log(
					"req.session.currentTimesArray: ",
					req.session.currentTimesArray
				);
				console.log("req.session.newTimesArray: ", req.session.newTimesArray);
			}
			console.log("----------------------------------------------------------");
			console.log("");

			res.render("appointment.ejs", {
				selectingDate: false,
				slotNotPicked,
				datePicked: req.session.datepicked,
				currentTimesArray,
				username: true,
				usernameHeader: req.session.username,
				usertype: req.session.usertype,
			});
		} catch (error) {
			console.log("Error: ", error.message);
			//res.status(404).send("error");
			//res.send(error.message);
		}
	};
}

export default AppointmentController;
