module.exports = function errorHandler(error, req, res, next) {
  console.error(error.message);
  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid record ID.' });
  }
  res.status(500).json({ message: 'Something went wrong on the server.' });
};
