// function to send standar response
exports.sendResponse = (res, response, code, data, message = '', devMessage = '') => {
  res.status(200).send({
    response,
    code,
    data,
    message,
    devMessage,
  });
};
