const express = require("express");
const app = express();
app.use(express.json());
const { connection } = require("./config/db");
const { userRoute } = require("./Routes/userRegister.Route");
const { authenticate } = require("./middleware/authentication");
const { userPost } = require("./Routes/user.post.Model");
const cors = require("cors");
app.use(cors());
app.use("/user", userRoute);
//middleware

app.use(authenticate);
app.use("/post", userPost);

app.listen(process.env.port, () => {
  try {
    connection();
    console.log(`server running at ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
