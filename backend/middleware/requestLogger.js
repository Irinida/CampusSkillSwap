// Middleware runs for every incoming request.
module.exports = function requestLogger(req, res, next) {
  const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
  console.log(`${req.method} ${req.originalUrl} - ${time}`);
  next();
};
