const jwt= require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const register = async(req, res)=>{
    const {username, email, password}= req.body;
    if(!username || !email || !password){
        return res.status(400).json({error: "Please fill all the fields"});
    };

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const user = new User({username, email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "registerd successfully"});
    }catch(error){
        res.status(500).json({error});
    }
    
}

const login = async(req, res)=>{
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"fields missing"});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({error:"invalid credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }catch(error){
        res.status(500).json({error:"server error"});
    }
}
module.exports = {register, login};