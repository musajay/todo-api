module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode ?? 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Something went wrong'
    : err.message ?? 'Something went wrong';

  return res.status(statusCode).json({ error: message });
};