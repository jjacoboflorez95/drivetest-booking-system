import express from "express";
// Controllers
import DashboardController from "../controllers/dashboard_controller.js";
import LoginController from "../controllers/login_controller.js";
import GExamController from "../controllers/g_exam_controller.js";
import G2ExamController from "../controllers/g2_exam_controller.js";
import LogoutController from "../controllers/logout_controller.js";
import AppointmentController from "../controllers/appointment_controller.js";
//Middlewares
import isValidSession from "../middlewares/validsession_middleware.js";
import isValidUserTypeDriver from "../middlewares/validusertypedriver_middleware.js";
import isValidUserTypeAdmin from "../middlewares/validusertypeadmin_middleware.js";

const router = express.Router();

//Routes
router.get("/", (req, res) => {
    res.redirect("/dashboard");
});
router.get("/dashboard", DashboardController.dashboard_controller);


// Login
router.get("/login", LoginController.login_controller);
router.post("/login", LoginController.login_singup_controller);

// G Exam
router.get(
	"/g_exam",
	isValidSession,
	isValidUserTypeDriver,
	GExamController.g_exam_controller
);
router.post("/g_exam_update", GExamController.g_exam_validations_controller);
router.post("/g_exam", GExamController.g_exam_post);
router.post("/g_date", GExamController.g_exam_post_date);
router.post("/g_time", GExamController.g_exam_post_time);

// G2 Exam
router.get(
	"/g2_exam",
	isValidSession,
	isValidUserTypeDriver,
	G2ExamController.g2_exam_controller
);
router.post("/g2_exam_update", G2ExamController.g2_exam_validations_controller);
router.post("/g2_exam", G2ExamController.g2_exam_post);
router.post("/g2_date", G2ExamController.g2_exam_post_date);
router.post("/g2_time", G2ExamController.g2_exam_post_time);

// Appointment
router.get(
	"/appointment",
	isValidUserTypeAdmin,
	AppointmentController.appointment_get
);
router.post("/appointment_date", AppointmentController.appointment_post_date);
router.post("/appointment_slots", AppointmentController.appointment_post);

router.get("/logout", isValidSession, LogoutController.logut_controller);

export default router;
