const { z } = require('zod');

module.exports = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        errors: err.issues.map(e => ({
          field: e.path[0],
          message: e.message
        }))
      });
    }
    next(err);
  }
};