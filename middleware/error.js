const { errorHandler, APIError } = require('../helpers/ErrorHandler');
// 404
function handleNotFoundPage(req, res) {
  return res.status(404).json({ message: 'Page not found' });
}

// Error handler
function handleError(err, req, res, next) {
  if (err) {
    err = new APIError({ message: err.message, status: err.status || 500 });
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    let [_, collection, field, value] = err.message.match(
      /collection: [a-z]*\.([a-z]*)\sindex:\s([a-z]+).*{\s?[a-zA-z0-9]*:\s?"?([a-z0-9@. ]+)"?/i
    );
    err = new APIError({
      message: ` ${collection} exist ${field} : ${value}`,
      status: 409,
    });
  }
  if (!errorHandler.isTrustedError(err)) {
    return next(err);
  }
  return res.status(err.status).json(err);
}

module.exports = {
  handleNotFoundPage,
  handleError,
};
