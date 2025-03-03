const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json()); // Middleware to parse JSON


app.post(
  '/submi',
  [
    body('name')
      .exists({ checkFalsy: true }).withMessage('Name is required')
      .isString().withMessage('Name must be a string')
      .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

    body('email')
      .exists({ checkFalsy: true }).withMessage('Email is required')
      .isString().withMessage('Email must be a string')
      .isEmail().withMessage('Invalid email format'),

    body('age')
      .exists().withMessage('Age is required')
      .isInt({ min: 18, max: 99 }).withMessage('Age must be a number between 18 and 99'),

    body('phone')
      .optional()
      .isMobilePhone("any").withMessage('Invalid phone number'),

    body('password')
      .exists().withMessage('Password is required')
      .isString().withMessage('Password must be a string')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    body('confirm_password')
      .exists().withMessage('Confirm Password is required')
      .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),

    body('gender')
      .exists().withMessage('Gender is required')
      .isIn(['male', 'female', 'other']).withMessage('Gender must be "male", "female", or "other"'),

    body('dob')
      .exists().withMessage('Date of Birth is required')
      .isISO8601().withMessage('Invalid date format'),

    body('address.street')
      .exists({ checkFalsy: true }).withMessage('Street is required')
      .isString().withMessage('Street must be a string'),

    body('address.city')
      .exists({ checkFalsy: true }).withMessage('City is required')
      .isString().withMessage('City must be a string'),

    body('address.zip')
      .exists({ checkFalsy: true }).withMessage('ZIP code is required')
      .isPostalCode('any').withMessage('Invalid ZIP code'),

    body('preferences')
      .optional()
      .isArray().withMessage('Preferences must be an array'),

    body('isAdmin')
      .optional()
      .isBoolean().withMessage('isAdmin must be a boolean'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Validation passed!', data: req.body });
  }
);

// Start server
const PORT = 3000;
const server =
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

module.exports = { app, server };