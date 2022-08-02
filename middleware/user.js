import { User } from '../models/User.js';

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
