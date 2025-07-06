import jwt from 'jsonwebtoken';

const adminauth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token || token.trim() === '') {
      return res.status(401).json({ success: false, message: 'Not authorized - token missing' });
    }

    const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET.trim());

    if (decoded.email.trim() !== process.env.ADMIN_EMAIL.trim()) {
      return res.status(401).json({ success: false, message: 'Not authorized - invalid token' });
    }

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({ success: false, message: 'Token verification failed' });
  }
};

export default adminauth;
