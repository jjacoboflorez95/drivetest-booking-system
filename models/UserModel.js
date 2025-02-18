import mongoose from "mongoose";
import {} from "dotenv/config";

const uri = process.env.MONGO_URI;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected To Mongo Db Successfully !!!");
	})
	.catch((err) => {
		console.log(`Not Connected to MongoDb due to the error below \n${err}`);
	});

const userSchema = mongoose.Schema({
	firstname: { type: String, required: true, default: "default" },
	lastname: { type: String, required: true, default: "default" },
	licenseno: { type: String, required: true, default: "default" },
	age: { type: Number, required: true, default: 0 },
	dob: { type: String, required: true, default: "default" },
	username: { type: String, required: true },
	password: { type: String, required: true },
	usertype: { type: String, required: true },
	appointmentId: { type: String, required: true, default: "default" },
	testtype: { type: String, required: true, default: "default" },
	carDetails: {
		make: { type: String, required: true, default: "default" },
		model: { type: String, required: true, default: "default" },
		year: { type: Number, required: true, default: 0 },
		platno: { type: String, required: true, default: "default" },
	},
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
