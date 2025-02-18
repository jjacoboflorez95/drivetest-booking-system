import userModel from "../models/UserModel.js";
import appointmentModel from "../models/AppointmentModel.js";

class GExamController {
	static g_exam_controller = async (req, res) => {
		if (req.session.defaultData) {			
			res.render("g_exam.ejs", {
				dateTimeBd: false,				
				dateNotPicked: false,
				selectingDate: true,
				username: true,
				usernameHeader: req.session.username,
				usertype: req.session.usertype,
			});
		} else {
			const user_from_db = await userModel.findOne({
				$or: [{ _id: req.session._id }],
			});
			const slot_bd = await appointmentModel.findOne({
				_id: user_from_db.appointmentId,
			});

			let dateTimePicked = slot_bd.time + " | " + slot_bd.date;		

			res.render("g_exam.ejs", {
				data: user_from_db,
				readonlyText: "readonly",
				gFormButtonText: "Update information",
				selectingDate: false,
				selectingTime: false,
				dateTimeBd: true,
				dateTimePicked,																
				gFormAction: "/g_exam_update",
				username: true,
				usernameHeader: req.session.username,
				usertype: req.session.usertype,
			});
		}
	};

	static g_exam_validations_controller = async (req, res) => {
		console.log("g_exam_validations_controller")
		try {
			// If we don't use await it will return an empty object.
			const form_data = req.body;

			await userModel.updateOne(
				{ _id: req.session._id },
				{
					$set: {
						"carDetails.make": form_data.make,
						"carDetails.model": form_data.model,
						"carDetails.year": form_data.year,
						"carDetails.platno": form_data.platno,
					},
				}
			);

			res.redirect("/g_exam");
		} catch (err) {
			console.log("Error: ", err);
			res.send(err);
		}
	};

	static g_exam_post_date = async (req, res) => {
		console.log("g_exam_post_date");
		try {
			const form_data = req.body;
			//const currentURL = req.url;
			// Store the current times picked for the current date picked.
			let currentTimesArray = [];

			if (!form_data.date) {
				return res.render("g_exam.ejs", {
					dateTimeBd: false,					
					selectingDate: true,
					dateNotPicked: true,
					username: true,
					usernameHeader: req.session.username,
					usertype: req.session.usertype,
				});
			} else {
				// Validates if the date picked by the admin is already in BD with some times
				const slotsBd = await appointmentModel.find({
					date: form_data.date,
					isTimeSlotAvailable: "true",
				});
				if (slotsBd) {
					for (let slot of slotsBd) {
						currentTimesArray.push(slot.time);
					}
					req.session.currentTimesArray = Array.from(currentTimesArray);
				}
				req.session.dateTimePicked = form_data.date;
				let dateTimePicked = "Date picked: " + form_data.date;

				res.render("g_exam.ejs", {
					dateTimeBd: false,					
					selectingDate: false,
					selectingTime: true,
					dateTimePicked,
					changeButtonName: "Change date",
					currentTimesArray,
					username: true,
					usernameHeader: req.session.username,
					usertype: req.session.usertype,
				});
			}
		} catch (error) {
			console.log("Error: ", error);
			res.send(error);
		}
	};

	static g_exam_post_time = async (req, res) => {
		console.log("g_exam_post_time");
		try {
			const form_data = req.body;
			//const currentURL = req.url;
			if (form_data.change_date_time) {
				// In this section we redirect to appointment so the admin can choose a new date.
				console.log("Change date time button");
				if (!req.session.timeSelected) {
					delete req.session.currentTimesArray;
					res.redirect("/g_exam");
				} else {
					const dateTimePicked = "Date picked: " + req.session.dateTimePicked;
					const currentTimesArray = Array.from(req.session.currentTimesArray);
					delete req.session.timeSelected;
					res.render("g_exam.ejs", {
						dateTimeBd: false,						
						selectingDate: false,
						selectingTime: true,
						dateTimePicked,
						changeButtonName: "Change date",
						currentTimesArray,
						username: true,
						usernameHeader: req.session.username,
						usertype: req.session.usertype,
					});
				}
			} else if (form_data.slot_button) {
				console.log("slot_button button");
				req.session.timeSelected = form_data.slot_button;
				const dateTimePicked =
					form_data.slot_button + " | " + req.session.dateTimePicked;
				const user_from_db = await userModel.findOne({
					$or: [{ _id: req.session._id }],
				});
				res.render("g_exam.ejs", {
					data: user_from_db,
					dateTimeBd: false,					
					selectingDate: false,
					selectingTime: false,					
					dateTimePicked,
					changeButtonName: "Change time",
					readonlyText: "",
					gFormButtonText: "Book G Test",
					gFormAction: "/g_exam",					
					username: true,
					usernameHeader: req.session.username,
					usertype: req.session.usertype,
				});
			}
		} catch (error) {
			console.log("Error: ", error);
			res.send(error);
		}
	};

	static g_exam_post = async (req, res) => {
		console.log("g_exam_post");
		// Use trycatch when you use async await
		try {
			const form_data = req.body;
			//const currentURL = req.url;

			console.log("form_data: ", form_data);
			// This is for hash/encode license number
			//const hashed_licenseno = await bcrypt.hash(form_data.licenseno, 10);
			const slotBd = await appointmentModel.findOne({
				date: req.session.dateTimePicked,
				time: req.session.timeSelected,
			});
			console.log("slotBd: ", slotBd);
			console.log("slotBd._id: ", slotBd._id);
			await userModel.updateOne(
				{ _id: req.session._id },
				{
					$set: {
						firstname: form_data.firstname,
						lastname: form_data.lastname,
						licenseno: form_data.licenseno,
						age: form_data.age,
						dob: form_data.dob,
						appointmentId: slotBd._id,
						testtype: "G",
						"carDetails.make": form_data.make,
						"carDetails.model": form_data.model,
						"carDetails.year": form_data.year,
						"carDetails.platno": form_data.platno,
					},
				}
			);
			await appointmentModel.updateOne(
				{ _id: slotBd._id },
				{
					$set: {
						isTimeSlotAvailable: "false",
					},
				}
			);
			delete req.session.timeSelected;
			delete req.session.dateTimePicked;
			delete req.session.currentTimesArray;
			delete req.session.defaultData;
			//req.session.defaultData = false;
			res.redirect("/dashboard");

			console.log("----------------------------------------------------------");
			console.log("");
		} catch (err) {
			console.log("Error: ", err);
			res.send(err);
		}
	};			
}

export default GExamController;
