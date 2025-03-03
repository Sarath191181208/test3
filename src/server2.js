const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json()); // Middleware to parse JSON

app.post(
  "/submit",
  [
    body("name")
      .exists({ checkFalsy: true })
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a string")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),

    body("email")
      .exists({ checkFalsy: true })
      .withMessage("Email is required")
      .isString()
      .withMessage("Email must be a string")
      .isEmail()
      .withMessage("Invalid email format"),

    body("age")
      .exists()
      .withMessage("Age is required")
      .isInt({ min: 18, max: 99 })
      .withMessage("Age must be a number between 18 and 99"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: "Validation passed!", data: req.body });
  }
);

// Start server
const PORT = 3001;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

module.exports = { app, server };
