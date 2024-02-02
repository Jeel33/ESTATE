import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) =>{
    const {userName, email, password} = req.body
    const hashedPassword  = bcryptjs.hashSync(password,10)
    const newUser = new User({userName,email,password:hashedPassword})
    try{
    await newUser.save()
    res.status(201).json("created sccessfully!")}
    catch(err){
        next(errorHandler(500, "duplicate key"))
    }
}

export const signin = async(req, res, next)=>{
    const {email, password} = req.body;
    try{
        const validateUser = await User.findOne({email});
        console.log(validateUser)
        if(!validateUser) return next(errorHandler(404,"User not found"));
        const validatePassword = bcryptjs.compareSync(password, validateUser.password)
        if(!validatePassword) return next(errorHandler(401, "Username or password invalid!"))
        const token = jwt.sign({id: validateUser._id},process.env.JWT_SECRET)
        const{password:pass, ...rest} = validateUser._doc
        res.cookie('accesstoken', token, {httpOnly:true}).status(201).json({
            success: true,
            message: 'user is logged in!',
            rest
        })
    }catch(error){
        next(error)
    }
}

export const google = async(req, res, next) =>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
            const{password:pass, ...rest} = user._doc
            res.cookie('accesstoken', token, {httpOnly:true}).status(201).json(rest);
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                userName: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const{password:pass, ...rest} = newUser._doc
            res.cookie('accesstoken', token, {httpOnly:true}).status(201).json(rest); 
        }
    }catch(error){
        next(error)
    }
}