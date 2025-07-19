require("dotenv").config();
const express = require("express");
const cors = require("cors");
const libraryRoutes = require("./routes/Library");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors({
	origin: [
		"http://localhost:5173"
	],
	credentials: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	optionSuccessStatus: 200,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", require("./routes/Users"));
app.use("/books", require("./routes/Books"));
app.use("/user", libraryRoutes);


app.get("/", (req, res) => res.send("BookBin API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server 🏃 on port ${PORT}`));
