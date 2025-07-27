import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

//register
const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).send({
        message: "please filled all user",
        success: false,
      });
    }

    //existing use
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(401).send({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // save
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New user created ",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

//get all user
const getAlluser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).send({
      success: true,
      message: "getting all user data",
      user,
      userCount: user.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all user",
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "email is not registered",
      });
    }

    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "invallid password or email",
      });
    }

    return res.status(200).send({
      success: true,
      message: "login Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login callback",
      error,
    });
  }
};

export { getAlluser, registerController, loginController };
