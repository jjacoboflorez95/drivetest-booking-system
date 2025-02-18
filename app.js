/*
Assignment 3
Name: Juan Jacobo Florez Monroy
*/
import express from "express";
// Body parser to parse the form data in request body
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
// Import router to use as middleware
import router from "./routes/routes.js";
import {} from "dotenv/config";


const app = express();

// For using body parse we need this line below
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine as EJS
app.set("view engine", "ejs");

// Middleware to use public folder for static resources
app.use(express.static("public"));

// -- Session connection -- //
//Session store
const uri = process.env.MONGO_URI;

const session_store = MongoStore.create({
	mongoUrl: uri,
	dbName: "DrivingTest",
	collectionName: "user_sessions",
});
// Create our session
app.use(
	session({
		secret: "Any Secret Key",
		resave: false,
		saveUninitialized: true,
		store: session_store,
	})
);

// Port listening
app.listen(4040, () => {
	console.log("Server is listening at port 4040.");
});

//Routes
app.use("/", router);
