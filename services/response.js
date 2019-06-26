// function to send standar response
exports.sendResponse = (res, response, code, data, message = '', devMessage = '') => {
  res.status(code).send({
    response,
    data,
    message,
    devMessage,
  });
};
