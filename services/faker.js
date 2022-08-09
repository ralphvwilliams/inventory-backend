import { faker } from '@faker-js/faker';
import { options } from 'joi';

export const createUserObj = {
  fullName: faker.name.fullName(),
  email: faker.internet.email(),
  shopName: faker.company.name,
  password: faker.random.alphaNumeric(8),
};

export const addProdObj = {
  name: faker.commerce.product(),
  quantity: faker.random.numeric(),
  unitPrice: faker.random.numeric(),
  productStatus: faker.commerce.productAdjective(),
};

export const loginObj = {
  email: faker.internet.email(),
  password: faker.random.alphaNumeric(8),
};
