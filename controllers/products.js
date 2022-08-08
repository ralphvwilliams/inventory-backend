import { User } from '../models/User.js';

//GET ALL PRODUCTS
export const getAllUserProducts = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  const products = user.products;
  return res.status(200).send({
    message: 'User products retrieved',
    data: products,
  });
};

//ADD PRODUCT
export const addProduct = async (req, res) => {
  const { _id } = req.user;
  const { ...productObject } = req.body;

  try {
    const addedProduct = await User.updateOne(
      { _id },
      { $push: { products: { productId: req.id, ...productObject } } }
    );

    return res.status(201).send({
      message: 'Product added',
      data: productObject,
    });
  } catch (error) {
    console.log(error);
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.params;

  try {
    const deletedProduct = await User.updateMany(
      { _id },
      { $pull: { products: { productId: productId } } }
    );
    return res.status(201).send({
      message: 'Product deleted',
      data: [],
    });
  } catch (error) {
    console.log(error);
  }
};

//GET PRODUCT
export const getProduct = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.params;
  const user = await User.findById(_id);
  const product = user.products.filter(
    (product) => product.productId == productId
  );
  return res.status(200).send({
    message: 'Product retrieved',
    data: product,
  });
};
