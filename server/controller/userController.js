import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// ----signup controller-----------
export const signup = async (req, res)=>{

    try {

        const userData = new User(req.body);
        const {email} = userData;
        const existUser = await User.findOne({email});

        if(existUser){
           return res.status(400).json({message: "User already exist"});
        }

        const savedUser = await userData.save();
        res.status(200).json(savedUser);
        
    } catch (error) {
        res.status(500).json(error.message);
    }

}

// login controller
export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});
       
        if(!userExist){
            return res.status(400).json({message: "User not exist"});
        }

        // compare password with database password
        const isValidPassword = await bcrypt.compare(password, userExist.password);
        if(!isValidPassword){
            return res.status(401).json({message: "email or password invalid"});
        }
       
        // checking login status by token
        const tokenExist = req.cookies.token;
        if(tokenExist){
            return res.status(400).json({message: "Already login"});
        } 
        // generate token with user data and store in the cookie
        const token = jwt.sign({userId: userExist._id}, process.env.SECRET_KEY, {expiresIn: '1h'});
        console.log("token == ",token);
        //res.cookie("token",token, {httpOnly: true, maxAge: 3600000, secure: false})
        res.cookie("token",token, {httpOnly: false, maxAge: 3600000, secure: false,path: '/'})
        // httpOnly - Make this false if you want to access via JavaScript, // path: '/' - Make the cookie available throughout the site
        //  secure: false, // Secure is false when running locally on HTTP, Set to true in production with HTTPS
        res.status(200).json({msg: "Login successfully",token: token});
    } catch (error) {
        res.status(500).json({error: error,message: "Somthing went wrong login"})
        //res.status(500).json({error: error})
    } 
}

// logout controller
export const logout = async (req, res)=>{
    try {

        // checking login status using token
        const tokenExist = req.cookies.token;
        if(!tokenExist){
            return res.status(400).json({message: "Login required"});
        }

        // clear cookie and token (logout)
        res.clearCookie("token");
        res.status(200).json({message: "Logout successfully"});
        
    } catch (error) {
        res.status(500).json({error: error})
    }
}


export const create = async(req, res)=>{
    try {

        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }

        await userData.save();
        res.status(200).json({msg: "User created successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getAll = async(req, res) =>{
    try {

        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"User not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "User updated successfully."});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const deleteUser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "User not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully."});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}