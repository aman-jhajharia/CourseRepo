const jwt = require('jsonwebtoken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { username: process.env.ADMIN_USERNAME },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      token,
    });
  } else {
    res.status(401).json({ success: false, error: 'Invalid username or password' });
  }
};
