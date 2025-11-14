  const { redisClient } = require("../config/redis");
  const Submission = require("../model/submission");
  const User = require("../model/user");
  const getToken = require("../utils/getToken");
  const validate = require("../utils/validate");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const validator = require("validator");

  //here the user data will be authenticated

  const register = async (req, res, next) => {
    try {
      //validate data
      validate(req.body);

      //hash the user password
      const salt = await bcrypt.genSalt(10);
      const genHash = await bcrypt.hash(req.body.password, salt);
      req.body.password = genHash;
      req.body.role = "user";

      //if user email exist he will be handled below
      await User.create(req.body);

      //find the user email in db
      const user = await User.findOne({ emailID: req.body.emailID });

      //genrate the cookie
      const payload = { emailID: user.emailID, role: user.role, _id: user._id };
      const token = getToken(payload);

      const reply = {
        firstName : user.firstName,
        emailID : user.emailID,
        _id : user._id
      }
      //set the cookie for the user
      res.cookie("token", token);

      res.status(201).json({
        user : reply,
        message : "register sucess"
      });
    } catch (err) {
      res.status(400).send("error : " + err.message);
    }
  };

  const login = async (req, res) => {
    try {
      const data = req.body;
      const mandatoryFeilds = ["emailID", "password"];
      const isOkay = mandatoryFeilds.every((key) => key in data);

      if (!isOkay) {
        throw new Error("missing details");
      }

      if (!validator.isEmail(data.emailID)) {
        throw new Error("invalid emailID");
      }

      const user = await User.findOne({ emailID: data.emailID });
      if (!user) {
        throw new Error("no user exists");
      }

      const isAllowed = await bcrypt.compare(data.password, user.password);

      if (!isAllowed) {
        throw new Error("invalid credentials");
      }

      const token = getToken({
        emailID: user.emailID,
        role: user.role,
        _id: user._id,
      });

      const reply = {
        firstName : user.firstName,
        emailID : user.emailID,
        _id : user._id
      }
      res.cookie("token", token);

      res.status(201).json({
        user : reply,
        message : "login sucess"
      });
    } catch (err) {
      res.status(400).send("error : " + err.message);
    }
  };

  const logout = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      //for getting the exp time of token
      const payload = jwt.decode(token);

      //putting it into redis marking invalid
      await redisClient.set(`token:${token}`, "invalid");
      await redisClient.expireAt(`token:${token}`, payload.exp + 10);

      //removing the cookie form the frontend
      res.cookie("token", null, { expires: new Date(Date.now()) });


      res.status(200).send("logout sucessfull");
    } catch (err) {
      res.status(400).send("error : " + err.message);
    }
  };

  const adminRegister = async (req, res) => {
    try {
      //validate data which he posted
      validate(req.body);

      //hash the user password
      const salt = await bcrypt.genSalt(10);
      const genHash = await bcrypt.hash(req.body.password, salt);
      req.body.password = genHash;

      //if user email exist he will be handled below
      await User.create(req.body);

      //find the user email in db
      const user = await User.findOne({ emailID: req.body.emailID });

      //genrate the cookie
      const payload = { emailID: user.emailID, role: user.role, _id: user._id };
      const token = getToken(payload);

      //set the cookie for the user
      res.cookie("token", token);

      res.status(201).send("user created sucessfully");
    } catch (err) {
      res.status(400).send("error : " + err.message);
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const userid = res.result._id;

      //deleting him from users
      await User.findByIdAndDelete(userid);
      //deleting his submissions which he had done (but we can do this by using the post function in the user model section go there to see what done there)
      // await Submission.deleteMany({userId : userid})

      //removing the cookie form the frontend
      res.cookie("token", null, { expires: new Date(Date.now()) });
      res.status(200).send("user deleted sucessfully");
    } catch (err) {
      res.status(400).send("internal server error : " + err.message);
    }
  };

  module.exports = {
    register,
    login,
    logout,
    adminRegister,
    deleteUser,
  };
