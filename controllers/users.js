import { User } from '../models/User.js';

//POST REQUESTS
//CREATE USER
export const createUser = async (req, res) => {
  const { fullName, email, shopName, password } = req.body;
  const user = await User.create({
    fullName: fullName,
    email,
    shopName,
    password,
    products: [],
  });

  return res.status(201).send({
    message: 'User created',
    data: user,
  });
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const { id, ...updateObject } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateObject);
    return res.status(200).send({
      message: 'User updated',
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: 'Something went wrong',
      data: error,
    });
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
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
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    res.status(200).send({
      message: 'User retreived',
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: 'Something went wrong',
      data: error,
    });
  }
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
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user.password != password) {
    return res.status(200).send({
      message: 'Incorrect details',
      data: null,
    });
  }
  return res.status(200).send({
    message: 'User login successful',
    data: user,
  });
};
