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
  } catch (error) {
    console.log(error.message);
    return responseHandler(
      res,
      { status: 401, message: 'Email already exists', data: null },
      error
    );
  }
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { ...updateObject } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, updateObject);
    return responseHandler(res, {
      status: 200,
      message: 'User updated',
      data: updatedUser,
    });
  } catch (error) {
    return responseHandler(
      res,
      {
        status: 400,
        message: 'Something went wrong',
        data: error.message,
      },
      error
    );
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {
  const { _id } = req.user;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);
    return responseHandler(res, {
      status: 200,
      message: 'User deleted',
      data: deletedUser,
    });
  } catch (error) {
    return responseHandler(
      res,
      {
        status: 400,
        message: 'Something went wrong',
        data: error.message,
      },
      error
    );
  }
};

//GET SINGLE USER
export const getUser = async (req, res) => {
  const { user } = req;
  try {
    return responseHandler(res, {
      status: 200,
      message: 'User retreived',
      data: user,
    });
  } catch (error) {
    return responseHandler(
      res,
      {
        status: 400,
        message: 'Something went wrong',
        data: error.message,
      },
      error
    );
  }
};

//GET REQUESTS
//GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return responseHandler(res, {
      status: 200,
      message: 'Users retreived',
      data: users,
    });
  } catch (error) {
    console.log(error);
    return responseHandler(
      res,
      {
        status: 400,
        message: 'Something went wrong',
        data: error.message,
      },
      error
    );
  }
};

//LOGIN
export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ email: userEmail });
    const valid = await comparePassword(userPassword, user.password);
    if (!valid) {
      return responseHandler(
        res,
        {
          status: 401,
          message: 'Wrong email or password',
          data: null,
        },
        'Wrong credentials'
      );
    }
    const { password, salt, ...userObject } = user;
    const token = jwt.sign(userObject, process.env.JWT_SECRET);
    return responseHandler(res, {
      status: 200,
      message: 'User login successful',
      data: token,
    });
  } catch (error) {
    console.log(error.message);
    return responseHandler(
      res,
      {
        status: 400,
        message: 'Something went wrong',
        data: error.message,
      },
      error
    );
  }
};
