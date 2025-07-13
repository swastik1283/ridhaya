import jwt from  'jsonwebtoken'
import validator from 'validator'
import UserModel from '../models/UserModel.js';
import userModel from '../models/UserModel.js';
//Route for user login
const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}


const adminLogin = async (req, res) => {
   try {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();

    const expectedEmail = process.env.ADMIN_EMAIL?.trim();
    const expectedPassword = process.env.ADMIN_PASSWORD?.trim();

    console.log("🔍 Incoming Email:", email);
    console.log("✅ Expected Email:", expectedEmail);
    console.log("🔍 Incoming Password:", password);
    console.log("✅ Expected Password:", expectedPassword);

    if (email === expectedEmail && password === expectedPassword) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET.trim(), { expiresIn: '1d' });
      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export {adminLogin} 