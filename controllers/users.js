import { comparePassword, hashPassword } from '../auth/auth.js';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { responseHandler } from '../services/services.js';

//POST REQUESTS
//CREATE USER
export const createUser = async (req, res) => {
  try {
    const { fullName, email, shopName, password } = req.body;
    const { salt, hash } = await hashPassword(password);
    const user = await User.create({
      fullName: fullName,
      email,
      shopName,
      password: hash,
      salt,
      products: [],
    });
    return responseHandler(res, {
      status: 201,
      message: 'User created',
      data: user,
    });
    // return res.status(201).send({
    //   message: 'User created',
    //   data: user,
    // });
  } catch (error) {
    return responseHandler(
      res,
      { status: 401, message: 'Email already exists', data: null },
      error
    );
    // return res.status(401).send({
    //   message: 'Email already exists',
    //   data: null,
    // });
  }
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { ...updateObject } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, updateObject);
    return res.status(200).send({
      message: 'User updated',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: 'Something went wrong',
      data: error.message,
    });
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    return res.status(200).send({
      message: 'User deleted',
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: 'Something went wrong',
      data: error,
    });
  }
};

//GET SINGLE USER
export const getUser = async (req, res) => {
  const { user } = req;
  return res.status(200).send({
    message: 'User retreived',
    data: user,
  });
};

//GET REQUESTS
//GET ALL USERS
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).send({
    message: 'Users retreived',
    data: users,
  });
};

//LOGIN
export const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const user = await User.findOne({ email: userEmail });
  const valid = await comparePassword(userPassword, user.password);
  if (!valid) {
    return res.status(401).send({
      message: 'Wrong email or password',
      data: null,
    });
  }
  const { password, salt, ...userObject } = user;
  const token = jwt.sign(userObject, process.env.JWT_SECRET);
  return res.status(200).send({
    message: 'User login successful',
    data: token,
  });
};
