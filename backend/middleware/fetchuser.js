const jwt = require('jsonwebtoken');
const JWT_Secret = 'omissexy';

const fetchuser = async (req, res, next) => {
  const token = req.header('authtoken');
  if (!token) {
    return res.status(401).send({ error: 'Please login to access this location' });
  }

  try {
    const data = jwt.verify(token, JWT_Secret);
    req.user = data.user;
    console.log('Token verified successfully:', data.user);
    next();
  } catch (error) {
    console.log('Token verification error:', error.message);
    res.status(401).send('Please login again to access this location');
  }
};
module.exports = fetchuser;
