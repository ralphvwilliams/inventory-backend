import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'app.log' })],
});

export const responseHandler = (res, resObj, error = null) => {
  logger.error(error);
  return res.status(resObj.status).send({
    message: resObj.message,
    data: resObj.data,
  });
};
