import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export const checkForUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).send({
      message: 'Wrong user ID',
      data: null,
    });
  }
  req.user = user;
  next();
};

export const getToken = (req, res, next) => {
  const { token } = req.headers;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(403).send({
      message: 'Access forbidden',
      data: null,
    });
  }
  req.user = decoded._doc;
  next();
};
