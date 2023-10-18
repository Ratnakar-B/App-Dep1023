let express = require("express");
let cors = require("cors");
let app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
//JSONWebToken//
var jwt = require("jsonwebtoken");

let mongoose = require("mongoose");

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.dbPath);
    console.log("Successfully connected to Mongo DB");
  } catch (err) {
    console.log("Unable to connect to Mongo DB");
  }
};
connectToMDB();

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  maritalStatus: String,
  state: String,
  email: String,
  password: String,
  reConfirm: String,
  profilePic: String,
});

let user = new mongoose.model("user", userSchema);

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(req.file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Login Data//

app.post("/login", upload.none(), async (req, res) => {
  let userInfo = await user.find().and({
    email: req.body.email,
  });

  //No user Exist//
  if (userInfo.length == 0) {
    res.json({ status: "failure", msg: "User Doesn't have account" });
  } else {
    let encryptedCredentials = jwt.sign(
      { email: userInfo[0].email, password: userInfo[0].password },
      "Ratnakar"
    );
    console.log(encryptedCredentials);

    //Comparing bcrypt passowrd and decrypt one//

    let result = await bcrypt.compare(req.body.password, userInfo[0].password);
    console.log(result);
    //If the user email and password same then login into Home page//

    if (result == true) {
      res.json({
        status: "success",
        msg: "Successfully Logged in",
        token: encryptedCredentials,
        data: userInfo[0],
      });
    } else {
      res.json({ status: "failure", msg: "Invalid password" });
    }
  }
});

//JSON WebToken//

app.post("/validateToken", upload.none(), async (req, res) => {
  console.log("We have received the decrypted the credentials");

  console.log(req.body.token);

  let decryptedCredentials = jwt.verify(req.body.token, "Ratnakar");
  console.log(decryptedCredentials);

  let userInfo = await user.find().and({
    email: decryptedCredentials.email,
  });

  if (userInfo.length > 0) {
    if (userInfo[0].password == decryptedCredentials.password) {
      res.json({
        status: "success",
        msg: "Valid Credentials",
        data: userInfo[0],
      });
    } else {
      res.json({
        status: "failure",
        msg: "Invalid Credentials",
        data: userInfo[0],
      });
    }
  }

  // res.json({ status: "success", msg: "Successfully logged in" });
});

//Update Profile//

app.patch("/updateProfile", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log("Profile Updated Successfully");
  await user.updateMany(
    { email: req.body.email },
    {
      firstName: req.body.fn,
      lastName: req.body.ln,
      password: req.body.password,
      reConfirm: req.body.reConfirm,
      // profilePic: req.file.path,
    }
  );
  res.json({ status: "success", msg: "Profile Updated Successfully" });
});

//Delete Account//

app.delete("/deleteProfile", upload.none(), async (req, res) => {
  console.log("Account Deleted Successfully");

  try {
    let deletedUser = await user.deleteMany({ email: req.body.email }, {});
    console.log(deletedUser);
    res.json({ status: "success", msg: "Account Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: "faiure", msg: err });
  }
});
//Signup Data//

app.post("/signup", upload.single("profilePic"), async (req, res) => {
  console.log("We have received the Data from Client.");
  console.log(req.body);
  console.log(req.file);
  //Here we have bcrpted the password and stored in DB// Bcrypt is nothing but it will ecrypt the password and make secure the password. saltround is 10 means 10 layers of ecrypt method//
  let bcryptPassword = await bcrypt.hash(req.body.password, 10);
  console.log(bcryptPassword);

  let userInfo = await user.find().and({
    email: req.body.email,
  });

  //If the user already exist then first statement will execute//

  if (userInfo.length > 0) {
    res.json({ status: "failure", msg: " User already exist" });
  } else {
    try {
      let newUserInfo = new user({
        firstName: req.body.fn,
        lastName: req.body.ln,
        email: req.body.email,
        password: bcryptPassword,
        reConfirm: bcryptPassword,
        profilePic: req.file.path,
      });
      await user.insertMany([newUserInfo]);
      res.json({ status: "success", msg: "User Created Successfully" });
    } catch (err) {
      res.json({ status: "failure", msg: err });
    }
  }
});
app.listen(process.env.port, () => {
  console.log("This port is listening to 3333");
});
