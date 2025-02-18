import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
	date: { type: String, required: true },
	time: { type: String, required: true },
	isTimeSlotAvailable: { type: String, required: true, default: true },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
