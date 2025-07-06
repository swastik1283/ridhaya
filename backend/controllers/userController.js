import jwt from  'jsonwebtoken'

//Route for user login
const loginUser=async(req,res)=>{

}
//route for user register

const registerUser=async(req,res)=>{
 res.json({msg:"reg api working"})
}
//route for admin login


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
export {loginUser,registerUser,adminLogin} 