import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  loginUser,
} from '../controllers/users.js';
import { checkForUser, getToken } from '../middleware/user.js';
import { createUserValidation } from '../middleware/validation.js';

const router = Router();

router.post('/user/create', createUserValidation, createUser);
router.put('/user/update', getToken, updateUser);
router.delete('/user/delete', getToken, deleteUser);
router.get('/user', getToken, getUser);
router.post('/login', loginUser);

router.get('/users', getAllUsers);

export default router;
