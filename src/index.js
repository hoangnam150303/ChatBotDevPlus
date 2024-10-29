const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./database/database");
const cors = require("cors");
dotenv.config();
const port = process.env.PORT || 8000;
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const configViewEngine = require("./config/configViewEngine");
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//View Engine
configViewEngine(app);
// Router
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.listen(port, () => {
  console.log(`server is working on port: ${port}`);
  connectDb();
});
